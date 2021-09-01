import {
    Tasks
} from "./tasksBlocks";

class UserPage {
    constructor(id) {
        this.tasksBlocks = []
        this.allTasks = []
        this.draggedItem = null
        this.droppedItem = null
        this.statusNames = ['Ready', 'InProgress', 'Finished'];
        this.userId = id
        this.parrentElement = 
    }

    //TODO
    //отрисовка задач из localStorage по user ID
    //функционал dragAndDrop
    //set сохранение задач в LocalStorage и в this.tasksBlocks и пересчет и вставка в нижнее меню итоговых значений с учетом того, что при загрузке из adminPage пересчитываться будет по другому - в зависимости от state например
    //отрисовка всего UserPage и вставление в нужный Html - передавать Html в конструкторе и апендить в него
    //get - получение задач текущего пользователя из localStorage
    createTasksBlocks(appStateCurrentUser) {

        this.statusNames.forEach((element, index) => {

            this.tasksBlocks[index] = new Tasks(element, index)
            this.tasksBlocks[index].renderTasks()
        });
    }

    renderRelevantTasks(appStateCurrentUser) {
        const footer = new Footer()           //создаёт новый экземпляр класса Footer
        let allRelevantTasks = getFromStorage('tasks');      //берет из localStorage все задачи и помещает их в массив allRelevantTasks
        let allRelevantTasksOfCurrentUser = [] //создает пустой массив, куда будет засовывать задачи из всех задач - принадлежащие текущему пользователю

        allRelevantTasks.forEach((element) => {  //перебирает все задачи - если пользователь админ складывает все в allRelevantTasksOfCurrentUser, если не админ - складывает только те, id юзера которых совпадает с id текущего пользователя
            if (this.currentUser()) {
                allRelevantTasksOfCurrentUser.push(element);
            } else {
                if (element.userId == appStateCurrentUser.id) {
                    allRelevantTasksOfCurrentUser.push(element);
                }
            }

        })
        for (let i = 0; i < allRelevantTasksOfCurrentUser.length; i++) {            //перебирает все отсортированные по пользователю задачи
            if (allRelevantTasksOfCurrentUser[i].status == this.tasksBlocks[0].status) {      //сортирует задачи по статусам, и в зависимости от статуса запускает процес создания/отрисовывания задач через соответсвующий статусу задачи taskblocks
                this.createAndDeleteTask(allRelevantTasksOfCurrentUser[i], this.tasksBlocks[0])
            } else if (allRelevantTasksOfCurrentUser[i].status == this.tasksBlocks[1].status) {
                this.createAndDeleteTask(allRelevantTasksOfCurrentUser[i], this.tasksBlocks[1])
            } else if (allRelevantTasksOfCurrentUser[i].status == this.tasksBlocks[2].status) {
                this.createAndDeleteTask(allRelevantTasksOfCurrentUser[i], this.tasksBlocks[2])
            }
        }
        //TODO - после создания и отрисовки задач - надо актуализировать данные
        //в localStorage - в данном случае не надо, так как все изначально с него взялось и отрисовалось
        //на данный момент уже создался массив this.tasksBlocks
        // и НЕ создался массив this.allTasks - надо засунуть в него новые данные
        //из tasksBlocks
        footer.footerContent() //отрисовка footera с данными по задачам из localStorage
    }
    createAndDeleteTask(oldTask, otherBlock) {
        otherBlock.createTask(oldTask.id)
        let thisTask = otherBlock.tasks[otherBlock.tasks.length - 1];
        otherBlock.renderTransitionTask();
        otherBlock.addCardDisplay();
        if (oldTask.div) oldTask.deleteTask();
        thisTask.saveTask()
        tasksBlocks.forEach((element) => {
            element.actualityDataItem()
        })


        // thisTask.taskValue(oldTask.value)                   //////////закоменченное перенести в определение функции renderTransitionTask
        // thisTask.setUserId(oldTask.userId)
        // thisTask.number = otherBlock.tasks.length - 1
        // thisTask.status = otherBlock.status

        // thisTask.renderTask(otherBlock.tasksCardsDiv)

        // let event = new Event("click");
        // thisTask.p.dispatchEvent(event);
        // thisTask.submit.dispatchEvent(event);
    }



    currentUser() {
        if (appState.currentUser) {
            if (appState.currentUser.login == 'admin' && appState.currentUser.password == 'admin') {
                return true
            } else {
                return false
            }
        }
    }


}