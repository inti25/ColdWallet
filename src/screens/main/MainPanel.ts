import { FlexLayout, QScrollArea, QWidget } from "@nodegui/nodegui";
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
    // const scrollArea = new QScrollArea();
    // scrollArea.setInlineStyle("flex: 1; width:'100%';");
    const tk = new TokenList();
    // scrollArea.setWidget(tk);
    layout.addWidget(tk);
  }
}
