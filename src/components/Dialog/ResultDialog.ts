import {
  FlexLayout,
  QDialog,
  QIcon,
  QLabel,
  QPixmap,
  WindowType,
} from "@nodegui/nodegui";
import icCheck from "../../../assets/check.png";
import icWarning from "../../../assets/warning.png";
import { promises } from "fs";
import { join } from "path";
import { getCurrentNetwork } from "../../utils/globalUtil";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class ResultDialog extends QDialog {
  lblImage = new QLabel();
  lblMessage = new QLabel();
  lblReason = new QLabel();
  lblViewOnExplorer = new QLabel();
  imgOk = new QPixmap(icCheck);
  imgFailed = new QPixmap(icWarning);
  constructor() {
    super();
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);
    this.initView();
  }

  initView() {
    this.setWindowTitle("Transaction Result");
    this.setModal(true);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    this.setObjectName("ResultDialog");
    const view = new FlexLayout();
    this.setLayout(view);
    this.setFixedSize(300, 400);
    this.lblImage.setScaledContents(true);
    this.lblImage.setObjectName("Image");
    this.lblMessage.setObjectName("Message");
    this.lblViewOnExplorer.setOpenExternalLinks(true);
    view.addWidget(this.lblImage);
    view.addWidget(this.lblMessage);
    view.addWidget(this.lblReason);
    view.addWidget(this.lblViewOnExplorer);
  }

  showResult(isSuccess: boolean, txnHash: string, messages: string) {
    if (isSuccess) {
      this.setWindowIcon(new QIcon(icCheck));
      this.lblImage.setPixmap(this.imgOk);
    } else {
      this.setWindowIcon(new QIcon(icWarning));
      this.lblImage.setPixmap(this.imgFailed);
    }

    this.lblMessage.setText(
      isSuccess ? "Transaction was Submitted" : `Transaction failed!`
    );
    this.lblReason.setText(messages);
    const network = getCurrentNetwork();
    const explorerLink = `${network.blockExplorers}/tx/${txnHash}`;
    if (txnHash) {
      this.lblViewOnExplorer.setText(
        `<a href="${explorerLink}">View on Explorer</a>`
      );
      this.lblViewOnExplorer.setHidden(false);
    } else {
      this.lblViewOnExplorer.setHidden(true);
    }

    this.exec();
  }
}
