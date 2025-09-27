async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function init() {
  let editor;
  while (!(editor = document.querySelector('.ProseMirror'))) {
    await sleep(100);
  }
  editor.addEventListener('input', async () => {
    await sleep(1000);
    console.log(editor.innerText);
  });
}

init();
