const backgroundBtn = document.querySelector('.background-btn')
const arrowSpinning = document.querySelector('.bi-arrow-repeat')
const languageButton = document.querySelector('#languageButton')
const dropdownMenu = document.querySelector(".dropdown-menu")

backgroundBtn.addEventListener('click', () => {
  arrowSpinning.classList.add('spinning')
  setTimeout(()=>{arrowSpinning.classList.remove('spinning')}, 500) 
})

dropdownMenu.addEventListener('click', event => {
  
    if (event.target.classList.contains("dropdown-item")) {
      dropdownMenu
      .querySelectorAll(".dropdown-item")
      .forEach(el => el.classList.remove("active"));
      event.target.classList.add("active");
      languageButton.textContent = event.target.textContent
    }
})





