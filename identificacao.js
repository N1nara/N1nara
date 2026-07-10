function calcularIdade(dataBR) {
  const [dia, mes, ano] = dataBR.split("/").map(Number);
  const nascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();
  let dias = hoje.getDate() - nascimento.getDate();
  if (dias < 0) {
    meses -= 1;
    const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    dias += ultimoMes;
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }
  if (anos > 0) return anos === 1 ? "1 ano" : `${anos} anos`;
  if (meses > 0) return meses === 1 ? "1 mês" : `${meses} meses`;
  return dias <= 1 ? "1 dia" : `${dias} dias`;
}

function shareLocation(kind) {
  if (!navigator.geolocation) {
    toast("Seu navegador não permite compartilhar localização.");
    return;
  }
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const map = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    const messages = {
      pet: `Olá! Encontrei o seu pet.\n\nMinha localização atual:\n${map}`,
      pessoa: `Olá! Estou entrando em contato por meio da página de identificação.\n\nMinha localização atual:\n${map}`,
      bagagem: `Olá! Encontrei sua bagagem.\n\nMinha localização atual:\n${map}`
    };
    openWhatsApp(messages[kind] || `Minha localização atual:\n${map}`);
  }, () => {
    toast("Não foi possível obter a localização. Verifique a permissão do navegador.");
  }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
}

function renderIdentification() {
  document.querySelectorAll("[data-birthdate]").forEach((item) => {
    item.textContent = calcularIdade(item.dataset.birthdate);
  });
  document.querySelectorAll("[data-qrcode]").forEach((img) => {
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(location.href)}`;
    img.alt = "QR Code para acessar esta página";
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-share-location]");
  if (button) shareLocation(button.dataset.shareLocation);
});

document.addEventListener("DOMContentLoaded", renderIdentification);
