function renderHome() {
  const destaques = PRODUTOS.filter((produto) => produto.destaque).slice(0, 6);
  const featured = document.querySelector("[data-featured-products]");
  if (featured) featured.innerHTML = destaques.map(productCard).join("");

  renderInstagram();
}

function cleanInstagramUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const kind = parts[0];
    const code = parts[1];
    if ((kind === "reel" || kind === "p") && code) {
      return `https://www.instagram.com/${kind}/${code}/`;
    }
  } catch {
    return "";
  }
  return "";
}

function renderInstagram() {
  const target = document.querySelector("[data-instagram-embed]");
  const empty = document.querySelector("[data-instagram-empty]");
  const watch = document.querySelector("[data-instagram-watch]");
  const reelUrl = cleanInstagramUrl(N1_CONFIG.latestPostUrl);

  if (watch && reelUrl) watch.href = reelUrl;
  if (!target || !empty) return;

  if (!reelUrl) {
    target.innerHTML = "";
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  target.innerHTML = `
    <blockquote
      class="instagram-media"
      data-instgrm-permalink="${reelUrl}"
      data-instgrm-version="14">
      <a href="${reelUrl}" target="_blank" rel="noopener">Assistir no Instagram</a>
    </blockquote>
    <div class="instagram-fallback">
      <img class="instagram-cover" src="foto-bastidores.png" alt="Bastidores da produção N1nara" width="640" height="480" loading="lazy">
      <div>
        <p class="eyebrow">Instagram</p>
        <h2>Veja como cada peça ganha vida</h2>
        <p>Acompanhe os bastidores, o processo de impressão e os novos produtos da N1nara.</p>
        <div class="actions">
          <a class="btn primary" href="${reelUrl}" target="_blank" rel="noopener">Assistir no Instagram</a>
          <a class="btn ghost" href="${N1_CONFIG.instagramUrl}" target="_blank" rel="noopener">Seguir @n1nara</a>
        </div>
      </div>
    </div>
  `;

  loadInstagramScript();
}

function loadInstagramScript() {
  const existing = document.querySelector("script[src='https://www.instagram.com/embed.js']");
  if (existing && window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.instagram.com/embed.js";
  script.onload = () => {
    if (window.instgrm) window.instgrm.Embeds.process();
  };
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", renderHome);
