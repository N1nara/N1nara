function renderHome() {
  const destaques = PRODUTOS.filter((produto) => produto.destaque);
  document.querySelector("[data-featured-products]").innerHTML = destaques.map(productCard).join("");

  const frame = document.querySelector("[data-instagram-frame]");
  const empty = document.querySelector("[data-instagram-empty]");
  if (N1_CONFIG.latestPostUrl) {
    frame.src = N1_CONFIG.latestPostUrl;
    frame.hidden = false;
    empty.hidden = true;
  } else {
    frame.hidden = true;
    empty.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", renderHome);
