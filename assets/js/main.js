const N1 = {
  config: null,
  products: []
};

const DEFAULT_CONFIG = {
  brand: "N1nara",
  siteUrl: "https://n1nara.github.io/N1nara",
  logo: "images/Logo N1.png",
  instagramUrl: "https://www.instagram.com/n1nara",
  whatsappNumber: "5521984004976",
  catalogUrl: "produtos.html",
  latestInstagramEmbedUrl: "",
  defaultLocationMessage: "Olá! Vim pelo site da N1nara."
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${path}`);
  }
  return response.json();
}

function resolveBasePath() {
  const path = window.location.pathname;
  if (!path.includes("/produto/")) return "";
  return path.endsWith(".html") ? "../" : "../../";
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function productUrl(slug) {
  const base = resolveBasePath();
  return `${base}produto/${slug}.html`;
}

function whatsappLink(message) {
  const number = N1.config?.whatsappNumber || "5521984004976";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function initHeader() {
  const base = resolveBasePath();
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-logo]").forEach((logo) => {
    logo.src = `${base}${N1.config.logo}`;
    logo.onerror = () => {
      logo.style.display = "none";
    };
  });
  document.querySelectorAll("[data-instagram-link]").forEach((link) => {
    link.href = N1.config.instagramUrl;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappLink("Olá! Vim pelo site da N1nara e gostaria de mais informações.");
  });
  document.querySelectorAll("[data-catalog-link]").forEach((link) => {
    link.href = `${base}${N1.config.catalogUrl}`;
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.endsWith(current)) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initFloatingActions() {
  const root = document.querySelector("[data-floating-actions]");
  if (!root) return;
  root.innerHTML = `
    <a class="float-button" href="${whatsappLink("Olá! Vim pelo site da N1nara.")}" target="_blank" rel="noopener" title="WhatsApp" aria-label="WhatsApp">W</a>
    <a class="float-button" href="${N1.config.instagramUrl}" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">IG</a>
    <a class="float-button" href="#top" title="Voltar ao topo" aria-label="Voltar ao topo">↑</a>
  `;
}

function initInstagramEmbed() {
  const frame = document.querySelector("[data-instagram-embed]");
  if (!frame) return;

  if (N1.config.latestInstagramEmbedUrl) {
    frame.src = N1.config.latestInstagramEmbedUrl;
    return;
  }

  const box = frame.closest(".embed-box");
  if (!box) return;
  box.innerHTML = `
    <div class="card-body">
      <h2>Vídeo mais recente do Instagram</h2>
      <p class="muted">Coloque o link de incorporação do Reels em <strong>data/config.json</strong> para exibir o vídeo automaticamente aqui.</p>
      <a class="button accent" href="${N1.config.instagramUrl}" target="_blank" rel="noopener">Ver Instagram</a>
    </div>
  `;
}

function initQrCodes() {
  document.querySelectorAll("[data-qrcode]").forEach((img) => {
    const target = img.dataset.qrcode || window.location.href;
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(target)}`;
    img.alt = "QR Code para abrir esta página";
  });
}

function buildNav(base = "") {
  return `
    <header class="site-header">
      <nav class="nav" aria-label="Menu principal">
        <a class="brand-link" href="${base}index.html">
          <img class="brand-logo" data-logo alt="Logo N1nara">
          <span>N1nara</span>
        </a>
        <div class="nav-links">
          <a href="${base}index.html">Home</a>
          <a href="${base}produtos.html">Produtos</a>
          <a href="${base}pet.html">Pet</a>
          <a href="${base}pessoa.html">Pessoa</a>
          <a href="${base}bagagem.html">Bagagem</a>
          <a href="${base}sobre.html">Sobre</a>
          <a href="#" data-instagram-link target="_blank" rel="noopener">Instagram</a>
          <a href="#" data-whatsapp-link target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </nav>
    </header>
  `;
}

function buildFooter() {
  return `
    <footer class="site-footer">
      <p>N1nara - Produtos personalizados, identificação e soluções criativas.</p>
    </footer>
    <div class="floating-actions" data-floating-actions></div>
  `;
}

async function initSite() {
  const base = resolveBasePath();
  try {
    N1.config = await loadJson(`${base}data/config.json`);
  } catch {
    N1.config = DEFAULT_CONFIG;
  }

  try {
    N1.products = await loadJson(`${base}data/produtos.json`);
  } catch {
    N1.products = [];
  }

  document.querySelector("[data-header]")?.insertAdjacentHTML("afterbegin", buildNav(base));
  document.querySelector("[data-footer]")?.insertAdjacentHTML("beforeend", buildFooter());
  initHeader();
  initFloatingActions();
  initInstagramEmbed();
  initQrCodes();
}

document.addEventListener("DOMContentLoaded", initSite);
