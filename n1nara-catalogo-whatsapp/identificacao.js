const IDENTIFICACOES = {
  pet: {
    tipo: "pet",
    fotoTexto: "PET",
    foto: "foto-pet-demo.png",
    nome: "Luna",
    chamada: "Se você encontrou este pet, entre em contato com o tutor.",
    nascimento: "15/06/2023",
    telefone: "5521984004976",
    whatsapp: "5521984004976",
    instagram: "https://www.instagram.com/n1nara/",
    campos: {
      "Raça": "Informar raça",
      "Sexo": "Informar sexo",
      "Tutor": "Stephanie",
      "Informações médicas": "Informar apenas o necessário.",
      "Vacinas": "Informar situação das vacinas.",
      "Veterinário": "Informar clínica ou contato, se necessário.",
      "Observações": "Pet dócil, pode ficar assustado com barulhos altos."
    }
  },
  pessoa: {
    tipo: "pessoa",
    fotoTexto: "ID",
    foto: "foto-pessoa-demo.png",
    nome: "Maria",
    chamada: "Página de identificação para contato com o responsável.",
    nascimento: "15/06/2023",
    telefone: "5521984004976",
    whatsapp: "5521984004976",
    instagram: "https://www.instagram.com/n1nara/",
    campos: {
      "Sexo": "Informar sexo",
      "Nome do responsável": "Stephanie",
      "Alergias": "Informar apenas se necessário.",
      "Medicamentos": "Informar apenas se necessário.",
      "Plano de saúde": "Informar se necessário.",
      "Informações importantes": "Informar orientações realmente necessárias."
    }
  },
  bagagem: {
    tipo: "bagagem",
    fotoTexto: "MALA",
    foto: "foto-bagagem-demo.png",
    nome: "Bagagem identificada",
    chamada: "Se você encontrou esta bagagem, fale com o proprietário.",
    telefone: "5521984004976",
    whatsapp: "5521984004976",
    campos: {
      "Nome do proprietário": "Stephanie / N1nara",
      "Identificação da bagagem": "MALA-001",
      "Identificação": "MALA-001",
      "Mensagem": "Obrigada por ajudar a devolver esta bagagem.",
      "Informações adicionais": "Evite expor endereço residencial completo."
    }
  }
};

function calcularIdade(dataBR, hoje = new Date()) {
  if (!dataBR) return "";
  const [dia, mes, ano] = dataBR.split("/").map(Number);
  if (!dia || !mes || !ano) return "";

  const nascimento = new Date(ano, mes - 1, dia);
  if (Number.isNaN(nascimento.getTime())) return "";

  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();
  let dias = hoje.getDate() - nascimento.getDate();

  if (dias < 0) {
    meses -= 1;
    const diasNoMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    dias += diasNoMesAnterior;
  }

  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  if (anos > 0) return anos === 1 ? "1 ano" : `${anos} anos`;
  if (meses > 0) return meses === 1 ? "1 mês" : `${meses} meses`;
  return dias <= 1 ? "1 dia" : `${dias} dias`;
}

function whatsappLink(number, message) {
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}

function goToWhatsApp(number, message) {
  window.location.href = whatsappLink(number, message);
}

