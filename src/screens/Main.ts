import {FlexLayout, QLabel, QPushButton} from "@nodegui/nodegui";
import {NewWallet} from "./NewWallet";
import {BaseScreen} from "./BaseScreen";
import {loadNetworkList} from "../model/Network";
import cbNetworks from "../components/cbNetworkList";

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
    generateButton.setText('Generate');
    generateButton.setObjectName('generateButton');
    generateButton.addEventListener('clicked', () => {
      this.changeView(NewWallet.name)
    });

    layout.addWidget(cbNetworks);
    layout.addWidget(label);
    layout.addWidget(generateButton);
    loadNetworkList();

  }

}