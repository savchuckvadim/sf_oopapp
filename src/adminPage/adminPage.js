import index from '../index.html'
import {
    adminUser,
    app,
    appState,
    changeState,
    startApp,
    users,
    

} from '../app.js'
import "../templates/admin.html"; //html админа
import {
    User
} from '../models/User';
import {
    getFromStorage,
    generateUser,
    addToStorage,
    out
} from "../utils"; //импортирую функцию вытаскивания данных из local storage
import admin from "../templates/admin.html"
//const adminForm = document.querySelector("#admin-form");
// const adminDiv = document.getElementById('admin__wrapper');
// export const adminUserBtn = (appState) => {
//     if(appState.login == 'admin'){


//         if(adminBtn){
//             window.alert(appState.login)


//         }
//     }
// }

// const adminDiv = document.createElement('div');
// adminDiv.id = 'admin__wrapper'
const globalContent = document.getElementById('global__content')


export function loadAdminPage() {
    // let admin = admin
    globalContent.innerHTML = admin;
    const btnOut = document.getElementById('admin__btn');
    btnOut.addEventListener('click', () => {
        out()
    })
}




// export function setAdminDiv() {
//     if (appState) {
//         if (appState.currentUser.login == 'admin') {

//             loadAdminPage();
//             const adminDiv = document.getElementById('admin__wrapper')

//             // const globalContent = document.getElementById('global__content')
//             // globalContent.appendChild(adminDiv);

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


// export function adminBtnOut(adminBtn) {


//     loadAdminPage()
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



// function allUsers() {
//     const adminDiv = document.getElementById('admin__wrapper');

//     //    const allUsersDiv = document.getElementById('allUsers');
//     const allUsersDiv = document.createElement('div');
//     allUsersDiv.id = 'allUsers'
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
////////////////////////////////////////////////////////таблица пользователей
//TODO
//загрузка каркаса таблицы
function loadTableUsers() {
    const adminTableWrapper = document.getElementById('admin__users__wrapper');
    adminTableWrapper.innerHTML = `
    <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Login</th>
                                    <th scope="col">Password</th>

                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody id='admin__usersTable__body'>
                                

                            </tbody>
                        </table>
    `

}
//загрузка в каркас элементов при переборе users.localStorage
function createHtmlForAdminTable(number, login, password) {
    const adminTableBody = document.getElementById('admin__usersTable__body')
    const adminTableTr = document.createElement('tr');
    adminTableTr.className = 'admin__table__allDataOfUser'
    
    adminTableTr.innerHTML = `
        <th class="admin__table__numberOfUser" scope="row">${number}</th>
        <td class="admin__table__loginOfUser">${login}</td>
        <td class="admin__table__passwordOfUser">${password}</td>
        <td><input id="admin__registredusers__btn__delete--${number}" class="admin__registredusers__btn__delete btn btn-danger btn-sm col-sm-6 col-md-5 col-lg-4" type="button" value="Удалить"></td>
   `

    adminTableBody.appendChild(adminTableTr);
    
    const adminDeleteUserBtn = document.getElementById(`admin__registredusers__btn__delete--${number}`);

    adminDeleteUserBtn.addEventListener('click', () => {
        deleteUser(getFromStorage('users'), number)
    })

}
function showAllUsers(users){
    const adminDeleteUserBtns = document.getElementsByClassName(`admin__registredusers__btn__delete`);

    users.forEach((element, index) => {
        createHtmlForAdminTable(index + 1, element.login, element.password)
        if(element.id == appState.currentUser.id){
            adminDeleteUserBtns[index].setAttribute('disabled', true);
        }
    })
}

//TODO
//delete function
//footer function
//btn out

function deleteUserFromLocalStorage(users, number){
users.splice([number-1], 1)
// console.log(users[number-1])
localStorage.removeItem('users')

    localStorage.setItem('users', JSON.stringify(users))
    
}

function  clearAdminUsersDiv(){
    const adminTableBody = document.getElementById('admin__usersTable__body')
    adminTableBody.innerHTML = '';


}

function deleteUser(users, number){
    deleteUserFromLocalStorage(users, number);
    clearAdminUsersDiv()
    showAllUsers(users)


}

////////////////////////////////////////////Регистрация нового пользователя
export function registrNewUser() {



    const adminForm = document.querySelector("#admin-form");

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();


        const formData = new FormData(adminForm);
        const login = formData.get("login");
        const password = formData.get("password");

        const inputLogin = document.querySelector('#admin__form__input__login')
        const inputPassword = document.querySelector('#admin__form__input__password')

        if (existUser(login, password) == false) { //если пользователя несуществует

            generateUser(User, login, password);
            const adminTableBody = document.getElementById('admin__usersTable__body')
            adminTableBody.innerHTML = '';
            showAllUsers(getFromStorage('users'));
            inputLogin.value = ''
            inputPassword.value = ''

        }


    })
}    

    
    function existUser(login, password) {     // проверяет существует ли пользователь в users.localStorage
        let existUser = false;
        let users = getFromStorage('users');
        users.forEach(element => {
            if (element.login == login && element.password == password) {
                window.alert('такой пользователь уже существует!')
                existUser = true;
    
            }
            if (!existUser) {
                
    
    
            }
    
        });
        return existUser;
    }



////////////////////////////////////////////////Все админские функции
//пересобрать массив и его засунуть как элемент
export function adminUserFunction(users) {
    loadTableUsers()
    registrNewUser()
    showAllUsers(users)
}







/////////////////////BTN OUT/////////////////////////////////////////////////////////
//todo переделать на динамическое создание компоненты через функцию export function btnOut (parentElement) ///


/////////////////footer//////////////////////