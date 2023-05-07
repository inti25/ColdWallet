import { QLineEdit } from "@nodegui/nodegui";

export class NumberInput extends QLineEdit {
  constructor() {
    super();
    this.addEventListener("textChanged", (text) => {
      if (text) {
        this.setText(text.replace(/[^\d.]/g, ""));
        if (text.charAt(text.length - 1) === ".") {
          const temp = text.substring(0, text.length - 1);
          if (temp.indexOf(".") > -1) {
            this.setText(temp);
          }
        }
      }
    });
  }
}
