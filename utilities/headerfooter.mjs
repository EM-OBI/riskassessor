// Get absolute base path depending on hosting location (e.g., GitHub Pages)
const basePath = `${window.location.origin}/riskassessor/`;

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

// Initialize header and footer by loading them from absolute URLs
export function initializeHeaderFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    loadPartial("main-header", `${basePath}partials/header.html`);
    loadPartial("main-footer", `${basePath}partials/footer.html`);
  });
}