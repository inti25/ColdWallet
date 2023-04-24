import { QComboBox, QIcon } from "@nodegui/nodegui";
import { getUser } from "../../utils/globalUtil";
import { ethers } from "ethers";
import { generateQPixmapImage } from "../../utils/imageUtil";

export class AccountsComboBox extends QComboBox {
  constructor(parent?: any) {
    super(parent);
    this.setObjectName(AccountsComboBox.name);
    this.initView();
  }

  initView() {
    const user = getUser();
    for (const acc of user.accounts) {
      const wallet = new ethers.Wallet(acc.privateKey);
      this.addItem(
        new QIcon(generateQPixmapImage(wallet.address)),
        `${acc.name} \n ${wallet.address}`
      );
    }
  }
}
