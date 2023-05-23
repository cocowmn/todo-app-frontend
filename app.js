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

console.log('app.js loaded')

const allListsResponse = await fetch(
  'http://localhost:8080/lists/all',
  {
    method: 'GET'
  })
const allLists = await allListsResponse.json()

function displayList( list ) {
  const listContainer = document.querySelector( '#list-container' )
  const listTemplate = document.querySelector('#template-list')
  const newList = listTemplate.content.cloneNode(true)

  const listTitleElement = newList.querySelector( '.todo-list-title' )
  const listItemsElement = newList.querySelector( '.todo-items' )

  listTitleElement.innerText = list.title

  list.toDoItems.forEach(item => {
    const newItemElement = document.createElement( 'li' )
    newItemElement.innerText = item.content

    listItemsElement.appendChild( newItemElement )
  })

  //
  // This for loop is an alternate way of writing the above .forEach loop
  //
  // for(let index = 0; index < list.toDoItems.length; index++) {
  //   const item = list.toDoItems[ index ]

  //   const newItemElement = document.createElement( 'li' )
  //   newItemElement.innerText = item.content

  //   listItemsElement.appendChild( newItemElement )
  // }
  
  listContainer.appendChild( newList )
}

allLists.forEach( list => displayList(list) )
