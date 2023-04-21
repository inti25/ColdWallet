import {QMainWindow} from '@nodegui/nodegui';
import {Router} from "./Router";
import {Main} from "./screens/Main";
import {User} from "./model/User";
import {NewWallet} from "./screens/NewWallet";

async function main() {

  (global as any).unlockCode = '123456a@';
  const user = new User('', [], '');
  (global as any).user = await user.load()

  const win = new QMainWindow();
  win.setWindowTitle("My Wallet");
  win.setFixedSize(300, 400);
  const route = new Router(win);
  if ((global as any).user) {
    route.change(Main.name);
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

