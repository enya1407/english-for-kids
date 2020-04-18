const links = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.header__burger');
const navHeader = document.querySelector('.nav__header');
const navMenu = document.querySelector('.nav__list');
const wrapperShadow = document.querySelector('.wrapper__shadow');

burger.addEventListener('click', () => {
  [burger, navHeader, wrapperShadow].forEach((el) => el.classList.toggle('active'));
});

links.forEach((el) =>
  el.addEventListener('click', () => {
    [burger, navHeader, wrapperShadow].forEach((e) => e.classList.remove('active'));
  })
);
wrapperShadow.addEventListener('click', () => {
  [burger, navHeader, wrapperShadow].forEach((el) => el.classList.toggle('active'));
});

navMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav__link')) {
    navMenu.querySelectorAll('.nav__link').forEach((el) => el.classList.remove('nav__link_active'));
    event.target.classList.add('nav__link_active');
  }
});
