import {
    getFromStorage
} from "../utils";
import {
    userLoader
} from "./userLoader";
import {
    tasksBlocks
} from "./utilsForUsers";


export function dragAndDrop() {

    const content = document.getElementById('kanban__content')
    const dragItems = content.querySelectorAll('.dragItem'); //искать элементы в текущем контексте
    const dropZones = content.querySelectorAll('.dropZone');

    let draggedItem = null;
    let droppedItem = null;



    dragItems.forEach((dragItem) => {
        dragItem.addEventListener("dragstart", handlerDragStart);
        dragItem.addEventListener("dragEnd", handlerDragEnd);
        // dragItem.addEventListener("drag", handlerDrag);

        dragItem.addEventListener('dragenter', () => {

            if (draggedItem !== droppedItem) {
                droppedItem = dragItem;
            }

        })
        dragItem.addEventListener('dragleave', () => {
            droppedItem = null;
        })
    });


    dropZones.forEach((dropZone) => {
        dropZone.addEventListener("dragenter", handlerDragEnter);
        dropZone.addEventListener("dragleave", handlerDragleave);
        dropZone.addEventListener("dragover", handlerDragover);
        dropZone.addEventListener("drop", handlerDrop);
    });




    function handlerDragStart(event) {

        // event.dataTransfer.setData('dragItem', this.dataset.item)
        this.classList.add('dragItem--active')
        draggedItem = this;

    }

    function handlerDragEnd(event) {

        this.classList.remove('dragItem--active')
        draggedItem = null;
    }

    // function handlerDrag(e) { //событие возникает быстро и постоянно

    // }


    function handlerDragEnter(e) {

        e.preventDefault();
        this.classList.add('dropZone--active')

    }

    function handlerDragleave() {

        this.classList.remove('dropZone--active')

    }

    function handlerDragover(e) {
        e.preventDefault();

    }

    function handlerDrop(event) {

        let items = []
        if (droppedItem) {
            if (droppedItem.parentElement === draggedItem.parentElement) {

                const children = []
                // Array.from(droppedItem.parentElement.children) //todo все drag-items данной drop-zone
                if (droppedItem.parentElement.getAttribute('data-zone') == 0) {
                    dragItems.forEach((element) => {
                        if (element.parentElement.getAttribute('data-zone') == 0) {
                            children.push(element)
                        }
                    })
                } else if (droppedItem.parentElement.getAttribute('data-zone') == 1) {
                    dragItems.forEach((element) => {
                        if (element.parentElement.getAttribute('data-zone') == 1) {
                            children.push(element)
                        }
                    })
                } else if (droppedItem.parentElement.getAttribute('data-zone') == 2) {
                    dragItems.forEach((element) => {
                        if (element.parentElement.getAttribute('data-zone') == 2) {
                            children.push(element)
                        }
                    })
                }





                const draggedIndex = children.indexOf(draggedItem);
                const droppedIndex = children.indexOf(droppedItem);
                if (draggedIndex > droppedIndex) {
                    draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

                } else {

                    draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)

                }
                console.log('Общий родительский элемент')
            }
        } else {
            this.append(draggedItem);
        }

        // dropZones.forEach((el) => { //перебирает все дроп-зоны
        //     el.childNodes.forEach((dragItem, index) => { //перебирает все дочерние элементы дропзон
        //         dragItem.setAttribute('data-item', index) //каждому дочернему элементу дроп-зоны устанавливает значение атрибута data-item равное порядковому индексу
        //         console.log(dragItem)
        //     })
        // })



         actualityDataItem(dragItems);
        items = getAllTasksFromTasksBlocks()

        items.forEach((el) => { //перебирает массив задач
            let cardDiv = el.div.parentElement.parentElement; // получаем значение прородителя, который содержит заголовок, в котором по сути содержится статус
            let status = cardDiv.childNodes[0].textContent //получаем значение заголовка
            // el.number = el.div.getAttribute('data-item'); //устанавливает номер задачи в соответствии со значением data-item ее диваа
            el.status = status; //устанавливает значение статуса задачи в соответствии с айди родительского элемента ее дива

            el.saveTask()


        })
        saveUpgradedTasksToTasksBlocks(items)

        //todo - загрузить массив задач в localStorage чтобы отрисовывались потом в том же порядке
        // console.log(tasksBlocks)
        // dragItems.forEach((dragItem, index) => {
        //     dragItem.setAttribute('data-item', index)
        // })
        // document.location.reload() //не могу понять причину появления 'null' - по количеству задач при перетаскивании вновь созданной задачи. при перезагрузки страницы эти элементы исчезают пока не решу проблему оставлю здесь функцию перезагрузки страницы
        console.log(tasksBlocks[0].tasks)
        console.log(tasksBlocks[1].tasks)
        console.log(tasksBlocks[2].tasks)
    }

   


}

function getAllTasksFromTasksBlocks() {
    let items = []
    tasksBlocks.forEach((element) => {
        items = items.concat(element.tasks)
    })
    return items
}

function saveUpgradedTasksToTasksBlocks(items) {

    tasksBlocks.forEach((element) => { //очищаем задачи из блоков задач
        element.tasks = []
    })



    items.forEach((element) => {
        if (element.status == 'Ready') {
            
            tasksBlocks[0].tasks.push(element)
            tasksBlocks[0].actualityDataItem()
        } else if (element.status == 'InProgress') {
            tasksBlocks[1].tasks.push(element)
            tasksBlocks[1].actualityDataItem()


        } else if (element.status == 'Finished') {
            tasksBlocks[2].tasks.push(element)
            tasksBlocks[2].actualityDataItem()


        }
    })


}

function actualityDataItem(dragItems) {
    let itemsOfDataZone0 = []
    let itemsOfDataZone1 = []
    let itemsOfDataZone2 = []

    dragItems.forEach((element) => {

        if (element.parentElement.getAttribute('data-zone') == 0) {
            itemsOfDataZone0.push(element)

        } else if (element.parentElement.getAttribute('data-zone') == 1) {
            itemsOfDataZone1.push(element)
            // console.log(element.parentElement.getAttribute('data-zone'))


        } else if (element.parentElement.getAttribute('data-zone') == 2) {
            itemsOfDataZone2.push(element)

        }



    })

    itemsOfDataZone0.forEach((el, index) => {
        
        el.setAttribute('data-item', index)

    })
    itemsOfDataZone1.forEach((el, index) => {
        el.setAttribute('data-item', index)

    })
    itemsOfDataZone2.forEach((el, index) => {
        // console.log(el.textContent)
        el.setAttribute('data-item', index)

    })
}