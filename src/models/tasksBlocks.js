// import Task from './task.js'
import {
    names
} from '../userPage/userLoader.js';
import {
    Task
} from './task.js';


import {
    createAndDeleteTask,
    draggedItem,
    droppedItem,
    createTasksBlocks
} from '../userPage/utilsForUsers.js';

import {
    handlerDragEnter
} from '../userPage/utilsForUsers.js';
import {
    handlerDragleave
} from '../userPage/utilsForUsers.js';
import {
    handlerDragover
} from '../userPage/utilsForUsers.js';
import {
    handlerDrop
} from '../userPage/utilsForUsers.js';
import index from "../index.html"

import {
    readyTasks
} from '../userPage/utilsForUsers.js';
import {
    tasksBlocks
} from '../userPage/utilsForUsers.js';
import {
    getFromStorage
} from '../utils.js';
import {
    appState,
    startApp
} from '../app.js';
import {
    dragAndDrop
} from '../userPage/draganddrop.js';
import {
    Footer
} from './footer.js';


export const statusNames = ['Ready', 'InProgress', 'Finished'];
const divWidth = Math.round((12 / statusNames.length) - 1);

export class Tasks {

    //создаёт div со списком всех задач

    constructor(status, dataZoneNumber, userPageObject) {
        this.status = status;
        this.dataZoneNumber = dataZoneNumber;
        this.tasks = [];
        this.usersId = userPageObject.userId
        this.counter = this.tasks.length;
        this.dropDownFlag = false
        this.userPage = userPageObject


        //this.taskAddBtn = document.createElement('#task__add--button');  // кнопка должна создавать new Task

        this.kanbanContent = this.userPage.content
        this.title = document.createElement('h3')
        this.tasksCardsDiv = document.createElement('div') //dropZone
        this.tasksCardsDiv.className = `dropZone dropZone--${this.usersId} ${status}__task--cards`
        this.tasksCardsDiv.setAttribute('data-zone', this.dataZoneNumber);


        this.submitAddCard = document.createElement('input')

        this.submit = document.createElement('input');
        this.submit.type = 'submit';
        // this.submit.style.display = 'none'
        this.submit.className = 'task__add--button btn btn-primary';
        this.submit.value = 'submit';

        this.title.innerText = status;

        // this.tasksCardsDiv.className = `${status}__task--cards dropZone`

        this.submitAddCard.type = 'submit';
        this.submitAddCard.id = `${status}__add--button`;
        this.submitAddCard.className = `${status}__add--button`;
        this.submitAddCard.value = "+Add card";

        this.flag = false;
        //this.flagFoAddCard = false;

        this.divWeight = (statusNames.length / 12) - 1;



        // this.div = document.querySelector(`#kanban__${this.status}`);
        this.div = document.createElement('div');
        this.div.className = `kanban__block kanban__${this.status} col-md-${divWidth} d-flex justify-content-start flex-column`
        this.div.id = `kanban__${this.status}`


        this.kanbanContent.appendChild(this.div)



        this.dropDown = document.createElement('select');
        this.dropDown.className = 'form-select';
        this.dropDown.setAttribute('aria-label', 'Выберите задачу')

        this.dropDown.style.display = 'none';



    };




    renderTasks() { //отрисовывает div, содержащий все задачи и +addCard
        if (this.div) {
            this.div.appendChild(this.title);
            this.div.appendChild(this.tasksCardsDiv);
            this.div.appendChild(this.submitAddCard);
            this.div.appendChild(this.dropDown);
            this.addTask();

            // this.submitAddCard.addEventListener('click', () => {


            // })
        }



    };

    addCardDisplay() {


        if (!this.flag) {

            // this.submitAddCard.replaceWith(this.submit);
            this.submitAddCard.style.display = 'none';

            this.flag = true;



        } else {
            // this.submit.replaceWith(this.submitAddCard);
            this.submitAddCard.style.display = 'block';

            this.flag = false;
        }

    }



    createTask(id) { // создает задачу
        let task = new Task(this.status, this.counter - 1, this.userPage);

        this.tasks.push(task);
        this.counter = this.tasks.length;
        task.div.setAttribute('data-item', this.tasks.length - 1)

        task.setUserId(this.userPage.userId);
        if (id) {
            task.id = id
        }
        ///////////////////////////////////TEST///////////////////////////////////////////

        task.number = task.div.getAttribute('data-item')
        //////////////////////////////////////////////////////////////////

        task.p.addEventListener('click', () => { ///дизэйбл AddCard
            this.addCardDisplay();
        })

        // testAddToLocalStorage(this.usersId) //записывает в localStorage
        //    dragAndDrop()

        return task
    }

