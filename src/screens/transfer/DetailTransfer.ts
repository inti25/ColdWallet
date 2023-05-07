import { BaseScreen } from "../BaseScreen";
import { FlexLayout, QLabel, QLineEdit } from "@nodegui/nodegui";
import { AccountsComboBox } from "../../components/ComboBox/AccountsComboBox";
import { getCurrentAccount, getGlobalEvent } from "../../utils/globalUtil";
import { TransferData } from "../../utils/types";
import { TokenItem } from "../../components/TokenList/TokenItem";
import { NumberInput } from "../../components/NumberInput/NumberInput";

export class DetailTransfer extends BaseScreen {
  transferData: TransferData;
  cbAccount = new AccountsComboBox();
  toAccount = new QLineEdit();
  amount = new NumberInput();
  tokenIcon = new QLabel();
  balance = new QLabel();
  tokenItem: TokenItem;
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
    this.toAccount.setText("to Account");

    const lblAmount = new QLabel();
    lblAmount.setText("Amount:");
    lblAmount.setObjectName("lbl");
    this.amount.setText("0.0");
    this.amount.setFrame(true);

    layout.addWidget(this.tokenItem);
    layout.addWidget(lblFromAccount);
    layout.addWidget(this.cbAccount);
    layout.addWidget(lblToAccount);
    layout.addWidget(this.toAccount);
    layout.addWidget(lblAmount);
    layout.addWidget(this.amount);

    getGlobalEvent().addListener("onAccountSelected", (account) => {
      this.tokenItem.updateData();
    });
  }
}
