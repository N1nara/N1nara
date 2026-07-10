function renderProductsPage() {
  const list = document.querySelector("[data-products-list]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const sort = document.querySelector("[data-sort]");

  category.innerHTML = CATEGORIAS.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

  function apply() {
    const term = search.value.trim().toLowerCase();
    const cat = category.value;
    let items = PRODUTOS.filter((produto) => {
      const matchTerm = produto.nome.toLowerCase().includes(term) || produto.descricao.toLowerCase().includes(term);
      const matchCat = cat === "Todos" || produto.categoria.includes(cat);
      return matchTerm && matchCat;
    });

    if (sort.value === "menor") items.sort((a, b) => (a.precoInicial || 999999) - (b.precoInicial || 999999));
    if (sort.value === "maior") items.sort((a, b) => (b.precoInicial || 0) - (a.precoInicial || 0));

    list.innerHTML = items.length ? items.map(productCard).join("") : `<p class="empty">Nenhum produto encontrado.</p>`;
  }

  [search, category, sort].forEach((field) => field.addEventListener("input", apply));
  apply();
}

document.addEventListener("DOMContentLoaded", renderProductsPage);
