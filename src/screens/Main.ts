import {FlexLayout, QLabel, QPushButton} from "@nodegui/nodegui";
import {NewWallet} from "./NewWallet";
import {BaseScreen} from "./BaseScreen";

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

    layout.addWidget(label);
    layout.addWidget(generateButton);
    console.log((global as any).user);
  }

}