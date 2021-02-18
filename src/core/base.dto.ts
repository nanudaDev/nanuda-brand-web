export class BaseDto<T> {
  constructor(partial?: any) {
    Object.assign(this, partial);
  }
}
