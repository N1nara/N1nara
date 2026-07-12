function renderProductCards() {
  const list = document.querySelector("[data-products-list]");
  if (!list) return;
  const base = resolveBasePath();
  list.innerHTML = `
    <article class="card">
      <div class="card-body">
        <h3>Catálogo atualizado</h3>
        <p>Os produtos oficiais estão organizados no catálogo principal da N1nara.</p>
        <a class="button secondary" href="${base}produtos.html">Ver produtos</a>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", renderProductCards);
