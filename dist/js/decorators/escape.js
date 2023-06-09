export function escape(target, propertyKey, descriptor) {
    const metodoOrigianl = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = metodoOrigianl.apply(this, args);
        if (typeof retorno === "string") {
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        return retorno;
    };
    return descriptor;
}
