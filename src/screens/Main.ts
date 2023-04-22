import { FlexLayout, QLabel, QPushButton } from "@nodegui/nodegui";
import { NewWallet } from "./NewWallet";
import { BaseScreen } from "./BaseScreen";
import { NetworksComboBox } from "../components/NetworksComboBox";

export class Main extends BaseScreen {
  constructor() {
    super(Main.name);
  }

  initLayout() {
    const layout = new FlexLayout();
    this.root.setLayout(layout);
    const label = new QLabel();
    label.setText("Main");
    // Buttons
    const generateButton = new QPushButton();
    generateButton.setText("Generate");
    generateButton.setObjectName("generateButton");
    generateButton.addEventListener("clicked", () => {
      this.changeView(NewWallet.name);
    });

    const cb = new NetworksComboBox();
    cb.onNetworkChanged = (network) => {
      console.log("onNetworkChanged", network);
    };
    layout.addWidget(cb.getView());
    layout.addWidget(label);
    layout.addWidget(generateButton);

    this.root.setStyleSheet(`
        #Main{
          background-color: #009688;
          flex-direction: 'column';
        }
    `);
  }
}
