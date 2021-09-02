import {
    getFromStorage
} from "../utils";
import {
    userLoader
} from "./userLoader";
import {
    droppedItem,
    tasksBlocks
} from "./utilsForUsers";


export class DragAndDrop {

    constructor(userPage) {
        this.userPage = userPage
        this.content = userPage.content
        this.dragItems = this.content.querySelectorAll(`.dragItem--${this.userPage.userId}`); //искать элементы в текущем контексте
        this.dropZones = this.content.querySelectorAll(`.dropZone--${this.userPage.userId}`);

        this.draggedItem = null;
        this.droppedItem = null;
        this.object = this




    }

    startDragAndDrop() {

        this.dragItems.forEach((dragItem) => {
            dragItem.addEventListener("dragstart", (event) => {
                handlerDragStart(event, dragItem, this.draggedItem)
                // dragItem.classList.add('dragItem--active')
                // draggedItem = dragItem
            });
            dragItem.addEventListener("dragEnd", (event) => {
                
                handlerDragEnd(dragItem, this.draggedItem)
            });
            dragItem.addEventListener("drag", (event) => {
                handlerDrag(event)
            });

            dragItem.addEventListener('dragenter', (event, dragItem) => {

                if (this.draggedItem !== this.droppedItem) {
                    this.droppedItem = dragItem;
                }

            })
            dragItem.addEventListener('dragleave', (event) => {
                this.droppedItem = null;
            })
        });


        this.dropZones.forEach((dropZone) => {
            dropZone.addEventListener("dragenter", (e) => {
                handlerDragEnter(e, dropZone)
            });
            dropZone.addEventListener("dragleave", () => {
                handlerDragleave(dropZone)
            });
            dropZone.addEventListener("dragover", (e) => {
                handlerDragover(e)
            });
            dropZone.addEventListener("drop", (e) => {
                e.preventDefault()
                handlerDrop(e, dropZone, this.object)
            });
        });
    }




    // handlerDragStart(event) {

    //     // event.dataTransfer.setData('dragItem', this.dataset.item)
    //     this.classList.add('dragItem--active')
    //     this.draggedItem = this;

    // }

    // handlerDragEnd(dragItem) {

    //     dragItem.classList.remove('dragItem--active')
    //     dragItem.draggedItem = null;

    // }

    // function handlerDrag(e) { //событие возникает быстро и постоянно

    // }


    // handlerDragEnter(e, dropZone) {

    //     e.preventDefault();
    //     dropZone.classList.add('dropZone--active')

    // }

    // handlerDragleave(dropZone) {

    //     dropZone.classList.remove('dropZone--active')

    // }



    // handlerDrop(event, dropZone, this) {

    //     let items = []
    //     if (this.droppedItem) {
    //         if (this.droppedItem.parentElement === this.draggedItem.parentElement) {

    //             const children = []
    //             // Array.from(droppedItem.parentElement.children) //todo все drag-items данной drop-zone
    //             if (this.droppedItem.parentElement.getAttribute('data-zone') == 0) {
    //                 this.dragItems.forEach((element) => {
    //                     if (element.parentElement.getAttribute('data-zone') == 0) {
    //                         children.push(element)
    //                     }
    //                 })
    //             } else if (this.droppedItem.parentElement.getAttribute('data-zone') == 1) {
    //                 this.dragItems.forEach((element) => {
    //                     if (element.parentElement.getAttribute('data-zone') == 1) {
    //                         children.push(element)
    //                     }
    //                 })
    //             } else if (this.droppedItem.parentElement.getAttribute('data-zone') == 2) {
    //                 this.dragItems.forEach((element) => {
    //                     if (element.parentElement.getAttribute('data-zone') == 2) {
    //                         children.push(element)
    //                     }
    //                 })
    //             }





    //             const draggedIndex = children.indexOf(draggedItem);
    //             const droppedIndex = children.indexOf(droppedItem);
    //             if (draggedIndex > droppedIndex) {
    //                 this.draggedItem.parentElement.insertBefore(this.draggedItem, this.droppedItem)

    //             } else {

    //                 this.draggedItem.parentElement.insertBefore(this.draggedItem, this.droppedItem.nextElementSibling)

    //             }
    //             console.log('Общий родительский элемент')
    //         }
    //     } else {
    //         dropZone.append(this.draggedItem);
    //     }

    //     // dropZones.forEach((el) => { //перебирает все дроп-зоны
    //     //     el.childNodes.forEach((dragItem, index) => { //перебирает все дочерние элементы дропзон
    //     //         dragItem.setAttribute('data-item', index) //каждому дочернему элементу дроп-зоны устанавливает значение атрибута data-item равное порядковому индексу
    //     //         console.log(dragItem)
    //     //     })
    //     // })



    //     // actualityDataItem(this.dragItems);
    //     // items = getAllTasksFromTasksBlocks()

