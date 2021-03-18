import Vue from 'vue';
import { OPERATION_TIME } from '@/common';
import { OPERATION_TIME_CATEGORY } from '@/shared';

Vue.filter('enumTransformer', (value: string): string => {
  if (!value) {
    return;
  }
  if (value === OPERATION_TIME.BREAKFAST) {
    return OPERATION_TIME_CATEGORY.BREAKFAST;
  }
  if (value === OPERATION_TIME.LUNCH) {
    return OPERATION_TIME_CATEGORY.LUNCH;
  }
  if (value === OPERATION_TIME.DINNER) {
    return OPERATION_TIME_CATEGORY.DINNER;
  }
  if (value === OPERATION_TIME.LATE_NIGHT) {
    return OPERATION_TIME_CATEGORY.LATE_NIGHT;
  }
});
