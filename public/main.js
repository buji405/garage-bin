
$(function() {
  getItems()
})

$('.submit').on('click',  () => {
  let nameVal = $('.name').val()
  let reasonVal = $('.reason').val()
  let cleanStatusVal = $('.cleanliness-select').val()
  
  addItem(nameVal, reasonVal, cleanStatusVal)
  clearInputs()
})

const clearInputs = () => {
  $('input').val('')
  $('.cleanliness-select').val('')
}

const addItem = (nameVal, reasonVal, cleanStatusVal) => {
  fetch(`/api/v1/items`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      'name': nameVal,
      'reason': reasonVal,
      'cleanliness': cleanStatusVal
    })
  })
  .then((res) => res.json())
  .then((data) => {
    getItems(data)
  })
  .catch((error ) => console.log(error))
}

const getItems = () => {
  $('.garage').html('')
  fetch(`/api/v1/items`)
  .then((res) => res.json())
  .then((info) => {
    info.forEach((info) => {
      $('.garage').append(`
          <div class="card-container id=${info.id}">
            <p class="item-name">${info.name}</p>
            <div class="details">
              <p class="reasoning">Reason: ${info.reason}</p>
              <p class="status">Cleanliness: ${info.cleanliness}</p>
              <p>Update Cleanliness: </p>
              <select class="cleanliness-select-update">
                <option value="" disabled="disabled" selected="selected">Cleanliness Status</option>
                <option value="sparkling">Sparkling</option>
                <option value="dusty">Dusty</option>
                <option value="rancid">Rancid</option>
              </select>
              <button value=${info.id} class="update-cleanliness">Update</button>
            </div>  
          </div>
        `)
    })
  })
  .catch(error => console.log(error))
}

const updateCleanliness = (e) => {
  let statusUpdate = $(e.target).parent().find('.cleanliness-select-update').val()
  id = e.target.value
  fetch(`/api/v1/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ 
      'cleanliness': statusUpdate
     }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => getItems())
  .catch((error ) => console.log(error))
}

$('.garage').on('click', '.item-name', function (e) {
  $(e.target).parent().find(".details").toggleClass("show")
})

$('.garage').on('click', '.update-cleanliness', function (e) {
   updateCleanliness(e)
})