    //     // items.forEach((el) => { //перебирает массив задач
    //     //     let cardDiv = el.div.parentElement.parentElement; // получаем значение прородителя, который содержит заголовок, в котором по сути содержится статус
    //     //     let status = cardDiv.childNodes[0].textContent //получаем значение заголовка
    //     //     // el.number = el.div.getAttribute('data-item'); //устанавливает номер задачи в соответствии со значением data-item ее диваа
    //     //     el.status = status; //устанавливает значение статуса задачи в соответствии с айди родительского элемента ее дива

    //     //     el.saveTask()


    //     // })
    //     // saveUpgradedTasksToTasksBlocks(items)


    // }




}

function handlerDragStart(event, dragItem, draggedItem) {
// event.preventDefault()
    //  event.dataTransfer.setData('dragItem', this.dataset.item)
    dragItem.classList.add('dragItem--active')
    draggedItem = dragItem;


}

function handlerDragEnd(dragItem, draggedItem) {
    window.alert('[kqwe')
    dragItem.classList.remove('dragItem--active')
    draggedItem = null;
    console.log(dragItem)

}

function handlerDrag(e) { //событие возникает быстро и постоянно

    }

function handlerDragEnter(e, dropZone) {

    e.preventDefault();
    dropZone.classList.add('dropZone--active')

}

function handlerDragleave(dropZone) {

    dropZone.classList.remove('dropZone--active')

}

function handlerDragover(e) {
    e.preventDefault();

}