function renderIdentificationPage() {
  const type = document.body.dataset.identification;
  const data = IDENTIFICACOES[type];
  const root = document.querySelector("[data-identification-page]");
  if (!data || !root) return;

  const idade = data.nascimento ? calcularIdade(data.nascimento) : "";
  const info = { ...data.campos };
  if (idade) info.Idade = idade;

  root.innerHTML = `
    <section class="id-card id-profile">
      ${data.foto ? `<img class="id-photo-square" src="${data.foto}" alt="Foto de ${data.nome}" width="640" height="640" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'id-photo-square', textContent: '${data.fotoTexto}' }))">` : `<div class="id-photo-square" aria-label="Foto">${data.fotoTexto}</div>`}
      <h1>${data.nome}</h1>
      <p class="muted">${data.chamada}</p>
      <div class="id-actions">
        ${data.telefone ? `<a class="btn ghost" href="tel:+${data.telefone}">Ligar</a>` : ""}
        ${data.whatsapp ? `<a class="btn primary" href="${whatsappLink(data.whatsapp, defaultMessage(type, data))}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
        ${data.whatsapp ? `<button class="btn ghost" type="button" data-share-location="${type}">Compartilhar localização</button>` : ""}
        ${data.instagram ? `<a class="btn ghost" href="${data.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
      </div>
      <p class="location-help">O site tentará obter a localização automaticamente. Se o navegador bloquear, o WhatsApp abrirá com instruções para envio manual.</p>
    </section>
    <section class="id-card">
      <h2>Informações</h2>
      <div class="id-info-list">
        ${Object.entries(info)
          .filter(([, value]) => value && String(value).trim())
          .map(([label, value]) => `<article><span>${label}</span><p>${value}</p></article>`)
          .join("")}
      </div>
      <div class="privacy-box">As informações desta página foram fornecidas pelo responsável e têm finalidade de identificação e contato. A localização só é acessada mediante autorização do visitante e não é armazenada pelo site.</div>
      <div class="qr-discreet">
        <img data-qrcode alt="QR Code desta página">
        <p>Escaneie para acessar esta página.</p>
      </div>
    </section>
  `;

  renderQrCode();
}

function defaultMessage(kind, data) {
  if (kind === "pet") return `Olá! Encontrei o pet ${data.nome}.`;
  if (kind === "pessoa") return `Olá! Estou entrando em contato por meio da página de identificação de ${data.nome}.`;
  return "Olá! Encontrei sua bagagem.";
}

function locationMessage(kind, mapUrl) {
  if (kind === "pet") return `Olá! Encontrei o seu pet.\n\nMinha localização atual:\n${mapUrl}`;
  if (kind === "pessoa") return `Olá! Estou entrando em contato por meio da página de identificação.\n\nMinha localização atual:\n${mapUrl}`;
  return `Olá! Encontrei sua bagagem.\n\nMinha localização atual:\n${mapUrl}`;
}

function manualLocationMessage(kind) {
  const base = kind === "pet"
    ? "Olá! Encontrei o seu pet."
    : kind === "pessoa"
      ? "Olá! Estou entrando em contato por meio da página de identificação."
      : "Olá! Encontrei sua bagagem.";

  return `${base}\n\nNão consegui autorizar a localização automática no navegador.\n\nVou enviar minha localização manualmente pelo WhatsApp:\n1. Toque no clipe/anexo ou no botão +\n2. Escolha Localização\n3. Envie minha localização atual`;
}

function openManualLocation(kind) {
  const data = IDENTIFICACOES[kind];
  if (!data?.whatsapp) return;
  goToWhatsApp(data.whatsapp, manualLocationMessage(kind));
}

function shareLocation(kind) {
  const data = IDENTIFICACOES[kind];
  if (!data?.whatsapp) return;

  if (!window.isSecureContext) {
    toast("A localização automática só funciona em site seguro. Abrindo WhatsApp com instrução manual.");
    openManualLocation(kind);
    return;
  }

  if (!navigator.geolocation) {
    toast("Seu navegador não permite compartilhar localização. Abrindo instrução manual.");
    openManualLocation(kind);
    return;
  }

  toast("Solicitando autorização de localização...");
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const map = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    goToWhatsApp(data.whatsapp, locationMessage(kind, map));
  }, (error) => {
    const messages = {
      1: "Permissão de localização negada.",
      2: "Localização indisponível no momento.",
      3: "Tempo esgotado ao tentar obter a localização."
    };
    toast(`${messages[error.code] || "Não foi possível obter a localização."} Abrindo instrução manual.`);
    openManualLocation(kind);
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
}

function renderQrCode() {
  document.querySelectorAll("[data-qrcode]").forEach((img) => {
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(location.href)}`;
    img.alt = "QR Code para acessar esta página";
  });
}

document.addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share-location]");
  if (shareButton) shareLocation(shareButton.dataset.shareLocation);
});

document.addEventListener("DOMContentLoaded", renderIdentificationPage);
