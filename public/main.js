$('.submit').on('click',  () => {
  let nameVal = $('.name').val()
  let reasonVal = $('.reason').val()
  let cleanStatusVal = $('.cleanliness-select').val()
  
  clearInputs()
})

const clearInputs = () => {
  $('input').val('')
  $('.cleanliness-select').val('')
}