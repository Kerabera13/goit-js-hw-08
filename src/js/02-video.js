import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', function(data) {
  const currentTime = data.seconds;
  saveTimeToLocalStorageThrottled(currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
  // Встановіть час відтворення плеєра зі збереженої позиції
  player.setCurrentTime(parseFloat(savedTime)).then(function(seconds) {
    // seconds - фактичний час, до якого було змінено відтворення
    console.log('Час відтворення відновлено до', seconds);
  }).catch(function(error) {
    switch (error.name) {
      case 'RangeError':
        // Час був менше 0 або більше тривалості відео
        console.error('Помилка встановлення часу відтворення:', error);
        break;

      default:
        // Відбулася якась інша помилка
        console.error('Помилка встановлення часу відтворення:', error);
        break;
    }
  });
} else {
  console.log('Збереженого часу відтворення не знайдено.');
}

const saveTimeToLocalStorageThrottled = throttle(function(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);