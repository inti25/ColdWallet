import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import cbNetworks from "./components/cbNetworkList";
import {Router} from "./Router";
import {Main} from "./screens/Main";
import {NewWallet} from "./screens/NewWallet";

const win = new QMainWindow();
win.setWindowTitle("My Wallet");
const centralWidget = new QWidget();
centralWidget.setObjectName("rootView");

const route = new Router(centralWidget);
route.addRoute('main', new Main());
route.addRoute('newWallet', new NewWallet());
route.change('main');

win.setCentralWidget(centralWidget);
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
