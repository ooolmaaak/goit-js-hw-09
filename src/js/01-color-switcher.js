// добавить переключатель цветов при нажатии на кнопку
// цвета генерируются рандомно
// должен меняться цвет фона всей страницы
// при нажатии на кнопку start - цвета меняются (добавить проверку на повторное нажатие)
// при нажатии на кнопку стоп, сохраняется текущий цвет

// получаем доступ к кнопкам
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// доступ к body
const bodyColor = document.body.style;

// btn styles
startBtn.style.padding = '10px 20px';
startBtn.style.fontSize = '16px';
stopBtn.style.padding = '10px 20px';
stopBtn.style.fontSize = '16px';

// timer default
let timer = null;

// current color
// let currentColor = null;

// функция генерации случайного цвета
const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;

// START event listener
startBtn.addEventListener('click', () => {
  stopBtn.disabled = false;
  startBtn.disabled = true;
  changeBackgroundColor();
});

// STOP event listener
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  stopColorChange();
});

// функция для смены цвета
const changeBackgroundColor = () => {
  timer = setInterval(() => {
    bodyColor.backgroundColor = getRandomHexColor();
  }, 1000);
};

// функция для остановки смены цвета и сохранения текущего состояния цвета
const stopColorChange = () => {
  clearInterval(timer);
};
