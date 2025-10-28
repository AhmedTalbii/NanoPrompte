async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function init() {
  const host = window.location.hostname;
  const inputSelector = inputSelectors[host];
  if (!inputSelector) return;

  let input;
  while (!(input = document.querySelector(inputSelector))) {
    await sleep(100);
  }
  const btnSettings = new ButtonSettings();
  btnSettings.show();
  let timer;
  const editor = input.tagName === "P" ? input : input;
  editor.addEventListener("input", () => {
    let Btn = new GenerateButton()
    Btn.show();
    clearTimeout(timer);
    timer = setTimeout(() => Btn.delete(), 20000);
  });
}

init();