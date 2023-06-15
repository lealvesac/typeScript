export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    add(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
    paraTexto() {
        return JSON.stringify(this.negociacoes, null, 2);
    }
    comparativoIgualdade(negociacoes) {
        return (JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista()));
    }
}
//# sourceMappingURL=negociacoes.js.map