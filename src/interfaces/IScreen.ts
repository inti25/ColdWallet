import { QMainWindow } from "@nodegui/nodegui";

export interface IScreen {
  setViewChangeListener: (listener: IViewChange) => void;
  attachToView: (rootView: QMainWindow) => void;
  changeView: (viewName: string, props?: any) => void;
  delete: () => void;
}

export interface IViewChange {
  onChange: (viewName: string, props?: any) => void;
}
