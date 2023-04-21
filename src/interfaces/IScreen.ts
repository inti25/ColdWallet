import {QMainWindow} from "@nodegui/nodegui";

export interface IScreen {
  setViewChangeListener: (listener: IViewChange) => void;
  attachToView: (rootView: QMainWindow) => void
  changeView: (viewName: string) => void
}

export interface IViewChange {
  onChange: (viewName: string) => void
}