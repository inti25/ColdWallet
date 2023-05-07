import { QComboBox, QIcon } from "@nodegui/nodegui";
import { getGlobalEvent, getUser } from "../../utils/globalUtil";
import { ethers } from "ethers";
import { generateQPixmapImage } from "../../utils/imageUtil";

export class AccountsComboBox extends QComboBox {
  users = getUser();
  constructor(parent?: any) {
    super(parent);
    this.setObjectName(AccountsComboBox.name);
    this.initView();
  }

  initView() {
    for (const acc of this.users.accounts) {
      const wallet = new ethers.Wallet(acc.privateKey);
      this.addItem(
        new QIcon(generateQPixmapImage(wallet.address)),
        `   ${acc.name}\n   ${wallet.address}`
      );
    }
    this.addEventListener(`currentIndexChanged`, (index: number) => {
      getGlobalEvent().emit("onAccountSelected", this.users.accounts[index]);
    });
    getGlobalEvent().addListener("onAccountSelected", (account) => {
      this.setCurrentIndex(account.displayIndex);
    });
  }
}
