const ORDER_NOTES_KEY = "n1naraPedidoObservacoes";

function cleanText(value) {
  return String(value || "").trim();
}

function definedOptions(options = {}) {
  const seen = new Set();
  return Object.entries(options).filter(([key, value]) => {
    const cleanKey = cleanText(key);
    const cleanValue = cleanText(value);
    const signature = `${cleanKey}:${cleanValue}`;
    if (!cleanKey || !cleanValue || cleanValue === "undefined" || cleanValue === "null" || seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

function cartItemsWithDefinedPrice() {
  return getCart().filter((item) => !item.sobConsulta);
}

function cartHasQuoteItems() {
  return getCart().some((item) => item.sobConsulta);
}

function saveOrderNotes() {
  const field = document.querySelector("[data-order-notes]");
  if (field) localStorage.setItem(ORDER_NOTES_KEY, field.value);
}

function renderCart() {
  const root = document.querySelector("[data-cart-page]");
  if (!root) return;
  const cart = getCart();
  const notes = localStorage.getItem(ORDER_NOTES_KEY) || "";

  if (!cart.length) {
    root.innerHTML = `
      <section class="page-hero">
        <p class="eyebrow">Meu pedido</p>
        <h1>Seu pedido está vazio.</h1>
        <p>Escolha seus produtos personalizados e adicione ao pedido para finalizar pelo WhatsApp.</p>
        <div class="actions">
          <a class="btn primary" href="produtos.html">Ver produtos</a>
          <a class="btn ghost" href="produtos.html?categoria=nfc">Ver produtos com NFC</a>
        </div>
      </section>
    `;
    return;
  }

  root.innerHTML = `
    <section class="page-hero compact">
      <p class="eyebrow">Meu pedido</p>
      <h1>Revise seu pedido</h1>
      <p>O pedido fica salvo neste navegador até você limpar manualmente.</p>
    </section>
    <section class="cart-layout">
      <div class="cart-items">
        ${cart.map(cartItem).join("")}
        <label class="order-notes">Observações do pedido
          <textarea data-order-notes placeholder="Ex.: nomes, cores, detalhes da personalização ou dúvidas para o atendimento.">${notes}</textarea>
        </label>
      </div>
      <aside class="cart-summary">
        <h2>Resumo</h2>
        <p>Quantidade de itens: <strong>${cartCount()}</strong></p>
        <p>${cartHasQuoteItems() ? "Total parcial dos itens com preço definido" : "Total estimado"}: <strong>${moeda(cartTotal())}</strong></p>
        ${cartHasQuoteItems() ? `<p class="notice">Os itens sob consulta serão avaliados no atendimento.</p>` : ""}
        <p class="notice">Prazo de produção e entrega serão confirmados pelo WhatsApp.</p>
        <button class="btn primary" type="button" data-finish>Finalizar pelo WhatsApp</button>
        <a class="btn ghost" href="produtos.html">Continuar escolhendo</a>
        <button class="btn danger" type="button" data-clear>Esvaziar pedido</button>
      </aside>
    </section>
  `;
}

function cartItem(item) {
  const options = definedOptions(item.opcoes)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");

  return `
    <article class="cart-item">
      ${/\.(png|jpe?g|webp|gif|svg)$/i.test(item.imagem || "") ? `<img class="product-thumb small" src="${item.imagem}" alt="${item.nome}" width="74" height="74" loading="lazy">` : `<div class="product-thumb small">${item.imagem || "N1"}</div>`}
      <div>
        <h3>${item.nome}</h3>
        ${options ? `<ul>${options}</ul>` : `<p class="muted">Detalhes a combinar pelo WhatsApp.</p>`}
        <p>Preço unitário: <strong>${item.sobConsulta ? "Valor sob consulta" : moeda(item.valorUnitario)}</strong></p>
        <p>Subtotal: <strong>${item.sobConsulta ? "Valor sob consulta" : moeda(item.subtotal)}</strong></p>
        ${item.sobConsulta ? `<p class="quote-note">Este item será avaliado no atendimento.</p>` : ""}
      </div>
      <div class="cart-controls" aria-label="Controles de ${item.nome}">
        <button type="button" data-decrease="${item.id}" aria-label="Diminuir quantidade de ${item.nome}">-</button>
        <span aria-label="Quantidade">${item.quantidade}</span>
        <button type="button" data-increase="${item.id}" aria-label="Aumentar quantidade de ${item.nome}">+</button>
        <button type="button" data-remove="${item.id}">Remover</button>
      </div>
    </article>
  `;
}

function changeQuantity(id, delta) {
  const cart = getCart().map((item) => {
    if (item.id !== id) return item;
    const quantidade = Math.max(1, Number(item.quantidade || 1) + delta);
    return { ...item, quantidade, subtotal: item.sobConsulta ? 0 : quantidade * Number(item.valorUnitario || 0) };
  });
  saveCart(cart);
  renderCart();
  toast("Quantidade atualizada.");
}

function removeItem(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  renderCart();
  toast("Produto removido.");
}

function formatWhatsAppOrder() {
  const cart = getCart();
  const notes = cleanText(localStorage.getItem(ORDER_NOTES_KEY));
  const lines = ["Olá! Quero fazer um pedido na N1nara:", ""];

  cart.forEach((item, index) => {
    if (index > 0) lines.push("");
    lines.push(item.nome);
    lines.push(`Quantidade: ${item.quantidade}`);
    const options = definedOptions(item.opcoes);
    if (options.length) {
      lines.push("Opções:");
      options.forEach(([key, value]) => lines.push(`${key}: ${value}`));
    }
    if (item.sobConsulta) {
      lines.push("Preço unitário: Valor sob consulta");
      lines.push("Subtotal: Valor sob consulta");
    } else {
      lines.push(`Preço unitário: ${moeda(item.valorUnitario)}`);
      lines.push(`Subtotal: ${moeda(item.subtotal)}`);
    }
  });

  if (notes) {
    lines.push("", "Observações:", notes);
  }

  lines.push("", `Total parcial: ${moeda(cartTotal())}`);
  if (cartHasQuoteItems()) lines.push("Os itens sob consulta serão avaliados no atendimento.");
  lines.push("");
  lines.push("Tenho ciência de que produtos personalizados ou sob consulta podem precisar de avaliação antes da confirmação do valor final.");
  lines.push("Podem me orientar sobre o envio das fotos ou referências?");

  return lines.join("\n");
}

function finishWhatsApp() {
  if (!getCart().length) {
    toast("Seu pedido está vazio.");
    return;
  }
  saveOrderNotes();
  openWhatsApp(formatWhatsAppOrder());
}

document.addEventListener("input", (event) => {
  if (event.target.closest("[data-order-notes]")) saveOrderNotes();
});

document.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-increase]");
  const dec = event.target.closest("[data-decrease]");
  const rem = event.target.closest("[data-remove]");
  if (inc) changeQuantity(inc.dataset.increase, 1);
  if (dec) changeQuantity(dec.dataset.decrease, -1);
  if (rem) removeItem(rem.dataset.remove);
  if (event.target.closest("[data-finish]")) finishWhatsApp();
  if (event.target.closest("[data-clear]") && confirm("Esvaziar todo o pedido?")) {
    saveCart([]);
    localStorage.removeItem(ORDER_NOTES_KEY);
    renderCart();
    toast("Pedido esvaziado.");
  }
});

document.addEventListener("DOMContentLoaded", renderCart);
