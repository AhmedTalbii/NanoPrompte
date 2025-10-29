class ButtonSettings {
    constructor() {
        this.button = null;
    }

    show() {
        this.button = document.createElement("div");
        this.button.className = "SettingsButton";

        const img = document.createElement("img");
        img.src = chrome.runtime.getURL("assets/GenerateIcon.png");
        img.alt = "icon";
        this.button.append(img);

        this.button.title = "Customize your NanoPrompter";

        document.body.appendChild(this.button);

        this.button.addEventListener("click", () => new PopUpSettings(this).show());
    }

    delete() {
        this.button.remove();
    }
}
