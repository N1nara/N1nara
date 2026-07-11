const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function moeda(valor) {
  return BRL.format(Number(valor || 0));
}

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("n1naraPedido") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    localStorage.removeItem("n1naraPedido");
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("n1naraPedido", JSON.stringify(cart));
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

function toast(message) {
  let box = document.querySelector(".toast");
  if (!box) {
    box = document.createElement("div");
    box.className = "toast";
    box.setAttribute("role", "status");
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 2800);
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
        <img src="Logo%20N1.png" onerror="this.onerror=null;this.src='logo-n1nara.svg';" alt="Logo N1nara">
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
  document.querySelector("[data-footer]").innerHTML = `
    <footer class="footer">
      <div>
        <strong>N1nara</strong>
        <p>Produtos personalizados em impressão 3D, NFC e produção sob encomenda.</p>
        <p class="privacy">Produtos personalizados podem variar conforme arte, tamanho, cores e acabamento. Pedidos são finalizados pelo WhatsApp.</p>
      </div>
      <div class="footer-links">
        <a href="produtos.html">Produtos</a>
        <a href="index.html#como-funciona">Como funciona</a>
        <a href="index.html#nfc">NFC</a>
        <a href="sobre.html">Sobre</a>
        <a href="carrinho.html">Meu pedido</a>
        <a href="${N1_CONFIG.instagramUrl}" target="_blank" rel="noopener">@n1nara</a>
        <a href="${whatsappUrl("Olá! Gostaria de falar com a N1nara.")}" target="_blank" rel="noopener">(21) 98400-4976</a>
      </div>
    </footer>
  `;
}

function floatingActions() {
  const actions = document.querySelector("[data-floating]");
  if (!actions) return;
  actions.innerHTML = `
    <div class="floating-actions" aria-label="Ações rápidas">
      <a href="${whatsappUrl("Olá! Vim pelo site da N1nara.")}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
      <a href="carrinho.html" aria-label="Meu pedido">Pedido <span data-cart-count>0</span></a>
      <a href="#top" aria-label="Voltar ao topo">Topo</a>
    </div>
  `;
}

function productCard(produto) {
  const hasNfc = produto.nfc ? `<span class="badge">Com NFC</span>` : "";
  const addButton = produto.precoInicial || produto.precoInicial === 0
    ? `<button class="btn primary" type="button" data-quick-add="${produto.id}">Adicionar ao pedido</button>`
    : "";

  return `
    <article class="product-card" data-category="${produto.categoria.join(" ")}">
      ${productMedia(produto, "product-thumb")}
      <div class="product-card-body">
        <div class="badges"><span class="badge">Personalizado</span>${hasNfc}</div>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <strong class="card-price">${produto.precoInicial ? `A partir de ${moeda(produto.precoInicial)}` : "Sob consulta"}</strong>
      </div>
      <div class="card-actions">
        <a class="btn ghost" href="${produto.arquivo}">Ver detalhes</a>
        ${addButton}
      </div>
    </article>
  `;
}

function productMedia(produto, className = "product-thumb") {
  const image = produto.imagem || "";
  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(image)) {
    return `<img class="${className}" src="${image}" alt="${produto.nome}" width="640" height="480" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: '${className}', textContent: '${produto.nome}' }))">`;
  }
  return `<div class="${className}" aria-hidden="true">${image || produto.nome}</div>`;
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
    observacoes: ""
  };
  saveCart([...getCart(), item]);
  toast("Produto adicionado ao pedido.");
}

function bindQuickAdd() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick-add]");
    if (button) quickAdd(button.dataset.quickAdd);
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

function initBase() {
  header();
  footer();
  floatingActions();
  bindQuickAdd();
  initFaq();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", initBase);
