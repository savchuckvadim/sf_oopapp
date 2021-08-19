import { addToStorageCurrentUser } from "../src/utils.js";
export class State {
  constructor() {
    this.currentUser = null;
  }
  set currentUser(user) {
    this._currentUser = user;
   // addToStorageCurrentUser(user, "currentUser");
  }
  get currentUser() {
    return this._currentUser;
  }
}


//TODO 
// 1.если есть текущий пользователь в localstorage состояние меняется на current есть, записывает его в состояние
// 2.если current пользователь - админ, зафиксировать в состоянии
// 3.тоже самое для обычного юзера
// Далее в app в зависимости от сотояния загружается шаблон html
// В app слушатель если есть html "кнопка выход" "click", ()=>{} 
// если нажали записывает в состояние -> условия в app - главная страница
// компонент авторизация

// Кабинет админа
// Кабинет юзера