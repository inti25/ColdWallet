import {QMainWindow} from '@nodegui/nodegui';
import {Router} from "./Router";
import {Main} from "./screens/Main";

const win = new QMainWindow();
win.setWindowTitle("My Wallet");

const route = new Router(win);
route.change(Main.name);

win.setStyleSheet(
  `
    #myroot {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

(global as any).win = win;
