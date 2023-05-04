import {
  CursorShape,
  FlexLayout,
  QIcon,
  QLabel,
  QPixmap,
  QPushButton,
  QSize,
  QWidget,
} from "@nodegui/nodegui";
import { Token } from "../../model/Token";
import { getPixmap } from "../../utils/imageUtil";
import { getProvider, getSigner } from "../../utils/globalUtil";
import { formatEther, ZeroAddress } from "ethers";

import icSend from "../../../assets/send.png";
import icRefresh from "../../../assets/refresh.png";
import { TransferDialog } from "../transfer/TransferDialog";

export class TokenItem extends QWidget {
  token: Token;
  private logo: QLabel = new QLabel();
  private tokenName: QLabel = new QLabel();
  private balance: QLabel = new QLabel();
  private btnRefresh = new QPushButton();
  private btnSend = new QPushButton();

  constructor(token: Token) {
    super();
    this.setObjectName(TokenItem.name);
    this.token = token;
    this.initLayout();
    this.updateData();

    // this.initData().then(() => {
    //   if (this.native) {
    //     this.initLayout();
    //   }
    // });
  }

  setIcon(img: QPixmap) {
    if (this.native && img) {
      this.logo.setPixmap(img);
    }
  }

  setBalance(bal: string) {
    if (this.native) {
      this.balance.setText(bal);
    }
  }

  async updateData() {
    this.setIcon(await getPixmap(this.token.image || ""));
    const address = await getSigner().getAddress();
    if (this.token.address === ZeroAddress && address) {
      const bal = await getProvider().getBalance(address);
      this.setBalance(formatEther(bal));
    } else {
      this.setBalance("0.0");
    }
  }

  initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);
    layout.addWidget(this.logo);
    this.logo.setObjectName("TokenImage");
    this.logo.setFixedSize(36, 36);
    this.logo.setScaledContents(true);
    const container = new QWidget();
    container.setObjectName("TokenContainer");
    const container_layout = new FlexLayout();
    container.setLayout(container_layout);
    this.tokenName.setObjectName("TokenText");
    this.balance.setObjectName("TokenText");
    this.tokenName.setText(this.token.name || "");
    this.balance.setText("0.0");
    container_layout.addWidget(this.tokenName);
    container_layout.addWidget(this.balance);
    layout.addWidget(container);

    this.btnRefresh.setIcon(new QIcon(icRefresh));
    this.btnRefresh.setIconSize(new QSize(24, 24));
    this.btnRefresh.setCursor(CursorShape.PointingHandCursor);
    this.btnRefresh.setFlat(true);
    this.btnRefresh.setAutoExclusive(true);
    this.btnRefresh.setToolTip("Update Balance");
    this.btnSend.setIcon(new QIcon(icSend));
    this.btnSend.setIconSize(new QSize(24, 24));
    this.btnSend.setCursor(CursorShape.PointingHandCursor);
    this.btnSend.setFlat(true);
    this.btnSend.setAutoExclusive(true);
    this.btnSend.setToolTip("Send Token");
    this.btnSend.addEventListener("clicked", () => {
      const dg = new TransferDialog();
      dg.show();
    });
    layout.addWidget(this.btnRefresh);
    layout.addWidget(this.btnSend);
  }
}
