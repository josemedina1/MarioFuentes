const slides = [
  { image: 'Construction', lines: ['Construir con', 'visión de futuro.'] },
  { image: 'Development', lines: ['Dar forma', 'a nuevas ideas.'] },
  { image: 'Hotels', lines: ['Espacios para', 'nuevas experiencias.'] },
];

const title = document.querySelector('#hero-title');
const image = document.querySelector('#hero-image');
const number = document.querySelector('#slide-number');
let currentSlide = 0;

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  const { image: filename, lines } = slides[currentSlide];
  image.src = `assets/${filename}.webp`;
  title.replaceChildren(lines[0], document.createElement('br'), lines[1]);
  number.textContent = `${String(currentSlide + 1).padStart(2, '0')} / 03`;
}

document.querySelector('#previous').addEventListener('click', () => changeSlide(-1));
document.querySelector('#next').addEventListener('click', () => changeSlide(1));

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
