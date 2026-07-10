function renderCart() {
  const root = document.querySelector("[data-cart-page]");
  if (!root) return;
  const cart = getCart();

  if (!cart.length) {
    root.innerHTML = `
      <section class="page-hero">
        <h1>Seu pedido está vazio.</h1>
        <p>Escolha seus produtos personalizados e adicione ao pedido.</p>
        <a class="btn primary" href="produtos.html">Ver produtos</a>
      </section>
    `;
    return;
  }

  root.innerHTML = `
    <section class="page-hero compact">
      <p class="eyebrow">Pedido</p>
      <h1>Carrinho</h1>
      <p>O pedido fica salvo neste navegador até você limpar manualmente.</p>
    </section>
    <section class="cart-layout">
      <div class="cart-items">
        ${cart.map(cartItem).join("")}
      </div>
      <aside class="cart-summary">
        <h2>Resumo</h2>
        <p>Quantidade de itens: <strong>${cartCount()}</strong></p>
        <p>Subtotal: <strong>${moeda(cartTotal())}</strong></p>
        <p>Frete: <strong>a combinar</strong></p>
        <p class="total">Total: <strong>${moeda(cartTotal())}</strong></p>
        <p class="notice">Frete e prazo de entrega serão confirmados pelo WhatsApp.</p>
        <button class="btn primary" type="button" data-finish>Finalizar pelo WhatsApp</button>
        <a class="btn ghost" href="produtos.html">Continuar comprando</a>
        <button class="btn danger" type="button" data-clear>Limpar pedido</button>
      </aside>
    </section>
  `;
}

function cartItem(item) {
  const options = Object.entries(item.opcoes || {})
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");
  return `
    <article class="cart-item">
      <div class="product-thumb small">${item.imagem || "N1"}</div>
      <div>
        <h3>${item.nome}</h3>
        <ul>${options}</ul>
        <p>Valor unitário: <strong>${item.sobConsulta ? "Sob consulta" : moeda(item.valorUnitario)}</strong></p>
        <p>Subtotal: <strong>${item.sobConsulta ? "Sob consulta" : moeda(item.subtotal)}</strong></p>
      </div>
      <div class="cart-controls">
        <button type="button" data-decrease="${item.id}">−</button>
        <span>${item.quantidade}</span>
        <button type="button" data-increase="${item.id}">+</button>
        <button type="button" data-remove="${item.id}">Remover</button>
      </div>
    </article>
  `;
}

function changeQuantity(id, delta) {
  const cart = getCart().map((item) => {
    if (item.id !== id) return item;
    const quantidade = Math.max(1, Number(item.quantidade) + delta);
    return { ...item, quantidade, subtotal: quantidade * Number(item.valorUnitario || 0) };
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

function finishWhatsApp() {
  const cart = getCart();
  if (!cart.length) return;
  const lines = ["Olá! Quero fazer um pedido:", ""];
  cart.forEach((item) => {
    lines.push(`${item.quantidade}x ${item.nome}`);
    Object.entries(item.opcoes || {}).forEach(([key, value]) => lines.push(`${key}: ${value}`));
    lines.push(`Valor unitário: ${item.sobConsulta ? "Sob consulta" : moeda(item.valorUnitario)}`);
    lines.push(`Subtotal: ${item.sobConsulta ? "Sob consulta" : moeda(item.subtotal)}`, "");
  });
  lines.push(`Total: ${moeda(cartTotal())}`, "", "Nome:", "Cidade:", "CEP:", "Observações:", "", "Frete e prazo de produção a combinar.");
  openWhatsApp(lines.join("\n"));
}

document.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-increase]");
  const dec = event.target.closest("[data-decrease]");
  const rem = event.target.closest("[data-remove]");
  if (inc) changeQuantity(inc.dataset.increase, 1);
  if (dec) changeQuantity(dec.dataset.decrease, -1);
  if (rem) removeItem(rem.dataset.remove);
  if (event.target.closest("[data-finish]")) finishWhatsApp();
  if (event.target.closest("[data-clear]") && confirm("Limpar todo o pedido?")) {
    saveCart([]);
    renderCart();
    toast("Pedido limpo.");
  }
});

document.addEventListener("DOMContentLoaded", renderCart);
