const CATEGORY_ALIASES = {
  pets: "Pets",
  pet: "Pets",
  pessoas: "Pessoas",
  pessoa: "Pessoas",
  nfc: "NFC",
  decoracao: "Decoração",
  "decoração": "Decoração",
  presentes: "Presentes",
  empresas: "Empresas",
  personalizados: "Personalizados"
};

function normalizeCategory(value) {
  if (!value) return "Todos";
  return CATEGORY_ALIASES[value.toLowerCase()] || value;
}

function readCatalogState() {
  const params = new URLSearchParams(location.search);
  return {
    busca: params.get("busca") || "",
    categoria: normalizeCategory(params.get("categoria")),
    ordem: params.get("ordem") || ""
  };
}

function writeCatalogState({ busca, categoria, ordem }) {
  const params = new URLSearchParams();
  if (busca) params.set("busca", busca);
  if (categoria && categoria !== "Todos") params.set("categoria", categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  if (ordem) params.set("ordem", ordem);
  const url = params.toString() ? `produtos.html?${params.toString()}` : "produtos.html";
  history.replaceState(null, "", url);
}

function renderProductsPage() {
  const list = document.querySelector("[data-products-list]");
  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const sort = document.querySelector("[data-sort]");
  const clear = document.querySelector("[data-clear-filters]");
  const count = document.querySelector("[data-results-count]");
  const loading = document.querySelector("[data-catalog-loading]");
  if (!list || !search || !category || !sort || !clear || !count) return;
  if (loading) loading.hidden = true;

  category.innerHTML = CATEGORIAS.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

  function setFieldsFromUrl() {
    const state = readCatalogState();
    search.value = state.busca;
    category.value = CATEGORIAS.includes(state.categoria) ? state.categoria : "Todos";
    sort.value = state.ordem;
  }

  function apply({ updateUrl = true } = {}) {
    const term = search.value.trim().toLowerCase();
    const cat = category.value;
    let items = PRODUTOS.filter((produto) => {
      const content = `${produto.nome} ${produto.descricao} ${produto.usos || produto.uso || ""}`.toLowerCase();
      const matchTerm = !term || content.includes(term);
      const matchCat = cat === "Todos" || produto.categoria.includes(cat) || (produto.categoriasSecundarias || []).includes(cat);
      return matchTerm && matchCat;
    });

    if (sort.value === "menor") items.sort((a, b) => (a.precoInicial || 999999) - (b.precoInicial || 999999));
    if (sort.value === "maior") items.sort((a, b) => (b.precoInicial || 0) - (a.precoInicial || 0));

    count.textContent = `${items.length} ${items.length === 1 ? "produto encontrado" : "produtos encontrados"}.`;
    list.classList.remove("catalog-fallback");
    list.innerHTML = items.length
      ? items.map(productCard).join("")
      : `<div class="empty-state catalog-empty"><h2>Nenhum produto corresponde aos filtros escolhidos.</h2><p>Limpe os filtros ou veja todas as opções.</p><button class="btn primary" type="button" data-clear-filters-inline>Limpar filtros</button></div>`;

    if (updateUrl) {
      writeCatalogState({ busca: search.value.trim(), categoria: category.value, ordem: sort.value });
    }
  }

  function resetFilters() {
    search.value = "";
    category.value = "Todos";
    sort.value = "";
    writeCatalogState({ busca: "", categoria: "Todos", ordem: "" });
    apply({ updateUrl: false });
  }

  [search, category, sort].forEach((field) => field.addEventListener("input", () => apply()));
  clear.addEventListener("click", resetFilters);
  list.addEventListener("click", (event) => {
    if (event.target.closest("[data-clear-filters-inline]")) resetFilters();
  });
  window.addEventListener("popstate", () => {
    setFieldsFromUrl();
    apply({ updateUrl: false });
  });

  setFieldsFromUrl();
  apply({ updateUrl: false });
}

document.addEventListener("DOMContentLoaded", renderProductsPage);
