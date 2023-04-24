import {
  Direction,
  FlexLayout,
  QBoxLayout,
  QLabel,
  QPushButton,
} from "@nodegui/nodegui";
import { NewWallet } from "../NewWallet";
import { BaseScreen } from "../BaseScreen";
import { NetworksComboBox } from "../../components/ComboBox/NetworksComboBox";
import { ChainItemView } from "../../components/ChainItemView/ChainItemView";
import { getGlobalEvent } from "../../utils/globalUtil";
import { NetworkListPanel } from "./NetworkListPanel";
import { MainPanel } from "./MainPanel";

export class Main extends BaseScreen {
  constructor() {
    super(Main.name);
  }

  initLayout() {
    const layout = new FlexLayout();
    this.root.setLayout(layout);
    const networkPanel = new NetworkListPanel();
    layout.addWidget(networkPanel);
    const mainPanel = new MainPanel();
    layout.addWidget(mainPanel);

    // const label = new QLabel();
    // label.setText("Main");
    // const generateButton = new QPushButton();
    // generateButton.setText("Generate");
    // generateButton.setObjectName("generateButton");
    // generateButton.addEventListener("clicked", () => {
    //   this.changeView(NewWallet.name);
    // });
    //
    // const cb = new NetworksComboBox();
    // cb.onNetworkChanged = (network) => {
    //   const test = new ChainItemView(network);
    //   layout.addWidget(test);
    // };
    // layout.addWidget(cb.getView());
    // layout.addWidget(label);
    // layout.addWidget(generateButton);

    // getGlobalEvent().addListener("onNetworkChanged", (data) => {
    //   console.log("addListener", data);
    // });
  }
}
