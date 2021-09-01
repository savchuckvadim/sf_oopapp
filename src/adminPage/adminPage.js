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
import {
    allTasksLoader
} from './adminAllTasksPage';
import {
    createAdminPage
} from '../models/adminPageClass';

const globalContent = document.getElementById('global__content')


export function loadAdminPage() {
    const globalContent = document.getElementById('global__content')
    globalContent.innerHTML = admin
    const adminDropdown = document.getElementById('dropdown-menu')
    // console.log(adminDropdown)
    const adminWrapper = document.getElementById('admin__wrapper')
    const adminPage = createAdminPage(adminWrapper, adminDropdown)
    console.log(adminPage)
    // globalContent.innerHTML = admin;
    // const htmlQuantityOfUsers  = document.getElementById('admin__footer__allUsers__text')
    // const htmlQuantityOfInProcesTasks = document.getElementById('admin__footer__allInProgressTasks__text')
    // const htmlQuantityOfFinishedTasks = document.getElementById('admin__footer__allFinishedTasks__text')
    // const btnOut = document.getElementById('admin__btn');
    // const dropDownDiv = document.getElementById('dropdown-menu')

    // btnOut.addEventListener('click', () => {
    //     out()
    // })


    // dropDownContent(dropDownDiv)
    // adminUserFunction(users)
    // allHtmlQuantity(htmlQuantityOfUsers, htmlQuantityOfInProcesTasks, htmlQuantityOfFinishedTasks)

}

function dropDownContent(dropDownDiv) {

    dropDownDiv.innerHTML = `
    <li><a class="dropdown-item" href="#">
            <p id="admin__allUsers__btn" class="admin__left__menu__users d-flex">Пользователи</p>
        </a></li>
    <li><a class="dropdown-item" href="#">
            <p id="admin__allTasks__btn" class="admin__left__menu__tasks d-flex">Задачи</p>
        </a></li>
    `
    const adminUsersBtn = document.getElementById('admin__allUsers__btn')
    const adminTasksBtn = document.getElementById('admin__allTasks__btn')
    const adminForm = document.getElementById('admin-form')
    adminUsersBtn.addEventListener('click', () => {

        // const adminForm = document.getElementById('admin-form')
        adminForm.style.display = 'block'
        startApp()
        adminUserFunction(users)

    })
    adminTasksBtn.addEventListener('click', () => {


        adminForm.style.display = 'none'
        allTasksLoader()

    })
}

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

function showAllUsers(users) {
    const adminDeleteUserBtns = document.getElementsByClassName(`admin__registredusers__btn__delete`);

    users.forEach((element, index) => {
        createHtmlForAdminTable(index + 1, element.login, element.password)
        if (element.id == appState.currentUser.id) {
            adminDeleteUserBtns[index].setAttribute('disabled', true);
        }
    })
}

//TODO
//delete function
//footer function
//btn out

function deleteUserFromLocalStorage(users, number) {
    users.splice([number - 1], 1)
    // console.log(users[number-1])
    localStorage.removeItem('users')

    localStorage.setItem('users', JSON.stringify(users))

}

function clearAdminUsersDiv() {
    const adminTableBody = document.getElementById('admin__usersTable__body')
    adminTableBody.innerHTML = '';


}

function deleteUser(users, number) {
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


        }
        inputLogin.value = ''
        inputPassword.value = ''


    })
}

///////////////////////TODO возможно заменить на  authUser()
function existUser(login, password) { // проверяет существует ли пользователь в users.localStorage
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


function quantityOfUsers() {
    const quantity = getFromStorage('users')

    return quantity.length
}

function quantityOfInprogressTasks() {
    const tasks = getFromStorage('tasks')
    let inProgres = []

    tasks.forEach(element => {
        if (element.status == 'Ready' || element.status == 'InProgress') {
            inProgres.push(element)
        }
    })
    return inProgres.length
}

function quantityOfFinishedTasks() {
    const tasks = getFromStorage('tasks')

    let finished = []
    tasks.forEach(element => {
        if (element.status == 'Finished') {
            finished.push(element)
        }
    })
    return finished.length
}

function allHtmlQuantity(htmlQuantityOfUsers, htmlQuantityOfInProcesTasks, htmlQuantityOfFinishedTasks) {
    const qUsers = quantityOfUsers()
    const qPTasks = quantityOfInprogressTasks() 
    const qFTasks = quantityOfFinishedTasks()
    htmlQuantityOfUsers.innerText = `Количество зарегестрированных пользователей: ${qUsers}`
    htmlQuantityOfInProcesTasks.innerText = `Количество задач в работе: ${qPTasks}`
    htmlQuantityOfFinishedTasks.innerText = `Количество завершенных задач: ${qFTasks}`
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