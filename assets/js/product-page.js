function getProductSlug() {
  return document.body.dataset.productSlug;
}

function collectSelectedOptions(container) {
  const selected = {};
  container.querySelectorAll("[data-option-group]").forEach((group) => {
    const name = group.dataset.optionGroup;
    const checked = group.querySelector("input:checked");
    if (checked) selected[name] = checked.value;
  });
  return selected;
}

function findSelectedPrice(product, selectedOptions) {
  let price = product.price;
  Object.entries(selectedOptions).forEach(([groupName, label]) => {
    const option = product.options?.[groupName]?.find((item) => item.label === label);
    if (option?.price) price = option.price;
  });
  return price;
}

function renderOptionGroup(name, options) {
  return `
    <div class="option-group" data-option-group="${name}">
      <strong>${name}</strong>
      <div class="radio-list">
        ${options.map((option, index) => `
          <label class="radio-pill">
            <input type="radio" name="${name}" value="${option.label}" ${index === 0 ? "checked" : ""}>
            ${option.label}
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function renderProductPage(product) {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const base = resolveBasePath();
  document.title = `${product.name} | N1nara`;
  const optionsHtml = Object.entries(product.options || {})
    .map(([name, options]) => renderOptionGroup(name, options))
    .join("");

  root.innerHTML = `
    <div class="two-column">
      <div>
        <img class="product-photo" src="${base}${product.photos?.[0] || "images/produto-placeholder.svg"}" alt="${product.name}">
        <div class="qr-box">
          <strong>QR Code</strong>
          <img data-qrcode="${window.location.href}" alt="QR Code do produto">
          <span class="muted">Escaneie para abrir esta página.</span>
        </div>
      </div>
      <div>
        <h1 class="page-title">${product.name}</h1>
        <p class="page-lead">${product.description}</p>
        <div class="price" data-product-price>${formatCurrency(product.price)}</div>
        <div data-options>${optionsHtml}</div>
        <div class="form-grid">
          <label>Quantidade
            <input type="number" min="1" value="1" data-quantity>
          </label>
          <label>Observações
            <textarea data-notes placeholder="Cor, nome, detalhes ou preferência."></textarea>
          </label>
        </div>
        <div class="actions">
          <button class="button green" data-buy-product>Comprar pelo WhatsApp</button>
          <button class="button secondary" data-copy-link>Copiar link</button>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-inner">
        <h2>Características</h2>
        <div class="grid">
          ${(product.features || []).map((feature) => `<div class="card"><div class="card-body">${feature}</div></div>`).join("")}
        </div>
        <div class="info-list">
          <div class="info-row"><strong>Dimensões</strong>${product.dimensions}</div>
          <div class="info-row"><strong>Material</strong>${product.material}</div>
          <div class="info-row"><strong>Prazo</strong>${product.deadline}</div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="section-inner">
        <h2>Comparação rápida</h2>
        <table class="comparison">
          <tr><th>Ideal para</th><td>Presentes, identificação e personalização.</td></tr>
          <tr><th>Resistência</th><td>Uso diário, conforme o modelo escolhido.</td></tr>
          <tr><th>NFC</th><td>${product.name.includes("NFC") ? "Sim" : "Disponível em produtos específicos."}</td></tr>
          <tr><th>Personalização</th><td>Sim.</td></tr>
          <tr><th>Preço</th><td>A partir de ${formatCurrency(product.price)}.</td></tr>
        </table>
      </div>
    </section>

    <section class="section">
      <div class="section-inner">
        <h2>Perguntas frequentes</h2>
        ${(product.faq || []).length ? product.faq.map((item) => `
          <div class="info-row"><strong>${item.question}</strong>${item.answer}</div>
        `).join("") : "<p class=\"muted\">Envie sua dúvida pelo WhatsApp para receber atendimento personalizado.</p>"}
        <div class="form-grid">
          <label>Tem alguma dúvida?
            <textarea data-question placeholder="Digite sua pergunta sobre este produto."></textarea>
          </label>
          <button class="button accent" data-send-question>Enviar dúvida</button>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="section-inner">
        <h2>Você também pode gostar de</h2>
        <div class="grid">
          ${(product.related || []).map((slug) => {
            const related = N1.products.find((item) => item.slug === slug);
            if (!related) return "";
            return `<article class="card"><div class="card-body"><h3>${related.name}</h3><p>${related.shortDescription}</p><a class="button secondary" href="${productUrl(related.slug)}">Ver produto</a></div></article>`;
          }).join("")}
        </div>
      </div>
    </section>
  `;

  initQrCodes();
  bindProductEvents(product, root);
}

function bindProductEvents(product, root) {
  function updatePrice() {
    const selected = collectSelectedOptions(root);
    const price = findSelectedPrice(product, selected);
    root.querySelector("[data-product-price]").textContent = formatCurrency(price);
  }

  root.addEventListener("change", updatePrice);

  root.querySelector("[data-buy-product]").addEventListener("click", () => {
    const selected = collectSelectedOptions(root);
    const quantity = root.querySelector("[data-quantity]").value || "1";
    const notes = root.querySelector("[data-notes]").value.trim();
    const lines = [
      "Olá!",
      "",
      "Quero comprar:",
      "",
      `Produto: ${product.name}`,
      ...Object.entries(selected).map(([key, value]) => `${key}: ${value}`),
      `Quantidade: ${quantity}`
    ];
    if (notes) lines.push(`Observações: ${notes}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  });

  root.querySelector("[data-send-question]").addEventListener("click", () => {
    const question = root.querySelector("[data-question]").value.trim();
    const message = `Olá!\n\nTenho uma dúvida sobre o produto ${product.name}:\n\n${question || "Gostaria de mais informações."}`;
    window.open(whatsappLink(message), "_blank", "noopener");
  });

  root.querySelector("[data-copy-link]").addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copiado.");
  });

  updatePrice();
}

function initProductPageAfterLoad() {
  const wait = setInterval(() => {
    if (!N1.config) return;
    clearInterval(wait);
    const product = N1.products.find((item) => item.slug === getProductSlug());
    if (product) {
      renderProductPage(product);
      return;
    }

    const root = document.querySelector("[data-product-page]");
    if (root) {
      root.innerHTML = `
        <h1 class="page-title">Produto em atualização</h1>
        <p class="page-lead">Não foi possível carregar os dados deste produto agora. Fale conosco pelo WhatsApp para receber as informações.</p>
        <div class="actions">
          <a class="button green" href="${whatsappLink("Olá! Gostaria de informações sobre um produto da N1nara.")}" target="_blank" rel="noopener">Falar pelo WhatsApp</a>
          <a class="button secondary" href="${resolveBasePath()}produtos.html">Ver produtos</a>
        </div>
      `;
    }
  }, 30);
}

document.addEventListener("DOMContentLoaded", initProductPageAfterLoad);
