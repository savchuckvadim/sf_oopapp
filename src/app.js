import "bootstrap/dist/css/bootstrap.min.css";
import {
  Tooltip,
  Toast,
  Popover
} from 'bootstrap'
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import admin from "./templates/admin.html"; //html админа
import {
  userLoader
} from "./userPage/userLoader.js"
// import { Task } from "./userPage/models/task";
// import { Tasks } from "./userPage/models/tasksBlocks";
import {
  User
} from "./models/User";
import {
  generateTestUser
} from "./utils";
import {
  generateAdminUser,
  changeState
} from "./utils"; //импортирую функцию создания админа АДМИН РАБОТАЕТ! 
import {
  getFromStorage
} from "./utils"; //импортирую функцию вытаскивания данных из local storage
import {
  addToStorage,
  addToStorageCurrentUser
} from "./utils";
import {
  addCurrentUser
} from "./utils";
import {
  currentUserData
} from "./utils";

import "../src/models/adminUser.js"
import {
  setAdminDiv,
  adminBtnOut,
  loadAdminPage,
  adminUserFunction
} from "./adminPage/adminPage";
import {
  State
} from "./state";
import {
  authUser
} from "./services/auth";
// import {
//   adminBtnOut,
//   adminUserBtn,
//   setAdminDiv,
//   registrNewUser
// } from "../src/models/adminUser.js";

import {
  loadMainPage,
  mainPage
} from "./mainPage/mainPage";
export const appState = new State();

export var users = getFromStorage('users'); // берет из localstorage массив пользователей выводит л-п каждого в консоль



export function app() {
  
  createAdminUser();
  changeState();
  pageLoader();
  
}


app();



// loadMainPage();


export function pageLoader() {
  let fieldHTMLContent;
  if (appState.currentUser) {
    if (appState.currentUser.login == 'admin' && appState.currentUser.password == 'admin') {
      //загрузка страницы админа
      loadAdminPage()
      adminUserFunction(users);
      // adminBtnOut()
    } else {
      // загрузка страницы пользователя
      // console.log(appState.currentUser.id)
      // fieldHTMLContent = taskFieldTemplate;
       userLoader();

    }

  } else {
    // fieldHTMLContent = mainPage;
    loadMainPage(app)
    //загрузка страницы авторизации

  }
  // document.querySelector("#global__content").innerHTML = fieldHTMLContent;

}


//  pageLoader();
// loadMainPage();


//Если в users.LocalStorage нету админа - создаёт админа 
//Проверяет State на наличие CurrentUser  в зависимости от результата запускает загрузчик страницы и скриптов:
// * Главной страницы авторизации
// * Страницы пользователя
// * Страницы админа



// export function startApp(){
//   createAdminUser();
//   changeState();
//   pageLoader();

// }





















































function checkAppstate() {
  if (!appState.currentUser) {
    return false
  } else {
    return appState.currentUser
  }
}






export function searchUserInLocalStorage(login, password) { //проверяет есть ли в users.localStorage пользователь с передаваемыми логином и паролем

  return (users.some(obj => obj.login == login && obj.password == password))
}




export function createAdminUser() { //должна запускаться если !appState.currentUser ?
  // let users = getFromStorage('users'); // берет из localstorage массив пользователей выводит л-п каждого в консоль

  // console.log(searchUserInLocalStorage('admin', 'admin'))
  if (appState.currentUser) { //если в стэйте есть currentUser
    // console.log(users)
    if (appState.currentUser.login == 'admin') { // если его логин равен админ
      return
    }
  } else { //если в стэйте нет текущего пользователя
    if (users.length > 0) { //если в users.localStorage есть хоть что-то
      if (searchUserInLocalStorage('admin', 'admin')) { //находит в users.localStorage админа 


        return
      } else { //если в users.localStorage нет админа
        // console.log(users); //запускается два раза

        generateAdminUser(User); //генерит админа    
        return
      }
    } else { //если в users.localStorage ничего нет
      generateAdminUser(User); //генерит админа
      return
    }

  }
}





























































// export function app(changeState, state, createAdminUser ){
//   const loginForm = document.querySelector("#app-login-form");
//   changeState();
//   state(appState);

//   createAdminUser();

// };
// app(changeState, state, createAdminUser);

// export function startApp(){
//   window.alert('startApp');
//   app(changeState, state, createAdminUser);
// }


// // function loginFormListener(){

// // }
// // loginFormListener();






// export function changeState() { // изменяет состояние в зависимости от того есть ли текущий пользователь
//   const currentUser = getFromStorage('currentUser'); //берет текущего пользователя из localStorage
// //  window.alert(currentUser[0]);
//   if (currentUser.length != 0) { // если длина массива текущих пользователей не равно 0, т.е существует

//     appState.currentUser = currentUser[0]; //вызывает сэттер состояния и вкладывает в appState currentUser

//    }
//    //else{
//     //из-за этого всё ломается, но возможно это правильно
//   //   appState.currentUser = null; //иначе в состоянии устанавливает текущего пользователя равного null
//   // }
//   console.log('changeState()');
//   console.log(appState.currentUser);

// }








// function createAdminUser() {
//   if (appState.currentUser) {
//     window.alert(appState.currentUser);
//     if (appState.currentUser.login == 'admin') {
//       console.log('getFromStorage(currentUser)');

//     }



//   } else {

//     if (users.length > 0) {
//       users.forEach(element => {
//         if (element.login == 'admin' && element.password == 'admin') {

