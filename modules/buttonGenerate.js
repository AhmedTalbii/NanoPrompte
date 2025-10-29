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

    if (!document.getElementById("generate-style")) {
      const style = document.createElement("style");
      style.id = "generate-style";
      style.textContent = `
      .generate-btn {
        display: flex;
        align-items: center;
        position: absolute;
        cursor: pointer;
        background: linear-gradient(130deg,rgba(2, 0,36,1) 0%, rgba(9,9,121,1) 100%);
        padding: 2px 10px;
        border-radius: 50px;
        box-shadow: 0 0 5px black;
        z-index: 9999;
        transform: translateY(0);
        opacity: 0;
        transition: all 0.3s ease;
      }
      .generate-btn img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
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

    const button = document.createElement("div");
    button.id = this.id;
    button.className = "generate-btn";

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/GenerateIcon.png");
    img.alt = "icon";
    button.appendChild(img);
    button.appendChild(document.createTextNode("Generate Prompts"));

    container.prepend(button);

    button.addEventListener("click", () => {
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
          else {console.log(res.versions);
          ;new ResultsContainer().show(res.versions)};
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
