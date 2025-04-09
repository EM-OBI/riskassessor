// You no longer need basePath — the <base href="..."> in your HTML handles it!

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

export function initializeHeaderFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    loadPartial("main-header", "partials/header.html");
    loadPartial("main-footer", "partials/footer.html");
  });
}