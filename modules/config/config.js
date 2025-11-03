const host = window.location.hostname;  

const chatSelectors = {
  "chatgpt.com": 'form[data-type="unified-composer"]',
  "gemini.google.com": 'div[class*="input-area-container"]',
  "claude.ai": "fieldset.flex.w-full.min-w-0.flex-col"
};

const inputSelectors = {
  "chatgpt.com": "p, [contenteditable='true']",
  "gemini.google.com": "div[xapfileselectordropzone].text-input-field rich-textarea",
  "claude.ai": "textarea, [contenteditable='true']",
};
