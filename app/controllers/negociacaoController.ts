import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logarTempoDeExecucao.js";
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MsgView } from "../views/msgView.js";
import { NegociacoesView } from "../views/negociacoesView.js";
import { domInject } from "../decorators/domInjector.js";
import { NegociacoesService } from "../services/negociacoesServices.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInject("#data")
  private inputData: HTMLInputElement;

  @domInject("#quantidade")
  private inputQuantidade: HTMLInputElement;

  @domInject("#valor")
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private msgview = new MsgView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoDeExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.diaUtil(negociacao.data)) {
      return this.msgview.update(
        "Apenas negociações em dias úteis serão aceitas."
      );
    }
    this.negociacoes.add(negociacao);
    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.updateView();
  }

  public importaDados(): void {
    this.negociacoesService
      .obterNegociacoes()
      .then((negociscoesDeHoje) => {
        return negociscoesDeHoje.filter((negociscoesDeHoje) => {
          return !this.negociacoes
            .lista()
            .some((Negociacao) =>
              Negociacao.comparativoIgualdade(negociscoesDeHoje)
            );
        });
      })
      .then((negociscoesDeHoje) => {
        for (let negociacao of negociscoesDeHoje) {
          this.negociacoes.add(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private diaUtil(data: Date) {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private updateView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.msgview.update("Negociação adicionada com sucesso!");
  }
}
