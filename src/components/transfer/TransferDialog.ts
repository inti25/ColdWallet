import { FlexLayout, QDialog, QIcon, QLabel } from "@nodegui/nodegui";
import send from "../../../assets/send.png";
import { promises } from "fs";
import { join } from "path";

const { readFile } = promises;
const stylePath = join(__dirname, "styles", "base.css");

export class TransferDialog extends QDialog {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.setWindowTitle("Transfer Token");
    this.setWindowIcon(new QIcon(send));
    const layout = new FlexLayout();
    this.setLayout(layout);
    const lbl = new QLabel();
    lbl.setText("aaaaaaaaa");
    lbl.setObjectName("lbl");
    layout.addWidget(lbl);
    readFile(stylePath, "utf8").then((css) => this.setStyleSheet(css));
    this.setStyleSheet(stylePath);
  }
}
