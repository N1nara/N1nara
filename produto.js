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
  `;
}

document.addEventListener("DOMContentLoaded", renderProduct);
