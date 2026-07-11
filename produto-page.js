function optionPrice(field, value) {
  if (!Array.isArray(field.opcoes)) return null;
  return field.opcoes.find((item) => typeof item === "object" && item.label === value) || null;
}

function currentProduct() {
  return produtoPorId(document.body.dataset.productId);
}

function productStorageKey(produto) {
  return `n1naraProduto:${produto.id}`;
}

function savedProductState(produto) {
  try {
    return JSON.parse(sessionStorage.getItem(productStorageKey(produto)) || "{}");
  } catch {
    return {};
  }
}

function saveProductState(produto) {
  const form = document.querySelector("[data-product-form]");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  sessionStorage.setItem(productStorageKey(produto), JSON.stringify(data));
}

function priceLabel(produto) {
  return produto.precoInicial ? `A partir de ${moeda(produto.precoInicial)}` : "Valor sob consulta";
}

function fieldInput(campo, saved) {
  const required = campo.obrigatorio ? "required" : "";
  const value = saved[campo.id] || "";
  const describedBy = `${campo.id}-erro`;

  if (campo.tipo === "textarea") {
    return `
      <label>${campo.label}${campo.obrigatorio ? " *" : ""}
        <textarea name="${campo.id}" ${required} aria-describedby="${describedBy}" placeholder="${campo.placeholder || ""}">${value}</textarea>
        <span class="field-error" id="${describedBy}" data-field-error="${campo.id}"></span>
      </label>
    `;
  }

  if (campo.tipo === "select") {
    return `
      <label>${campo.label}${campo.obrigatorio ? " *" : ""}
        <select name="${campo.id}" ${required} aria-describedby="${describedBy}">
          <option value="">Selecione</option>
          ${campo.opcoes.map((opcao) => {
            const label = typeof opcao === "string" ? opcao : opcao.label;
            const selected = value === label ? "selected" : "";
            const disabled = opcao.disponivel === false ? "disabled" : "";
            return `<option value="${label}" ${selected} ${disabled}>${label}${opcao.disponivel === false ? " - indisponível" : ""}</option>`;
          }).join("")}
        </select>
        <span class="field-error" id="${describedBy}" data-field-error="${campo.id}"></span>
      </label>
    `;
  }

  return `
    <label>${campo.label}${campo.obrigatorio ? " *" : ""}
      <input name="${campo.id}" type="text" value="${value}" ${required} aria-describedby="${describedBy}" placeholder="${campo.placeholder || ""}">
      <span class="field-error" id="${describedBy}" data-field-error="${campo.id}"></span>
    </label>
  `;
}

