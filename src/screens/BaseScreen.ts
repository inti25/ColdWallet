import { IScreen, IViewChange } from "../interfaces/IScreen";
import { QMainWindow } from "@nodegui/nodegui";
import { QWidget } from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";

export abstract class BaseScreen implements IScreen {
  protected readonly root: QWidget;
  private listener: IViewChange | undefined;
  protected props: any;

  protected constructor(name: string, pops?: any) {
    this.root = new QWidget();
    this.root.setObjectName(name);
    this.props = pops;
  }

  abstract initLayout(): void;

  attachToView(rootView: QMainWindow): void {
    this.initLayout();
    rootView.setCentralWidget(this.root);
  }

  changeView(viewName: string, props?: any) {
    this.listener?.onChange(viewName, props);
  }

  setViewChangeListener(listener: IViewChange): void {
    this.listener = listener;
  }

  delete() {
    this.listener = undefined;
    this.root.delete();
  }
}
