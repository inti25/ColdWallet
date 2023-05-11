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
import { showMessageBox } from "../../utils/messageUtil";
import { checkPassword } from "../../model/User";
import { promises } from "fs";
import { join } from "path";
import icAuthen from "../../../assets/authentication.png";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class AuthenticationDialog extends QDialog {
  lblPassword = new QLabel();
  password = new QLineEdit();
  confirmBtn = new QPushButton();

  constructor() {
    super();
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);
    this.initView();
  }
  initView() {
    this.setWindowTitle("Authentication");
    this.setWindowIcon(new QIcon(icAuthen));
    this.setModal(true);
    this.setWindowFlag(WindowType.WindowContextHelpButtonHint, false);
    this.setObjectName("CustomDialog");
    const layout = new FlexLayout();
    this.setLayout(layout);
    this.lblPassword.setText("Password:");
    this.lblPassword.setObjectName("lbl");
    this.password.setEchoMode(EchoMode.Password);
    this.password.setObjectName("Input");

    this.confirmBtn.setText("Unlock");
    this.confirmBtn.setObjectName("SecondaryButton");
    this.confirmBtn.addEventListener("clicked", async () => {
      if (this.password.text().trim() === "") {
        showMessageBox("Authentication Failed!", "Error");
        return;
      }
      const isCorrect = await checkPassword(this.password.text());
      if (isCorrect) {
        this.accept();
      } else {
        showMessageBox("Authentication Failed!", "Error");
      }
    });
    layout.addWidget(this.lblPassword);
    layout.addWidget(this.password);
    layout.addWidget(this.confirmBtn);
  }
}
