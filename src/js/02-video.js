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

  player.setCurrentTime(parseFloat(savedTime)).then(function(seconds) {
    
    console.log('Час відтворення відновлено до', seconds);
  }).catch(function(error) {
    switch (error.name) {
      case 'RangeError':
        
        console.error('Помилка встановлення часу відтворення:', error);
        break;

      default:
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