const PRODUCTS = {
  "n1-art-3d": {
    name: "N1 Art 3D",
    mark: "3D",
    description: "Quadro personalizado com relevo, camadas e acabamento exclusivo para presentes, decoração e lembranças especiais.",
    ideal: "Presentes, decoração e peças afetivas.",
    material: "Impressão 3D com acabamento personalizado.",
    deadline: "Prazo informado no atendimento, conforme o projeto.",
    options: "Quantidade de cores, nome, tema e medidas sob consulta."
  },
  "n1-flat": {
    name: "N1 Flat",
    mark: "N1",
    description: "Chaveiro liso personalizado para nomes, logos, lembranças, brindes e identificação do dia a dia.",
    ideal: "Chaveiros, lembranças e brindes personalizados.",
    material: "Impressão 3D com acabamento plano.",
    deadline: "Prazo informado no atendimento.",
    options: "Cores, nome, logo e formato sob consulta."
  },
  "n1-flat-tag-nfc": {
    name: "N1 Flat Tag NFC",
    mark: "NFC",
    description: "Chaveiro personalizado com NFC integrado para abrir uma página digital com informações, links e contato rápido.",
    ideal: "Pets, pessoas, malas, mochilas, bicicletas e identificação inteligente.",
    material: "Tag personalizada com NFC integrado.",
    deadline: "Prazo informado no atendimento.",
    options: "Cartão NFC, coleira, mochila, mala, bicicleta, idosos e crianças."
  },
  "tag-para-coleira": {
    name: "Tag para coleira",
    mark: "PET",
    description: "Identificação inteligente para pets, com contato do tutor e página rápida para abrir no celular.",
    ideal: "Cães e gatos.",
    material: "Tag resistente para uso em coleira.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome do pet, telefone, QR Code e NFC sob consulta."
  },
  "tag-para-mochila": {
    name: "Tag para mochila",
    mark: "BAG",
    description: "Segurança extra para escola, passeio e trabalho, facilitando contato caso a mochila seja encontrada.",
    ideal: "Mochilas escolares, bolsas e equipamentos.",
    material: "Tag personalizada para uso diário.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome, telefone, QR Code, NFC e cor sob consulta."
  },
  "tag-para-mala": {
    name: "Tag para mala",
    mark: "MALA",
    description: "Ajuda quem encontrou a bagagem a falar com você pelo WhatsApp sem expor dados desnecessários.",
    ideal: "Malas, mochilas de viagem e bagagens.",
    material: "Tag personalizada para identificação de bagagem.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome, WhatsApp, QR Code, NFC e mensagem personalizada."
  },
  "tag-para-bicicleta": {
    name: "Tag para bicicleta",
    mark: "BIKE",
    description: "Identidade digital para bicicleta, com dados de contato e informações importantes.",
    ideal: "Bicicletas, scooters e equipamentos de mobilidade.",
    material: "Tag personalizada conforme o ponto de fixação.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome, contato, número de série e QR Code."
  },
  "tag-para-idosos": {
    name: "Tag para idosos",
    mark: "ID",
    description: "Contato de emergência e informações essenciais para ajudar em situações de cuidado e localização.",
    ideal: "Identificação pessoal e contato de emergência.",
    material: "Tag ou cartão personalizado.",
    deadline: "Prazo informado no atendimento.",
    options: "Contato, alergias, medicamentos e observações importantes."
  },
  "tag-para-criancas": {
    name: "Tag para crianças",
    mark: "KIDS",
    description: "Mais tranquilidade em passeios, escola e eventos, com contato rápido do responsável.",
    ideal: "Passeios, escola, eventos e viagens.",
    material: "Tag ou cartão personalizado.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome, responsável, telefone e informações importantes."
  },
  "n1-mini-pet": {
    name: "N1 Mini Pet",
    mark: "PET",
    description: "Chaveiro com mini escultura personalizada do pet, feito para guardar uma lembrança especial.",
    ideal: "Presentes para tutores e lembranças afetivas.",
    material: "Impressão 3D com acabamento personalizado.",
    deadline: "Prazo informado no atendimento, conforme o nível de detalhe.",
    options: "Foto de referência, cor, nome e acabamento."
  },
  "n1-pet-move": {
    name: "N1 Pet Move",
    mark: "MOVE",
    description: "Mini pet articulado que se mexe, personalizado com inspiração no animal.",
    ideal: "Presentes criativos e colecionáveis.",
    material: "Impressão 3D articulada.",
    deadline: "Prazo informado no atendimento.",
    options: "Modelo, cores, nome e referência visual."
  },
  "n1-stencil": {
    name: "N1 Stencil",
    mark: "ST",
    description: "Stencil personalizado para pintura, marcação, artesanato e projetos criativos.",
    ideal: "Pintura, decoração, embalagem e projetos manuais.",
    material: "Material recortado conforme aplicação.",
    deadline: "Prazo informado no atendimento.",
    options: "Texto, logo, tamanho e aplicação."
  },
  "n1-mini-me": {
    name: "N1 Mini Me",
    mark: "ME",
    description: "Escultura personalizada estilo bobblehead, feita a partir de referências da pessoa.",
    ideal: "Presentes personalizados e lembranças especiais.",
    material: "Impressão 3D com acabamento personalizado.",
    deadline: "Prazo informado no atendimento, conforme o projeto.",
    options: "Foto de referência, roupa, cabelo, pose e base."
  },
  "n1-scult": {
    name: "N1 Scult",
    mark: "SC",
    description: "Busto personalizado da pessoa com acabamento artístico e detalhado.",
    ideal: "Presentes premium, decoração e homenagens.",
    material: "Impressão 3D com acabamento sob consulta.",
    deadline: "Prazo informado no atendimento.",
    options: "Foto de referência, tamanho, cor e acabamento."
  },
  "cartao-nfc": {
    name: "Cartão NFC",
    mark: "CARD",
    description: "Cartão digital para contatos, links, apresentação profissional e acesso rápido a informações.",
    ideal: "Profissionais, marcas, eventos e networking.",
    material: "Cartão com NFC integrado.",
    deadline: "Prazo informado no atendimento.",
    options: "Nome, links, redes sociais, WhatsApp e identidade visual."
  }
};

