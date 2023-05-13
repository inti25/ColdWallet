import {
  EchoMode,
  FlexLayout,
  QDialog,
  QDialogSignals,
  QIcon,
  QLabel,
  QLineEdit,
  QPushButton,
  QSize,
  WindowType,
} from "@nodegui/nodegui";
import { promises } from "fs";
import { join } from "path";
import icImport from "../../../assets/import.png";
import { showErrorBox, showMessageBox } from "../../utils/messageUtil";
import { ethers } from "ethers";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class ImportAccountDialog<Signals extends ImportAccountdialogSignals = ImportAccountdialogSignals> extends QDialog<Signals>{
  lblAccount = new QLabel();
  account = new QLineEdit();
  lblPrivateKey = new QLabel();
  privateKey = new QLineEdit();
  confirmBtn = new QPushButton();
  accountName: string;
  emitter2: any;

  constructor(accountName: string) {
    super();
    this.emitter2 = this.native?.getNodeEventEmitter().emitter;
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.accountName = accountName;
    this.setStyleSheet(stylePath);
    this.initView();
  }
  initView() {
    this.setWindowTitle("Add Account");
    this.setWindowIcon(new QIcon(icImport));
    this.setModal(true);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    this.setObjectName("CustomDialog");
    this.setFixedSize(400, 200);
    const layout = new FlexLayout();
    this.setLayout(layout);
    this.lblAccount.setText("Account Name:");
    this.lblAccount.setObjectName("lbl");
    this.account.setObjectName("Input");
    this.account.setText(this.accountName);

    this.lblPrivateKey.setText("Private Key:");
    this.lblPrivateKey.setObjectName("lbl");
    this.privateKey.setObjectName("Input");

    this.confirmBtn.setText("Import");
    this.confirmBtn.setObjectName("SecondaryButton");
    this.confirmBtn.addEventListener("clicked", async () => {

      if (this.account.text().trim() == "") { 
        showMessageBox("Account Name is required");
        return;
      }
      if (this.privateKey.text().trim() == "") { 
        showMessageBox("Private Key is required");
        return;
      }

      try {
        const wallet = new ethers.Wallet(this.privateKey.text());
        this.emitter2?.emit("onFinished", this.account.text().trim(), this.privateKey.text().trim())
        this.accept();
      } catch (e) {
        showMessageBox("Private Key is incorrect");
          return;
      }
    });
    layout.addWidget(this.lblAccount);
    layout.addWidget(this.account);
    layout.addWidget(this.lblPrivateKey);
    layout.addWidget(this.privateKey);
    layout.addWidget(this.confirmBtn);
  }
}

export interface ImportAccountdialogSignals extends QDialogSignals {
  onFinished: (accountName: string, privateKey: string) => void;
}