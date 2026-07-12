const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
let memoryCart = [];

function storageAvailable() {
  try {
    const key = "__n1_storage_test__";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

const HAS_STORAGE = storageAvailable();

function moeda(valor) {
  return BRL.format(Number(valor || 0));
}

function getCart() {
  if (!HAS_STORAGE) return memoryCart;
  try {
    const cart = JSON.parse(localStorage.getItem("n1naraPedido") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    try {
      const raw = localStorage.getItem("n1naraPedido");
      if (raw) sessionStorage.setItem(`n1naraPedidoBackup-${Date.now()}`, raw);
      localStorage.removeItem("n1naraPedido");
    } catch {
      return [];
    }
    return [];
  }
}

function saveCart(cart) {
  if (HAS_STORAGE) {
    try {
      localStorage.setItem("n1naraPedido", JSON.stringify(Array.isArray(cart) ? cart : []));
    } catch {
      memoryCart = Array.isArray(cart) ? cart : [];
      toast("Não foi possível salvar o pedido neste navegador. Você ainda pode finalizar pelo WhatsApp.");
    }
  } else {
    memoryCart = Array.isArray(cart) ? cart : [];
  }
  updateCartCount();
}

function cartCount() {
  return getCart().reduce((total, item) => total + Number(item.quantidade || 0), 0);
}

function cartTotal() {
  return getCart().reduce((total, item) => total + Number(item.subtotal || 0), 0);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((item) => {
    item.textContent = cartCount();
  });
}

function toast(message, actions = []) {
  let box = document.querySelector(".toast");
  if (!box) {
    box = document.createElement("div");
    box.className = "toast";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  box.innerHTML = `
    <span>${message}</span>
    ${actions.length ? `<div class="toast-actions">${actions.map((action) => `<a href="${action.href}">${action.label}</a>`).join("")}</div>` : ""}
  `;
  box.classList.add("show");
  clearTimeout(window.n1ToastTimer);
  window.n1ToastTimer = setTimeout(() => box.classList.remove("show"), 4200);
}

function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `n1-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function whatsappUrl(message) {
  return `https://wa.me/${N1_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), "_blank", "noopener");
}

function pageName() {
  return location.pathname.split("/").pop() || "index.html";
}

function header() {
  const current = pageName();
  document.querySelector("[data-header]").innerHTML = `
    <header class="topbar">
      <a class="brand" href="index.html" aria-label="N1nara">
        <img src="Logo%20N1.png" onerror="this.onerror=null;this.src='logo-n1nara.svg';" alt="Logo N1nara" decoding="async">
        <span><strong>N1nara</strong><small>Impressão 3D personalizada</small></span>
      </a>
      <div class="header-tools">
        <a class="header-cart" href="carrinho.html" aria-label="Abrir meu pedido">
          <span aria-hidden="true">Pedido</span>
          <strong data-cart-count>0</strong>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">Menu</button>
      </div>
      <nav class="nav" id="menu" aria-label="Menu principal">
        ${navLink("index.html", "Início", current)}
        ${navLink("produtos.html", "Produtos", current)}
        <a href="index.html#como-funciona">Como funciona</a>
        <a href="index.html#nfc">NFC</a>
        ${navLink("sobre.html", "Sobre", current)}
        <a class="cart-link" href="carrinho.html" aria-label="Abrir meu pedido">Meu pedido (<span data-cart-count>0</span>)</a>
        <a class="nav-cta" href="${whatsappUrl("Olá! Vim pelo site da N1nara.")}" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
      </nav>
    </header>
  `;

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#menu");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

function navLink(href, label, current) {
  return `<a href="${href}" ${current === href ? 'aria-current="page"' : ""}>${label}</a>`;
}

function footer() {
  const year = new Date().getFullYear();
  document.querySelector("[data-footer]").innerHTML = `
    <footer class="footer">
      <div class="footer-brand">
        <img src="Logo%20N1.png" onerror="this.onerror=null;this.src='logo-n1nara.svg';" alt="Logo N1nara" loading="lazy" decoding="async">
        <strong>N1nara</strong>
        <p>Produtos personalizados em impressão 3D.</p>
      </div>
      <nav class="footer-col" aria-label="Navegação do rodapé">
        <h2>Navegação</h2>
        <a href="index.html">Início</a>
        <a href="produtos.html">Produtos</a>
        <a href="index.html#como-funciona">Como funciona</a>
        <a href="sobre.html">Sobre</a>
      </nav>
      <nav class="footer-col" aria-label="Páginas de identificação">
        <h2>Identificação</h2>
        <a href="produtos.html?categoria=nfc">Produtos com NFC</a>
        <a href="pet.html">Página Pet</a>
        <a href="pessoa.html">Página Pessoa</a>
        <a href="bagagem.html">Página Bagagem</a>
      </nav>
      <nav class="footer-col" aria-label="Contato">
        <h2>Contato</h2>
        <a href="${N1_CONFIG.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
        <a href="${whatsappUrl("Olá! Gostaria de falar com a N1nara.")}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="#top">Voltar ao topo</a>
      </nav>
      <p class="footer-copy">© ${year} N1nara. Produtos personalizados podem variar conforme arte, tamanho, cores e acabamento. Pedidos são finalizados pelo WhatsApp.</p>
    </footer>
  `;
}

function floatingActions() {
  const actions = document.querySelector("[data-floating]");
  if (!actions) return;
  actions.innerHTML = `
    <div class="floating-actions" aria-label="Contato rápido">
      <a class="floating-whatsapp" href="${whatsappUrl("Olá! Vim pelo site da N1nara.")}" target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp"><span>Falar pelo WhatsApp</span><strong aria-hidden="true">WA</strong></a>
    </div>
  `;
}

function productCard(produto) {
  const hasNfc = produto.nfcDisponivel ? `<span class="badge">Com NFC</span>` : "";
  const addButton = produto.precoInicial || produto.precoInicial === 0
    ? `<button class="btn primary" type="button" data-quick-add="${produto.id}">Adicionar ao pedido</button>`
    : "";
  const priceText = produto.sobConsulta ? "Sob consulta" : `${produto.precoInicial ? "A partir de " : ""}${moeda(produto.preco || produto.precoInicial)}`;

  return `
    <article class="product-card" data-category="${produto.categoria.join(" ")}">
      ${productMedia(produto, "product-thumb")}
      <div class="product-card-body">
        <div class="badges"><span class="badge">Personalizado</span>${hasNfc}</div>
        <h3>${produto.nome}</h3>
        <p>${produto.resumo || produto.descricao}</p>
        <strong class="card-price">${priceText}</strong>
      </div>
      <div class="card-actions">
        <a class="btn ghost" href="${produto.pagina || produto.arquivo}">Ver detalhes</a>
        ${addButton}
      </div>
    </article>
  `;
}

function productMedia(produto, className = "product-thumb") {
  const image = produto.imagem || "";
  const alt = produto.alt || produto.nome || "Produto N1nara";
  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(image)) {
    return `<img class="${className}" src="${image}" alt="${alt}" width="640" height="640" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: '${className} image-fallback', textContent: 'Imagem indisponível' }))">`;
  }
  return `<div class="${className} image-fallback" aria-label="Imagem indisponível">${image || produto.nome}</div>`;
}

function quickAdd(productId) {
  const produto = produtoPorId(productId);
  if (!produto) return;
  const item = {
    id: uid(),
    produtoId: produto.id,
    nome: produto.nome,
    imagem: produto.imagem,
    opcoes: { "Pedido rápido": "Detalhes a combinar pelo WhatsApp" },
    quantidade: 1,
    valorUnitario: produto.precoInicial || 0,
    subtotal: produto.precoInicial || 0,
    sobConsulta: produto.sobConsulta || !produto.precoInicial,
    observacoes: ""
  };
  saveCart([...getCart(), item]);
  toast("Produto adicionado ao pedido.", [
    { label: "Ver pedido", href: "carrinho.html" },
    { label: "Continuar escolhendo", href: "produtos.html" }
  ]);
}

function bindQuickAdd() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick-add]");
    if (!button || button.disabled) return;
    button.disabled = true;
    quickAdd(button.dataset.quickAdd);
    setTimeout(() => {
      button.disabled = false;
    }, 900);
  });
}

function initFaq() {
  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });
}

function injectPageBreadcrumb() {
  if (document.getElementById("breadcrumb-jsonld") || pageName() === "index.html") return;
  const labels = {
    "produtos.html": "Produtos",
    "sobre.html": "Sobre",
    "carrinho.html": "Meu pedido",
    "pet.html": "Página Pet",
    "pessoa.html": "Página Pessoa",
    "bagagem.html": "Página Bagagem",
    "404.html": "Página não encontrada"
  };
  const current = pageName();
  const label = labels[current];
  if (!label) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "breadcrumb-jsonld";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: new URL("index.html", N1_CONFIG.siteUrl).href },
      { "@type": "ListItem", position: 2, name: label, item: new URL(current, N1_CONFIG.siteUrl).href }
    ]
  });
  document.head.appendChild(script);
}

function initBase() {
  header();
  footer();
  floatingActions();
  bindQuickAdd();
  initFaq();
  injectPageBreadcrumb();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", initBase);
