import Vue from 'vue';

export const SecondsToMinutesPipeTransformer = () =>
  Vue.filter('secondsToMinutesTransformer', (time: number): string => {
    if (!time) {
      return;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;

    const finalTime = `${minutes < 10 ? '0' + minutes : minutes} : ${
      seconds < 10 ? '0' + seconds : seconds
    }`;

    return finalTime;
  });
