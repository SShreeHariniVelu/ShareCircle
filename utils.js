// src/js/utils.js

export function showToast(message, type = "success") {
  const container = document.getElementById("toast");
  if (!container) return;
  const el = document.createElement("div");
  el.className = `toast-msg ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}