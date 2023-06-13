export abstract class View<G> {
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error(`O seletor ${seletor}, não existe no DOM.`);
    }
  }

  public update(model: G): void {
    let template = this.template(model);

    this.elemento.innerHTML = template;
  }

  protected abstract template(model: G): string;
}
