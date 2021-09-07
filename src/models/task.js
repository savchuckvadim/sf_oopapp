import {
    handlerDragEnd,
    handlerDragStart,
    draggedItem,
    droppedItem
} from "../userPage/draganddrop.js";
import {
    addToStorage,
    getFromStorage
} from "../utils.js";
import {
    BaseModel
} from "./BaseModel.js";
import Sortable from 'sortablejs';

export class Task extends BaseModel {

    constructor(status, number, userPageObject) {

        super();
        this.number = number;
        this.status = status;
        this.value = '';
        this.userId = userPageObject.userId
        this.userPage = userPageObject


        this.form = document.createElement('form'); //создаёт форму задачи
        this.p = document.createElement('p');
        this.input = document.createElement('input');
        this.submit = document.createElement('input');
        this.div = document.createElement('div');
        this.submitDelete = document.createElement('button') //кнопка удаления зазадчи
        this.divSubmits = document.createElement('div');



        this.input.className = 'card';
        this.submit.type = 'submit';
        this.submit.style.display = 'none'
        this.submit.className = 'task__add--button btn btn-primary';
        this.submit.value = 'submit';

        this.submitDelete.style.display = 'none'
        this.submitDelete.className = 'task__add--button btn btn-danger';
        this.submitDelete.innerText = 'удалить';

        this.divSubmits.className = 'divSubmits'
        this.divSubmits.style.display = 'none'


        // this.div.className = `dragItem dragItem--${this.userId}`
        this.div.draggable = true;
        // this.form.draggable = true;
        // this.input.draggable = true;


    }




    renderTask(element) { //element - родительский элемент HTML из блока, в который будет всё вставляться

        element.appendChild(this.div);
        this.div.appendChild(this.form);
        this.form.appendChild(this.input);
        this.form.appendChild(this.divSubmits);
        this.divSubmits.appendChild(this.submit);
        this.divSubmits.appendChild(this.submitDelete);


        // var sortable = Sortable.create(this.div);
        //////////////////////dragAndDrop functions









        // this.div.addEventListener("dragstart", (e) => {
        //     handlerDragStart(e, this.div)
        // });
        // this.div.addEventListener("dragEnd", (e) => {
        //     handlerDragEnd(e, this.div)
        // });
        // // this.div.addEventListener("drag", handlerDrag);

        // this.div.addEventListener('dragenter', (e) => {

        //     if (draggedItem !== droppedItem) {
        //         droppedItem = this.div;
        //     }

        // })
        // this.div.addEventListener('dragleave', (e) => {
        //     droppedItem = null;
        // })

        //////////////////////////////////////////////////////////////////////    

        this.input.addEventListener('focusin', () => {
            this.divSubmits.style.display = 'flex';
            this.submitDelete.style.display = 'block';
            this.submit.style.display = 'block';

            this.submit.addEventListener('click', (e) => {
                e.preventDefault();
                this.taskValue(this.input.value);
                this.input.replaceWith(this.p);
                this.divSubmits.style.display = 'none';
                this.submitDelete.style.display = 'none';
                this.submit.style.display = 'none'
                this.userPage.addCard(this.status);

            })

        })


        this.input.addEventListener('drag', (event) => {

        }, false)



        this.submitDelete.addEventListener('click', (e) => {
            e.preventDefault()

            this.deleteTask()
            this.block().addCardDisplay()

        })


        this.p.addEventListener('click', () => {
            this.userPage.allInputInP();

            this.p.replaceWith(this.input);
            this.div.parentElement.appendChild(this.divSubmits);

            this.divSubmits.appendChild(this.submit);
            this.divSubmits.appendChild(this.submitDelete);
            this.divSubmits.style.display = 'flex';

            this.submitDelete.style.display = 'block';

            this.submit.style.display = 'block';
            this.submit.addEventListener('click', () => {
                this.taskValue(this.input.value);
                this.input.replaceWith(this.p);
                this.divSubmits.style.display = 'none';
                this.submitDelete.style.display = 'none';
                this.submit.style.display = 'none'
            })

        })
    }



    taskValue(value) {
        this.p.innerText = value;
        this.input.value = value;
        this.value = value;
        this.saveTask()
    }


    deleteTask() {
        let block = this.block();


        this.div.remove();
        this.form.remove()
        this.p.remove()
        this.input.remove()
        this.divSubmits.remove()
        this.submitDelete.remove()


        block.tasks.splice(this.number, 1)
        block.counter--;

        block.tasks.forEach((element, index) => {
            element.div.setAttribute('data-item', index)
            element.number = index
        })

        this.saveTask()
    }



    transferTask(element) {
        this.div = element.div
    }

    setUserId(userId) {
        this.userId = userId;
    }

    block() {
        let block
        this.userPage.tasksBlocks.forEach((element) => {
            if (element.status == this.status) {
                block = element
            }
        })
        return block
    }


    saveTask() {
        let task = { //создаёт специальный объект(без методов) текущей задачи 
            'id': this.id,
            'number': this.number,
            'status': this.status,
            'value': this.value,
            'userId': this.userId,
        }

        let allTasksFromLocalStorage = getFromStorage('tasks'); //все задачи из local.Storage
        let allId = []; //пустой массив, в который будут помещены все id всех задач
        function searchID(element) { //функция поиска задачи по id
            return element == task.id
        }

        if (allTasksFromLocalStorage.length > 0) { //если в массиве задач из localStorage есть хоть что-то
            for (let i = 0; i < allTasksFromLocalStorage.length; i++) { //перебирает этот массив
                allId[i] = allTasksFromLocalStorage[i].id; //записывает в массив все id задач
            }
            if (allId.some(searchID)) { //если в массиве id есть id нашей задачи
                for (let j = 0; j < allTasksFromLocalStorage.length; j++) { //перебирает массив задач из localStorage
                    if (allTasksFromLocalStorage[j].id == this.id) { //находит задачу с таким же id как у текущей
                        allTasksFromLocalStorage.splice(j, 1, task) //удаляет из массива найденную и на ее место вставляет специальный объект(без методов) текущей задачи 
                    }
                }
            } else { //если не находит такого id как у текущей задачи
                allTasksFromLocalStorage[allTasksFromLocalStorage.length] = task; //записывает специальный объект(без методов) текущей задачи последним элементом
            }
        } else { //если в массиве задач из localStorage ничего нет
            allTasksFromLocalStorage[0] = task; //записывает специальный объект(без методов) текущей задачи единственным элементом
        }

        //упорядочиваем массив задач в соответствии с number задач
        let newTasksArray = []                                                //новый массив, в который будут помещены все задачи в новом порядке
        let newAllTasksReady = []                                            // массив блока куда буду помещены упорядоченные задачи в соответствии с их статусом
        let newAllTasksInProgress = []                                       // массив блока куда буду помещены упорядоченные задачи в соответствии с их статусом
        let newAllTasksFinished = []                                         // массив блока куда буду помещены упорядоченные задачи в соответствии с их статусом

        allTasksFromLocalStorage.forEach((element) => {
            if (element.status == 'Ready') {
                newAllTasksReady[element.number] = element
            } else if (element.status == 'InProgress') {
                newAllTasksInProgress[element.number] = element
            } else if (element.status == 'Finished') {
                newAllTasksFinished[element.number] = element
            }
        })

        newTasksArray = newTasksArray.concat(newAllTasksReady)
        newTasksArray = newTasksArray.concat(newAllTasksInProgress)
        newTasksArray = newTasksArray.concat(newAllTasksFinished)

        localStorage.removeItem('tasks');
        newTasksArray.forEach((element) => {
            addToStorage(element, 'tasks')
        })
    }

}