//         } else {
//           console.log(users); //запускается два раза
//           generateAdminUser(User);

//         }

//       })
//     } else {
//       generateAdminUser(User);
//     }

//   }
// }


// function state(appState) { //логика всего приложения в зависимости от Сосотяния
//   if (appState.currentUser != null) { //если в appState текущий пользователь существует
//     //     if(appState.currentUser.login = 'admin'){   //если его логин = admin
//     //       console.log(appState.currentUser.login + 'admin')

//     // //TODO
//     // //Если есть текущий пользователь и он админ, заходит в кабинет админа(функции из adminUser.js): делает аутентификацию, в нее вкладываем логи-пароль(из appState.currentUser.login...) проверяемого пользователя
//     //     }else{    
//     //  //TODO
//     // //Если есть текущий пользователь и он НЕадмин, заходит в кабинет делает аутентификацию, в нее вкладываем логи-пароль(из appState.currentUser.login...) проверяемого пользователя                                          
//     //       console.log(appState.currentUser.login + 'user')

//     //     }

//     loadUsersAccount(appState.currentUser.login, appState.currentUser.password);

//     // addCurrentUser(login);
//     // changeState();
//     adminBtnOut(); //временно - потом поставить условие и загружать в зависимости от юзер-админ

//   } else { //если в appState текущий пользователь отсутствует
//     loadMainPage();
//     // loginFormListener();
//   }
// }

// // function dataUsers() {

// //   if (users.length > 1) {
// //     console.log('dataUsers()');
// //     localStorage.removeItem('users');

// //     users.forEach(element => {

// //       addToStorage(element, 'users');
// //     })
// //   }
// // }

// function loadUsersAccount(login, password) {
//   let fieldHTMLContent;
//   if (authUser(login, password) == true) {
//     if (login == 'admin' && password == 'admin') {
//       window.alert('admin')
//       fieldHTMLContent = admin;



//     } else {
//       window.alert('НЕ admin')
//       fieldHTMLContent = taskFieldTemplate;
//     }
//     //addCurrentUser(login);

//   } else {
//     loadMainPage();
//   };
//   document.querySelector("#global__content").innerHTML = fieldHTMLContent;

//   //  не хочет говорит в adminUser - login of null в 36-ой строке
//   // changeState();
//   // adminBtnOut(); 
// }


// function loadMainPage(){

//   document.querySelector("#global__content").innerHTML = `
//   <body class="bg-light ">

//         <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
//             <div class="container-fluid">
//                 <a class="navbar-brand" href="#">SimpleTODO</a>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                     aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <a class="nav-link active" aria-current="page" href="#">Home</a>
//                         </li>
//                     </ul>
//                     <form id="app-login-form" class="d-flex">
//                         <input class="form-control me-2" name="login" autocomplete="username" type="text"
//                             placeholder="Login" aria-label="Login">
//                         <input class="form-control me-2" name="password" autocomplete="current-password" type="password"
//                             placeholder="Password" aria-label="Password">
//                         <button id="app-login-btn" class="btn btn-outline-info" type="submit">Sign In</button>
//                     </form>
//                 </div>
//             </div>
//         </nav>
//         <div class="container">
//             <p id="content">Please Sign In to see your tasks!</p>
//         </div>


//     </body>
//   `;
//   const loginForm = document.querySelector("#app-login-form");
//   loginForm.addEventListener("submit", function (e) { //авторизация
//     e.preventDefault();
//     window.alert('loginFormListener()');
//     const formData = new FormData(loginForm);
//     const login = formData.get("login");
//     const password = formData.get("password");
//     // window.alert('loginForm.addEventListener');
//     loadUsersAccount(login, password); //загружает HTML по введенным данным пользователя если auth = true
//     addCurrentUser(login);
//     changeState(); //меняет состояние на текущий пользователь, если он существует
//     // state();       // включает логику приложения в зависимости от Состояния
//     //adminUserBtn(appState.currentUser); 

//     adminBtnOut(); //слушатель кнопки выхода из admin-аккаунта

//   });
// }














































































// loginForm.addEventListener("submit", function (e) { //авторизация
//   e.preventDefault();
//   const formData = new FormData(loginForm);
//   const login = formData.get("login");
//   const password = formData.get("password");
//   // window.alert('loginForm.addEventListener');
//   loadUsersAccount(login, password); //загружает HTML по введенным данным пользователя если auth = true
//   addCurrentUser(login);
//   changeState(); //меняет состояние на текущий пользователь, если он существует
//   // state();       // включает логику приложения в зависимости от Состояния
//   //adminUserBtn(appState.currentUser); 

//   adminBtnOut(); //слушатель кнопки выхода из admin-аккаунта

// });

// export function loginFormListener(){
//   loginForm.addEventListener("submit", function (e) { //авторизация
//     e.preventDefault();
//     window.alert('loginFormListener()');
//     const formData = new FormData(loginForm);
//     const login = formData.get("login");
//     const password = formData.get("password");
//     // window.alert('loginForm.addEventListener');
//     loadUsersAccount(login, password); //загружает HTML по введенным данным пользователя если auth = true
//     addCurrentUser(login);
//     changeState(); //меняет состояние на текущий пользователь, если он существует
//     // state();       // включает логику приложения в зависимости от Состояния
//     //adminUserBtn(appState.currentUser); 

//     adminBtnOut(); //слушатель кнопки выхода из admin-аккаунта

//   });
// }

// loginFormListener();