class PopUpSettings {
    constructor() { this.popUP = null; }

    show() {
        this.popUP = document.createElement("div");
        this.popUP.className = "SettingsOverlay";

        const content = document.createElement("div");
        content.className = "SettingsContent";
        content.textContent = "Full screen popup content";

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.addEventListener("click", () => this.delete());

        content.appendChild(closeBtn);
        this.popUP.appendChild(content);
        document.body.appendChild(this.popUP);
    }

    delete() {
        if (this.popUP) this.popUP.remove();
    }
}
