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
import { Tasks } from "../models/tasksBlocks.js";
import Task from "../models/task.js"
import { addCard } from "./utilsForUsers.js";
import { renderUserPage } from "./utilsForUsers.js";




import { createTasksBlocks} from "./utilsForUsers.js";
// import {tasksBlocks} from "../models/tasksBlocks.js"



import { changeState, out } from "../utils.js";
import { loadMainPage } from "../mainPage/mainPage.js";

import { app, appState, createAdminUser } from "../app.js";






///////////////////////////////////////////////////////////////////////////////////






export function userLoader(){
 
    renderUserPage()
    createTasksBlocks(appState);
    
    const btnOut = document.getElementById('admin__btn');
    // btnOut.addEventListener('click', () => {
    //     out()
    //     changeState()
    //     app()
    // })
}


//
// allTasks();


//перенесли dropped-item из одной дроп зоны в другую
//у дропед-зон есть data-number