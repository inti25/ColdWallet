import { FlexLayout, QWidget } from "@nodegui/nodegui";
import {
  getGlobalEvent,
  setCurrentAccount,
  setProvider,
} from "../../utils/globalUtil";
import { Token } from "../../model/Token";
import { TokenItem } from "./TokenItem";
import { Network } from "../../model/Network";
import { ethers, ZeroAddress } from "ethers";

export class TokenList extends QWidget {
  private root: FlexLayout | undefined;
  currentNetwork: Network | undefined;
  tokens: Token[] | undefined;
  items: TokenItem[] = [];
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
    for (const i of this.items) {
      i.delete();
    }
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
  }

  addListener() {
    getGlobalEvent().addListener("onNetworkChanged", (args) => {
      console.log("onNetworkChanged");
      this.currentNetwork = args;
      const rpc = (args as Network).rpc;
      const provider = new ethers.JsonRpcProvider(rpc ? rpc : "");
      setProvider(provider);
      this.initData().then(() => {
        this.initView();
      });
    });
    getGlobalEvent().addListener("onAccountSelected", (args) => {
      console.log("onAccountSelected");
      setCurrentAccount(args);
      this.initData().then(() => {
        this.initView();
      });
    });
  }
}
