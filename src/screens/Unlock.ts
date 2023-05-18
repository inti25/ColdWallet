import { BaseScreen } from "./BaseScreen";
import {
  EchoMode,
  FlexLayout,
  QLabel,
  QLineEdit,
  QPushButton,
} from "@nodegui/nodegui";
import { showMessageBox } from "../utils/messageUtil";
import { checkPassword, loadUser } from "../model/User";
import { setPassword, setUser } from "../utils/globalUtil";
import { ResultDialog } from "../components/Dialog/ResultDialog";

export class Unlock extends BaseScreen {
  resultDialog = new ResultDialog();
  constructor(props: { nextScreen: string }) {
    super(Unlock.name, props);
  }

  initLayout(): void {
    const layout = new FlexLayout();
    this.root.setLayout(layout);
    const label = new QLabel();
    label.setText("Welcome back!");
    label.setObjectName("Title");

    const lblPassword = new QLabel();
    lblPassword.setText("Password:");
    lblPassword.setObjectName("lbl");
    const password = new QLineEdit();
    password.setEchoMode(EchoMode.Password);
    password.setObjectName("Input");

    const confirmBtn = new QPushButton();
    confirmBtn.setText("Unlock");
    confirmBtn.setObjectName("PrimaryButton");
    confirmBtn.addEventListener("clicked", () => {
      if (password.text().trim() === "") {
        showMessageBox("The value for the New Password field is missing!");
        return;
      }

      checkPassword(password.text()).then((isCorrect) => {
        if (isCorrect) {
          setPassword(password.text());
          loadUser().then((user) => {
            if (user) {
              setUser(user);
              this.changeView(this.props.nextScreen);
            }
          });
        } else {
          showMessageBox("Incorrect Password!");
        }
      });
    });
    layout.addWidget(label);
    layout.addWidget(lblPassword);
    layout.addWidget(password);
    layout.addWidget(confirmBtn);
  }
}
