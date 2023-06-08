import { logarTempoDeExecucao } from "../decorators/logarTempoDeExecucao.js";

export abstract class View<G> {
  protected elemento: HTMLElement;
  private escape = false;

  constructor(seletor: string, escape?: boolean) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error(`O seletor ${seletor}, não existe no DOM.`);
    }
    if (escape) {
      this.escape = escape;
    }
  }

  @logarTempoDeExecucao()

  public update(model: G): void {
    let template = this.template(model);
    if (this.escape) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    this.elemento.innerHTML = template;
  }

  protected abstract template(model: G): string;
}
