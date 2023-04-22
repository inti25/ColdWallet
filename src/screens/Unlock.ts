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

export class Unlock extends BaseScreen {
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

    this.root.setStyleSheet(`
        #Unlock{
          background-color: #009688;
          flex-direction: 'column';
          align-items: 'center';
          justify-content: 'center';
          padding: 16px
        }
        #Title {
          margin-top: 5px;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 24px;
        }       
        #lbl {
          width: '100%';
          margin-bottom: 2px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          text-align: 'left';
        }
        #Input {
            width: '100%';
            height: 24px;
            border-radius: '4px';
            font-size: 14px;
        }
    `);
  }
}
