function renderHome() {
  const destaques = PRODUTOS.filter((produto) => produto.destaque);
  document.querySelector("[data-featured-products]").innerHTML = destaques.map(productCard).join("");

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
  const reelUrl = cleanInstagramUrl(N1_CONFIG.latestPostUrl);

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
      <a href="${reelUrl}" target="_blank" rel="noopener">Assistir ao Reels no Instagram</a>
    </blockquote>
    <div class="instagram-fallback">
      <p class="eyebrow">Reels</p>
      <h2>Vídeo mais recente</h2>
      <p>Se o Instagram bloquear a exibição dentro do site, abra o Reels diretamente.</p>
      <a class="btn primary" href="${reelUrl}" target="_blank" rel="noopener">Assistir no Instagram</a>
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
