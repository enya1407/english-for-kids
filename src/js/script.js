import '../styles/style.scss';

const links = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.header__burger');
const navHeader = document.querySelector('.nav__header');
const logo = document.querySelector('.logo');
const shadow = document.querySelector('.shadow');

burger.addEventListener('click', () => {
  [burger, navHeader, logo, shadow].forEach((el) => el.classList.toggle('active'));
});
links.forEach((el) =>
  el.addEventListener('click', () => {
    [burger, navHeader, logo, shadow].forEach((e) => e.classList.remove('active'));
  })
);
shadow.addEventListener('click', () => {
  [burger, navHeader, logo, shadow].forEach((el) => el.classList.toggle('active'));
});
