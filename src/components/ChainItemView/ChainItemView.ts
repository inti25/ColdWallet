import { Network } from "../../model/Network";
import {
  Direction,
  QBoxLayout,
  QIcon,
  QPixmap,
  QPushButton,
  QSize,
  QWidget,
} from "@nodegui/nodegui";
import { generateQPixmapImage, getPixmap } from "../../utils/imageUtil";
import { getGlobalEvent } from "../../utils/globalUtil";

export class ChainItemView extends QWidget {
  private readonly _chain: Network;
  constructor(chain: Network) {
    super();
    this._chain = chain;
    this.setObjectName(ChainItemView.name);
    this.initView();
  }

  get chain(): Network {
    return this._chain;
  }

  async initView() {
    const layout = new QBoxLayout(Direction.TopToBottom);
    this.setLayout(layout);
    let pixmap: QPixmap;
    try {
      pixmap = await getPixmap(this._chain.icon);
    } catch (e) {
      pixmap = generateQPixmapImage(this._chain.name || "");
    }
    this.setToolTip(this._chain.name || "");
    const icon = new QPushButton();
    icon.setObjectName("ItemView");
    icon.setIcon(new QIcon(pixmap));
    icon.setIconSize(new QSize(this.width() - 3, this.height() - 3));
    layout.addWidget(icon);
    icon.addEventListener("clicked", () => {
      getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
  }
}
