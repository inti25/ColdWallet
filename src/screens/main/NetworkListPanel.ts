import { FlexLayout, QWidget } from "@nodegui/nodegui";
import { loadNetworkList, Network } from "../../model/Network";
import { ChainItemView } from "../../components/ChainItemView/ChainItemView";
import { getGlobalEvent } from "../../utils/globalUtil";

export class NetworkListPanel extends QWidget {
  currentNetworkId: number = 1;
  private root: any;
  networks: Network[] | undefined;
  constructor(parent?: any) {
    super(parent);
    this.setObjectName(NetworkListPanel.name);
    this.addListener();
    this.inti().then();
  }

  async inti() {
    this.networks = await loadNetworkList();
    getGlobalEvent().emit("onNetworkChanged", this.networks[0]);
  }

  initView() {
    this.root?.delete();
    this.root = new FlexLayout();
    this.setLayout(this.root);
    if (this.networks) {
      for (const network of this.networks) {
        const item = new ChainItemView(network);
        if (network.id === this.currentNetworkId) {
          item.setInlineStyle(`background: #2f80ed;`);
        } else {
          item.setInlineStyle(`background: #fff;`);
        }
        this.root.addWidget(item);
      }
    }
  }

  addListener() {
    getGlobalEvent().addListener("onNetworkChanged", (args) => {
      this.currentNetworkId = args.id;
      this.initView();
    });
  }
}
