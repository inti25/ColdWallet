import {IScreen, IViewChange} from "../interfaces/IScreen";
import {QMainWindow} from "@nodegui/nodegui";
import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";

export abstract class BaseScreen implements IScreen {

  protected readonly root: QWidget;
  private listener: IViewChange | undefined;

  protected constructor(name: string) {
    this.root = new QWidget();
    this.root.setObjectName(name);
  }

  abstract initLayout() : void

  attachToView(rootView: QMainWindow): void {
    this.initLayout();
    rootView.setCentralWidget(this.root);
  }

  changeView(viewName: string) {
    this.listener?.onChange(viewName);
  }

  setViewChangeListener(listener: IViewChange): void {
    this.listener = listener;
  }
}