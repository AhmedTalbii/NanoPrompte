class PopUpSettings {
    constructor(buttonSettings) {
        this.buttonSettings = buttonSettings;
        this.overlay = null;
    }

    show() {
        this.overlay = document.createElement("div");
        this.overlay.className = "SettingsOverlay";

        const content = document.createElement("div");
        content.className = "SettingsContent";
        content.textContent = "Settings Popup";

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.onclick = () => this.delete();

        content.append(closeBtn);
        this.overlay.append(content);
        document.body.append(this.overlay);

        this.overlay.addEventListener("click", (e) => {
            if (e.target === this.overlay) this.delete();
        });
    }

    delete() {
        this.overlay.remove();
    }
}
