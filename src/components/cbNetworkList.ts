import {QIcon, QPixmap} from "@nodegui/nodegui";
import {loadNetworkList} from "../model/Network";

const { QComboBox } = require("@nodegui/nodegui");
const axios = require('axios');

async function getPixmap(url: any) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  const pixmap = new QPixmap();
  pixmap.loadFromData(data);
  return pixmap;
}
const cbNetworks = new QComboBox();

async function init() {
  const networks = await loadNetworkList();
  cbNetworks.setObjectName("cbNetworks");

  for (const nw of networks) {
    const img = await getPixmap(nw.icon);
    cbNetworks.addItem(new QIcon(img), nw.name || '');

  }
  cbNetworks.setStyleSheet(`
  #cbNetworks {
    font-size: 14px;
    font-weight: bold;
    height: 40px;
    width: '100%';
  }
  `)
  cbNetworks.addEventListener('currentTextChanged', (text: string) => {
    console.log('currentTextChanged: ' + text);
  });
  cbNetworks.addEventListener('currentIndexChanged', (index: string) => {
  });
}
init();
export default cbNetworks