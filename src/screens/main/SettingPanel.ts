import {
  CursorShape,
  FlexLayout,
  QIcon,
  QInputDialog,
  QPushButton,
  QSize,
  QWidget,
} from "@nodegui/nodegui";
import icAdd from "../../../assets/plus.png";
import icImport from "../../../assets/import.png";
import icSetting from "../../../assets/settings.png";
import icAddChain from "../../../assets/add_chain.png";
import icShare from "../../../assets/share.png";
import { AccountDialog } from "../account/AccountDialog";
import { AddAccountDialog } from "../../components/Dialog/AddAccountDialog";
import { getUser, setUser, getGlobalEvent } from "../../utils/globalUtil";
import { Account, AccountType } from "../../model/Account";
import { getAccount } from "../../utils/walletUtil";
import { loadUser } from "../../model/User";

export class SettingPanel extends QWidget {
  constructor() {
    super();
    this.setObjectName("SettingPanel");
    this.initLayout();
  }

  initLayout() {
    const layout = new FlexLayout();
    this.setLayout(layout);

    const btnView = new QPushButton();
    btnView.setIcon(new QIcon(icShare));
    btnView.setIconSize(new QSize(32, 32));
    btnView.addEventListener("clicked", () => {
      const detail = new AccountDialog();
      detail.show();
    });
    btnView.setCursor(CursorShape.PointingHandCursor);
    btnView.setFlat(true);
    btnView.setAutoExclusive(true);
    btnView.setToolTip("View Account in Explorer");

    const addChain = new QPushButton();
    addChain.setIcon(new QIcon(icAddChain));
    addChain.setIconSize(new QSize(32, 32));
    addChain.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    addChain.setCursor(CursorShape.PointingHandCursor);
    addChain.setFlat(true);
    addChain.setAutoExclusive(true);
    addChain.setToolTip("Add Network");

    const addAccount = new QPushButton();
    addAccount.setIcon(new QIcon(icAdd));
    addAccount.setIconSize(new QSize(32, 32));
    addAccount.addEventListener("clicked", () => {
      this.showAddAccountDialog();
    });
    addAccount.setCursor(CursorShape.PointingHandCursor);
    addAccount.setFlat(true);
    addAccount.setAutoExclusive(true);
    addAccount.setToolTip("Add Account");

    const btnImport = new QPushButton();
    btnImport.setIcon(new QIcon(icImport));
    btnImport.setIconSize(new QSize(32, 32));
    btnImport.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    btnImport.setCursor(CursorShape.PointingHandCursor);
    btnImport.setFlat(true);
    btnImport.setAutoExclusive(true);
    btnImport.setToolTip("Import Account");

    const btnSetting = new QPushButton();
    btnSetting.setIcon(new QIcon(icSetting));
    btnSetting.setIconSize(new QSize(32, 32));
    btnSetting.addEventListener("clicked", () => {
      // getGlobalEvent().emit("onNetworkChanged", this._chain);
    });
    btnSetting.setCursor(CursorShape.PointingHandCursor);
    btnSetting.setFlat(true);
    btnSetting.setAutoExclusive(true);
    btnSetting.setToolTip("Setting");

    layout.addWidget(btnView);
    layout.addWidget(addChain);
    layout.addWidget(addAccount);
    layout.addWidget(btnImport);
    layout.addWidget(btnSetting);
  }

  async showAddAccountDialog() {
    const user = getUser();
    const accountDisplayIndex = user.accounts.length;
    const addDialog = new AddAccountDialog(`Account ${accountDisplayIndex + 1}`);
    const accountIndex = user.accounts.filter(acc => {
      return acc.type === AccountType.INDEX;
    }).length;
    let newAccount;
    addDialog.addEventListener("onFinished", async (accountName)=> {
      newAccount = new Account(accountName, AccountType.INDEX, accountIndex, getAccount(user.wallet, accountIndex).privateKey, accountDisplayIndex)
      user.accounts.push(newAccount);
      await user.save();
      setUser((await loadUser()) || user);
      getGlobalEvent().emit("AccountAdded", new Account(accountName, AccountType.INDEX, accountIndex, getAccount(user.wallet, accountIndex).privateKey, accountDisplayIndex));
    })
    addDialog.exec();
  }
}
