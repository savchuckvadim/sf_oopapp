import {
    Tasks
} from "../models/tasksBlocks.js";
import Task from "../models/task.js"
import {
    statusNames
} from "../models/tasksBlocks"

import {
    getFromStorage,
    changeState
} from "../utils.js";

import {
    appState,
    startApp
} from "../app.js"
import userPage from "../templates/taskField.html"
let readyTasks;
let inProgressTasks;
let finishedTasks;

import app from "../app"
import { Footer } from "../models/footer.js";
export var tasksBlocks = [];

export let draggedItem = null;
export let droppedItem = null;

export function renderUserPage() { //отрисовывает div для userPage контента
    // let userPage = document.createElement('div');
    // userPage.id = 'kanban__content';
    document.querySelector('#global__content').innerHTML = userPage;

    // document.querySelector('#admin__btn').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     kanbanOut();
    // })
}

// function kanbanOut() {
//     localStorage.removeItem('currentUser');
//     changeState() ///////////////////////////////////////////////////
//     startApp();
// }

export function createTasksBlocks(appStateCurrentUser) { /////////////создаёт блоки задач и отрисовывает их  в зависимости от statusNames
    //////////// возвращает массив блоков, которые потом записываются в пользователей



    for (let i = 0; i < statusNames.length; i++) {
        // console.log();
        tasksBlocks[i] = new Tasks(statusNames[i], i);
        tasksBlocks[i].renderTasks();

        // console.log(tasksBlocks[i])

    }
    readyTasks = tasksBlocks[0];
    inProgressTasks = tasksBlocks[1];
    finishedTasks = tasksBlocks[2];


    renderRelevantTasks(appStateCurrentUser)

    return tasksBlocks
}

function renderRelevantTasks(appStateCurrentUser) {
    const footer = new Footer()

    let allRelevantTasks = getFromStorage('tasks');//
    let allRelevantTasksOfCurrentUser = []
    // собрать массив задач из localStorage
    // найти принадлежащие текущему пользователю 

    allRelevantTasks.forEach((element) => {
        if (element.userId == appStateCurrentUser.id) {
            allRelevantTasksOfCurrentUser.push(element);
        }
    })

    // найти по очереди принадлежащие разным блокам по статусу
    for (let i = 0; i < allRelevantTasksOfCurrentUser.length; i++) {
        if (allRelevantTasksOfCurrentUser[i].status == tasksBlocks[0].status) {
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[0])
            

        } else if (allRelevantTasksOfCurrentUser[i].status == tasksBlocks[1].status) {
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[1])
            

        } else if (allRelevantTasksOfCurrentUser[i].status == tasksBlocks[2].status) {
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[2])
           

        }


    }
    footer.footerContent()
    // footer.startFooter()

    // на каждое совпадение создать новый объект задачи
    // поместить во вновь созданные данные из объектов из locqalStorage

}

// function renderQuantityTasksOnUserPage(allRelevantTasksOfCurrentUserStatus, quantityOfDuringTasksCounter, quantityOfCompletedTasksCounter, user__footer__duringTasks, user__footer__completedTasks) { //отрисовывает количество задач в процессе и завершенных в зависисости от количества указанного в счетчиках, передаваемых в функцию
//     //TODO - не работает во время создания-удаления задач и драг энд дропа
//     // при этом нормально актуализирует информацию при перезагрузке страницы и при перемещении задач через дроп-даун
//     const duringTasks = document.getElementById(user__footer__duringTasks)
//     const completedTasks = document.getElementById(user__footer__completedTasks)
//     if (allRelevantTasksOfCurrentUserStatus == true) {

//     } else if (allRelevantTasksOfCurrentUserStatus == false) {

//     } else {
//         window.alert('ljnewcvnewf')
//     }
//     duringTasks.innerText = `Количество задач в работе: ${quantityOfDuringTasksCounter}`
//     completedTasks.innerText = `Количество завершённых задач: ${quantityOfCompletedTasksCounter}`
// }

// export function renderNameOfUser(appState, html) {
//     if (appState.currentUser) {
//         if (html) {

//             const userName = document.getElementsByClassName('user__name')
//             userName[0].innerText = appState.currentUser.login
//             userName[1].innerText = appState.currentUser.login
//             // userName.forEach((element) => {
//             //     element.innerText = appState.currentUser.login
//             // })
//         }
//     }
// }

export function addCard(status) {

    if (status == 'Ready') {
        readyTasks.addCardDisplay();
    } else if (status == 'InProgress') {
        inProgressTasks.addCardDisplay();
    } else if (status == 'Finished') {
        finishedTasks.addCardDisplay();
    }

}

/////////////////////////////////////////Создание блоков для задач ////////////////




export function createTask(statusTasks) { //нигде не используется

    let task = statusTasks.createTask();

    // let task = new Task('ready');




    return task;


}







export function allInputInP() {    //перенести в TasksBlocks

    readyTasks.inputP();


}




export function transferTasks(tasksBlock, otherBlock1, otherBlock2) { //////нигде не используется

    if (tasksBlock.tasks != null) {
        tasksBlock.tasks.forEach((element) => { //перебирает объединенный массив задач из текущего блока задач taskBlock element - объект задачи

            if (element.div.parentElement.getAttribute('data-zone') == otherBlock1) { //если значение атрибута родителя 1

                createAndDeleteTask(element, otherBlock1);

            } else if ((element.div.parentElement.getAttribute('data-zone') == otherBlock2)) {

                createAndDeleteTask(element, otherBlock2);

            }

        })
    }

}


export function createAndDeleteTask(oldTask, otherBlock) { //(объект переносимой задачи из Ready, Ready, другой блок в который переносится)
    //TODO создать новую задачу в inProgress

    otherBlock.createTask(oldTask.id)
    let thisTask = otherBlock.tasks[otherBlock.tasks.length - 1];

    otherBlock.renderTransitionTask();
    thisTask.taskValue(oldTask.value)
    thisTask.setUserId(oldTask.userId)
    thisTask.number = otherBlock.tasks.length - 1
    thisTask.status = otherBlock.status

    thisTask.renderTask(otherBlock.tasksCardsDiv)

    let event = new Event("click");
    thisTask.p.dispatchEvent(event);
    thisTask.submit.dispatchEvent(event);

    otherBlock.addCardDisplay();

    if (oldTask.div) oldTask.deleteTask();


    thisTask.saveTask()
    tasksBlocks.forEach((element) => {
        element.actualityDataItem()
    })
}

//создаётся задача из блока
//в блоке указан id пользователя
//при создании и редактировании задачи для записи в localStorage  программа берет id пользователя из blocka
//находит по этому id пользователя в users и в него вносит изменения
//блоки создаются...
// export const addTaskToStorage = function (obj, key, appState) {

//     //получить id appState.currentUser
//     const storageData = getFromStorage(key);
//     storageData.push(obj);
//     localStorage.setItem(key, JSON.stringify(storageData));
// };

export {
    readyTasks,
    inProgressTasks,
    finishedTasks
}