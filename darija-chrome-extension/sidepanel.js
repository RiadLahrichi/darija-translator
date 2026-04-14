// === CONFIG ===
// This must match your running server's URL exactly.
// Check your Postman screenshot if you're unsure.
const API_URL = "http://localhost:8080/darija-translator/api/translate";
// Grab references to the HTML elements we need to interact with.
const sourceText = document.getElementById("source-text");
const resultText = document.getElementById("result-text");
const translateBtn = document.getElementById("translate-btn");
const statusEl = document.getElementById("status");


// === TRANSLATE FUNCTION ===
async function translate() {
  const text = sourceText.value.trim();

  if (!text) {
    statusEl.textContent = "Nothing to translate.";
    statusEl.className = "error";
    return;
  }

  // Disable the button and show loading state
  translateBtn.disabled = true;
  statusEl.textContent = "Translating...";
  statusEl.className = "";
  resultText.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    resultText.value = data.translation;
    statusEl.textContent = "Done.";

  } catch (error) {
    resultText.value = "";
    statusEl.textContent = error.message;
    statusEl.className = "error";
  } finally {
    translateBtn.disabled = false;
  }
}


// === EVENT LISTENERS ===
translateBtn.addEventListener("click", translate);

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "translate" && message.text) {
    sourceText.value = message.text;
    translate();
  }
});