import {IScreen, IViewChange} from "../interfaces/IScreen";
import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";
import {FlexLayout, QLabel, QPushButton} from "@nodegui/nodegui";

export class Main implements IScreen {
  private readonly root: FlexLayout;
  private listener: IViewChange | undefined;

  constructor() {
    this.root = new FlexLayout();
    this.root.setObjectName('NewWallet');
  }

  initLayout() {
    const label = new QLabel();
    label.setText("Main");

    // Buttons
    const generateButton = new QPushButton();
    generateButton.setText('Generate');
    generateButton.setObjectName('generateButton');

    generateButton.addEventListener('clicked', () => {
      this.changeView('newWallet')
    });

    this.root.addWidget(label);
    this.root.addWidget(generateButton);
  }

  attachToView(rootView: QWidget): void {
    rootView.setLayout(this.root)
    this.initLayout();
  }

  changeView(viewName: string) {
    this.listener?.onChange(viewName);
  }

  setViewChangeListener(listener: IViewChange): void {
    this.listener = listener;
  }

  delete(): void {
    for (let c of this.root.children()) {
      c.delete();
    }
    this.root.delete();
  }

}