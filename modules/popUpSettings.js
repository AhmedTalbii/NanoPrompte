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
        content.innerHTML = `
            <h3>Customize Nano Prompt</h3>
            <label>AI Tone:</label>
            <select id="tone">
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
                <option value="friendly">Friendly</option>
                <option value="analytical">Analytical</option>
            </select><br><br>

            <label>Prompt Style:</label>
            <select id="style">
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="persuasive">Persuasive</option>
                <option value="neutral">Neutral</option>
            </select><br><br>

            <label>Output Length:</label>
            <select id="length">
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
            </select><br><br>

            <label>Extra Notes:</label><br>
            <textarea id="notes" rows="2" placeholder="e.g. focus on clarity or creativity"></textarea><br><br>

            <button id="save">Save</button>
            <button id="close">Close</button>
        `;

        this.overlay.append(content);
        document.body.append(this.overlay);

        content.querySelector("#close").onclick = () => this.delete();
        content.querySelector("#save").onclick = () => {
            const prefs = {
                tone: content.querySelector("#tone").value,
                style: content.querySelector("#style").value,
                length: content.querySelector("#length").value,
                notes: content.querySelector("#notes").value
            };
            console.log("Saved Settings:", prefs);
            this.delete();
        };

        this.overlay.addEventListener("click", e => {
            if (e.target === this.overlay) this.delete();
        });
    }

    delete() {
        this.overlay.remove();
    }
}
