export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOrigianl = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let retorno = metodoOrigianl.apply(this, args);
    if (typeof retorno === "string") {
      /*console.log(
        `@escape em ação na classe ${this.constructor.name} para o metodo ${propertyKey}`
      );*/
      retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    return retorno;
  };

  return descriptor;
}
