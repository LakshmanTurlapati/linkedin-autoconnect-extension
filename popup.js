// popup.js

document.getElementById('shuffle-btn').addEventListener('click', () => {
  shuffleTemplate();
});

function shuffleTemplate() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: shuffleMessageTemplate
    }, () => {
      showStatus('Template shuffled!');
    });
  });
}

function showStatus(message) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  setTimeout(() => {
    statusDiv.textContent = '';
  }, 2000);
}

// Function to be executed in the content script context
function shuffleMessageTemplate() {
  const widget = document.getElementById('linkedin-auto-connect-widget');
  if (widget) {
    const shuffleBtn = widget.querySelector('#shuffle-template');
    if (shuffleBtn) shuffleBtn.click();
  }
}