import {
  FlexLayout,
  QApplication,
  QDialog,
  QIcon,
  QLabel,
  QPixmap,
  QPushButton,
  QSize,
  WindowType,
} from "@nodegui/nodegui";
import logo from "../../../assets/wallet.png";
import icCopy from "../../../assets/copy.png";
import {
  getCurrentAccount,
  getCurrentNetwork,
  getSigner,
} from "../../utils/globalUtil";
import QRCode from "qrcode";
import { promises } from "fs";
import { join } from "path";
import { AuthenticationDialog } from "../../components/Dialog/AuthenticationDialog";
import { showMessageBox } from "../../utils/messageUtil";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class AccountDialog extends QDialog {
  qrcode: QLabel = new QLabel();
  viewOnExplorer: QLabel = new QLabel();
  copyBtn: QPushButton = new QPushButton();
  privateBtn: QPushButton = new QPushButton();
  clipboard = QApplication.clipboard();
  authenticationDialog = new AuthenticationDialog();

  constructor() {
    super();
    this.setWindowTitle("Account Detail");
    this.setWindowIcon(new QIcon(logo));
    this.setMinimumSize(300, 500);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    const view = new FlexLayout();
    this.setObjectName("AccountDetail");
    this.setLayout(view);
    this.qrcode.setScaledContents(true);
    this.qrcode.setFixedSize(280, 280);
    this.copyBtn.setIcon(new QIcon(icCopy));
    this.copyBtn.setText("Copy to Clipboard");
    this.copyBtn.setObjectName("PrimaryButton");
    this.copyBtn.addEventListener("clicked", () => {
      this.copyToClipboard();
    });

    this.privateBtn.setIcon(new QIcon(icCopy));
    this.privateBtn.setText("Copy Private Key");
    this.privateBtn.setObjectName("SecondaryButton");
    this.privateBtn.addEventListener("clicked", () => {
      this.authenticationDialog.exec();
    });

    view.addWidget(this.qrcode);
    view.addWidget(this.viewOnExplorer);
    view.addWidget(this.copyBtn);
    view.addWidget(this.privateBtn);
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);

    this.authenticationDialog.addEventListener("accepted", () => {
      this.clipboard?.setText(getCurrentAccount().privateKey, 0);
      showMessageBox("Private key is copied to your Clipboard!");
    });
  }

  async copyToClipboard() {
    const address = await getSigner().getAddress();
    this.clipboard?.setText(address, 0);
  }

  async show() {
    const address = await getSigner().getAddress();
    const bitmap = new QPixmap();
    const img = await QRCode.toBuffer(address);
    bitmap.loadFromData(img);
    this.qrcode.setPixmap(bitmap);
    const explorerLink = `${
      getCurrentNetwork().blockExplorers
    }/address/${address}`;
    this.viewOnExplorer.setText(
      `<a href="${explorerLink}">View on Explorer</a>`
    );
    this.viewOnExplorer.setOpenExternalLinks(true);
    super.show();
  }
}
