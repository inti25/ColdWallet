import {
  EchoMode,
  FlexLayout,
  QDialog,
  QIcon,
  QLabel,
  QLineEdit,
  QPushButton,
  WindowType,
} from "@nodegui/nodegui";
import { promises } from "fs";
import { join } from "path";
import icAdd from "../../../assets/plus.png";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class AddAccount extends QDialog {
  lblAccount = new QLabel();
  account = new QLineEdit();
  confirmBtn = new QPushButton();

  constructor() {
    super();
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
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
    this.account.setEchoMode(EchoMode.Password);
    this.account.setObjectName("Input");

    this.confirmBtn.setText("Add");
    this.confirmBtn.setObjectName("PrimaryButton");
    this.confirmBtn.addEventListener("clicked", async () => {
      if (this.account.text().trim() === "") {
      }
    });
    layout.addWidget(this.lblAccount);
    layout.addWidget(this.account);
    layout.addWidget(this.confirmBtn);
  }
}
