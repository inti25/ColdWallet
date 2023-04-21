import {FlexLayout, QLabel, QPushButton} from "@nodegui/nodegui";
import {Main} from "./Main";
import {BaseScreen} from "./BaseScreen";

export class NewWallet extends BaseScreen {

  constructor() {
    super(NewWallet.name);
  }

  initLayout() {
    const layout = new FlexLayout();
    this.root.setLayout(layout);
    const label = new QLabel();
    label.setText("NewWallet");

    // Buttons
    const generateButton = new QPushButton();
    generateButton.setText('Generate');
    generateButton.setObjectName('generateButton');

    generateButton.addEventListener('clicked', () => {
      this.changeView(Main.name)
    });

    layout.addWidget(label);
    layout.addWidget(generateButton);
  }
}