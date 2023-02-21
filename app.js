import { getAllLists } from './service.js'
import { addListHandler, displayList } from './ui.js'

const allLists = await getAllLists()
console.log({ allLists })

allLists.forEach( displayList )

document.querySelector( '.add-list' ).addEventListener(
  'click',
  addListHandler
)
