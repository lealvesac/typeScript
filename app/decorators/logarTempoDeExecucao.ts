export function logarTempoDeExecucao() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOrigianl = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      const tempo1 = performance.now();
      const retorno = metodoOrigianl.apply(this, args);
      const tempo2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução: ${
          (tempo1 - tempo2) / 100
        } segundos.`
      );
      retorno;
    };

    return descriptor;
  };
}
