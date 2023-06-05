export class View<G> {
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }

  update(model: G): void {
    const template = this.template(model);
    this.elemento.innerHTML = template;
  }

  template(model: G): string {
    throw Error("Implementado pela class filha.")
  }
}
