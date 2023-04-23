import { BaseScreen } from "./BaseScreen";
import {
  EchoMode,
  FlexLayout,
  QLabel,
  QLineEdit,
  QPushButton,
  QTextEdit,
} from "@nodegui/nodegui";
import { ethers } from "ethers";
import { showMessageBox } from "../utils/messageUtil";
import { getAccount } from "../utils/walletUtil";
import { Account, AccountType } from "../model/Account";
import { User } from "../model/User";
import { setPassword, setUser } from "../utils/globalUtil";
import { Main } from "./Main";

export class ConfirmSeedAndPassword extends BaseScreen {
  constructor(props: any) {
    super(ConfirmSeedAndPassword.name, props);
  }

  initLayout(): void {
    const layout = new FlexLayout();
    this.root.setLayout(layout);

    const label = new QLabel();
    label.setText("Secret Recovery Phrase:");
    label.setObjectName("lbl");
    const wordSeed = new QTextEdit();
    wordSeed.setObjectName("wordSeed");
    if (this.props?.newWallet) {
      const wallet = ethers.Wallet.createRandom();
      wordSeed.setText(wallet.mnemonic?.phrase || "");
    }

    const lblPassword = new QLabel();
    lblPassword.setText("New Password:");
    lblPassword.setObjectName("lbl");
    const password = new QLineEdit();
    password.setEchoMode(EchoMode.Password);

    const lblPassword2 = new QLabel();
    lblPassword2.setText("Confirm Password:");
    lblPassword2.setObjectName("lbl");
    const password2 = new QLineEdit();
    password2.setEchoMode(EchoMode.Password);

    const confirmBtn = new QPushButton();
    confirmBtn.setText("Confirm");
    confirmBtn.setObjectName("PrimaryButton");
    confirmBtn.addEventListener("clicked", () => {
      if (wordSeed.toPlainText().trim() === "") {
        showMessageBox(
          "The value for the Secret Recovery Phrase field is missing!"
        );
        return;
      }
      if (password.text().trim() === "") {
        showMessageBox("The value for the New Password field is missing!");
        return;
      }
      if (password2.text().trim() === "") {
        showMessageBox(
          "The value for the Confirm Password field is missing. Type the same value entered for the New Password field!"
        );
        return;
      }
      if (password.text() !== password2.text()) {
        showMessageBox(
          "The values for the New Password and Confirm Password fields do not match. Enter the desired password in both fields!"
        );
        return;
      }
      this.createWallet(wordSeed.toPlainText(), password.text()).then(
        (isSuccess) => {
          if (isSuccess) {
            this.changeView(Main.name);
          }
        }
      );
    });
    confirmBtn.setInlineStyle(`
      margin-top: 10px;
    `);

    layout.addWidget(label);
    layout.addWidget(wordSeed);
    layout.addWidget(lblPassword);
    layout.addWidget(password);
    layout.addWidget(lblPassword2);
    layout.addWidget(password2);
    layout.addWidget(confirmBtn);
  }

  async createWallet(phrase: string, password: string): Promise<boolean> {
    try {
      const wallet = getAccount(phrase, 0);
      const accs: Account[] = [];
      accs.push(
        new Account("Account 1", AccountType.INDEX, 0, wallet.privateKey)
      );
      setPassword(password);
      let user = new User(phrase, accs, password);
      await user.save();
      setUser(user);
      return true;
    } catch (e) {
      console.error(e);
      showMessageBox("Invalid Secret Recovery Phrase!");
      return false;
    }
  }
}
