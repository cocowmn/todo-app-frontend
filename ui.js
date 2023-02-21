/** OBJECTIVES:
 *    1: Create a list, Display it on screen
 *      1a: Display List Title
 *      1b: Create a To-Do Item inside of a List
 *      1c: Display Due Date when Available
 *    2: Update a list when a new item is added
 *      2a: Handle Form Input
 */


import { createList, createItem } from './service.js'

export function displayList( list ) {
  const listContainer = document.querySelector( '#todo-lists' )
  const listElement = createListElement( list )
  listContainer.appendChild( listElement )
}

function createListElement( list ) {
  const listTemplate = document.querySelector( 'template#todo-list-template' ).content.cloneNode(true)
  const listElement = listTemplate.querySelector( '.todo-list' )
  const titleElement = listElement.querySelector( '.todo-list-header' )
  const itemContainerElement = listElement.querySelector( '.todo-list-items' )
  const formElement = listElement.querySelector( '.todo-list-add-item' )

  listElement.setAttribute( 'data-list-id', list.id )
  titleElement.innerText = list.title

  formElement.addEventListener( 'submit', addItemHandler( list.id, formElement ) )

  list.toDoItems
    .map( createItemElement )
    .forEach( itemElement => itemContainerElement.appendChild( itemElement ))

  return listElement
}

function createItemElement( item ) {
  const itemTemplate = document.querySelector( 'template#todo-list-item-template' ).content.cloneNode(true)
  const itemElement = itemTemplate.querySelector( '.todo-list-item' )
  const contentElement = itemElement.querySelector( '.todo-list-item-text' )

  contentElement.innerText = item.content
  if( item.dueDate ) {
    const dueDateElement = document.createElement( 'span' )
    dueDateElement.classList.add( 'todo-item-due-date' )
    dueDateElement.innerText = `Due: ${ item.dueDate }`
    itemElement.appendChild( dueDateElement )
  }

  return itemElement
}

function updateDisplayedListElement( list ) {
  const listElement = document.querySelector( `.todo-list[data-list-id="${ list.id }"]` )
  const itemContainerElement = listElement.querySelector( '.todo-list-items' )

  // Remove the current items from display
  Array.from( itemContainerElement.children ).forEach( child => child.remove() )

  // Replace with the newest batch of items received
  list.toDoItems
    .map( createItemElement )
    .forEach( itemElement => itemContainerElement.appendChild( itemElement ))
}

function addItemHandler( listID, formElement ) {
  return async ( event ) => {
    event.preventDefault()

    const textInputElement = formElement.querySelector( '.todo-list-add-text' )
    const dateInputElement = formElement.querySelector( '.todo-list-add-date' )
    
    const content = textInputElement.value
    const dueDate = dateInputElement.value || null

    const updatedList = await createItem( listID, content, dueDate )
    updateDisplayedListElement( updatedList )

    // reset the form values after successful item addition
    textInputElement.value = ''
    dateInputElement.value = ''
  }
}

export async function addListHandler() {
  const title = prompt('New List Title: ')
  if( !title ) return

  displayList( await createList( title ))
}
