

$('.submit').on('click',  () => {
  let inputVal = $('.add-item').val()
  clearInput()
  console.log(inputVal);
})

const clearInput = () => {
  $('input').val('')
}