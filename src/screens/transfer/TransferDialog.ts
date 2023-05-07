import { QIcon, QMainWindow } from "@nodegui/nodegui";
import send from "../../../assets/send.png";
import { promises } from "fs";
import { join } from "path";
import { Router } from "../../Router";
import { DetailTransfer } from "./DetailTransfer";
import { TransferData } from "../../utils/types";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class TransferDialog extends QMainWindow {
  transferData: TransferData;
  constructor(data: TransferData) {
    super();
    this.transferData = data;
    this.init();
  }

  init() {
    this.setWindowTitle(`Transfer ${this.transferData.token.symbol}`);
    this.setWindowIcon(new QIcon(send));
    this.setFixedSize(360, 500);

    const route = new Router(this);
    route.change(DetailTransfer.name, this.transferData);

    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);
  }
}
