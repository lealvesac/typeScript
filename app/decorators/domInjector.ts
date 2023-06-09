export function domInject(seletor: string) {
  return function (target: any, propertyKey: string) {
    let elemento: HTMLElement | null = null;
    const getter = function () {
      if (!elemento) {
        elemento = document.querySelector(seletor) as HTMLElement;
      }
      return elemento;
    };

    Object.defineProperty(target, propertyKey, { get: getter });
  };
}
