const btn = document.querySelector('.header__burger__menu')
const menu = document.querySelector('.header__menu')

btn.addEventListener('click' , () => {
    menu.classList.toggle('active')
    btn.classList.toggle('active')
})