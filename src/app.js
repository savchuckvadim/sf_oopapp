import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  Toast,
  Popover
} from 'bootstrap'
import Sortable from 'sortablejs';
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import admin from "./templates/admin.html"; //html админа


import {
  changeState,
  getFromStorage,
  createAdminUser,
  pageLoader
} from "./utils"; 

import {
  State
} from "./state";

import {
  Footer
} from "./models/footer";

export const appState = new State();
export var users = getFromStorage('users'); // берет из localstorage массив пользователей выводит л-п каждого в консоль
export const footer = new Footer()


export function startApp() {

  createAdminUser()
  changeState();
  pageLoader()
  footer.startFooter()

}


startApp();