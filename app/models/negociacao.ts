import { Modelo } from "../interfaces/meuModelo.js";

export class Negociacao implements Modelo<Negociacao> {
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {}

  get volume(): number {
    return this.quantidade * this.valor;
  }

  get data(): Date {
    const data = new Date(this._data.getTime());
    return data;
  }

  public static criaDe(
    dataStr: string,
    quantidadeStr: string,
    valorStr: string
  ): Negociacao {
    const exp = /-/g;
    const date = new Date(dataStr.replace(exp, ","));
    const quantidade = parseInt(quantidadeStr);
    const valor = parseFloat(valorStr);
    return new Negociacao(date, quantidade, valor);
  }

  public paraTexto(): string {
    return `
      Data: ${this.data},
      Qtd: ${this.quantidade},
      Valor: ${this.valor}
    `;
  }

  public comparativoIgualdade(negociacao: Negociacao): boolean {
    return (
      this.data.getDate() === negociacao.data.getDate() &&
      this.data.getMonth() === negociacao.data.getMonth() &&
      this.data.getFullYear() === negociacao.data.getFullYear()
    );
  }
}
