import { FlexLayout, QIcon, QPushButton, QWidget } from "@nodegui/nodegui";
import {
  getGlobalEvent,
  setCurrentAccount,
  setCurrentNetwork,
} from "../../utils/globalUtil";
import { Token } from "../../model/Token";
import { TokenItem } from "./TokenItem";
import { Network } from "../../model/Network";
import { ethers, ZeroAddress } from "ethers";
import icAdd from "../../../assets/add.png";

export class TokenList extends QWidget {
  private root: FlexLayout | undefined;
  currentNetwork: Network | undefined;
  tokens: Token[] | undefined;
  items: TokenItem[] = [];
  btnImport: QPushButton | undefined;
  constructor() {
    super();
    this.setObjectName(TokenList.name);
    this.addListener();
    this.initData().then(() => {});
  }

  async initData() {
    const tokensData = await Token.loadTokens();
    const nativeToken = new Token();
    nativeToken.name = this.currentNetwork?.nativeSymbol;
    nativeToken.chainId = this.currentNetwork?.id;
    nativeToken.decimals = 18;
    nativeToken.symbol = this.currentNetwork?.nativeSymbol;
    nativeToken.address = ZeroAddress;
    nativeToken.image = this.currentNetwork?.nativeImage;
    const tokens = tokensData.filter((token) => {
      return token.chainId === this.currentNetwork?.id;
    });
    tokens.unshift(nativeToken);
    this.tokens = tokens;
    this.initView();
  }

  initView() {
    if (!this.native) return;
    for (const i of this.items) {
      i.delete();
    }
    this.btnImport?.delete();
    this.root?.delete();
    this.items = [];
    this.root = new FlexLayout();
    this.setLayout(this.root);
    if (this.tokens) {
      for (const token of this.tokens) {
        const item = new TokenItem(token);
        this.root.addWidget(item);
        this.items.push(item);
      }
    }

    this.btnImport = new QPushButton();
    this.btnImport.setText("Import Token");
    this.btnImport.setIcon(new QIcon(icAdd));
    this.btnImport.setObjectName("SecondaryButton");
    this.btnImport.addEventListener("clicked", () => {
      // this.authenticationDialog.exec();
    });
    this.root.addWidget(this.btnImport);
  }

  addListener() {
    getGlobalEvent().addListener("onNetworkChanged", (args) => {
      console.log("onNetworkChanged");
      this.currentNetwork = args;
      setCurrentNetwork(args);
      this.initData();
    });
    getGlobalEvent().addListener("onAccountSelected", (args) => {
      console.log("onAccountSelected");
      setCurrentAccount(args);
      for (const item of this.items) {
        item.updateData();
      }
    });
  }
}
