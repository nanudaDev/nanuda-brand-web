/* eslint-disable @typescript-eslint/no-var-requires */
import 'izitoast/dist/css/iziToast.css';
import iZtoast from 'izitoast';

const toast = {
  error: (message: string, title?: string) => {
    if (!title) {
      title = 'Error';
    }
    return iZtoast.error({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 1500,
    });
  },

  success: (message: string, title = '성공') => {
    return iZtoast.success({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 1500,
    });
  },

  info: (message: string, title = '안내') => {
    return iZtoast.info({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 1500,
    });
  },

  warn: (message: string, title = '안내') => {
    return iZtoast.warning({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 1500,
    });
  },
};

export default toast;
