/** OBJECTIVES:
 *    1: Get All Lists
 *    2: Create A New List
 *    3: Create A To-Do Item
 * 
 *    x: add error handling and logging for failure states
 */

export const BASE_URL = 'https://1604-71-105-165-232.ngrok.io'

export async function getAllLists() {
    const getListsResponse = await fetch(`${ BASE_URL }/lists/all`, {
      method: 'GET',
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    return getListsResponse.json()
}

export async function createList( title ) {
  const createListResponse = await fetch(
    `${ BASE_URL }/list?title=${ title }`, 
    { method: 'POST' }
  )

  return createListResponse.json()
}

export async function createItem( listID, content, dueDate ) {
  const createItemResponse = await fetch(
    `${ BASE_URL }/${ listID }/item`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        dueDate
      })
    })

  return await createItemResponse.json()
}

// const nullList = { id: -1, toDoItems: [] }

// export async function getAllLists() {
//   try {
//     const getListsResponse = await fetch(`${ BASE_URL }/lists/all`, {
//       method: 'GET'
//     })

//     if(getListsResponse.status < 200 || getListsResponse.status >= 300) {
//       console.error( `failed to retrieve all lists from server; received unexpected status code "${ getListsResponse.status }"` )
//       return []
//     }

//     return getListsResponse.json()
//   } catch( exception ) {
//     console.error( 'failed to retrieve all lists from server', exception )
//     return []
//   }
// }

// export async function createList( title ) {
//   try {
//     const createListResponse = await fetch(
//       `${ BASE_URL }/list?title=${ title }`, 
//       { method: 'POST' }
//     )

//     if(createListResponse.status < 200 || createListResponse.status >= 300) {
//       console.error( `failed to create list on server; received unexpected status code "${ createListResponse.status }"` )
//       return { ...nullList, title: `server error, status: ${ createListResponse.statusText || createListResponse.status }` }
//     }

//     return createListResponse.json()
//   } catch( exception ) {
//     console.error( 'failed to create list on server', exception )
//     return { ...nullList, title: `server error, details: ${ JSON.stringify( exception ) }` }
//   }
// }

// export async function createItem( listID, content, dueDate ) {
//   try {
//     const createItemResponse = await fetch(
//       `${ BASE_URL }/${ listID }/item`, 
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           content,
//           dueDate
//         })
//       })

//     if(createItemResponse.status < 200 || createItemResponse.status >= 300) {
//       console.error( `failed to create to-do item for list#${ listID } on server; received unexpected status code "${ createItemResponse.status }"` )
//       return { ...nullList, title: `server error, status: ${ createItemResponse.statusText || createItemResponse.status }` }
//     }
  
//     return createItemResponse.json()
//   } catch( exception ) {
//     console.error( `failed to create to-do item in list#${ listID } on server`, exception )
//     return { ...nullList, title: `server error, details: ${ JSON.stringify( exception ) }` }
//   }
// }
