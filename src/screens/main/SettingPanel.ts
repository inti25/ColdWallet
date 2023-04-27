import {
  CursorShape,
  FlexLayout,
  QIcon,
  QPushButton,
  QSize,
  QWidget,
} from "@nodegui/nodegui";
import icAdd from "../../../assets/plus.png";
import icImport from "../../../assets/import.png";
import icSetting from "../../../assets/settings.png";
import icAddChain from "../../../assets/add_chain.png";
import icShare from "../../../assets/share.png";
import { getCurrentNetwork, getSigner } from "../../utils/globalUtil";
import open from "open";

export class SettingPanel extends QWidget {
  constructor(parent?: any) {
    super(parent);
    this.setObjectName("SettingPanel");
    this.initLayout();
  }

  initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);

    const btnView = new QPushButton();
    btnView.setIcon(new QIcon(icShare));
    btnView.setIconSize(new QSize(32, 32));
    btnView.addEventListener("clicked", () => {
      this.openExplorer();
    });
    btnView.setCursor(CursorShape.PointingHandCursor);
    btnView.setFlat(true);
    btnView.setAutoExclusive(true);
    btnView.setToolTip("View Account in Explorer");

    const addChain = new QPushButton();
    addChain.setIcon(new QIcon(icAddChain));
    addChain.setIconSize(new QSize(32, 32));
    addChain.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    addChain.setCursor(CursorShape.PointingHandCursor);
    addChain.setFlat(true);
    addChain.setAutoExclusive(true);
    addChain.setToolTip("Add Network");

    const addAccount = new QPushButton();
    addAccount.setIcon(new QIcon(icAdd));
    addAccount.setIconSize(new QSize(32, 32));
    addAccount.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    addAccount.setCursor(CursorShape.PointingHandCursor);
    addAccount.setFlat(true);
    addAccount.setAutoExclusive(true);
    addAccount.setToolTip("Add Account");

    const btnImport = new QPushButton();
    btnImport.setIcon(new QIcon(icImport));
    btnImport.setIconSize(new QSize(32, 32));
    btnImport.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    btnImport.setCursor(CursorShape.PointingHandCursor);
    btnImport.setFlat(true);
    btnImport.setAutoExclusive(true);
    btnImport.setToolTip("Import Account");

    const btnSetting = new QPushButton();
    btnSetting.setIcon(new QIcon(icSetting));
    btnSetting.setIconSize(new QSize(32, 32));
    btnSetting.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    btnSetting.setCursor(CursorShape.PointingHandCursor);
    btnSetting.setFlat(true);
    btnSetting.setAutoExclusive(true);
    btnSetting.setToolTip("Setting");

    layout.addWidget(btnView);
    layout.addWidget(addChain);
    layout.addWidget(addAccount);
    layout.addWidget(btnImport);
    layout.addWidget(btnSetting);
  }

  async openExplorer() {
    const address = await getSigner().getAddress();
    open(`${getCurrentNetwork().blockExplorers}/address/${address}`);
  }
}