function renderProductPage() {
  const produto = currentProduct();
  const root = document.querySelector("[data-product-detail]");
  if (!produto || !root) return;

  document.title = `${produto.nome} | N1nara`;
  document.querySelector("meta[name='description']")?.setAttribute("content", produto.descricao);

  const saved = savedProductState(produto);
  const gallery = (produto.galeria && produto.galeria.length ? produto.galeria : [produto.imagem]).filter(Boolean);
  const related = (produto.relacionados || []).map(produtoPorId).filter(Boolean);

  root.innerHTML = `
    <nav class="breadcrumb" aria-label="Você está em">
      <a href="index.html">Início</a>
      <span aria-hidden="true">/</span>
      <a href="produtos.html">Produtos</a>
      <span aria-hidden="true">/</span>
      <span>${produto.nome}</span>
    </nav>

    <section class="product-detail">
      <div class="gallery-main" aria-label="Galeria do produto">
        <div class="gallery-frame">
          ${productMedia({ ...produto, imagem: gallery[0] || produto.imagem }, "product-thumb big")}
        </div>
        ${gallery.length > 1 ? `
          <div class="mini-gallery" role="list" aria-label="Miniaturas do produto">
            ${gallery.map((image, index) => `
              <button type="button" role="listitem" data-gallery-image="${image}" aria-label="Ver imagem ${index + 1} de ${produto.nome}" ${index === 0 ? 'aria-current="true"' : ""}>
                <img src="${image}" alt="${produto.nome} ${index + 1}" width="160" height="120" loading="lazy">
              </button>
            `).join("")}
          </div>
        ` : ""}
        <p class="image-note">${produto.imagemNota || "Imagem ilustrativa - produto personalizado conforme a arte aprovada."}</p>
      </div>

      <div class="product-buy">
        <p class="eyebrow">Produto personalizado</p>
        <h1>${produto.nome}</h1>
        <p class="lead">${produto.subtitulo || produto.descricao}</p>
        <strong class="product-price" data-product-price>${priceLabel(produto)}</strong>
        <p class="badge-line"><span class="badge">Produção sob encomenda</span>${produto.nfc ? '<span class="badge">NFC incorporado</span>' : ""}</p>
        <form class="product-form" data-product-form novalidate>
          <div class="form-errors" data-form-message aria-live="polite"></div>
          <div data-fields>
            ${produto.campos.map((campo) => fieldInput(campo, saved)).join("")}
          </div>
          <label>Quantidade *
            <input name="quantidade" type="number" min="1" value="${saved.quantidade || 1}" required aria-describedby="quantidade-erro">
            <span class="field-error" id="quantidade-erro" data-field-error="quantidade"></span>
          </label>
          <div class="price-box">
            <span>Opção escolhida: <strong data-option-label>Selecione as opções</strong></span>
            <span>Preço unitário: <strong data-unit-price>${priceLabel(produto)}</strong></span>
            <span>Subtotal: <strong data-subtotal>${produto.precoInicial ? moeda(produto.precoInicial) : "Valor sob consulta"}</strong></span>
          </div>
          <div class="actions">
            <button class="btn primary" type="submit">Adicionar ao pedido</button>
            <button class="btn ghost" type="button" data-buy-now>Pedir pelo WhatsApp</button>
          </div>
        </form>
      </div>
    </section>

    <section class="section-lite product-info-blocks">
      <article class="panel"><h2>O que é</h2><p>${produto.descricao}</p></article>
      <article class="panel"><h2>Para quem serve</h2><p>${produto.uso}</p></article>
      <article class="panel"><h2>Tamanho</h2><p>${produto.dimensoes}</p></article>
      <article class="panel"><h2>Material</h2><p>${produto.material}</p></article>
    </section>

    <section class="section-lite">
      <h2>Opções e personalização</h2>
      <div class="info-grid">
        ${produto.campos.map((campo) => `<article><span>${campo.obrigatorio ? "Obrigatório" : "Opcional"}</span><p>${campo.label}</p></article>`).join("")}
      </div>
    </section>

    <section class="section-lite">
      <h2>Como funciona a personalização</h2>
      <div class="steps-grid compact-steps">
        <article><span>1</span><h3>Escolha as opções</h3><p>Selecione tamanho, modelo, cor, quantidade e demais campos disponíveis.</p></article>
        <article><span>2</span><h3>Envie referências</h3><p>Depois do pedido, envie fotos, nomes, logos ou informações necessárias pelo WhatsApp.</p></article>
        <article><span>3</span><h3>Confirme os detalhes</h3><p>Os detalhes são alinhados no atendimento antes da produção.</p></article>
      </div>
    </section>

    <section class="section-lite">
      <h2>Observações importantes</h2>
      <div class="info-grid">
        <article><span>Incluído</span><p>${produto.caracteristicas.join(" ")}</p></article>
        <article><span>Cliente envia</span><p>${produto.campos.map((campo) => campo.label).join(", ")}.</p></article>
        <article><span>Prazo</span><p>${produto.prazo}</p></article>
        <article><span>Personalização</span><p>Por ser personalizado, o resultado pode apresentar pequenas variações em relação às fotos de referência. A qualidade depende da nitidez e dos ângulos das imagens enviadas.</p></article>
      </div>
      ${produto.nota ? `<p class="notice">${produto.nota}</p>` : ""}
    </section>

    <section class="section-lite">
      <h2>Tem alguma dúvida sobre este produto?</h2>
      <label>Digite sua pergunta
        <textarea data-question placeholder="Escreva sua dúvida aqui."></textarea>
      </label>
      <button class="btn primary" type="button" data-send-question>Enviar pergunta pelo WhatsApp</button>
    </section>

    ${related.length ? `
      <section class="section-lite">
        <h2>Produtos relacionados</h2>
        <div class="product-grid">
          ${related.map(productCard).join("")}
        </div>
      </section>
    ` : ""}
  `;

  bindProductForm(produto);
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
  let sobConsulta = !produto.precoInicial;
  produto.campos.forEach((campo) => {
    const selected = optionPrice(campo, opcoes[campo.label]);
    if (selected?.sobConsulta) sobConsulta = true;
    if (selected?.preco) {
      unit = selected.preco;
      sobConsulta = false;
    }
  });

  const quantidade = Math.max(1, Number(data.get("quantidade") || 1));
  return { opcoes, quantidade, unit, sobConsulta, subtotal: unit * quantidade };
}

