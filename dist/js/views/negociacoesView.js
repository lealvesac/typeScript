import { View } from "./views.js";
export class NegociacoesView extends View {
    template(model) {
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
    coverData(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
