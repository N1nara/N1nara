function renderProductCards() {
  const list = document.querySelector("[data-products-list]");
  if (!list) return;

  if (!N1.products.length) {
    list.innerHTML = `
      <article class="card">
        <div class="card-body">
          <h3>Catálogo em atualização</h3>
          <p>Os produtos não foram carregados agora. Fale pelo WhatsApp para receber o catálogo.</p>
          <a class="button green" href="${whatsappLink("Olá! Gostaria de receber o catálogo da N1nara.")}" target="_blank" rel="noopener">Pedir catálogo</a>
        </div>
      </article>
    `;
    return;
  }

  list.innerHTML = N1.products.map((product) => `
    <article class="card">
      <img src="${product.photos?.[0] || "images/produto-placeholder.svg"}" alt="${product.name}">
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <p><strong>A partir de ${formatCurrency(product.price)}</strong></p>
        <a class="button secondary" href="${productUrl(product.slug)}">Ver produto</a>
      </div>
    </article>
  `).join("");
}

function initProductsAfterLoad() {
  const wait = setInterval(() => {
    if (N1.config) {
      clearInterval(wait);
      renderProductCards();
    }
  }, 30);
}

document.addEventListener("DOMContentLoaded", initProductsAfterLoad);
