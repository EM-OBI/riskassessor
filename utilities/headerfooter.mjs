// Collect base path dynamically based on current pathname (works locally and on GitHub Pages)
const path = window.location.pathname.split("/");
const repoIndex = path.indexOf("riskassessor");
const basePath = "/" + path.slice(1, repoIndex + 1).join("/") + "/";

// Set <base href="..."> dynamically for consistent relative links
const baseTag = document.createElement("base");
baseTag.href = basePath;
document.head.appendChild(baseTag);

// Function to load a partial (header or footer) into a container by ID
export async function loadPartial(id, partialPath) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res = await fetch(partialPath);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Failed to load ${partialPath}:`, err);
    container.innerHTML = `<p style="color:red;">Error loading ${partialPath}</p>`;
  }
}

// Main function to initialize header and footer
export function initializeHeaderFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    loadPartial("main-header", `${basePath}partials/header.html`);
    loadPartial("main-footer", `${basePath}partials/footer.html`);
  });
}