export const IsValidatePhone = (value: string) => {
  const regExp = /^\d{3}\d{3,4}\d{4}$/;
  if (value) {
    if (regExp.test(value) && value.startsWith('010')) {
      return true;
    } else {
      return false;
    }
  } else {
    return null;
  }
};
