import {IViewChange} from "./interfaces/IScreen";
import {QMainWindow} from "@nodegui/nodegui";
import {Main} from "./screens/Main";
import {NewWallet} from "./screens/NewWallet";

export class Router implements IViewChange{
  private route: any;
  private readonly rootLayout: QMainWindow;

  constructor(rootLayout: QMainWindow) {
    this.rootLayout = rootLayout;
    this.init();
  }

  init() {
    this.route = {};
    this.route[Main.name] = Main;
    this.route[NewWallet.name] = NewWallet;
  }

  change(name: string) {
    const screen = this.route[name];
    if (screen) {
      const r = new screen();
      r.attachToView(this.rootLayout)
      r.setViewChangeListener(this)
    }
  }

  onChange(viewName: string): void {
    this.change(viewName);
  }

}