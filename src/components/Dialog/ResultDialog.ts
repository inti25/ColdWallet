import {
  FlexLayout,
  QDialog,
  QIcon,
  QLabel,
  QPixmap,
  WindowType,
} from "@nodegui/nodegui";
import icAdd from "../../../assets/plus.png";
import icCheck from "../../../assets/check.png";
import icWarning from "../../../assets/warning.png";
import { promises } from "fs";
import { join } from "path";
import { getCurrentNetwork } from "../../utils/globalUtil";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class ResultDialog extends QDialog {
  isSuccess: boolean;
  txnHash: string;
  messages: string;
  constructor(isSuccess: boolean, txnHash: string, messages: string) {
    super();
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);
    this.isSuccess = isSuccess;
    this.txnHash = txnHash;
    this.messages = messages;
    this.initView();
  }

  initView() {
    this.setWindowTitle("Transaction Result");
    this.setObjectName("CustomDialog");
    if (this.isSuccess) {
      this.setWindowIcon(new QIcon(icCheck));
    } else {
      this.setWindowIcon(new QIcon(icWarning));
    }
    this.setModal(true);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    const view = new FlexLayout();
    this.setLayout(view);
    const imgOk = new QPixmap(icCheck);
    // imgOk.load(icCheck);
    const imgFailed = new QPixmap(icWarning);
    // imgFailed.load(icWarning);
    const img = new QLabel();
    img.setScaledContents(true);
    img.setFixedSize(280, 280);
    if (this.isSuccess) {
      img.setPixmap(imgOk);
    } else {
      img.setPixmap(imgFailed);
    }

    const network = getCurrentNetwork();
    const explorerLink = `${network.blockExplorers}/tx/${this.txnHash}`;
    const mess = new QLabel();
    mess.setObjectName("lbl");
    mess.setText(
      this.isSuccess
        ? "Transaction was Submitted"
        : `Transaction failed! \n ${mess}`
    );

    const lblScan = new QLabel();
    lblScan.setText(`<a href="${explorerLink}">View on Explorer</a>`);
    lblScan.setOpenExternalLinks(true);
    view.addWidget(img);
    view.addWidget(mess);
    if (this.txnHash) {
      view.addWidget(lblScan);
    }
  }
}
