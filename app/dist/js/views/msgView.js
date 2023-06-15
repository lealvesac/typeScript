import { View } from "./views.js";
export class MsgView extends View {
    template(model) {
        return `
            <p class= "alert alert-info">${model}</p>
        `;
    }
}
//# sourceMappingURL=msgView.js.map