export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOrigianl = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      let divisor = 1;
      let unidade = "milisegundos";
      if (emSegundos) {
        divisor = 1000;
        unidade = "segundos";
      }
      const tempo1 = performance.now();
      const retorno = metodoOrigianl.apply(this, args);
      const tempo2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução: ${
          (tempo1 - tempo2) / divisor
        } ${unidade}.`
      );
      retorno;
    };

    return descriptor;
  };
}
