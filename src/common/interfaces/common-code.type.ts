export enum REVENUE_RANGE {
  ABOVE_FIVE_THOUSAND = 'ABOVE_FIVE_THOUSAND',
  BETWEEN_ONE_AND_TWO = 'BETWEEN_ONE_AND_TWO',
  BETWEEN_THREE_AND_FIVE = 'BETWEEN_THREE_AND_FIVE',
  BETWEEN_TWO_AND_THREE = 'BETWEEN_TWO_AND_THREE',
  UNDER_THOUSAND = 'UNDER_THOUSAND',
}
export const CONST_REVENUE_RANGE  = Object.values(REVENUE_RANGE);

export enum ADMIN_ROLES {
  ADMIN_NORMAL = 'ADMIN_NORMAL',
  ADMIN_SUPER = 'ADMIN_SUPER',
}
export const CONST_ADMIN_ROLES  = Object.values(ADMIN_ROLES);

export enum KB_MEDIUM_CATEGORY {
  F01 = 'F01',
  F12 = 'F12',
  F14 = 'F14',
  F15 = 'F15',
  F10 = 'F10',
  F16 = 'F16',
  F04 = 'F04',
  F07 = 'F07',
}
export const CONST_KB_MEDIUM_CATEGORY  = Object.values(KB_MEDIUM_CATEGORY);

export enum OPERATION_TIME {
  BREAKFAST = 'BREAKFAST',
  DINNER = 'DINNER',
  LATE_NIGHT = 'LATE_NIGHT',
  LUNCH = 'LUNCH',
}
export const CONST_OPERATION_TIME  = Object.values(OPERATION_TIME);

export enum BRAND_CONSULT {
  CONSULT_COMPLETE = 'CONSULT_COMPLETE',
  CONSULT_CONTRACTED = 'CONSULT_CONTRACTED',
  CONSULT_DROPPED = 'CONSULT_DROPPED',
  CONSULT_IN_PROG = 'CONSULT_IN_PROG',
  NEW_CONSULT = 'NEW_CONSULT',
}
export const CONST_BRAND_CONSULT  = Object.values(BRAND_CONSULT);

export enum FNB_OWNER {
  CUR_FNB_OWNER = 'CUR_FNB_OWNER',
  NEW_FNB_OWNER = 'NEW_FNB_OWNER',
}
export const CONST_FNB_OWNER  = Object.values(FNB_OWNER);

export enum DELIVERY_OR_RESTAURANT {
  DELIVERY_SPACE_BEST = 'DELIVERY_SPACE_BEST',
  DELIVERY_SPACE_EQUAL_RESTAURANT = 'DELIVERY_SPACE_EQUAL_RESTAURANT',
  DELIVERY_SPACE_NOT_GOOD = 'DELIVERY_SPACE_NOT_GOOD',
}
export const CONST_DELIVERY_OR_RESTAURANT  = Object.values(DELIVERY_OR_RESTAURANT);

export enum CUSTOMER_PAIN_POINT {
  DIFFICULT_ENV = 'DIFFICULT_ENV',
  HIGH_REV_LOW_PROFIT = 'HIGH_REV_LOW_PROFIT',
  NEED_NEW_MENU = 'NEED_NEW_MENU',
  RECENT_LOW_REVENUE = 'RECENT_LOW_REVENUE',
  UNSTABLE_REVENUE = 'UNSTABLE_REVENUE',
}
export const CONST_CUSTOMER_PAIN_POINT  = Object.values(CUSTOMER_PAIN_POINT);

export enum IP_STATUS {
  IP_ABUSE = 'IP_ABUSE',
}
export const CONST_IP_STATUS  = Object.values(IP_STATUS);

export enum ADMIN_STATUS {
  ONLINE = 'ONLINE',
  REJECTED = 'REJECTED',
  WAITING = 'WAITING',
}
export const CONST_ADMIN_STATUS  = Object.values(ADMIN_STATUS);

export enum TENTATIVE_OPEN_OPTION {
  PREP_PROCESSING = 'PREP_PROCESSING',
  START_WITHIN_TWO_MONTH = 'START_WITHIN_TWO_MONTH',
  STILL_LOOKING = 'STILL_LOOKING',
  STILL_WONDERING = 'STILL_WONDERING',
}
export const CONST_TENTATIVE_OPEN_OPTION  = Object.values(TENTATIVE_OPEN_OPTION);

