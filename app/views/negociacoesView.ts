import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./views.js";

export class NegociacoesView extends View<Negociacoes> {
  @escape
  protected template(model: Negociacoes): string {
    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
              ${model
                .lista()
                .map((negociacao) => {
                  return `
                  <tr>
                    <td>${this.coverData(negociacao.data)}</td>
                    <td>${negociacao.quantidade}</td>
                    <td>${negociacao.quantidade}</td>
                  <tr>
                `;
                })
                .join("")}
            </tbody>
        </table>
    `;
  }

  private coverData(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
