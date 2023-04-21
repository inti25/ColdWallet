import {IScreen, IViewChange} from "./interfaces/IScreen";
import {QMainWindow} from "@nodegui/nodegui";
import {Main} from "./screens/Main";
import {NewWallet} from "./screens/NewWallet";

export class Router implements IViewChange{
  private route: any;
  private rootLayout: QMainWindow;
  private currentRoute: IScreen | undefined;

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
      if (this.currentRoute) {
        this.currentRoute.delete();
      }
      r.attachToView(this.rootLayout)
      r.setViewChangeListener(this)
      this.currentRoute = r;
    }
  }

  onChange(viewName: string): void {
    this.change(viewName);
  }

}