function renderProduct() {
  const slug = document.body.dataset.product;
  const product = PRODUCTS[slug];
  const root = document.querySelector("[data-product]");
  if (!product || !root) return;

  document.title = `${product.name} | N1nara`;
  const message = `Olá! Quero saber mais sobre o produto ${product.name}.`;
  const productUrl = window.location.href;
  const related = getRelatedProducts(slug);
  const price = getStartingPrice(product);
  const hasNfc = product.name.includes("NFC") || product.name.includes("Tag") || product.name.includes("Cartão");

  root.innerHTML = `
    <section class="product-hero">
      <div class="product-visual">
        <div class="product-mark">${product.mark}</div>
      </div>
      <div>
        <p class="eyebrow">Produto N1nara</p>
        <h1>${product.name}</h1>
        <p class="hero-text">${product.description}</p>
        <div class="hero-actions">
          <a class="btn primary" href="https://wa.me/5521984004976?text=${encodeURIComponent(message)}" target="_blank" rel="noopener">Comprar pelo WhatsApp</a>
          <a class="btn ghost" href="index.html#produtos">Voltar aos produtos</a>
        </div>
      </div>
    </section>

    <section class="product-meta">
      <article><span>Ideal para</span><p>${product.ideal}</p></article>
      <article><span>Material</span><p>${product.material}</p></article>
      <article><span>Prazo</span><p>${product.deadline}</p></article>
      <article><span>Opções</span><p>${product.options}</p></article>
    </section>

    <section class="product-info">
      <article><span>Personalização</span><p>Produto feito sob encomenda, com detalhes definidos pelo WhatsApp.</p></article>
      <article><span>Atendimento</span><p>Você envia a ideia, referências e informações. A N1nara orienta o melhor formato.</p></article>
      <article><span>Dúvidas</span><p>Use o botão de WhatsApp para perguntar sobre preço, prazo, cor e medidas.</p></article>
    </section>

    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Comparação</p>
        <h2>Resumo do produto</h2>
      </div>
      <table class="comparison-table">
        <tr><th>Ideal para</th><td>${product.ideal}</td></tr>
        <tr><th>Resistência</th><td>${hasNfc ? "Uso diário, com cuidado conforme o local de aplicação." : "Uso decorativo ou funcional, conforme o acabamento escolhido."}</td></tr>
        <tr><th>NFC</th><td>${hasNfc ? "Disponível neste modelo ou como opção de personalização." : "Pode ser avaliado sob consulta."}</td></tr>
        <tr><th>Personalização</th><td>${product.options}</td></tr>
        <tr><th>Preço</th><td>${price}</td></tr>
      </table>
    </section>

    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Galeria</p>
        <h2>Fotos, vídeos e clientes usando</h2>
      </div>
      <div class="gallery-grid">
        <article><div class="gallery-thumb">${product.mark}</div><strong>Foto do produto</strong><p>Espaço para imagem principal.</p></article>
        <article><div class="gallery-thumb">▶</div><strong>Vídeo curto</strong><p>Espaço para Reels ou vídeo demonstrativo.</p></article>
        <article><div class="gallery-thumb">N1</div><strong>Cliente usando</strong><p>Espaço para fotos autorizadas de clientes.</p></article>
      </div>
    </section>

    <section class="product-section reviews">
      <div class="section-head">
        <p class="eyebrow">Avaliações</p>
        <h2>O que os clientes dizem</h2>
      </div>
      <div class="quote-grid">
        <blockquote><span class="stars">★★★★★</span> Atendimento cuidadoso e acabamento muito caprichado.</blockquote>
        <blockquote><span class="stars">★★★★★</span> A personalização deixou o presente ainda mais especial.</blockquote>
        <blockquote><span class="stars">★★★★★</span> Produto bonito, útil e com ótima apresentação.</blockquote>
      </div>
    </section>

    <section class="product-section share-panel">
      <div>
        <p class="eyebrow">Compartilhar</p>
        <h2>Envie este produto</h2>
      </div>
      <div class="share-actions">
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}" target="_blank" rel="noopener">Facebook</a>
        <a href="https://www.instagram.com/n1nara" target="_blank" rel="noopener">Instagram</a>
        <a href="https://wa.me/?text=${encodeURIComponent(`${product.name} - ${productUrl}`)}" target="_blank" rel="noopener">WhatsApp</a>
        <button type="button" data-copy-link>Copiar link</button>
      </div>
    </section>

    <section class="product-section">
      <div class="section-head">
        <p class="eyebrow">Relacionados</p>
        <h2>Você também pode gostar de</h2>
      </div>
      <div class="product-grid">
        ${related.map((item) => `
          <a href="${item.href}">
            <h3>${item.product.name}</h3>
            <p>${item.product.description}</p>
            <span class="product-link">Ver produto</span>
          </a>
        `).join("")}
      </div>
    </section>

    <div class="floating-actions" aria-label="Ações rápidas">
      <a href="https://wa.me/5521984004976?text=${encodeURIComponent(message)}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
      <a href="https://www.instagram.com/n1nara" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
      <a href="#top" aria-label="Voltar ao topo">↑</a>
    </div>
  `;

  document.querySelector("[data-copy-link]")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      showLegacyMessage("Link copiado.");
    } catch {
      showLegacyMessage(`Copie este link: ${productUrl}`);
    }
  });
}

