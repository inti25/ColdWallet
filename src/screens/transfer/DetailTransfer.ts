import { BaseScreen } from "../BaseScreen";
import {
  FlexLayout,
  QIcon,
  QLabel,
  QLineEdit,
  QMovie,
  QPushButton,
} from "@nodegui/nodegui";
import { AccountsComboBox } from "../../components/ComboBox/AccountsComboBox";
import {
  getCurrentAccount,
  getGlobalEvent,
  getSigner,
} from "../../utils/globalUtil";
import { TransferData } from "../../utils/types";
import { TokenItem } from "../../components/TokenList/TokenItem";
import { NumberInput } from "../../components/NumberInput/NumberInput";
import { ZeroAddress, ethers, parseEther, parseUnits } from "ethers";
import { showErrorBox } from "../../utils/messageUtil";
import erc20Abi from "./../../abis/erc20.json";
import { AuthenticationDialog } from "../../components/Dialog/AuthenticationDialog";
import iconLoading from "./../../../assets/loading.gif";
import icSend from "../../../assets/send.png";
import { ResultDialog } from "../../components/Dialog/ResultDialog";
import { getTransactionErr } from "../../utils/common";

export class DetailTransfer extends BaseScreen {
  transferData: TransferData;
  cbAccount = new AccountsComboBox();
  toAccount = new QLineEdit();
  amount = new NumberInput();
  tokenIcon = new QLabel();
  balance = new QLabel();
  tokenItem: TokenItem;
  moive = new QMovie();
  confirmBtn = new QPushButton();

  authenticationDialog = new AuthenticationDialog();
  constructor(props: TransferData) {
    super(DetailTransfer.name);
    this.transferData = props;
    this.tokenItem = new TokenItem(this.transferData.token);
  }

  initLayout(): void {
    const layout = new FlexLayout();
    this.root.setLayout(layout);

    const lblBalance = new QLabel();
    lblBalance.setText("Balance:");
    lblBalance.setObjectName("lbl");

    this.tokenItem.setHiddenActionBtn(true);

    const lblFromAccount = new QLabel();
    lblFromAccount.setText("From Account:");
    lblFromAccount.setObjectName("lbl");

    const currentAccount = getCurrentAccount();
    this.cbAccount.setCurrentIndex(currentAccount.displayIndex);

    const lblToAccount = new QLabel();
    lblToAccount.setText("To Account:");
    lblToAccount.setObjectName("lbl");

    const lblAmount = new QLabel();
    lblAmount.setText("Amount:");
    lblAmount.setObjectName("lbl");
    this.amount.setText("0.0");
    this.amount.setFrame(true);

    this.confirmBtn.setText("Send Transaction");
    this.confirmBtn.setObjectName("SecondaryButton");
    this.confirmBtn.setIcon(new QIcon(icSend));
    this.confirmBtn.addEventListener("clicked", () => {
      this.authenticationDialog.exec();
    });
    this.confirmBtn.setInlineStyle(`
      margin-top: 10px;
    `);

    this.authenticationDialog.addEventListener("accepted", () => {
      this.TransferToken();
    });
    this.moive.setFileName(iconLoading);
    this.moive.addEventListener("frameChanged", (value) => {
      this.confirmBtn.setIcon(new QIcon(this.moive.currentPixmap()));
    });

    layout.addWidget(this.tokenItem);
    layout.addWidget(lblFromAccount);
    layout.addWidget(this.cbAccount);
    layout.addWidget(lblToAccount);
    layout.addWidget(this.toAccount);
    layout.addWidget(lblAmount);
    layout.addWidget(this.amount);
    layout.addWidget(this.confirmBtn);

    getGlobalEvent().addListener("onAccountSelected", (account) => {
      this.tokenItem.updateData();
    });
  }

  setLoading(isLoading: boolean) {
    if (isLoading) {
      this.moive.start();
      this.confirmBtn.setEnabled(false);
      this.confirmBtn.setText("Sending Transaction...");
    } else {
      this.moive.stop();
      this.confirmBtn.setEnabled(true);
      this.confirmBtn.setIcon(new QIcon(icSend));
      this.confirmBtn.setText("Send Transaction");
    }
  }

  async TransferToken() {
    const signer = getSigner();
    const token = this.tokenItem.token.address;
    const amount = this.amount.text();
    const toAddr = this.toAccount.text();

    if (!ethers.isAddress(toAddr)) {
      showErrorBox("incorrect receiver!");
      return;
    }
    if (token === ZeroAddress) {
      const txn = {
        from: await signer.getAddress(),
        to: toAddr,
        value: parseEther(amount),
        nonce: await signer.getNonce(),
      };
      let transaction: any;
      try {
        this.setLoading(true);
        transaction = await signer.sendTransaction(txn);
        await transaction.wait();
        this.showResultModal(true, transaction.hash, "");
      } catch (e: any) {
        console.log("send Failed", e);
        this.showResultModal(false, transaction.hash, e.message);
      } finally {
        this.setLoading(false);
      }
    } else {
      const tokenContract = new ethers.Contract(
        token || "",
        erc20Abi,
        signer as any
      );
      let transaction: any;
      try {
        this.setLoading(true);
        transaction = await tokenContract.transfer(
          toAddr,
          parseUnits(amount, this.tokenItem.token.decimals || 18)
        );
        console.log("transaction", transaction);
        this.showResultModal(true, transaction.hash, "");
      } catch (e: any) {
        console.log("send Failed", e);
        this.showResultModal(false, transaction.hash, e.message);
      } finally {
        this.setLoading(false);
      }
    }
  }

  showResultModal(isSuccess: boolean, txnHash: string, message: any) {
    const dialog = new ResultDialog(
      isSuccess,
      txnHash,
      getTransactionErr(message)
    );
    dialog.exec();
  }
}
