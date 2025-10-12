async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const generateBtn = new GenerateButton();

async function init() {
  let input;
  while (!(input = document.querySelector(".ProseMirror"))) {
    await sleep(100);
  }
  let timer;
  input.addEventListener("input", () => {
    generateBtn.show();
    clearTimeout(timer);
    timer = setTimeout(() => generateBtn.delete(), 20000);
  });
}

init();
