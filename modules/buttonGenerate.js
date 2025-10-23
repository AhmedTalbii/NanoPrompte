class GenerateButton {
  constructor() {
    this.id = "generateWhithPromptEngineer";
  }

  show() {
    if (document.getElementById(this.id)) return;
    const host = window.location.hostname;    
    const containerSelector = chatSelectors[host];
    const inputSelector = inputSelectors[host];
    if (!containerSelector || !inputSelector) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

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

    container.prepend(button);

    button.addEventListener("click", () => {
      if (!document.getElementById("loader-style")) {
        const style = document.createElement("style");
        style.id = "loader-style";
        style.textContent = `
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin-left: 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
        document.head.appendChild(style);
      }

      const loader = document.createElement("div");
      loader.className = "loader";
      this.delete();
      container.prepend(loader);

      const input = container.querySelector(inputSelector);
      if (input) {
        const text = input.tagName === "P" ? input.textContent : input.innerText;
        chrome.runtime.sendMessage({ input: text }, (res) => {
          loader.remove();
          if (res.error) console.error(res.error);
          else {
            const rC = new ResultsContainer();
            rC.show(res.versions);
          }
        });
      }
    });

    requestAnimationFrame(() => {
      button.style.opacity = "1";
      button.style.transform = "translateY(-120%)";
    });
  }

  delete() {
    const btn = document.getElementById(this.id);
    if (btn) {
      btn.style.opacity = "0";
      btn.style.transform = "translateY(0px)";
      setTimeout(() => btn.remove(), 300);
    }
  }
}
