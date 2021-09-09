import { loadAdminPage } from "./adminPage/adminPageLoader";
import {
  users,
  appState,
  startApp
} from "./app";

import { loadMainPage } from "./mainPage/mainPage";
import { BtnOut } from "./models/btnOut";
import { userLoader } from "./userPage/userLoader";
import { User } from "./models/User";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const addToStorageCurrentUser = function (obj, key) { // Добавляю функцию добавления в Localstorage - текущего пользователя
  localStorage.removeItem('currentUser');
  const storageDataCurrentUser = getFromStorage(key);
  storageDataCurrentUser.push(obj);
  return localStorage.setItem(key, JSON.stringify(storageDataCurrentUser));
  
};

export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("test", "qwerty123");
  User.save(testUser);

};
export const generateUser = function (User, login, password) {
  const user = new User(login, password);
  User.save(user);
}

export const generateAdminUser = function (User) {
  const adminUser = new User("admin", "admin");
  User.save(adminUser); //addToStorage
};




export const addCurrentUser = (login, password) => { // функция создания в localstorage текущего пользователя
let users = getFromStorage('users');
  users.forEach(element => { //перебирает всех users по логину если находит среди 
    // их логинов переданный логин - вставляет в localstorage currentUser - этого юзера, он становится текущим  
    if (element.login == login && element.password == password) { 
      addToStorageCurrentUser(element, 'currentUser');
    }
  });

}



export function changeCurrentUserInLocalStorage(user, value){ //изменение флага сначала в usere(например appState.currentUser) а затем в localStroage.currentUser 
  user.dropDownFlag = value
  addToStorageCurrentUser(user, 'currentUser')

}

export function changeState() { // изменяет состояние в зависимости от того есть ли текущий пользователь
  const currentUser = getFromStorage('currentUser'); //берет текущего пользователя из localStorage
  
  if (currentUser.length != 0) { // если длина массива текущих пользователей не равно 0, т.е существует
    appState.currentUser = currentUser[0]; //вызывает сэттер состояния и вкладывает в appState currentUser
  }
  else{
  
    appState.currentUser = null; //иначе в состоянии устанавливает текущего пользователя равного null
  }
  

}


export function createAdminUser() { //должна запускаться если !appState.currentUser ?
  if (appState.currentUser) { //если в стэйте есть currentUser
    if (appState.currentUser.login == 'admin') { // если его логин равен админ
      return
    }
  } else { //если в стэйте нет текущего пользователя
    if (users.length > 0) { //если в users.localStorage есть хоть что-то
      if (searchUserInLocalStorage('admin', 'admin')) { //находит в users.localStorage админа 
        return
      } else { //если в users.localStorage нет админа
        generateAdminUser(User); //генерит админа    
        return
      }
    } else { //если в users.localStorage ничего нет
      generateAdminUser(User); //генерит админа
      return
    }
  }
}  

export function searchUserInLocalStorage(login, password) { //проверяет есть ли в users.localStorage пользователь с передаваемыми логином и паролем
  return (users.some(obj => obj.login == login && obj.password == password))
}




export function pageLoader() {
  if (appState.currentUser) {
    if (appState.currentUser.login == 'admin' && appState.currentUser.password == 'admin') {
      //загрузка страницы админа
      loadAdminPage()
      const btnOut = new BtnOut()
      btnOut.outElementContent()
    } else {
      // загрузка страницы пользователя
      userLoader();
      const btnOut = new BtnOut()
      btnOut.outElementContent()
    }
  } else {
    loadMainPage(startApp)
  }

}