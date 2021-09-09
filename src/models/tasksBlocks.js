import {
    Task
} from './task.js';
import {
    footer,
    startApp
} from '../app.js';

import {
    Sortable
} from 'sortablejs';

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

        this.kanbanContent = this.userPage.content
        this.title = document.createElement('h3')

        this.tasksCardsDiv = document.createElement('div') //dropZone
        this.tasksCardsDiv.className = `dropZone dropZone--${this.usersId} ${status}__task--cards`
        this.tasksCardsDiv.setAttribute('data-zone', this.dataZoneNumber);
        this.submitAddCard = document.createElement('input')
        this.submit = document.createElement('input');
        this.submit.type = 'submit';
        this.submit.className = 'task__add--button btn btn-primary';
        this.submit.value = 'submit';
        this.title.innerText = status;
        this.submitAddCard.type = 'submit';
        this.submitAddCard.id = `${status}__add--button`;
        this.submitAddCard.className = `${status}__add--button`;
        this.submitAddCard.value = "+Add card";
        this.flag = false;

        this.div = document.createElement('div');
        this.div.className = `kanban__block kanban__${this.status} col-md-${divWidth} d-flex justify-content-start flex-column`
        this.div.id = `kanban__${this.status}`

        this.sortable = Sortable.create(this.tasksCardsDiv, {
            group: `tasks-sortable`,
            sort: true,
            animation: 150,
            dataIdAttr: 'data-id',
            selectedClass : " sortable-selected ",
            ghostClass: 'ghost',

            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },

                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                },
            },

            onEnd: function (evt) {   
                let counter = 0
                evt.from.childNodes.forEach((element) => {
                    if (element.getAttribute('data-item')) {
                        element.setAttribute('data-item', counter)
                        counter++
                    }
                })

                counter = 0
                
                if (evt.to > 0) {
                    evt.to.forEach((element) => {
                        if (element.getAttribute('data-item')) {
                            element.setAttribute('data-item', counter)
                            counter++                
                        }
                        counter = 0
                    })
                }


        
                userPageObject.tasksBlocks.forEach((element) => {
                    element.tasks.forEach((el, index) => {
                        el.number = Number(el.div.getAttribute('data-item')) ////Номер задачи в массиве задач актуализируется
             
                    })
                })

                userPageObject.tasksBlocks.forEach((element) => {
                    let sortedArray = element.tasks.sort(function (a, b) {
                        return a.number - b.number; 
                    });
                })

                userPageObject.tasksBlocks.forEach((element) => {
                    element.tasks.forEach((el) => {
                        el.saveTask()
                    })
                })
                footer.footerContent();
            },
 //////////////////////////////////////////работает сортировка при драг энд дропе внутри списка  
 /////////////////////////////////////////работает сортировка при драг энд дропе между списками - если задачу кидаем в конец списка
 ////////////////////////////////////TODO: сделать запоминание сортировки при драг энд дропе между списками-междузадачами         
            onSort: function (evt) {
                userPageObject.tasksBlocks.forEach((element) => { //перебираем все объекты блоков с задачами
                    element.tasks.forEach((el) => { //перебираем все задачи
                        if (el.div.parentElement.getAttribute('data-zone') != el.block().dataZoneNumber) { //если в объекте задачи у родительского элемента дива data-zone не равен номеру data-zone-у блока, в котором находится объект задачи    
                            el.status = userPageObject.tasksBlocks[evt.to.getAttribute('data-zone')].status //и статусу задачи присваивается значение статуса блокаЗадач, который находим значению data-zone списка(дива), в который задача была перенесена                     
                        } else {                          
                        }
                    })
                })
            },
        });

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
        }
    };

    addCardDisplay() { //показывает или прячет кнопку "+AddCard" в зависимости от флага this.flag
        if (!this.flag) {
            this.submitAddCard.style.display = 'none';
            this.flag = true;
        } else {
            this.submitAddCard.style.display = 'block';
            this.flag = false;         
        }
    }

    addCardDisable(){
        if(this.status != 'Ready'){  
            if(this.userPage.tasksBlocks[this.dataZoneNumber - 1].tasks.length < 1){
                this.submitAddCard.setAttribute('disabled', true)
            }else{
                this.submitAddCard.removeAttribute('disabled')
            }
        }      
    }



    createTask(id) { // создает задачу
        let task = new Task(this.status, this.counter - 1, this.userPage); //создает новый объект задачи
        this.tasks.push(task); //пушит ее в свой массив задача
        this.counter = this.tasks.length; //изменяет собственный счетчик задач this.counter
        task.div.setAttribute('data-item', this.tasks.length - 1) // присваивает этой задаче 'data-item' задачи - нужный для драг энд дропа
        task.setUserId(this.userPage.userId); // задаёт задаче принадлежность к пользователю userId - берет его из текущей страницы пользователя
        if (id) {
            task.id = id
        }
        task.number = Number(task.div.getAttribute('data-item')) //присваивает задаче номер соответствующий  её data-item
        task.p.addEventListener('click', () => { ///дизэйбл кнопки "+AddCard"
            this.addCardDisplay();
        })
        return task
    }

    renderCreatedTask() {
        this.tasks[this.tasks.length - 1].renderTask(this.tasksCardsDiv); //берет последнюю задачу из собственного массива задач и запускает в ней функцию renderTask
        let inputEvent = new Event("focusin");
        this.tasks[this.tasks.length - 1].input.dispatchEvent(inputEvent);

    }

    renderTransitionTask(oldTask, newTask) { //принимает oldTask - задачу с которой нужно перерисовать и newTask - новую задачу в которую нужно перерисовать старую задачу - используется при переносе задаче методом выпадающего списка
        this.tasksCardsDiv.appendChild(newTask.div) //в див для задач вставляет div задачи - newTask
        newTask.taskValue(oldTask.value) //вставляет значение задачи из старой в новую
        newTask.setUserId(oldTask.userId) //вставляет значение userId задачи из старой в новую
        newTask.number = this.tasks.length - 1 //присаивает номер задачи
        newTask.status = this.status //присваеивает статус задачи
        newTask.renderTask(this.tasksCardsDiv) // в новой подготовленной задаче запускает метод, который отрисовывает задачу в нужном диве и назначает всех слушателей для данной задачи

        let event = new Event("click");
        newTask.p.dispatchEvent(event); //имитирует нажатие на p и кнопку отправки задачи для приведения задачи в нетронутый вид
        newTask.submit.dispatchEvent(event);
    }


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
        this.dropDown.addEventListener('change', (e) => { //слушает событие изменения дропдауна
            e.preventDefault() //прерывает событие
            if (!this.dropDownFlag) {

                this.dropDownFlag = true
                let foundTask
                for (let i = 0; i < allOptions.length; i++) {
                    if (allOptions[i].selected) { //находит отмеченный option
                        foundTask = draggingFromBlock.tasks[i] //искомая задача получается та индекс которой равен i в массиве задач блока задач draggingFromBlock  - её нужно пересоздать, удалить и отрисовать
                        ////////////////////////////////////////////////////////////////Problem - на первый раз нормально находит foundTask - со второго раза находит undedinde : поставил в конце функции перезапуск приложения startApp() и заработало нормально
                    }
                }
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

}