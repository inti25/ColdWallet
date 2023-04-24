import { FlexLayout, QWidget } from "@nodegui/nodegui";
import { loadNetworkList } from "../../model/Network";
import { ChainItemView } from "../../components/ChainItemView/ChainItemView";
import { getGlobalEvent } from "../../utils/globalUtil";

export class NetworkListPanel extends QWidget {
  currentNetworkId: number = 1;
  private root: any;
  constructor(parent?: any) {
    super(parent);
    this.setObjectName(NetworkListPanel.name);
    this.initView().then();
    this.addListener();
  }

  async initView() {
    this.root?.delete();
    this.root = new FlexLayout();
    this.setLayout(this.root);
    const networks = await loadNetworkList();
    for (const network of networks) {
      const item = new ChainItemView(network);
      if (network.id === this.currentNetworkId) {
        item.setInlineStyle(`background: #2f80ed;`);
      } else {
        item.setInlineStyle(`background: #fff;`);
      }
      this.root.addWidget(item);
    }
  }

  addListener() {
    getGlobalEvent().addListener("onNetworkChanged", (args) => {
      this.currentNetworkId = args.id;
      this.initView();
    });
  }
}
