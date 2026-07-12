function initLegacyProductPage() {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;
  const base = resolveBasePath();
  root.innerHTML = `
    <section class="page-hero">
      <p class="eyebrow">Página atualizada</p>
      <h1>Este produto mudou de endereço</h1>
      <p>As páginas oficiais dos produtos agora usam o catálogo principal, com preços e descrições centralizados em produtos.js.</p>
      <div class="actions">
        <a class="button secondary" href="${base}produtos.html">Ver catálogo atualizado</a>
        <a class="button green" href="${whatsappLink("Olá! Gostaria de ajuda para escolher um produto da N1nara.")}" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
      </div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", initLegacyProductPage);
