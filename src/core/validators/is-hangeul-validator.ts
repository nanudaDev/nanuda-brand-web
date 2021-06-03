export const IsValidateHangeul = (value: string) => {
  const regExp = /^[가-힣]+$/;
  if (value) {
    if (regExp.test(value) && value.length > 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return null;
  }
};
