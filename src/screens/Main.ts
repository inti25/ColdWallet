import {IScreen, IViewChange} from "../interfaces/IScreen";
import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";
import {FlexLayout, QLabel, QMainWindow, QPushButton} from "@nodegui/nodegui";
import {NewWallet} from "./NewWallet";

export class Main implements IScreen {
  private readonly root: QWidget;
  private listener: IViewChange | undefined;

  constructor() {
    this.root = new QWidget();
    this.root.setObjectName('Main');
    this.initLayout();
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
  }

  attachToView(rootView: QMainWindow): void {
    rootView.setCentralWidget(this.root);
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