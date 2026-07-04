const N1_WHATSAPP = "5521984004976";

function openWhatsApp(message) {
  window.open(`https://wa.me/${N1_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

function shareLocation(kind) {
  if (!navigator.geolocation) {
    alert("Seu navegador não permite compartilhar localização.");
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
      alert("Não foi possível acessar a localização. Verifique a permissão do navegador.");
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}
