function shareCurrentLocation(kind = "item") {
  if (!navigator.geolocation) {
    alert("Seu navegador não permite compartilhar localização.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
      const messages = {
        pet: `Meu pet foi encontrado.\n\nMinha localização:\n${mapLink}`,
        pessoa: `Encontrei esta pessoa e estou compartilhando minha localização.\n\nMinha localização:\n${mapLink}`,
        bagagem: `Encontrei sua bagagem.\n\nMinha localização:\n${mapLink}`,
        item: `Olá! Encontrei um item da N1nara.\n\nMinha localização:\n${mapLink}`
      };
      window.open(whatsappLink(messages[kind] || messages.item), "_blank", "noopener");
    },
    () => {
      alert("Não foi possível acessar a localização. Verifique a permissão do navegador.");
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-share-location]");
  if (!button) return;
  shareCurrentLocation(button.dataset.shareLocation);
});
