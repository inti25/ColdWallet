import { FlexLayout, QLabel, QPixmap, QWidget } from "@nodegui/nodegui";
import { Token } from "../../model/Token";
import { getPixmap } from "../../utils/imageUtil";
import {
  getCurrentAccount,
  getGlobalEvent,
  getProvider,
  getSigner,
} from "../../utils/globalUtil";
import { formatEther, parseEther, ZeroAddress } from "ethers";

export class TokenItem extends QWidget {
  token: Token;
  images: QPixmap | undefined;
  tokenBalance: string | undefined;
  constructor(token: Token) {
    super();
    this.setObjectName(TokenItem.name);
    this.token = token;
    this.initData().then(() => {
      if (this.native) {
        this.initLayout();
      }
    });
  }

  async initData() {
    this.images = await getPixmap(this.token.image || "");
    const address = await getSigner().getAddress();
    if (this.token.address === ZeroAddress && address) {
      const bal = await getProvider().getBalance(address);
      this.tokenBalance = formatEther(bal);
    } else {
      this.tokenBalance = "0.0";
    }
  }

  initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);
    const logo = new QLabel();
    logo.setFixedSize(36, 36);
    if (this.images) {
      logo.setPixmap(this.images);
    }
    logo.setScaledContents(true);
    layout.addWidget(logo);
    const container = new QWidget();
    container.setObjectName("TokenContainer");
    const container_layout = new FlexLayout();
    container.setLayout(container_layout);
    const tokenName = new QLabel();
    tokenName.setText(this.token.name || "");
    const balance = new QLabel();
    balance.setText(this.tokenBalance || "");
    container_layout.addWidget(tokenName);
    container_layout.addWidget(balance);
    layout.addWidget(container);
  }
}
