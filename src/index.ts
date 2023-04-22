import { QIcon, QMainWindow } from "@nodegui/nodegui";
import { Router } from "./Router";
import { Main } from "./screens/Main";
import { User } from "./model/User";
import { NewWallet } from "./screens/NewWallet";
import { fileExists } from "./utils/fileUtil";
import logo from "../assets/wallet.png";
import { getPassword } from "./utils/globalUtil";
import { Unlock } from "./screens/Unlock";

async function main() {
  const isData = fileExists(User.name);
  const win = new QMainWindow();
  win.setWindowTitle("My Wallet");
  win.setWindowIcon(new QIcon(logo));
  win.setFixedSize(300, 400);
  const route = new Router(win);
  if (isData) {
    if (getPassword()) {
      route.change(Main.name);
    } else {
      route.change(Unlock.name, { nextScreen: Main.name });
    }
  } else {
    route.change(NewWallet.name);
  }

  win.setStyleSheet(
    `
    #PrimaryButton {
      background-color: #2ea44f;
      border: 1px solid rgba(27, 31, 35, .15);
      border-radius: 6px;
      align-items: 'center';
      justify-content: 'center';
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      padding: 6px 16px;
      position: relative;
      color: #fff;
    }
    #PrimaryButton:hover {
      background-color: #2c974b;
    }
    #PrimaryButton:pressed {
      background-color: #298e46;
    }
    #SecondaryButton {
      background-color: #2f80ed;
      border-radius: 6px;
      align-items: 'center';
      justify-content: 'center';
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      padding: 6px 16px;
      position: relative;
      color: #fff;
    }
    #SecondaryButton:hover {
      background-color: #1366d6;
    }
    #SecondaryButton:pressed {
      background-color: #13458d;
    }
  `
  );
  win.show();
  (global as any).win = win;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
