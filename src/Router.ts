import {QWidget} from "@nodegui/nodegui/dist/lib/QtWidgets/QWidget";
import {IScreen, IViewChange} from "./interfaces/IScreen";

export class Router implements IViewChange{
  private route: any;
  private rootLayout: QWidget;
  private currentRoute: IScreen | undefined;

  constructor(rootLayout: QWidget) {
    this.rootLayout = rootLayout;
    this.route = {};
  }

  addRoute(name: string, screen :IScreen) {
    this.route[name] = screen;
  }

  change(name: string) {
    if (this.route[name]) {
      const r = this.route[name] as IScreen
      // if (this.currentRoute) {
      //   this.currentRoute.delete();
      // }
      r.attachToView(this.rootLayout)
      r.setViewChangeListener(this)
      // this.currentRoute = r;
    }
  }

  onChange(viewName: string): void {
    this.change(viewName);
  }

}