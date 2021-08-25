
import { tasksBlocks } from '../userPage/utilsForUsers.js';


import { handlerDragStart } from '../userPage/utilsForUsers.js';
import { handlerDragEnd } from '../userPage/utilsForUsers.js';
import { handlerDrag } from '../userPage/utilsForUsers.js';
import { addCard, allInputInP, draggedItem, droppedItem } from "../userPage/utilsForUsers.js";
import { addToStorage, getFromStorage } from "../utils.js";
import { BaseModel } from "./BaseModel.js";

export class Task extends BaseModel {

    constructor(status, number) {

        super();
        this.number = number;
        this.status = status;
        this.value = '';
        this.userId = ''
        

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

        //////////////////////////////////////////TODO delete
       

        this.divSubmits.className = 'divSubmits'
        this.divSubmits.style.display = 'none'

        //dropElement
        // this.div = draggedItems
        this.div.className = 'dragItem'
        this.div.draggable = true;
        this.form.draggable = true;
        this.p.draggable = true;
        this.input.draggable = true;


        this.div.addEventListener("dragstart", handlerDragStart);
        this.div.addEventListener("dragEnd", handlerDragEnd);
        this.div.addEventListener("drag", handlerDrag);

        this.div.addEventListener('dragenter', () => {

            if (draggedItem !== droppedItem) {
                droppedItem = this.div;
            }

            console.log('dragEnter')
        })
        this.div.addEventListener('dragleave', () => {

            droppedItem = null;

        })
    }


    
    //TODO в этой функции сделать условие - отрисовывается новая задача или перетаскиваемая
    renderTask(element) { //element - родительский элемент HTML из блока, в который будет всё вставляться
       
        element.appendChild(this.div);
        this.div.appendChild(this.form);
        this.form.appendChild(this.input);
        this.form.appendChild(this.divSubmits);
        this.divSubmits.appendChild(this.submit);
        this.divSubmits.appendChild(this.submitDelete);


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
                addCard(this.status);
    
            })

        })

        
        this.input.addEventListener('drag', (event) => {

        }, false)

        

        this.submitDelete.addEventListener('click', (e) => {
            e.preventDefault()
            
            this.deleteTask() ///////////вместо this.block надо будет вставлять результат поиска из массива taskBlocks по статусу
            this.block().addCardDisplay()
            
         })


        this.p.addEventListener('click', () => {
            allInputInP();

            this.p.replaceWith(this.input);
            this.div.parentElement.appendChild(this.divSubmits);
            this.divSubmits.appendChild(this.submit);
            this.divSubmits.appendChild(this.submitDelete);

            // this.form.appendChild(this.submit);
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



    taskValue (value) {

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
    
    setUserId (userId){
        this.userId = userId;
    }

    block() {

        let block
        tasksBlocks.forEach((element) => {
            if (element.status == this.status){
                block = element
                
            }
        })
        return block
    }


    saveTask(){
        let task = {
            'id' : this.id,
            'number' : this.number,
            'status' : this.status,
            'value' : this.value,
            'userId' : this.userId,
        }

        let allTasksFromLocalStorage = getFromStorage('tasks');
        let allId = [];
        function searchID (element){
            return element == task.id
        }
        if (allTasksFromLocalStorage.length > 0){

            

            for (let i = 0; i < allTasksFromLocalStorage.length; i++){

               allId[i] = allTasksFromLocalStorage[i].id;
               
            }
            if (allId.some(searchID)){
                for (let j = 0; j < allTasksFromLocalStorage.length; j++){
                    if (allTasksFromLocalStorage[j].id == this.id){
                        allTasksFromLocalStorage.splice(j, 1, task)
                        
                        // allTasksFromLocalStorage[i] = task;
                    }                  
                    
                }
                
            }else{
                allTasksFromLocalStorage[allTasksFromLocalStorage.length] = task;
            }
            // 


        }else{
            allTasksFromLocalStorage[0] = task;
        }
        localStorage.removeItem('tasks');
        allTasksFromLocalStorage.forEach((element) => {
            addToStorage(element, 'tasks')
        })
        
        
    }
    //TODO
    // 1.создание формы задачи: input и submit
    // 2.отрисовывание формы
    // 3. слушатель: если инпуты отправлены - submit исчезает
    // 4. если фокус на инпуте - остальные задачи не могут быть зафокусированы и появляется submit
}


