////////////////////////////////////////////////////////////////////////////////////////////
//TODO сделать кнопку удаления задачи
//TODO при расфокусировке inputa задача - сохраняется или  возвращается как было?

//TODO как обращаться из задачи к классу TASKS:
//- дизэйблить "+AddCard"


// todo при драг энд дропе, а также при выборе из дропдауна задач(для inProgress и finished),
// т.е. при смене статуса-
//  объекты задач должны удаляться из старого статуса и обнорвляться на новый при этом переходя из объекта
//  содержащего массив задач в актуальный



//при создании задачи при нажатии а ентер ругается на 376 строку



//TODO data-item true index
//TODO при перетаскивснии кнопка addCard пропадает

//TODO разобраться с number, counter, data-item, block.tasks.length - в зависимости от них потом будет с привязкой к пользователю перебор по количеству задач и их отрисовка
//TODO исправить dropdown

// const input = document.querySelectorAll('input')
// const p = document.createElement('p')
import {
    Tasks
} from "../models/tasksBlocks.js";
import Task from "../models/task.js"
import {
    addCard,
    renderNameOfUser
} from "./utilsForUsers.js";
import {
    renderUserPage
} from "./utilsForUsers.js";




import {
    createTasksBlocks
} from "./utilsForUsers.js";
// import {tasksBlocks} from "../models/tasksBlocks.js"



import {
    changeState,
    out
} from "../utils.js";
import {
    loadMainPage
} from "../mainPage/mainPage.js";

import {
    app,
    appState,
    createAdminUser
} from "../app.js";
import {
    DragAndDrop,
    dragAndDrop
} from "./draganddrop.js";
import {
    Footer
} from "../models/footer.js";
import {
    UserPage
} from "../models/userPage.js";

import userPage from "../templates/taskField.html"

export let userPageObject



///////////////////////////////////////////////////////////////////////////////////






export function userLoader() {
    document.querySelector('#global__content').innerHTML = userPage;
    
    let kanban = document.getElementsByClassName('kanban')[0]
    userPageObject = new UserPage(appState.currentUser, 0, kanban)
    userPageObject.renderUserPage()
    userPageObject.createTasksBlocks(appState.currentUser)
    // renderUserPage()
    // createTasksBlocks(appState.currentUser);
    const dragAndDrop = new DragAndDrop(userPageObject)
    dragAndDrop.startDragAndDrop()

    
    // userPageObject.content.addEventListener('change', dragAndDrop) //загружает функционал драг энд дропа

    // renderNameOfUser(appState, 'user__name')
    // btnOut.addEventListener('click', () => {
    //     out()
    //     changeState()
    //     app()
    // })
    // footer.footerContent()
}


//
// allTasks();


//перенесли dropped-item из одной дроп зоны в другую
//у дропед-зон есть data-number