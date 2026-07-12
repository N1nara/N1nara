const N1 = {
  config: {
    brand: "N1nara",
    siteUrl: "https://n1nara.github.io/N1nara",
    instagramUrl: "https://www.instagram.com/n1nara",
    whatsappNumber: "5521984004976",
    catalogUrl: "produtos.html"
  },
  products: []
};

function resolveBasePath() {
  const path = window.location.pathname;
  if (path.includes("/produto/") || path.includes("/produtos/")) {
    return path.endsWith("index.html") || path.endsWith("/") ? "../../" : "../";
  }
  return "";
}

function whatsappLink(message) {
  return `https://wa.me/${N1.config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function initLegacyShell() {
  const base = resolveBasePath();
  document.querySelector("[data-header]")?.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <nav class="nav" aria-label="Menu principal">
        <a class="brand-link" href="${base}index.html">N1nara</a>
        <div class="nav-links">
          <a href="${base}index.html">Início</a>
          <a href="${base}produtos.html">Produtos</a>
          <a href="${base}sobre.html">Sobre</a>
          <a href="${N1.config.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
          <a href="${whatsappLink("Olá! Vim pelo site da N1nara.")}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </nav>
    </header>
  `);
  document.querySelector("[data-footer]")?.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <p>N1nara - Produtos personalizados em impressão 3D.</p>
    </footer>
  `);
}

document.addEventListener("DOMContentLoaded", initLegacyShell);
