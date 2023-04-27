import { FlexLayout, QLabel, QWidget } from "@nodegui/nodegui";
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
  constructor(token: Token) {
    super();
    this.setObjectName(TokenItem.name);
    this.token = token;
    this.initLayout();
  }

  async initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);
    const logo = new QLabel();
    logo.setFixedSize(36, 36);
    logo.setPixmap(await getPixmap(this.token.image || ""));
    logo.setScaledContents(true);
    layout.addWidget(logo);

    const container = new QWidget();
    container.setObjectName("TokenContainer");
    const container_layout = new FlexLayout();
    container.setLayout(container_layout);
    const tokenName = new QLabel();
    tokenName.setText(this.token.name || "");

    const balance = new QLabel();
    const address = await getSigner().getAddress();
    if (this.token.address === ZeroAddress && address) {
      const bal = await getProvider().getBalance(address);
      balance.setText(formatEther(bal));
    } else {
      balance.setText("0.0");
    }

    container_layout.addWidget(tokenName);
    container_layout.addWidget(balance);
    layout.addWidget(container);
    layout.setContentsMargins(0, 5, 0, 5);
  }
}
