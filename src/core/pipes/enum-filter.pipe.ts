import Vue from 'vue';
import { FOOD_CATEGORY, OPERATION_TIME } from '@/shared';
import { OPERATION_TIME_CATEGORY } from '@/shared';
import { FNB_OWNER, KB_FOOD_CATEGORY } from '@/common';

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

  if (value === OPERATION_TIME.LATE_NIGHT) {
    return OPERATION_TIME_CATEGORY.LATE_NIGHT;
  }

  if (value === FOOD_CATEGORY.F01) {
    return KB_FOOD_CATEGORY.F01;
  }
  if (value === FOOD_CATEGORY.F02) {
    return KB_FOOD_CATEGORY.F02;
  }
  if (value === FOOD_CATEGORY.F03) {
    return KB_FOOD_CATEGORY.F03;
  }
  if (value === FOOD_CATEGORY.F04) {
    return KB_FOOD_CATEGORY.F04;
  }
  if (value === FOOD_CATEGORY.F05) {
    return KB_FOOD_CATEGORY.F05;
  }
  if (value === FOOD_CATEGORY.F06) {
    return KB_FOOD_CATEGORY.F06;
  }
  if (value === FOOD_CATEGORY.F07) {
    return KB_FOOD_CATEGORY.F07;
  }
  if (value === FOOD_CATEGORY.F08) {
    return KB_FOOD_CATEGORY.F08;
  }
  if (value === FOOD_CATEGORY.F09) {
    return KB_FOOD_CATEGORY.F09;
  }
  if (value === FOOD_CATEGORY.F10) {
    return KB_FOOD_CATEGORY.F10;
  }
  if (value === FOOD_CATEGORY.F11) {
    return KB_FOOD_CATEGORY.F11;
  }
  if (value === FOOD_CATEGORY.F12) {
    return KB_FOOD_CATEGORY.F12;
  }
  if (value === FOOD_CATEGORY.F13) {
    return KB_FOOD_CATEGORY.F13;
  }
  if (value === FOOD_CATEGORY.F14) {
    return KB_FOOD_CATEGORY.F14;
  }
  if (value === FOOD_CATEGORY.F15) {
    return KB_FOOD_CATEGORY.F15;
  }
  if (value === FOOD_CATEGORY.F16) {
    return KB_FOOD_CATEGORY.F16;
  }

  if (value === FNB_OWNER.NEW_FNB_OWNER) {
    return '예비사장님';
  }

  if (value === FNB_OWNER.CUR_FNB_OWNER) {
    return '사장님';
  }
});
