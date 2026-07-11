function optionPrice(field, value) {
  if (!Array.isArray(field.opcoes)) return null;
  const selected = field.opcoes.find((item) => typeof item === "object" && item.label === value);
  return selected || null;
}

function currentProduct() {
  return produtoPorId(document.body.dataset.productId);
}

function renderProductPage() {
  const produto = currentProduct();
  const root = document.querySelector("[data-product-detail]");
  if (!produto || !root) return;

  document.title = `${produto.nome} | N1nara`;
  document.querySelector("meta[name='description']")?.setAttribute("content", produto.descricao);

  root.innerHTML = `
    <section class="product-detail">
      <div class="gallery-main">
        ${productMedia(produto, "product-thumb big")}
        <div class="mini-gallery">
          ${(produto.galeria || [produto.imagem]).slice(0, 3).map((image, index) => {
            if (/\.(png|jpe?g|webp|gif|svg)$/i.test(image || "")) {
              return `<button type="button" data-gallery-image="${image}"><img src="${image}" alt="${produto.nome} ${index + 1}" width="160" height="120" loading="lazy"></button>`;
            }
            return `<span>Imagem ilustrativa</span>`;
          }).join("")}
        </div>
        <p class="image-note">${produto.imagemNota || "Imagem ilustrativa — produto personalizado conforme a arte aprovada."}</p>
      </div>
      <div>
        <p class="eyebrow">Produto personalizado</p>
        <h1>${produto.nome}</h1>
        <h2>${produto.subtitulo || ""}</h2>
        <p class="lead">${produto.descricao}</p>
        ${produto.nota ? `<p class="notice">${produto.nota}</p>` : ""}
        <p class="notice">Por ser personalizado, o resultado pode apresentar pequenas variações em relação às fotos de referência. A qualidade do resultado depende da nitidez e dos ângulos das imagens enviadas.</p>
        <form class="product-form" data-product-form>
          <div data-fields></div>
          <label>Quantidade
            <input name="quantidade" type="number" min="1" value="1" required>
          </label>
          <div class="price-box">
            <span>Opção escolhida: <strong data-option-label>Selecione as opções</strong></span>
            <span>Preço unitário: <strong data-unit-price>${moeda(produto.precoInicial)}</strong></span>
            <span>Subtotal: <strong data-subtotal>${moeda(produto.precoInicial)}</strong></span>
          </div>
          <div class="actions">
            <button class="btn primary" type="submit">Adicionar ao pedido</button>
            <button class="btn ghost" type="button" data-buy-now>Comprar pelo WhatsApp</button>
          </div>
        </form>
      </div>
    </section>

    <section class="info-grid">
      <article><span>Sugestões de uso</span><p>${produto.uso}</p></article>
      <article><span>Dimensões</span><p>${produto.dimensoes}</p></article>
      <article><span>Material</span><p>${produto.material}</p></article>
      <article><span>Prazo</span><p>${produto.prazo}</p></article>
    </section>

    <section class="section-lite">
      <h2>Características</h2>
      <div class="info-grid">
        ${(produto.caracteristicas || []).map((item) => `<article><span>✓</span><p>${item}</p></article>`).join("")}
      </div>
    </section>

    <section class="section-lite">
      <h2>Comparação</h2>
      <table class="comparison-table">
        <tr><th>Ideal para</th><td>${produto.uso}</td></tr>
        <tr><th>Resistência</th><td>Uso diário com cuidados adequados ao material e acabamento.</td></tr>
        <tr><th>NFC</th><td>${produto.nfc ? "NFC incorporado ao produto personalizado." : "Pode ser avaliado sob consulta."}</td></tr>
        <tr><th>Personalização</th><td>${produto.campos.map((campo) => campo.label).join(", ")}</td></tr>
        <tr><th>Preço</th><td>${produto.precoInicial ? `A partir de ${moeda(produto.precoInicial)}` : "Sob consulta"}</td></tr>
      </table>
    </section>

    <section class="section-lite">
      <h2>Tem alguma dúvida sobre este produto?</h2>
      <label>Digite sua pergunta
        <textarea data-question placeholder="Escreva sua dúvida aqui."></textarea>
      </label>
      <button class="btn primary" type="button" data-send-question>Enviar pergunta pelo WhatsApp</button>
    </section>

    <section class="section-lite">
      <h2>Produtos relacionados</h2>
      <div class="product-grid">
        ${produto.relacionados.map((id) => productCard(produtoPorId(id))).join("")}
      </div>
    </section>
  `;

  renderFields(produto);
  bindProductForm(produto);
}

