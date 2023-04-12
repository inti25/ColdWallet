import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";

export interface IScreen {
  setViewChangeListener: (listener: IViewChange) => void;
  attachToView: (rootView: QWidget) => void
  initLayout: () => void;
  changeView: (viewName: string) => void
  delete: () => void;
}

export interface IViewChange {
  onChange: (viewName: string) => void
}