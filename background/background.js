chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: msg.input
  })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(err => sendResponse({ error: err.message }));
  return true;
});
