import {QIcon, QPixmap} from "@nodegui/nodegui";

const { QComboBox } = require("@nodegui/nodegui");
import logo from '../../assets/logox200.png';
import {ethers} from "ethers";
const axios = require('axios');

async function getPixmap(url: any) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  const pixmap = new QPixmap();
  pixmap.loadFromData(data);
  return pixmap;
}
const cbNetworks = new QComboBox();

async function init() {
  const img = await getPixmap('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/240px-Sign-check-icon.png');
  cbNetworks.setObjectName("cbNetworks");
  cbNetworks.addItem(undefined, 'comboBox item 0');
  cbNetworks.addItem(new QIcon(img), 'comboBox item 1');
  cbNetworks.addItem(undefined, 'comboBox item 2');
  cbNetworks.addItem(undefined, 'comboBox item 3');
  cbNetworks.setStyleSheet(`
  #cbNetworks {
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    width: '100%';
  }
  `)
  cbNetworks.addEventListener('currentTextChanged', (text: string) => {
    console.log('currentTextChanged: ' + text);
  });
  cbNetworks.addEventListener('currentIndexChanged', (index: string) => {
    // console.log('currentIndexChanged: ' + index);
    // const wallet = ethers.Wallet.createRandom();
    // console.log('address:', wallet.address)
    // console.log('mnemonic:', wallet?.mnemonic?.phrase)
    // console.log('privateKey:', wallet.privateKey)
  });
}
init();
export default cbNetworks