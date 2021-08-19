import index from '../index.html'
import {
    adminUser,
    appState,
    changeState,
    startApp

} from '../app.js'
import "../templates/admin.html"; //html админа
import {
    User
} from './User.js';
import {
    getFromStorage,
    generateUser,
    addToStorage
} from "../utils"; //импортирую функцию вытаскивания данных из local storage

//const adminForm = document.querySelector("#admin-form");
// const adminDiv = document.getElementById('admin__wrapper');
// export const adminUserBtn = (appState) => {
//     if(appState.login == 'admin'){


//         if(adminBtn){
//             window.alert(appState.login)


//         }
//     }
// }











































// export function setAdminDiv() {
//     if (appState) {
//         if (appState.currentUser.login == 'admin') {
//             const adminDiv = document.getElementById('admin__wrapper');
//             console.log(adminDiv);
//             adminDiv.innerHTML = `
//                  <form id="admin-form" class="d-flex">
//                     <input class="form-control " name="login" autocomplete="username" type="text"
//                         placeholder="Login" aria-label="Login">
//                     <input class="form-control me-2" name="password" autocomplete="current-password" type="password"
//                         placeholder="Password" aria-label="Password">
//                     <button id="registr-btn" class="btn btn-outline-info" type="submit">Зарегистрировать пользователя</button>
//                 </form>
//         `;
//         allUsers();

//         }

//     }
// }

// export function registrNewUser() {



//     const adminForm = document.querySelector("#admin-form");

//     adminForm.addEventListener('submit', (e) => {
//         e.preventDefault();


//         const formData = new FormData(adminForm);
//         const login = formData.get("login");
//         const password = formData.get("password");
        
        
//         if (existUser(login, password) == false) {
            
//             generateUser(User, login, password);
//             allUsers();

//         }

//     })

// }

// export function adminBtnOut() {

//     const adminBtn = document.getElementById("admin__btn"); //добавляем слушателя на кнопку выход
//     setAdminDiv();
//     registrNewUser();
//     adminBtn.addEventListener('click', function (e) {

//         e.preventDefault();
//         window.alert('выход')
//         localStorage.removeItem('currentUser');
//         changeState();
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//         //!!!!ВСЕ ЗАРАБОТАЛО С ТАКИМ ЖЁСТКИМ ИЗМЕНЕНИЕМ АПСТЭЙТА:
//         appState.currentUser = null;
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // document.querySelector("#global__content").innerHTML = ``;
//         // console.log(appState.currentUser);
//         startApp();

//     });

// }

// function existUser(login, password) {
//     let existUser = false;
//     let users = getFromStorage('users');
//     users.forEach(element => {
//         if (element.login == login && element.password == password) {
//             window.alert('такой пользователь уже существует!')
//             existUser = true;

//         }
//         if (!existUser) {
//             window.alert('новый пользователь');
            

//         }

//     });
//     return existUser;
// }

// function allUsers(){
//    const adminDiv = document.getElementById('admin__wrapper');
//    const allUsersDiv = document.getElementById('allUsers');
//     allUsersDiv.innerHTML = '';
//     let users = getFromStorage('users');
//     users.forEach(element => {
//         var p = document.createElement("p");
//         p.innerHTML = `логин: ${element.login} пароль: ${element.password}`;
//         allUsersDiv.appendChild(p);
//         adminDiv.appendChild(allUsersDiv);

//     });
//     // allUsersDiv.innerHTML = '';

// }