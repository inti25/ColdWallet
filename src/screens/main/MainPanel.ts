import { FlexLayout, QWidget } from "@nodegui/nodegui";
import { AccountsComboBox } from "../../components/ComboBox/AccountsComboBox";
import { TokenList } from "../../components/TokenList/TokenList";

export class MainPanel extends QWidget {
  constructor() {
    super();
    this.setObjectName(MainPanel.name);
    this.initLayout();
  }
  initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);
    const cbAccount = new AccountsComboBox();
    layout.addWidget(cbAccount);
    const tk = new TokenList();
    layout.addWidget(tk);
  }
}
