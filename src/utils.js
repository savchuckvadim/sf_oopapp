import {
  app,
  users
} from "./app";
import {
  appState
} from "./app";
// localStorage.removeItem('currentUser')
// localStorage.removeItem('users')
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
  //window.alert('addToStorageCurrentUser'+ obj);                                     //TODO 
  return localStorage.setItem(key, JSON.stringify(storageDataCurrentUser));
  // var currentUserData = localStorage.setItem(key, JSON.stringify(storageDataCurrentUser));
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
//создаём функцию создания админа
export const generateAdminUser = function (User) {

  const adminUser = new User("admin", "admin");
  User.save(adminUser); //addToStorage

};




export const addCurrentUser = (login) => { // функция создания в localstorage текущего пользователя

  users.forEach(element => { //перебирает всех users по логину если находит среди 
    // их логинов переданный логин - вставляет в localstorage currentUser - этого юзера, он становится текущим
    if (element.login == login) {
      addToStorageCurrentUser(element, 'currentUser');

    }
  });

}





export function changeState() { // изменяет состояние в зависимости от того есть ли текущий пользователь
  const currentUser = getFromStorage('currentUser'); //берет текущего пользователя из localStorage
  //  window.alert(currentUser[0]);
  if (currentUser.length != 0) { // если длина массива текущих пользователей не равно 0, т.е существует

    appState.currentUser = currentUser[0]; //вызывает сэттер состояния и вкладывает в appState currentUser

  }
  //else{
  //из-за этого всё ломается, но возможно это правильно
  //   appState.currentUser = null; //иначе в состоянии устанавливает текущего пользователя равного null
  // }
  

}



export function out() {
  localStorage.removeItem('currentUser');
  changeState();
  startApp();
}
export function btnOut(parentElement) {
  const btnOut = document.createElement('input');
  btnOut.setAttribute('type', 'button');
  btnOut.className = `${parentElement.className}__btnOut `


}