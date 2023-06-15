var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inspect } from "./decorators/inspect.js";
import { logarTempoDeExecucao } from "./decorators/logarTempoDeExecucao.js";
import { DiasDaSemana } from "../../app/enums/diasDaSemana.js";
import { Negociacao } from "../../app/models/negociacao.js";
import { Negociacoes } from "../../app/models/negociacoes.js";
import { MsgView } from "../../app/views/msgView.js";
import { NegociacoesView } from "../../app/views/negociacoesView.js";
import { domInject } from "./decorators/domInjector.js";
import { NegociacoesService } from "../../app/services/negociacoesServices.js";
import { imprimir } from "../../app/utils/imprimir.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.msgview = new MsgView("#mensagemView");
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.diaUtil(negociacao.data)) {
            return this.msgview.update("Apenas negociações em dias úteis serão aceitas.");
        }
        this.negociacoes.add(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.updateView();
    }
    importaDados() {
        this.negociacoesService
            .obterNegociacoes()
            .then((negociscoesDeHoje) => {
            return negociscoesDeHoje.filter((negociscoesDeHoje) => {
                return !this.negociacoes
                    .lista()
                    .some((Negociacao) => Negociacao.comparativoIgualdade(negociscoesDeHoje));
            });
        })
            .then((negociscoesDeHoje) => {
            for (let negociacao of negociscoesDeHoje) {
                this.negociacoes.add(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    diaUtil(data) {
        return (data.getDay() > DiasDaSemana.DOMINGO &&
            data.getDay() < DiasDaSemana.SABADO);
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    updateView() {
        this.negociacoesView.update(this.negociacoes);
        this.msgview.update("Negociação adicionada com sucesso!");
    }
}
__decorate([
    domInject("#data")
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInject("#quantidade")
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInject("#valor")
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspect,
    logarTempoDeExecucao()
], NegociacaoController.prototype, "adiciona", null);
//# sourceMappingURL=negociacaoController.js.map