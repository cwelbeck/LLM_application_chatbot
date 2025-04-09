// script.js

const messagesContainer = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Append a message to the chat window
function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerText = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message and get response from backend
async function sendMessage(event) {
  event.preventDefault();
  const prompt = messageInput.value.trim();
  if (!prompt) return;

  // Display user's message
  appendMessage(prompt, 'user');
  messageInput.value = '';

  // Show loading message
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'message bot';
  loadingMsg.id = 'loading-msg';
  loadingMsg.innerText = '🤖 Thinking...';
  messagesContainer.appendChild(loadingMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    const text = await response.text();

    document.getElementById('loading-msg').remove();
    appendMessage(text, 'bot');
  } catch (err) {
    document.getElementById('loading-msg').remove();
    appendMessage('⚠️ Error: Could not connect to the chatbot.', 'bot');
    console.error(err);
  }
}

// Attach form listener
messageForm.addEventListener('submit', sendMessage);
