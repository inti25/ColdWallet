import { IViewChange } from "./interfaces/IScreen";
import { QMainWindow } from "@nodegui/nodegui";
import { Main } from "./screens/main/Main";
import { NewWallet } from "./screens/NewWallet";
import { ConfirmSeedAndPassword } from "./screens/ConfirmSeedAndPassword";
import { BaseScreen } from "./screens/BaseScreen";
import { Unlock } from "./screens/Unlock";
import { DetailTransfer } from "./screens/transfer/DetailTransfer";

export class Router implements IViewChange {
  private route: any;
  private readonly rootLayout: QMainWindow;
  private currentPage: BaseScreen | undefined;

  constructor(rootLayout: QMainWindow) {
    this.rootLayout = rootLayout;
    this.init();
  }

  init() {
    this.route = {};
    this.route[Main.name] = Main;
    this.route[Unlock.name] = Unlock;
    this.route[NewWallet.name] = NewWallet;
    this.route[ConfirmSeedAndPassword.name] = ConfirmSeedAndPassword;
    this.route[DetailTransfer.name] = DetailTransfer;
  }

  change(name: string, props?: any) {
    const screen = this.route[name];
    if (screen) {
      const r = new screen(props);
      r.attachToView(this.rootLayout);
      r.setViewChangeListener(this);
      if (this.currentPage) {
        this.currentPage.delete();
      }
      this.currentPage = r;
    }
  }

  onChange(viewName: string, props?: any): void {
    this.change(viewName, props);
  }
}
