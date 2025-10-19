class GenerateButton {
  constructor() {
    this.id = "generateWhithPromptEngineer";
  }

  show() {
    if (!document.getElementById(this.id)) {
      const composerForm = document.querySelector(
        'form[data-type="unified-composer"]'
      );
      const button = document.createElement("div");
      button.id = this.id;

      const img = document.createElement("img");
      img.src = chrome.runtime.getURL("assets/GenerateIcon.png");
      img.alt = "icon";
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.marginRight = "8px";
      button.appendChild(img);
      button.appendChild(document.createTextNode("Generate Prompts"));
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.position = "absolute";
      button.style.cursor = "pointer";
      button.style.background =
        "linear-gradient(130deg,rgba(2, 0,36,1) 0%, rgba(9,9,121,1) 100%)";
      button.style.padding = "2px 10px";
      button.style.borderRadius = "50px";
      button.style.boxShadow = "0 0 5px black";
      button.style.zIndex = "9999";
      button.style.transform = "translateY(0)";
      button.style.opacity = "0";
      button.style.transition = "all 0.3s ease";

      composerForm.prepend(button);
      button.addEventListener("click", () => {
        let p = composerForm.querySelector("p");
        if (p) {
          // Here put the code for generating prompts
        };
        let rC = new ResultsContainer();
        rC.show();
        this.delete();
      });
      requestAnimationFrame(() => {
        button.style.opacity = "1";
        button.style.transform = "translateY(-120%)";
      });
    }
  }

  delete() {
    const btn = document.getElementById(this.id);
    if (btn) {
      btn.style.opacity = "0";
      btn.style.transform = "translateY(0px)";
      setTimeout(() => btn.remove(), 300);
    };
  }
}