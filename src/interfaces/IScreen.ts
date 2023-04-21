import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";
import {QMainWindow} from "@nodegui/nodegui";

export interface IScreen {
  setViewChangeListener: (listener: IViewChange) => void;
  attachToView: (rootView: QMainWindow) => void
  initLayout: () => void;
  changeView: (viewName: string) => void
  delete: () => void;
}

export interface IViewChange {
  onChange: (viewName: string) => void
}