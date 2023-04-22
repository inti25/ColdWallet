import { ButtonRole, QMessageBox, QPushButton } from "@nodegui/nodegui";

export function showMessageBox(message: string) {
  const messageBox = new QMessageBox();
  messageBox.setWindowTitle("Alert");
  messageBox.setText(message);
  const accept = new QPushButton();
  accept.setText("Close");
  messageBox.addButton(accept, ButtonRole.AcceptRole);
  messageBox.exec();
}
