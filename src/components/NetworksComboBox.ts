import { QIcon } from "@nodegui/nodegui";
import { loadNetworkList, Network } from "../model/Network";
import { getPixmap } from "../utils/imageUtil";

const { QComboBox } = require("@nodegui/nodegui");

export class NetworksComboBox {
  private comboBox = new QComboBox();
  private networks: Network[] = [];
  onNetworkChanged?: (network: Network) => void;

  constructor() {
    this.comboBox.setObjectName("cbNetworks");
    this.loadData();
  }

  getView() {
    return this.comboBox;
  }

  async loadData() {
    this.networks = await loadNetworkList();
    this.comboBox.setStyleSheet(`
      #cbNetworks {
        font-size: 14px;
        font-weight: bold;
        height: 40px;
        width: '100%';
      }
    `);

    for (const nw of this.networks) {
      const img = await getPixmap(nw.icon);
      this.comboBox.addItem(new QIcon(img), nw.name || "");
    }

    this.comboBox.addEventListener(`currentIndexChanged`, (index: number) => {
      if (this.onNetworkChanged) {
        this.onNetworkChanged(this.networks[index]);
      }
    });
  }
}
