
import { Tasks } from "./tasksBlocks.js";

import { createTasksBlocks } from "../userPage/userLoader.js"
import { createTask, tasksBlocks,  addBlocksofTasksInLocalStorage, testAddToLocalStorage  } from '../userPage/utilsForUsers.js';


import { handlerDragStart } from '../userPage/utilsForUsers.js';
import { handlerDragEnd } from '../userPage/utilsForUsers.js';
import { handlerDrag } from '../userPage/utilsForUsers.js';
import { addCard, allInputInP, draggedItem, droppedItem } from "../userPage/utilsForUsers.js";

export class Task {

    constructor(status, number, block) {

        this.number = number;
        // this.value = value;
        this.status = status;
        this.block = block;
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


        // submit Delete

        // this.submitDelete.type = 'submit';
        this.submitDelete.style.display = 'none'
        this.submitDelete.className = 'task__add--button btn btn-danger';
        // this.submitDelete.value = 'удалить';
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

        })
        this.div.addEventListener('dragleave', () => {

            droppedItem = null;

        })
    }


    ////////////////ВОТ ОНО
    //TODO в этой функции сделать условие - отрисовывается новая задача или перетаскиваемая
    renderTask(element) { //element - родительский элемент HTML из блока, в который будет всё вставляться
        // this.flag = false;
        


        element.appendChild(this.div);
        this.div.appendChild(this.form);
        this.form.appendChild(this.input);
        this.form.appendChild(this.divSubmits);
        this.divSubmits.appendChild(this.submit);
        this.divSubmits.appendChild(this.submitDelete);

        // this.input.replaceWith(this.p);


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

                let newAllUsers = addBlocksofTasksInLocalStorage(this);
                testAddToLocalStorage(newAllUsers)
                
                // localStorage.setItem('users', JSON.stringify(addBlocksofTasksInLocalStorage(tasksBlocks)));
                 

                 
            })

            
            // this.submitDelete.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     this.deleteTask(this.block)
            // })

        })

        this.input.addEventListener('drag', (event) => {

        }, false)

        // this.input.addEventListener('focusout', () => { //  при убирании фокуса с инпута срабатывает та же логика что при нажатии кнопки отправить
            
        //     this.taskValue(this.input.value);
        //     this.input.replaceWith(this.p);
        //     this.divSubmits.style.display = 'none';
        //     this.submitDelete.style.display = 'none';
        //     this.submit.style.display = 'none'
        //     addCard(this.status);
        // })

        this.submitDelete.addEventListener('click', (e) => {
            e.preventDefault()
            
            this.deleteTask(this.block)
            this.block.addCardDisplay()
            
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
                localStorage.setItem('tasks', JSON.stringify(this))
                window.alert('this.submit')
                // addBlocksofTasksInLocalStorage(this.block);
            })


            
        })

        // this.input.addEventListener('change', () => {
        //     this.taskValue(this.input.value);
        //     this.input.replaceWith(this.p);
        //     this.submit.style.display = 'none'
        // })

       

        // console.log(this.block)
        // console.log(tasksBlocks)
        // console.log(this.userId)

        
    }



    taskValue (value) {

        this.p.innerText = value;
        this.input.value = value;
        this.value = value;

    }


    deleteTask(block) {

       
        this.div.remove();
        this.form.remove()
        this.p.remove()
        this.input.remove()
        this.divSubmits.remove()
        this.submitDelete.remove()
        
        
        block.tasks.splice(this.number, 1)  //проблема в number
        block.counter--;
        
        
        
        block.tasks.forEach((element, index) => {
            element.div.setAttribute('data-item', index)
            element.number = index
            
        })
        // this.block.tasksCardsDiv.removeChild(this.div)
        // к этой кнопке будет обращаться кнопка удаления
       
    }



    transferTask(element) {

        this.div = element.div
    }
    
    setUserId (userId){
        this.userId = userId;
    }

    //TODO
    // 1.создание формы задачи: input и submit
    // 2.отрисовывание формы
    // 3. слушатель: если инпуты отправлены - submit исчезает
    // 4. если фокус на инпуте - остальные задачи не могут быть зафокусированы и появляется submit
}


