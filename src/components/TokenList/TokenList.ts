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
  private root: any;
  currentNetwork: Network | undefined;
  constructor() {
    super();
    this.setObjectName(TokenList.name);
    this.initView();
    this.addListener();
  }

  async initView() {
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
    this.root?.delete();
    this.root = new FlexLayout();
    this.setLayout(this.root);
    for (const token of tokens) {
      const item = new TokenItem(token);
      this.root.addWidget(item);
    }
  }

  addListener() {
    getGlobalEvent().addListener("onNetworkChanged", (args) => {
      this.currentNetwork = args;
      const rpc = (args as Network).rpc;
      const provider = new ethers.JsonRpcProvider(rpc ? rpc : "");
      setProvider(provider);
      this.initView();
    });
    getGlobalEvent().addListener("onAccountSelected", (args) => {
      console.log("onAccountSelected", args);
      setCurrentAccount(args);
      this.initView();
    });
  }
}
