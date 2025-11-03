class PopUpSettings {
  constructor(buttonSettings) {
    this.buttonSettings = buttonSettings;
    this.overlay = null;
  }

  show() {
    if (document.querySelector(".SettingsOverlay")) return;
    this.overlay = document.createElement("div");
    this.overlay.className = "SettingsOverlay";

    const content = document.createElement("div");
    content.className = "SettingsContent";
    content.innerHTML = `
          <h3>
            <img src="${chrome.runtime.getURL("assets/GenerateIcon.png")}" alt="icon" style="width:50px;height:50px;margin-right:8px;vertical-align:middle;">
            Customize Nano Prompt
          </h3>

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

    const saved = JSON.parse(localStorage.getItem("nanoPromptSettings") || "{}");
    if (saved.tone) content.querySelector("#tone").value = saved.tone;
    if (saved.style) content.querySelector("#style").value = saved.style;
    if (saved.length) content.querySelector("#length").value = saved.length;
    if (saved.notes) content.querySelector("#notes").value = saved.notes;

    content.querySelector("#close").onclick = () => this.delete();

    content.querySelector("#save").onclick = () => {
      const prefs = {
        tone: content.querySelector("#tone").value,
        style: content.querySelector("#style").value,
        length: content.querySelector("#length").value,
        notes: content.querySelector("#notes").value
      };
      localStorage.setItem("nanoPromptSettings", JSON.stringify(prefs));
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