function handlerDrop(event, dropZone, obj) {

    let items = []
    if (obj.droppedItem) {
        if (obj.droppedItem.parentElement === obj.draggedItem.parentElement) {

            const children = []
            // Array.from(droppedItem.parentElement.children) //todo все drag-items данной drop-zone
            if (obj.droppedItem.parentElement.getAttribute('data-zone') == 0) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 0) {
                        children.push(element)
                    }
                })
            } else if (obj.droppedItem.parentElement.getAttribute('data-zone') == 1) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 1) {
                        children.push(element)
                    }
                })
            } else if (obj.droppedItem.parentElement.getAttribute('data-zone') == 2) {
                obj.dragItems.forEach((element) => {
                    if (element.parentElement.getAttribute('data-zone') == 2) {
                        children.push(element)
                    }
                })
            }

            const draggedIndex = children.indexOf(obj.draggedItem);
            const droppedIndex = children.indexOf(obj.droppedItem);
            if (draggedIndex > droppedIndex) {
                obj.draggedItem.parentElement.insertBefore(obj.draggedItem, obj.droppedItem)

            } else {

                obj.draggedItem.parentElement.insertBefore(obj.draggedItem, obj.droppedItem.nextElementSibling)

            }
            console.log('Общий родительский элемент')
        }
    } else {
        dropZone.append(obj.draggedItem);
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

// function actualityDataItem(dragItems) {
//     let itemsOfDataZone0 = []
//     let itemsOfDataZone1 = []
//     let itemsOfDataZone2 = []

//     dragItems.forEach((element) => {

//         if (element.parentElement.getAttribute('data-zone') == 0) {
//             itemsOfDataZone0.push(element)

//         } else if (element.parentElement.getAttribute('data-zone') == 1) {
//             itemsOfDataZone1.push(element)
//             // console.log(element.parentElement.getAttribute('data-zone'))


//         } else if (element.parentElement.getAttribute('data-zone') == 2) {
//             itemsOfDataZone2.push(element)

//         }



//     })

//     itemsOfDataZone0.forEach((el, index) => {

//         el.setAttribute('data-item', index)

//     })
//     itemsOfDataZone1.forEach((el, index) => {
//         el.setAttribute('data-item', index)

//     })
//     itemsOfDataZone2.forEach((el, index) => {
//         // console.log(el.textContent)
//         el.setAttribute('data-item', index)

//     })
// }

























































// export function dragAndDrop() {

//     const content = document.getElementById('kanban__content')
//     const dragItems = content.querySelectorAll('.dragItem'); //искать элементы в текущем контексте
//     const dropZones = content.querySelectorAll('.dropZone');

//     let draggedItem = null;
//     let droppedItem = null;



//     dragItems.forEach((dragItem) => {
//         dragItem.addEventListener("dragstart", handlerDragStart);
//         dragItem.addEventListener("dragEnd", handlerDragEnd);
//         // dragItem.addEventListener("drag", handlerDrag);

//         dragItem.addEventListener('dragenter', () => {

//             if (draggedItem !== droppedItem) {
//                 droppedItem = dragItem;
//             }

//         })
//         dragItem.addEventListener('dragleave', () => {
//             droppedItem = null;
//         })
//     });


//     dropZones.forEach((dropZone) => {
//         dropZone.addEventListener("dragenter", handlerDragEnter);
//         dropZone.addEventListener("dragleave", handlerDragleave);
//         dropZone.addEventListener("dragover", handlerDragover);
//         dropZone.addEventListener("drop", handlerDrop);
//     });




//     function handlerDragStart(event) {

//         // event.dataTransfer.setData('dragItem', this.dataset.item)
//         this.classList.add('dragItem--active')
//         draggedItem = this;

//     }

//     function handlerDragEnd(event) {

//         this.classList.remove('dragItem--active')
//         draggedItem = null;
//     }

//     // function handlerDrag(e) { //событие возникает быстро и постоянно

//     // }


//     function handlerDragEnter(e) {

//         e.preventDefault();
//         this.classList.add('dropZone--active')

//     }

//     function handlerDragleave() {

//         this.classList.remove('dropZone--active')

//     }

//     function handlerDragover(e) {
//         e.preventDefault();

//     }

//     function handlerDrop(event) {

//         let items = []
//         if (droppedItem) {
//             if (droppedItem.parentElement === draggedItem.parentElement) {

//                 const children = []
//                 // Array.from(droppedItem.parentElement.children) //todo все drag-items данной drop-zone
//                 if (droppedItem.parentElement.getAttribute('data-zone') == 0) {
//                     dragItems.forEach((element) => {
//                         if (element.parentElement.getAttribute('data-zone') == 0) {
//                             children.push(element)
//                         }
//                     })
//                 } else if (droppedItem.parentElement.getAttribute('data-zone') == 1) {
//                     dragItems.forEach((element) => {
//                         if (element.parentElement.getAttribute('data-zone') == 1) {
//                             children.push(element)
//                         }
//                     })
//                 } else if (droppedItem.parentElement.getAttribute('data-zone') == 2) {
//                     dragItems.forEach((element) => {
//                         if (element.parentElement.getAttribute('data-zone') == 2) {
//                             children.push(element)
//                         }
//                     })
//                 }





//                 const draggedIndex = children.indexOf(draggedItem);
//                 const droppedIndex = children.indexOf(droppedItem);
//                 if (draggedIndex > droppedIndex) {
//                     draggedItem.parentElement.insertBefore(draggedItem, droppedItem)

//                 } else {

//                     draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)

//                 }
//                 console.log('Общий родительский элемент')
//             }
//         } else {
//             this.append(draggedItem);
//         }

//         // dropZones.forEach((el) => { //перебирает все дроп-зоны
//         //     el.childNodes.forEach((dragItem, index) => { //перебирает все дочерние элементы дропзон
//         //         dragItem.setAttribute('data-item', index) //каждому дочернему элементу дроп-зоны устанавливает значение атрибута data-item равное порядковому индексу
//         //         console.log(dragItem)
//         //     })
//         // })



//          actualityDataItem(dragItems);
//         items = getAllTasksFromTasksBlocks()

//         items.forEach((el) => { //перебирает массив задач
//             let cardDiv = el.div.parentElement.parentElement; // получаем значение прородителя, который содержит заголовок, в котором по сути содержится статус
//             let status = cardDiv.childNodes[0].textContent //получаем значение заголовка
//             // el.number = el.div.getAttribute('data-item'); //устанавливает номер задачи в соответствии со значением data-item ее диваа
//             el.status = status; //устанавливает значение статуса задачи в соответствии с айди родительского элемента ее дива

//             el.saveTask()


//         })
//         saveUpgradedTasksToTasksBlocks(items)


//     }




// }

// function getAllTasksFromTasksBlocks() {
//     let items = []
//     tasksBlocks.forEach((element) => {
//         items = items.concat(element.tasks)
//     })
//     return items
// }

// function saveUpgradedTasksToTasksBlocks(items) {

//     tasksBlocks.forEach((element) => { //очищаем задачи из блоков задач
//         element.tasks = []
//     })



//     items.forEach((element) => {
//         if (element.status == 'Ready') {

//             tasksBlocks[0].tasks.push(element)
//             tasksBlocks[0].actualityDataItem()
//         } else if (element.status == 'InProgress') {
//             tasksBlocks[1].tasks.push(element)
//             tasksBlocks[1].actualityDataItem()


//         } else if (element.status == 'Finished') {
//             tasksBlocks[2].tasks.push(element)
//             tasksBlocks[2].actualityDataItem()


//         }
//     })


// }

// function actualityDataItem(dragItems) {
//     let itemsOfDataZone0 = []
//     let itemsOfDataZone1 = []
//     let itemsOfDataZone2 = []

//     dragItems.forEach((element) => {

//         if (element.parentElement.getAttribute('data-zone') == 0) {
//             itemsOfDataZone0.push(element)

//         } else if (element.parentElement.getAttribute('data-zone') == 1) {
//             itemsOfDataZone1.push(element)
//             // console.log(element.parentElement.getAttribute('data-zone'))


//         } else if (element.parentElement.getAttribute('data-zone') == 2) {
//             itemsOfDataZone2.push(element)

//         }



//     })

//     itemsOfDataZone0.forEach((el, index) => {

//         el.setAttribute('data-item', index)

//     })
//     itemsOfDataZone1.forEach((el, index) => {
//         el.setAttribute('data-item', index)

//     })
//     itemsOfDataZone2.forEach((el, index) => {
//         // console.log(el.textContent)
//         el.setAttribute('data-item', index)

//     })
// }