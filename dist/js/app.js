import { NegociacaoController } from "./controllers/negociacaoController.js";
const controller = new NegociacaoController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error("Não foi possivle inicializar a aplicação, verifique seu codigo fonte.");
}
const botaoImporta = document.querySelector("#botao-importa");
if (botaoImporta) {
    botaoImporta.addEventListener("click", () => {
        controller.importaDados();
    });
}
else {
    throw Error("Botão importa não foi encontrado.");
}
