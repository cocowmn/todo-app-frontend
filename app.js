/** UI OBJECTIVES:
 *    1: Create a list, Display it on screen
 *      1a: Display List Title
 *      1b: Create a To-Do Item inside of a List
 *      1c: Display Due Date when Available
 *    2: Update a list when a new item is added
 *      2a: Handle Form Input
 */

/** API OBJECTIVES:
 *    1: Get All Lists
 *    2: Create A New List
 *    3: Create A To-Do Item
 * 
 *    x: add error handling and logging for failure states
 */

const allListsResponse = await fetch('http://localhost:8080/lists/all', {
  method: 'GET'
})
const allLists = await allListsResponse.json()

/*
  W3Schools [HTML <template> Tag]
  https://www.w3schools.com/tags/tag_template.asp
  ---------------------------
  function showContent() {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
  }
*/

function displayList(list) {
  const template = document.querySelector('#todo-list-template')
  const templateCopy = template.content.cloneNode(true)

  const titleContainer = templateCopy.querySelector('.todo-list-title')
  titleContainer.innerText = list.title

  const itemsContainer = templateCopy.querySelector('.todo-list-items')
  for(let todoItem of list.toDoItems) {
    console.log(todoItem)
    const itemElement = document.createElement('li')
    itemElement.innerText = todoItem.content
    itemsContainer.appendChild(itemElement)
  }
  
  document.body.appendChild(templateCopy)
}

console.log(allLists)

for(let list of allLists) {
  displayList(list)
}