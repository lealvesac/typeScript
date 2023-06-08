export function logarTempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOrigianl = descriptor.value;
        descriptor.value = function (...args) {
            const tempo1 = performance.now();
            const retorno = metodoOrigianl.apply(this, args);
            const tempo2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(tempo1 - tempo2) / 100} segundos.`);
            retorno;
        };
        return descriptor;
    };
}
