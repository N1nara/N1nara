const CATEGORY_ALIASES = {
  pets: "Pets",
  pet: "Pets",
  pessoas: "Pessoas",
  pessoa: "Pessoas",
  nfc: "NFC",
  decoracao: "Decoração",
  decoração: "Decoração",
  presentes: "Presentes",
  empresas: "Empresas",
  personalizados: "Personalizados"
};

function renderProductsPage() {
  const list = document.querySelector("[data-products-list]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const sort = document.querySelector("[data-sort]");
  const clear = document.querySelector("[data-clear-filters]");
  const count = document.querySelector("[data-results-count]");
  const params = new URLSearchParams(location.search);

  category.innerHTML = CATEGORIAS.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

  const requestedCategory = CATEGORY_ALIASES[(params.get("categoria") || "").toLowerCase()];
  if (requestedCategory && CATEGORIAS.includes(requestedCategory)) {
    category.value = requestedCategory;
  }

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

    count.textContent = `${items.length} ${items.length === 1 ? "produto encontrado" : "produtos encontrados"}.`;
    list.innerHTML = items.length
      ? items.map(productCard).join("")
      : `<div class="empty"><h2>Nenhum produto encontrado.</h2><p>Tente limpar os filtros ou buscar por outro termo.</p><a class="btn primary" href="produtos.html">Ver todos os produtos</a></div>`;
  }

  [search, category, sort].forEach((field) => field.addEventListener("input", apply));
  clear.addEventListener("click", () => {
    search.value = "";
    category.value = "Todos";
    sort.value = "";
    history.replaceState(null, "", "produtos.html");
    apply();
  });
  apply();
}

document.addEventListener("DOMContentLoaded", renderProductsPage);
