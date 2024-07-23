"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

// Tab Cloak Handle

function cloakTab(title, faviconPath) {
    document.title = title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = faviconPath;

    // Store the chosen title and favicon in localStorage to persist across pages
    localStorage.setItem('tabTitle', title);
    localStorage.setItem('tabFavicon', faviconPath);
}

// Load the stored title and favicon when the page loads
window.addEventListener('load', () => {
    const storedTitle = localStorage.getItem('tabTitle');
    const storedFavicon = localStorage.getItem('tabFavicon');
    if (storedTitle && storedFavicon) {
        cloakTab(storedTitle, storedFavicon);
    }
});
