const links = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.header__burger');
const navHeader = document.querySelector('.nav__header');
const navMenu = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
  [burger, navHeader].forEach((el) => el.classList.toggle('active'));
});

links.forEach((el) =>
  el.addEventListener('click', () => {
    [burger, navHeader].forEach((e) => e.classList.remove('active'));
  })
);

navMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav__link')) {
    navMenu.querySelectorAll('.nav__link').forEach((el) => el.classList.remove('nav__link_active'));
    event.target.classList.add('nav__link_active');
  }
});
