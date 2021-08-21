import {
    Tasks
} from "../models/tasksBlocks.js";
import Task from "../models/task.js"
import {
    statusNames
} from "../models/tasksBlocks"

import { getFromStorage } from "../utils.js";

import {changeState,  startApp } from "../app.js"
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

export function createTasksBlocks(appState) { ///////////////////?///////////



    for (let i = 0; i < statusNames.length; i++) {
        // console.log();
        tasksBlocks[i] = new Tasks(statusNames[i], i);
        tasksBlocks[i].renderTasks();
        
        // console.log(tasksBlocks[i])

    }
    readyTasks = tasksBlocks[0];
    inProgressTasks = tasksBlocks[1];
    finishedTasks = tasksBlocks[2];

    return tasksBlocks
}
// console.log(createTasksBlocks())



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
const dropZones = document.querySelectorAll('.dropZone');


/////////////////////////////////////////DRAG AND DROP///////////////////////////////////////////////////////////

export function handlerDragStart(event) {

    // event.dataTransfer.setData('dragItem', this.dataset.item)
    this.classList.add('dragItem--active')
    draggedItem = this;

}

export function handlerDragEnd(event) {

    this.classList.remove('dragItem--active')
    draggedItem = null;
}

export function handlerDrag(e) { //событие возникает быстро и постоянно



}


export function handlerDragEnter(e) {

    e.preventDefault();
    this.classList.add('dropZone--active')


}

export function handlerDragleave() {

    this.classList.remove('dropZone--active')
    // const testElement = document.getElementById('test--element');
    // testElement.remove();

}

export function handlerDragover(e) {
    e.preventDefault();

}

export function handlerDrop(event) {

    if (droppedItem) {
        if (droppedItem.parentElement === draggedItem.parentElement) {
            const children = Array.from(droppedItem.parentElement.children)
            const draggedIndex = children.indexOf(draggedItem);
            const droppedIndex = children.indexOf(droppedItem);


            if (draggedIndex > droppedIndex) {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

                // console.log(` if (draggedIndex > droppedIndex) ${readyTasks, inProgressTasks, finishedTasks }`)




            } else {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)
                // console.log(readyTasks, inProgressTasks,  finishedTasks)
                // console.log(`else ${readyTasks, inProgressTasks, finishedTasks }`)


            }
            
        }

        console.log('dropped one parents')
        console.log(tasksBlock)

    } else {
        this.append(draggedItem)
        
        console.log('разные родительские элементы')
        transferTasks(tasksBlocks[0], 1, 2);
        transferTasks(tasksBlocks[1], 0, 2);
        transferTasks(tasksBlocks[2], 0, 1);


    }


}


export function transferTasks(tasksBlock, otherBlockIndex1, otherBlockIndex2) {

    if (tasksBlock.tasks != null) {
        tasksBlock.tasks.forEach((element) => { //перебирает объединенный массив задач из текущего блока задач taskBlock element - объект задачи


            // let item = element.div.getAttribute('data-item');

            if (element.div.parentElement.getAttribute('data-zone') == otherBlockIndex1) { //если значение атрибута родителя 1

                createAndDeleteTask(element, tasksBlock, otherBlockIndex1);




            } else if ((element.div.parentElement.getAttribute('data-zone') == otherBlockIndex2)) {


                createAndDeleteTask(element, tasksBlock, otherBlockIndex2);

            }

            // console.log(element.div.parentElement.getAttribute('data-zone'))
        })
    }

    // tasksBlock.actualityDataItem();
    // tasksBlocks[otherBlockIndex1].actualityDataItem();
    // tasksBlocks[otherBlockIndex2].actualityDataItem();


    console.log(tasksBlocks);

}


export function createAndDeleteTask(oldTask, block, otherBlockIndex) { //(объект переносимой задачи из Ready, Ready, другой блок в который переносится)
    //TODO создать новую задачу в inProgress
    //было   tasksBlocks[1].renderCreatedTask(tasksBlocks[1].createTask());
    let otherBlock1 = tasksBlocks[otherBlockIndex]
    // let thisTask = otherBlock1.tasks[otherBlock1.tasks.length - 1];
    otherBlock1.createTask()
    otherBlock1.renderTransitionTask();
    //TODO: 
    // otherBlock1.tasks[otherBlock1.tasks.length - 1].transferTask(element)


    //загрузить туда value 


    otherBlock1.tasks[otherBlock1.tasks.length - 1].taskValue(oldTask.value)

    otherBlock1.tasks[otherBlock1.tasks.length - 1].renderTask(otherBlock1.tasksCardsDiv)
    let event = new Event("click");
    otherBlock1.tasks[otherBlock1.tasks.length - 1].p.dispatchEvent(event);
    otherBlock1.tasks[otherBlock1.tasks.length - 1].submit.dispatchEvent(event);
    otherBlock1.addCardDisplay();
    // console.log(tasksBlocks[otherBlockIndex1].tasksCardsDiv.childNodes)
    //   tasksBlocks[otherBlockIndex1].tasksCardsDiv.removeChild(tasksBlocks[otherBlockIndex1].tasksCardsDiv.childNodes[0]); //удаляет старый html

    // //удалить задачу из Ready, найдя ее в массиве задач Ready по data-item
    // console.log(tasksBlock.tasks[item - 1].div)
    oldTask.deleteTask(block);

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

export function addBlocksofTasksInLocalStorage (userId) {
    
    //берем массив пользователей из localStorage
    let allUsers = getFromStorage('users');
    let foundUser = false
    
    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].id == userId){
            allUsers[i].tasks = tasksBlocks
        }
    }
    

    return (allUsers)
    // return foundUser
}


export function testAddToLocalStorage(userId){

    let newTasksBlocks = addBlocksofTasksInLocalStorage(userId)
    localStorage.setItem('users', JSON.stringify(newTasksBlocks))
}
console.log()
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