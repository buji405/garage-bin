
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
  .then((res) => getItems())
  .catch((error ) => console.log(error))
}


const getItems = () => {
  $('.garage').html('')
  fetch(`/api/v1/items`)
  .then((res) => res.json())
  .then((info) => {
    info.forEach((info) => {
      console.log(info)
      $('.garage').append(`
          <div class="card-container">
            <p class="item-name">${info.name}</p>
            <div class="details">
              <p class="reasoning">Reason: ${info.reason}</p>
              <p class="status">Cleanliness: ${info.cleanliness}</p>
            </div>  
          </div>
        `)
    })
  })
  .catch(error => console.log(error))
}

$('.garage').on('click', '.item-name', function (e) {
  $(e.target).parent().find(".details").toggleClass("show")
})
