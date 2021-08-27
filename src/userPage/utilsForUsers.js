import {
    Tasks
} from "../models/tasksBlocks.js";
import Task from "../models/task.js"
import {
    statusNames
} from "../models/tasksBlocks"

import { getFromStorage, changeState } from "../utils.js";

import {startApp } from "../app.js"
import userPage from "../templates/taskField.html"
let readyTasks;
let inProgressTasks;
let finishedTasks;

import app from "../app"
export var tasksBlocks = [];

export let draggedItem = null;
export let droppedItem = null;

export function renderUserPage() { //отрисовывает div для userPage контента
    // let userPage = document.createElement('div');
    // userPage.id = 'kanban__content';
    document.querySelector('#global__content').innerHTML = userPage;

    document.querySelector('#admin__btn').addEventListener('click', (e) => {
        e.preventDefault();
        kanbanOut();
    })
}

function kanbanOut() {
    localStorage.removeItem('currentUser');
    startApp();
}

export function createTasksBlocks(appState) { /////////////создаёт блоки задач и отрисовывает их  в зависимости от statusNames
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

   
     renderRelevantTasks(appState, tasksBlocks)
    
    return tasksBlocks
}

function renderRelevantTasks(appState){

    
    let allRelevantTasks = getFromStorage('tasks');
    let allRelevantTasksOfCurrentUser = []
    // собрать массив задач из localStorage
    // найти принадлежащие текущему пользователю 

    allRelevantTasks.forEach((element) => {
        if(element.userId == appState.currentUser.id){
            allRelevantTasksOfCurrentUser.push(element);
        }
    })
    
    // найти по очереди принадлежащие разным блокам по статусу
    for (let i = 0; i < allRelevantTasksOfCurrentUser.length; i++){
        if(allRelevantTasksOfCurrentUser[i].status == tasksBlocks[0].status){
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[0])
           
        
        }else if(allRelevantTasksOfCurrentUser[i].status == tasksBlocks[1].status){
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[1])
        
        }else if(allRelevantTasksOfCurrentUser[i].status == tasksBlocks[2].status){
            createAndDeleteTask(allRelevantTasksOfCurrentUser[i], tasksBlocks[2])
        
        }
    

    }
        
    // на каждое совпадение создать новый объект задачи
    // поместить во вновь созданные данные из объектов из locqalStorage

}




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




export function createTask(statusTasks) {

    let task = statusTasks.createTask();

    // let task = new Task('ready');




    return task;


}







export function allInputInP() {

    readyTasks.inputP();


}






// const dragItems = document.querySelectorAll('.dragItem');
// const dropZones = document.querySelectorAll('.dropZone');


/////////////////////////////////////////DRAG AND DROP///////////////////////////////////////////////////////////

// export function handlerDragStart(event) {

//     console.log('dragstart')
//     // event.dataTransfer.setData('dragItem', this.dataset.item)
//     this.classList.add('dragItem--active')
//     draggedItem = this;

// }

// export function handlerDragEnd(event) {

//     this.classList.remove('dragItem--active')
//     draggedItem = null;
// }

// export function handlerDrag(e) { //событие возникает быстро и постоянно



// }


// export function handlerDragEnter(e) {

//     e.preventDefault();
//     this.classList.add('dropZone--active')


// }

// export function handlerDragleave() {

//     this.classList.remove('dropZone--active')
//     // const testElement = document.getElementById('test--element');
//     // testElement.remove();

// }

// export function handlerDragover(e) {
//     e.preventDefault();

// }

// export function handlerDrop(event) {

//     if (droppedItem) {
//         if (droppedItem.parentElement === draggedItem.parentElement) {
//             const children = Array.from(droppedItem.parentElement.children)
//             const draggedIndex = children.indexOf(draggedItem);
//             const droppedIndex = children.indexOf(droppedItem);


//             if (draggedIndex > droppedIndex) {
//                 draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

