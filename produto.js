const PRODUTO_LEGADO_DESTINOS = {
  "cartao-nfc": "produto-n1-tag-nfc.html",
  "tag-para-coleira": "produto-n1-tag-nfc.html",
  "tag-para-mochila": "produto-n1-tag-nfc.html",
  "tag-para-mala": "produto-n1-tag-nfc.html",
  "tag-para-bicicleta": "produto-n1-tag-nfc.html",
  "tag-para-idosos": "produto-n1-tag-nfc.html",
  "tag-para-criancas": "produto-n1-tag-nfc.html",
  "n1-art3d": "produto-n1-art-3d.html",
  "n1-art-3d": "produto-n1-art-3d.html",
  "n1-flat": "produto-n1-flat.html",
  "n1-flat-tag-nfc": "produto-n1-tag-nfc.html",
  "n1-mini-pet": "produto-n1-mini-pet.html",
  "n1-pet-move": "produto-n1-pet-move.html",
  "n1-stencil": "produto-n1-stencil.html",
  "n1-mini-me": "produto-n1-mini-me.html",
  "n1-scult": "produto-n1-sculpt.html",
  "n1-sculpt": "produto-n1-sculpt.html"
};

function destinoLegado() {
  const partes = location.pathname.split("/").filter(Boolean);
  const arquivo = partes[partes.length - 1] || "";
  const pasta = partes[partes.length - 2] || "";
  const chaveArquivo = arquivo.replace(/^produto-/, "").replace(/\.html$/, "");
  const chavePasta = arquivo === "index.html" ? pasta : "";
  return PRODUTO_LEGADO_DESTINOS[chaveArquivo] || PRODUTO_LEGADO_DESTINOS[chavePasta] || "produtos.html";
}

function urlLegado(destino) {
  const script = document.querySelector('script[src$="produto.js"]');
  const base = script ? script.src.replace(/produto\.js.*$/, "") : location.href;
  return new URL(destino, base).href;
}

function renderProdutoLegado() {
  const destino = destinoLegado();
  const destinoUrl = urlLegado(destino);
  document.body.innerHTML = `
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <main id="conteudo" class="legacy-page">
      <section class="page-hero">
        <p class="eyebrow">Página atualizada</p>
        <h1>Este produto mudou de endereço</h1>
        <p>Organizamos as páginas oficiais dos produtos para manter preços e descrições em um único cadastro.</p>
        <div class="actions">
          <a class="btn primary" href="${destinoUrl}">Abrir página oficial</a>
          <a class="btn ghost" href="${urlLegado("produtos.html")}">Ver todos os produtos</a>
        </div>
      </section>
    </main>
  `;
}

document.addEventListener("DOMContentLoaded", renderProdutoLegado);