function showLegacyMessage(message) {
  let box = document.querySelector("[data-product-message]");
  if (!box) {
    box = document.createElement("p");
    box.dataset.productMessage = "";
    box.className = "site-message";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  box.textContent = message;
}

document.addEventListener("DOMContentLoaded", renderProduct);

function getStartingPrice(product) {
  if (product.name.includes("N1 Art 3D")) return "A partir de R$ 49,90";
  if (product.name.includes("N1 Flat Tag NFC")) return "A partir de R$ 59,90";
  if (product.name.includes("N1 Flat")) return "A partir de R$ 39,90";
  if (product.name.includes("Mini Pet")) return "A partir de R$ 34,90";
  if (product.name.includes("Pet Move")) return "A partir de R$ 44,90";
  if (product.name.includes("Stencil")) return "A partir de R$ 29,90";
  if (product.name.includes("Mini Me")) return "A partir de R$ 69,90";
  if (product.name.includes("Scult")) return "Sob consulta";
  if (product.name.includes("Cartão NFC")) return "A partir de R$ 59,90";
  return "Sob consulta";
}

function getRelatedProducts(currentSlug) {
  const relations = {
    "n1-art-3d": ["n1-mini-me", "n1-flat", "n1-stencil"],
    "n1-flat-tag-nfc": ["tag-para-coleira", "tag-para-mala", "cartao-nfc"],
    "tag-para-coleira": ["n1-mini-pet", "n1-flat-tag-nfc", "n1-pet-move"]
  };
  const fallback = ["n1-mini-pet", "n1-flat", "n1-stencil"];
  const slugs = relations[currentSlug] || fallback.filter((slug) => slug !== currentSlug).slice(0, 3);
  return slugs
    .filter((slug) => PRODUCTS[slug])
    .map((slug) => ({ product: PRODUCTS[slug], href: productFileName(slug) }));
}

function productFileName(slug) {
  const map = {
    "n1-art-3d": "produto-n1-art-3d.html",
    "n1-flat": "produto-n1-flat.html",
    "n1-flat-tag-nfc": "produto-n1-flat-tag-nfc.html",
    "tag-para-coleira": "produto-tag-para-coleira.html",
    "tag-para-mochila": "produto-tag-para-mochila.html",
    "tag-para-mala": "produto-tag-para-mala.html",
    "tag-para-bicicleta": "produto-tag-para-bicicleta.html",
    "tag-para-idosos": "produto-tag-para-idosos.html",
    "tag-para-criancas": "produto-tag-para-criancas.html",
    "n1-mini-pet": "produto-n1-mini-pet.html",
    "n1-pet-move": "produto-n1-pet-move.html",
    "n1-stencil": "produto-n1-stencil.html",
    "n1-mini-me": "produto-n1-mini-me.html",
    "n1-scult": "produto-n1-scult.html",
    "cartao-nfc": "produto-cartao-nfc.html"
  };
  return map[slug] || "index.html#produtos";
}