function updatePrice(produto) {
  const selected = formSelection(produto);
  const optionText = Object.values(selected.opcoes).filter(Boolean).join(", ") || "Selecione as opções";
  document.querySelector("[data-option-label]").textContent = optionText;
  document.querySelector("[data-unit-price]").textContent = selected.sobConsulta ? "Valor sob consulta" : moeda(selected.unit);
  document.querySelector("[data-subtotal]").textContent = selected.sobConsulta ? "Valor sob consulta" : moeda(selected.subtotal);
  document.querySelector("[data-product-price]").textContent = selected.sobConsulta ? priceLabel(produto) : moeda(selected.unit);
}

function validateProductForm(produto) {
  const form = document.querySelector("[data-product-form]");
  let valid = true;
  document.querySelectorAll("[data-field-error]").forEach((item) => item.textContent = "");
  document.querySelector("[data-form-message]").textContent = "";

  produto.campos.forEach((campo) => {
    const field = form.elements[campo.id];
    const value = String(field?.value || "").trim();
    if (campo.obrigatorio && !value) {
      valid = false;
      document.querySelector(`[data-field-error="${campo.id}"]`).textContent = "Preencha este campo para continuar.";
    }
  });

  const quantity = Number(form.elements.quantidade.value || 0);
  if (!quantity || quantity < 1) {
    valid = false;
    document.querySelector('[data-field-error="quantidade"]').textContent = "Informe uma quantidade válida.";
  }

  if (!valid) {
    document.querySelector("[data-form-message]").textContent = "Revise os campos obrigatórios antes de adicionar ao pedido.";
  }
  return valid;
}

function addSelectedProduct(produto) {
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
  toast("Produto adicionado ao pedido.", [
    { label: "Ver pedido", href: "carrinho.html" },
    { label: "Continuar escolhendo", href: "produtos.html" }
  ]);
}

function bindProductForm(produto) {
  const form = document.querySelector("[data-product-form]");
  form.addEventListener("input", () => {
    saveProductState(produto);
    updatePrice(produto);
  });
  form.addEventListener("change", () => {
    saveProductState(produto);
    updatePrice(produto);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateProductForm(produto)) return;
    addSelectedProduct(produto);
  });

  document.querySelector("[data-buy-now]").addEventListener("click", () => {
    if (!validateProductForm(produto)) return;
    const selected = formSelection(produto);
    const lines = [`Olá! Quero fazer um pedido na N1nara:`, "", produto.nome, `Quantidade: ${selected.quantidade}`];
    const options = Object.entries(selected.opcoes).filter(([, value]) => value);
    if (options.length) {
      lines.push("Opções:");
      options.forEach(([key, value]) => lines.push(`${key}: ${value}`));
    }
    lines.push(`Preço unitário: ${selected.sobConsulta ? "Valor sob consulta" : moeda(selected.unit)}`);
    lines.push(`Subtotal: ${selected.sobConsulta ? "Valor sob consulta" : moeda(selected.subtotal)}`);
    lines.push("", "Podem me orientar sobre o envio das fotos ou referências?");
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
      document.querySelectorAll("[data-gallery-image]").forEach((item) => item.removeAttribute("aria-current"));
      button.setAttribute("aria-current", "true");
    });
  });

  updatePrice(produto);
}

document.addEventListener("DOMContentLoaded", renderProductPage);
