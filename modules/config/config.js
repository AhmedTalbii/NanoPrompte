const chatSelectors = {
  "chatgpt.com": 'form[data-type="unified-composer"]',
  "gemini.google.com": 'div[_ngcontent-ng-c3644111995]',
  "claude.ai": "fieldset.flex.w-full.min-w-0.flex-col"
};
const inputSelectors = {
  "chatgpt.com": "p, [contenteditable='true']",
  "gemini.google.com": "div[xapfileselectordropzone].text-input-field",
  "claude.ai": "textarea, [contenteditable='true']",
};
