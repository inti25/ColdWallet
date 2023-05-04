import { FlexLayout } from "@nodegui/nodegui";
import { BaseScreen } from "../BaseScreen";
import { NetworkListPanel } from "./NetworkListPanel";
import { MainPanel } from "./MainPanel";
import { SettingPanel } from "./SettingPanel";

export class Main extends BaseScreen {
  constructor() {
    super(Main.name);
  }

  initLayout() {
    const layout = new FlexLayout();
    this.root.setLayout(layout);
    const networkPanel = new NetworkListPanel();
    const mainPanel = new MainPanel();
    const settingPanel = new SettingPanel();
    layout.addWidget(networkPanel);
    layout.addWidget(mainPanel);
    layout.addWidget(settingPanel);
  }
}