//                 // console.log(` if (draggedIndex > droppedIndex) ${readyTasks, inProgressTasks, finishedTasks }`)




//             } else {
//                 draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)
//                 // console.log(readyTasks, inProgressTasks,  finishedTasks)
//                 // console.log(`else ${readyTasks, inProgressTasks, finishedTasks }`)


//             }
            
//         }

//         console.log('dropped one parents')
//         console.log(tasksBlock)

//     } else {
//         this.append(draggedItem)
        
//         console.log('разные родительские элементы')
//         transferTasks(tasksBlocks[0], tasksBlocks[1], tasksBlocks[2]);
//         transferTasks(tasksBlocks[1], tasksBlocks[0], tasksBlocks[2]);
//         transferTasks(tasksBlocks[2], tasksBlocks[0], tasksBlocks[1]);


//     }
//     console.log(tasksBlocks)

// }


export function transferTasks(tasksBlock, otherBlock1, otherBlock2) {

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

    if(oldTask.div) oldTask.deleteTask();

   
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

// export function addBlocksofTasksInLocalStorage (userId) {
    
//     //берем массив пользователей из localStorage
//     let allUsers = getFromStorage('users');    //находит в localStorage всех пользователей, в переменную
//     let currentUser = getFromStorage('currentUser'); //находит в localStorage текущего пользователя, в переменную
//     let foundUser = false
    
//     for(let i = 0; i < allUsers.length; i++){  //перебирает всех пользователей
//         console.log('allUsers')
//         console.log(allUsers)
//         if(allUsers[i].id == userId){          //находит нужного по id
//             allUsers[i].tasks = tasksBlocks  //берет его блоки задач

//         }
//     }

//     // tasksBlocks.forEach((element) => {
//     //     element.tasks.forEach((el) => {
//     //         el.renderTask(element.div)
//     //     })
//     // })
    
//     currentUser[0].tasks = tasksBlocks;     //записывает юлоки в текущего пользователя
//     localStorage.setItem('currentUser', JSON.stringify(currentUser))
    

//     return (allUsers)
//     // return foundUser
// }


// export function testAddToLocalStorage(userId){

//     let newTasksBlocks = addBlocksofTasksInLocalStorage(userId)
//     localStorage.setItem('users', JSON.stringify(newTasksBlocks))
//     changeState()
// }
// console.log()
// localStorage.removeItem('users');
// localStorage.setItem('users', JSON.stringify(allUsers))


// export function searchBlock(taskStatus) {
//     tasksBlocks.forEach((element) => {
//         if (element.status == taskStatus){
//             console.log('searchBlock')
//             console.log(element.tasks)
//             return element
//         }
//     })
// }
// let test = searchBlock('Ready');
// console.log(test)
// export function searchTask (searchBlock, taskStatus){
//     console.log(searchBlock(taskStatus).tasks)
// }

// export function searchSelectedOption(allOptions, draggingFromBlockTasks){

//     console.log('allOptions[i]')
//     for (let i = 0; i < allOptions.length; i++) {
        
//         console.log(allOptions[i].value)
//     }
//     console.log('draggingFromBlockTasks[j]')
//     for (let j = 0; j < draggingFromBlockTasks.length; j++) {
        
//         console.log(draggingFromBlockTasks[j].id)
//     }
//     let foundTask 
//     for (let i = 0; i < allOptions.length; i++) {
//         if (allOptions[i].selected == true) { //находит отмеченный
//             console.log(allOptions[i])
//             console.log(draggingFromBlockTasks)
//             for (let j = 0; j < draggingFromBlockTasks.length; j++) { 
                

//                 if (draggingFromBlockTasks[j].number == allOptions[i].value) {
//                     // let index = allOptions[i].value

//                     foundTask = draggingFromBlockTasks[j]
//                     console.log('foundTask')
//                     console.log(foundTask)
                    
                    

//                 }
//             }

//         }

//     }
//     return foundTask 
  
// }