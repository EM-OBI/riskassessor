// To generate header and footer to avoid repition across all pages

// function to load header and footer partials
export async function loadPartial(id, partialPath) {
  const container = document.getElementById(id);
  if (container) {
    try {
      const res = await fetch(partialPath);
      if (res.ok) {
        const html = await res.text();
        container.innerHTML = html;
      } else {
        container.innerHTML = `<p>Error loading ${partialPath}</p>`;
      }
    } catch (err) {
      console.error(`Failed to load ${partialPath}:`, err);
    }
  }
}

// Main function to initialize header and footer
export function initializeHeaderFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    loadPartial("main-header", `./partials/header.html`);
    loadPartial("main-footer", `./partials/footer.html`);
  });
}