function renderFields(produto) {
  const wrap = document.querySelector("[data-fields]");
  wrap.innerHTML = produto.campos.map((campo) => {
    const required = campo.obrigatorio ? "required" : "";
    if (campo.tipo === "textarea") {
      return `<label>${campo.label}<textarea name="${campo.id}" ${required} placeholder="${campo.placeholder || ""}"></textarea></label>`;
    }
    if (campo.tipo === "select") {
      return `<label>${campo.label}<select name="${campo.id}" ${required}>${campo.opcoes.map((opcao) => {
        const label = typeof opcao === "string" ? opcao : opcao.label;
        return `<option value="${label}">${label}</option>`;
      }).join("")}</select></label>`;
    }
    return `<label>${campo.label}<input name="${campo.id}" type="text" ${required} placeholder="${campo.placeholder || ""}"></label>`;
  }).join("");
}

function formSelection(produto) {
  const form = document.querySelector("[data-product-form]");
  const data = new FormData(form);
  const opcoes = {};
  produto.campos.forEach((campo) => {
    const value = String(data.get(campo.id) || "").trim();
    if (value) opcoes[campo.label] = value;
  });

  let unit = produto.precoInicial || 0;
  let sobConsulta = false;
  produto.campos.forEach((campo) => {
    const selected = optionPrice(campo, opcoes[campo.label]);
    if (selected?.sobConsulta) sobConsulta = true;
    if (selected?.preco) unit = selected.preco;
  });

  const quantidade = Math.max(1, Number(data.get("quantidade") || 1));
  return { opcoes, quantidade, unit, sobConsulta, subtotal: unit * quantidade };
}

function updatePrice(produto) {
  const selected = formSelection(produto);
  document.querySelector("[data-option-label]").textContent = Object.values(selected.opcoes).filter(Boolean).join(", ") || "Selecione as opções";
  document.querySelector("[data-unit-price]").textContent = selected.sobConsulta ? "Sob consulta" : moeda(selected.unit);
  document.querySelector("[data-subtotal]").textContent = selected.sobConsulta ? "Sob consulta" : moeda(selected.subtotal);
}

function bindProductForm(produto) {
  const form = document.querySelector("[data-product-form]");
  form.addEventListener("input", () => updatePrice(produto));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const selected = formSelection(produto);
    const item = {
      id: uid(),
      produtoId: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      opcoes: selected.opcoes,
      quantidade: selected.quantidade,
      valorUnitario: selected.sobConsulta ? 0 : selected.unit,
      subtotal: selected.sobConsulta ? 0 : selected.subtotal,
      sobConsulta: selected.sobConsulta,
      observacoes: selected.opcoes.Observações || ""
    };
    saveCart([...getCart(), item]);
    toast("Produto adicionado ao pedido.");
  });

  document.querySelector("[data-buy-now]").addEventListener("click", () => {
    const selected = formSelection(produto);
    const lines = [`Olá! Quero comprar:`, ``, `${selected.quantidade}x ${produto.nome}`];
    Object.entries(selected.opcoes).forEach(([key, value]) => lines.push(`${key}: ${value}`));
    lines.push(`Valor unitário: ${selected.sobConsulta ? "Sob consulta" : moeda(selected.unit)}`);
    lines.push(`Subtotal: ${selected.sobConsulta ? "Sob consulta" : moeda(selected.subtotal)}`);
    openWhatsApp(lines.join("\n"));
  });

  document.querySelector("[data-send-question]").addEventListener("click", () => {
    const question = document.querySelector("[data-question]").value.trim();
    if (!question) {
      toast("Digite sua pergunta antes de enviar.");
      return;
    }
    openWhatsApp(`Olá! Tenho uma dúvida sobre o produto ${produto.nome}.\n\nMinha dúvida:\n${question}`);
  });

  document.querySelectorAll("[data-gallery-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.dataset.galleryImage;
      const current = document.querySelector(".product-thumb.big");
      if (current?.tagName === "IMG") current.src = image;
    });
  });

  updatePrice(produto);
}

document.addEventListener("DOMContentLoaded", renderProductPage);
