const links = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.header__burger');
const navHeader = document.querySelector('.nav__header');
burger.addEventListener('click', () => {
  [burger, navHeader].forEach((el) => el.classList.toggle('active'));
});
links.forEach((el) =>
  el.addEventListener('click', () => {
    [burger, navHeader].forEach((e) => e.classList.remove('active'));
  })
);

export default burger;
