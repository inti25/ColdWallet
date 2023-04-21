import {BaseScreen} from "./BaseScreen";
import {EchoMode, FlexLayout, QLabel, QLineEdit, QPushButton, QTextEdit} from "@nodegui/nodegui";

export class ConfirmSeedAndPassword extends BaseScreen {

  constructor() {
    super(ConfirmSeedAndPassword.name);
  }

  initLayout(): void {
    const layout = new FlexLayout();
    this.root.setLayout(layout);

    const label = new QLabel();
    label.setText("Word Seed:");
    label.setObjectName('lbl')
    const wordSeed = new QTextEdit();

    const lblPassword = new QLabel();
    lblPassword.setText("Password:");
    lblPassword.setObjectName('lbl')
    const password = new QLineEdit();
    password.setEchoMode(EchoMode.Password);

    const lblPassword2 = new QLabel();
    lblPassword2.setText("Confirm Password:");
    lblPassword2.setObjectName('lbl')
    const password2 = new QLineEdit();
    password2.setEchoMode(EchoMode.Password);

    const confirmBtn = new QPushButton();
    confirmBtn.setText('Confirm');
    confirmBtn.setObjectName('PrimaryButton');
    confirmBtn.addEventListener('clicked', () => {
      // this.changeView(ConfirmSeedAndPassword.name)
    });
    confirmBtn.setInlineStyle(`
      margin-top: 10px;
    `)

    layout.addWidget(label);
    layout.addWidget(wordSeed);
    layout.addWidget(lblPassword);
    layout.addWidget(password);
    layout.addWidget(lblPassword2);
    layout.addWidget(password2);
    layout.addWidget(confirmBtn);

    this.root.setStyleSheet(`
        #ConfirmSeedAndPassword{
          background-color: #009688;
          flex-direction: 'column';
          padding: 4px
        }
        #lbl {
          margin-top: 5px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
    `)
  }

}