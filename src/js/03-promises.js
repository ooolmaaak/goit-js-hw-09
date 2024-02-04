// в документе есть разметка формы, в поля которой, пользователь вводит задержку
// шаг увеличения задержки и количество повторений промисов, которые необходимо
// создать

// написать скрипт, который при сабмите вызовет функцию столько раз, сколько
// было указано в поле amount
// при каждом вызове нужно передать функции номер создаваемого промиса position
// и задержку, учитывая введенную пользователем первую задержку delay и шаг step

// нужно дополнить кон функции, что бы она возвращала один промис, который
// выполняется или отклоняется через delay времени.

// значением промиса должен быть объект, в котором будут свойства position и delay
// со значениями одноименных параметров

import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements['delay'].value);
  const step = parseInt(this.elements['step'].value);
  const amount = parseInt(this.elements['amount'].value);

  if (isNaN(firstDelay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure('Please fill in all fields with valid numbers.');
    return;
  }

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Promise ${position} resolved with delay ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Promise ${position} rejected with delay ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      const result = { position, delay };

      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}
