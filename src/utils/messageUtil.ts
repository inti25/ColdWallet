import { ButtonRole, QMessageBox, QPushButton } from "@nodegui/nodegui";

export function showMessageBox(message: string, title: string = "Message") {
  const messageBox = new QMessageBox();
  messageBox.setWindowTitle(title);
  messageBox.setText(message);
  const accept = new QPushButton();
  accept.setText("Close");
  messageBox.addButton(accept, ButtonRole.AcceptRole);
  messageBox.exec();
}

export function showErrorBox(message: string) {
  showMessageBox(message, "Error");
}
