const BASE_URL = 'https://d9dd-71-105-165-232.ngrok.io'

async function getAllLists() {
  const response = await fetch(
    BASE_URL + '/lists/all',
    {
      method: 'get',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }
  )

  return response.json()
}


// display a list on the screen

function displayList(list) {
  /*
  var temp = document.getElementsByTagName("template")[0];
  var clon = temp.content.cloneNode(true);
  document.body.appendChild(clon);
  */

  const listTemplate = document.querySelector('template#todo-list-template')
  const newListElement = listTemplate.content.cloneNode(true)
  const listItems = newListElement.querySelector('.list-items')

  for(let item of list.toDoItems) {
    const listItem = document.createElement('li')
    listItem.innerText = item.content
    listItems.appendChild(listItem)
  }

  document.body.appendChild(newListElement)
}

// create a new list

// create a new item


const allLists = await getAllLists()
for(let list of allLists) {
  displayList(list)
}
console.log( await getAllLists() )