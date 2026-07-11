const N1_WHATSAPP = "5521984004976";

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

function shareLocation(kind) {
  if (!navigator.geolocation) {
    showMessage("Seu navegador não permite compartilhar localização.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const mapUrl = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
      const messages = {
        pet: `Meu pet foi encontrado.\n\nMinha localização:\n${mapUrl}`,
        pessoa: `Encontrei esta pessoa e estou compartilhando minha localização.\n\nMinha localização:\n${mapUrl}`,
        bagagem: `Encontrei sua bagagem.\n\nMinha localização:\n${mapUrl}`
      };
      openWhatsApp(messages[kind] || `Estou compartilhando minha localização:\n${mapUrl}`);
    },
    () => {
      showMessage("Não foi possível acessar a localização. Verifique a permissão do navegador.");
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-share-location]");
  if (button) shareLocation(button.dataset.shareLocation);
});
