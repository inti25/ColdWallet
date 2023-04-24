import { QIcon, QMainWindow } from "@nodegui/nodegui";
import { Router } from "./Router";
import { Main } from "./screens/main/Main";
import { User } from "./model/User";
import { NewWallet } from "./screens/NewWallet";
import { fileExists } from "./utils/fileUtil";
import logo from "../assets/wallet.png";
import { getGlobalEvent, getPassword } from "./utils/globalUtil";
import { Unlock } from "./screens/Unlock";
import { join } from "path";
import { promises } from "fs";
const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

async function main() {
  const isData = fileExists(User.name);
  const win = new QMainWindow();
  win.setWindowTitle("My Wallet");
  win.setWindowIcon(new QIcon(logo));
  win.setFixedSize(600, 500);
  getGlobalEvent();
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

  readFile(stylePath, "utf8").then((css) => win.setStyleSheet(css));

  win.setStyleSheet(stylePath);
  win.show();
  (global as any).win = win;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
