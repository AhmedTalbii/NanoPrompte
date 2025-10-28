class ButtonSettings {
    constructor() {
        this.button = null;
    }

    show() {
        this.button = document.createElement("div");
        this.button.className = "SettingsButton";
        const icon = document.createElement("i");
        const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
document.head.appendChild(link);

link.onload = () => { // wait for CSS to load
    this.button = document.createElement("div");
    this.button.className = "SettingsButton";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-gear";
    this.button.append(icon);

    document.body.appendChild(this.button);

    this.button.addEventListener("click", () => {
        new PopUpSettings(this).show();
    });
};
    }

    delete() {
        this.button.classList.add("hidden");
    }
}
