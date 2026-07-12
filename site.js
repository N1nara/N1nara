const N1_WHATSAPP = "5500000000000";

function openWhatsApp(message) {
  window.open(`https://wa.me/${N1_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

function showMessage(message) {
  let box = document.querySelector("[data-site-message]");
  if (!box) {
    box = document.createElement("p");
    box.dataset.siteMessage = "";
    box.className = "site-message";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  box.textContent = message;
}

function manualLocationMessage(kind) {
  const intro = {
    pet: "Encontrei este pet.",
    pessoa: "Estou entrando em contato por meio da página de identificação.",
    bagagem: "Encontrei esta bagagem."
  };
  return `${intro[kind] || "Estou entrando em contato."}\n\nNão consegui autorizar a localização automática no navegador.\n\nVou enviar minha localização manualmente pelo WhatsApp:\n1. Toque no clipe/anexo ou no botão +\n2. Escolha Localização\n3. Envie minha localização atual`;
}

function shareLocation(kind) {
  if (!window.isSecureContext || !navigator.geolocation) {
    showMessage("Não foi possível acessar a localização automática. Abrindo WhatsApp com instruções.");
    openWhatsApp(manualLocationMessage(kind));
    return;
  }

  showMessage("Solicitando autorização de localização...");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const mapUrl = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
      const messages = {
        pet: `Encontrei este pet.\n\nMinha localização:\n${mapUrl}`,
        pessoa: `Estou entrando em contato por meio da página de identificação.\n\nMinha localização:\n${mapUrl}`,
        bagagem: `Encontrei esta bagagem.\n\nMinha localização:\n${mapUrl}`
      };
      openWhatsApp(messages[kind] || `Estou compartilhando minha localização:\n${mapUrl}`);
    },
    () => {
      showMessage("Não foi possível acessar a localização. Abrindo WhatsApp com instruções.");
      openWhatsApp(manualLocationMessage(kind));
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-share-location]");
  if (button) shareLocation(button.dataset.shareLocation);
});
