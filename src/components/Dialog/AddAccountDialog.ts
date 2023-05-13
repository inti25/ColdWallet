import {
  EchoMode,
  FlexLayout,
  QDialog,
  QDialogSignals,
  QIcon,
  QLabel,
  QLineEdit,
  QPushButton,
  WindowType,
} from "@nodegui/nodegui";
import { promises } from "fs";
import { join } from "path";
import icAdd from "../../../assets/plus.png";
import { EventWidget } from "@nodegui/nodegui/dist/lib/core/EventWidget";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class AddAccountDialog<Signals extends AddAccountdialogSignals = AddAccountdialogSignals> extends QDialog<Signals>{
  lblAccount = new QLabel();
  account = new QLineEdit();
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
    this.setWindowIcon(new QIcon(icAdd));
    this.setModal(true);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    this.setObjectName("CustomDialog");
    const layout = new FlexLayout();
    this.setLayout(layout);
    this.lblAccount.setText("Account Name:");
    this.lblAccount.setObjectName("lbl");
    this.account.setObjectName("Input");
    this.account.setText(this.accountName);
    this.confirmBtn.setText("Add");
    this.confirmBtn.setObjectName("SecondaryButton");
    this.confirmBtn.addEventListener("clicked", async () => {
      if (this.account.text().trim() !== "") {
        this.emitter2?.emit("onFinished", this.account.text().trim())
        this.accept();
      }
    });
    layout.addWidget(this.lblAccount);
    layout.addWidget(this.account);
    layout.addWidget(this.confirmBtn);
  }
}

export interface AddAccountdialogSignals extends QDialogSignals {
  onFinished: (accountName: string) => void;
}