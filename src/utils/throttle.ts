export function throttle(func: (...args: any[]) => void, delay: number) {
  //ID таймера
  let timeoutId: number | null;
  //флаг - разрешение вызова функции
  let canRun: boolean = true;

  return function (this: any, ...args: any[]) {
    //сохраняю контекст вызова
    const context = this;

    if (!canRun) {
      return;
    }

    //запрет на вызов, пока таймер не истечет
    canRun = false;
    func.apply(context, args);

    timeoutId = setTimeout(() => {
      //разрешение вызова после задержки
      canRun = true;
    }, delay);
  };
}