    renderCreatedTask() {



        this.tasks[this.tasks.length - 1].renderTask(this.tasksCardsDiv);





    }
    renderTransitionTask(oldTask, newTask) {



        this.tasksCardsDiv.appendChild(this.tasks[this.tasks.length - 1].div)
        // testAddToLocalStorage(this.usersId) //записывает в localStorage
        // this.tasks[this.tasks.length - 1].saveTask()

        newTask.taskValue(oldTask.value) //////////закоменченное перенести в определение функции renderTransitionTask
        newTask.setUserId(oldTask.userId)
        newTask.number = this.tasks.length - 1
        newTask.status = this.status

        newTask.renderTask(this.tasksCardsDiv)

        let event = new Event("click");
        newTask.p.dispatchEvent(event);
        newTask.submit.dispatchEvent(event);

 
        //this.counter++ -----???

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////PROBLEM

    addTask() {
        if (this.status != 'Ready') {

            this.submitAddCard.addEventListener('click', () => {

                this.submitAddCard.parentNode.replaceChild(this.dropDown, this.submitAddCard)
                this.dropDownContent();
            })

        } else {
            this.submitAddCard.addEventListener('click', () => {
                this.addCardDisplay();
                this.createTask()
                this.renderCreatedTask();
            })

        }
    }

    dropDownContent() {
        const draggingFromBlock = this.userPage.tasksBlocks[this.dataZoneNumber - 1]; //блок, из которого будем перемещать задачи
        
        this.dropDown.style.display = 'inline-block'; //включает видимость выпадающего списка
        let firstOption = document.createElement('option'); //создаёт элемент option
        firstOption.setAttribute('selected', 'true') //обозначает его как выбранный
        // firstOption.className = 'option'
        firstOption.innerText = 'выберите задачу'; //задаёт его значение 'выберите задачу'
        this.dropDown.appendChild(firstOption) //вставляет его в выпадающий список


        draggingFromBlock.tasks.forEach((element) => { //перебирает все задачи из блока c dataZoneNumber меньшим на один, чем предыдущий
            let option = document.createElement('option'); // создаём переменную, в неё засовываем вновь созданный элемент option
            option.className = 'option' //задаем класс для option
            option.value = element.div.getAttribute('data-item'); //
            option.innerText = element.value;
            this.dropDown.appendChild(option) // вставляем каждый элемент в выпадающий список

        })

        let allOptions = document.querySelectorAll('.option'); //все созданные элементы



        //////////////////////////////////////////////////////////////////////////////////

        this.dropDown.addEventListener('change', (e) => {

            // e.preventDefault()
            if (!this.dropDownFlag) {
                window.alert('change')
                this.dropDownFlag = true
                // allOptions.forEach((element) => {  //перебирает все .option
                //    let foundTask = (allOptions, draggingFromBlockTasks) => {

                let foundTask
                for (let i = 0; i < allOptions.length; i++) {
                    
                    if (allOptions[i].selected) { //находит отмеченный

                        foundTask = draggingFromBlock.tasks[i]

                    }
                }


                console.log(foundTask)
                this.userPage.createAndDeleteTask(foundTask, this.userPage.tasksBlocks[this.dataZoneNumber])
                this.dropDown.style.display = 'none';
                this.dropDown.parentNode.replaceChild(this.submitAddCard, this.dropDown)


                allOptions.forEach(e => {

                    e.selected = false
                    e.remove()
                });
                firstOption.remove()

                this.dropDownFlag = false
            }
            
            startApp()
           
            
        })
        


    }


   


    inputP() {
        // window.alert(context.tasks[0].value);

        for (let i = 0; i < this.tasks.length; i++) { //все инпуты переделываем в <p>
            this.tasks[i].input.replaceWith(this.tasks[i].p);
            this.tasks[i].submit.style.display = 'none';

            this.tasks[i].submitDelete.style.display = 'none';
            this.tasks[i].divSubmits.style.display = 'none';
        }

    }


    actualityDataItem() {
        this.tasks.forEach((element, index) => {
            element.div.setAttribute('data-item', index)
            element.number = index


        })
    }


    setUsersId(appState) {
        if (!this.usersId) {
            this.usersId = appState.currentUser.id;
        }
    }

    set task(obj) {

        this.tasks.push(obj);
        this.counter = this.tasks.length;

    }


}