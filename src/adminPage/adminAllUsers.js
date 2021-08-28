// import { generateUser } from "../utils";



// const adminTableBody 
// // = document.getElementById('admin__usersTable__body')


// // export function loadAllUsers(){
// //     loadRegistrationForm() 
// //     loadTableUsers()
// //     showAllUsers(users)
// // }
 









// function deleteUser(users, number) {
//     deleteUserFromLocalStorage(users, number);
//     clearAdminUsersDiv()
//     showAllUsers(users)


// }

// function deleteUserFromLocalStorage(users, number) {
//     users.splice([number - 1], 1)
//     // console.log(users[number-1])
//     localStorage.removeItem('users')

//     localStorage.setItem('users', JSON.stringify(users))

// }

// function clearAdminUsersDiv(adminTableBody) {
    
//     adminTableBody.innerHTML = '';


// }


// export function showAllUsers(users) {
//     const adminDeleteUserBtns = document.getElementsByClassName(`admin__registredusers__btn__delete`);

//     users.forEach((element, index) => {
//         createHtmlForAdminTable(index + 1, element.login, element.password)
//         if (element.id == appState.currentUser.id) {
//             adminDeleteUserBtns[index].setAttribute('disabled', true);
//         }
//     })
// }
// //загрузка в каркас элементов при переборе users.localStorage
// function createHtmlForAdminTable(number, login, password) {
//     const adminTableBody = document.getElementById('admin__usersTable__body')
//     const adminTableTr = document.createElement('tr');
//     adminTableTr.className = 'admin__table__allDataOfUser'

//     adminTableTr.innerHTML = `
//         <th class="admin__table__numberOfUser" scope="row">${number}</th>
//         <td class="admin__table__loginOfUser">${login}</td>
//         <td class="admin__table__passwordOfUser">${password}</td>
//         <td><input id="admin__registredusers__btn__delete--${number}" class="admin__registredusers__btn__delete btn btn-danger btn-sm col-sm-6 col-md-5 col-lg-4" type="button" value="Удалить"></td>
//    `

//     adminTableBody.appendChild(adminTableTr);

//     const adminDeleteUserBtn = document.getElementById(`admin__registredusers__btn__delete--${number}`);

//     adminDeleteUserBtn.addEventListener('click', () => {
//         deleteUser(getFromStorage('users'), number)
//     })

// }

// function existUser(login, password) { // проверяет существует ли пользователь в users.localStorage
//     let existUser = false;
//     let users = getFromStorage('users');
//     users.forEach(element => {
//         if (element.login == login && element.password == password) {
//             window.alert('такой пользователь уже существует!')
//             existUser = true;
//         }
//         if (!existUser) {

//         }

//     });
//     return existUser;
// }
// export function registrNewUser(adminTableBody) {


//     const formData = new FormData(adminForm);
//     const login = formData.get("login");
//     const password = formData.get("password");

//     const inputLogin = document.querySelector('#admin__form__input__login')
//     const inputPassword = document.querySelector('#admin__form__input__password')

//     if (existUser(login, password) == false) { //если пользователя несуществует

//         generateUser(User, login, password);
//         // const adminTableBody = document.getElementById('admin__usersTable__body')
//         adminTableBody.innerHTML = '';
//         showAllUsers(getFromStorage('users'));
//         inputLogin.value = ''
//         inputPassword.value = ''

//     }



// }



// export function loadRegistrationForm(adminWrapper) {
//     if(adminWrapper){
//         adminWrapper.innerHTML = `
// <form id="admin-form" class="admin-form">
// <h3>Форма для регистрации и удаления пользователей</h3>
// <div class="row mb-1 d-flex flex-row">
//     <label for="#admin-form" class="admin-form__label col-xs-12 col-lg-4"> <input
//             id="admin__form__input__login" class="form-control " name="login"
//             autocomplete="username" type="text" placeholder="Login" aria-label="Login"></label>
//     <label for="#admin-form" class="admin-form__label col-xs-12 col-lg-4"><input
//             id="admin__form__input__password" class="form-control me-2" name="password"
//             autocomplete="current-password" type="password" placeholder="Password"
//             aria-label="Password"></label>
//     <button id="registr-btn"
//         class="admin__form__addUser__btn btn btn-outline-info col-xs-12 col-lg-4"
//         type="submit">Зарегистрировать
//         пользователя</button>
// </div>
// </form>

// `
//     }
    
// }

// //загрузка каркаса таблицы
// export function loadTableUsers(adminTableWrapper) {                                                      //создаёт каркас таблицы
//     // const adminTableWrapper = document.getElementById('admin__users__wrapper');
//     adminTableWrapper.innerHTML = `
//     <table class="table">
//       <thead>
//           <tr>
//               <th scope="col">#</th>
//               <th scope="col">Login</th>
//               <th scope="col">Password</th>  
//               <th scope="col">Delete</th>
//           </tr>
//       </thead>
//       <tbody id='admin__usersTable__body'>
  
//       </tbody>
//     </table>
//     `

//     adminTableBody = document.getElementById('admin__usersTable__body')
// }