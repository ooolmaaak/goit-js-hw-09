// написать скрит таймера с обратным отсчётом от будущей даты к настоящей
// при нажатии на кнопку старта скрипт должен вычеслять раз в секунду -
// сколько времени осталось до указанной даты и обновлять интерфейс таймера

// количество дней может быть более чем из 2х цифр
// таймер должен остановится, когда дошел до конечной даты

// в интерфейсе таймера нужно добавлять 0 если в числе менее 2х символов

// при выборе более ранней даты чем текущая - выводить алерт, кнопка старт не активная
// при выборе валидной даты - кнопка старт активная

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // добавляем проверку на корректность выбранной даты
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];

    if (chosenDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      Notiflix.Notify.success('You choose a valid date');
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

// встроенная ф-ция flatpickr
flatpickr('#datetime-picker', options);

// конвертируем миллисекунды в валидное время
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(1899894300000));

// старт
const startButton = document.querySelector('[data-start]');

// элементы таймера
const timerData = document.querySelectorAll('.value');

// счётчик
let countdownInterval = null;

// слушаем клик
startButton.addEventListener('click', startTimer);

// функция запуска таймера
function startTimer() {
  // получаем выбранную дату из элемента #datetime-picker
  const targetDate = new Date(
    document.querySelector('#datetime-picker').value
  ).getTime();
  // деактивируем кнопку
  startButton.disabled = true;

  // меняем счётчик
  countdownInterval = setInterval(() => {
    // получаем текущую дату
    const currentDate = new Date().getTime();
    // получаем разницу в датах
    const timeDifference = targetDate - currentDate;

    // проверяем, если разница меньше или равна 0, обнуляем счётчик и удаляем интервал
    // или обновляем счётчик на текущее значение с интервалом в 1000 мс.
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerDisplay(days, hours, minutes, seconds);
    }
  }, 1000);
}

// добавляем 0 к значениям меньше 2х 00 или меньше 10
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// функция для обновления текущего значения в таймере
function updateTimerDisplay(days, hours, minutes, seconds) {
  timerData[0].textContent = addLeadingZero(days);
  timerData[1].textContent = addLeadingZero(hours);
  timerData[2].textContent = addLeadingZero(minutes);
  timerData[3].textContent = addLeadingZero(seconds);
}
