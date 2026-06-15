window.CHATBOT_CONFIG = {
  cliente: {
    id: "titan",
    nombre: "Titan Nutrition",
    asistente: "Coach IA",
    estado: "En línea"
  },

  tema: {
    modo: "dark",
    colorPrincipal: "#27ae60",
    colorPrincipalHover: "#1e8449",
    colorPrincipalLight: "#0f2d1a",
    colorPrincipalMedium: "#1a4d2e",
    fondoWidget: "#1a1a1a",
    fondoPanel: "#242424",
    fondoTarjeta: "#1f1f1f",
    fondoElevado: "#2a2a2a",
    fondoSticky: "rgba(31,31,31,0.95)",
    bordeSuave: "rgba(255,255,255,0.08)",
    bordeFuerte: "rgba(255,255,255,0.18)",
    textoPrincipal: "#ffffff",
    textoSecundario: "#cfcfcf",
    textoSuave: "#888888",
    colorOk: "#27ae60",
    colorOkLight: "#0f2d1a",
    colorOkBorder: "#1e8449",
    colorAviso: "#F59E0B",
    colorFavorito: "#EF4444",
    colorFavoritoLight: "#3d1818",
    sombraPrincipal: "rgba(39, 174, 96, 0.5)"
  },

  chatbot: {
    fabTitle: "Abrir chatbot",
    saludo: "¡Hola! Soy tu Coach IA de Titan Nutrition 💪 ¿Cuál es tu objetivo? Puedo recomendarte la suplementación perfecta para ti.",
    placeholder: "Escribe tu mensaje...",
    chips: [
      { label: "Ganar músculo", message: "Quiero ganar masa muscular" },
      { label: "Perder grasa", message: "Quiero perder grasa" },
      { label: "Más energía", message: "Necesito más energía para entrenar" }
    ],
    error: "Ups, ha habido un error al conectar con el servidor. Por favor, intenta de nuevo."
  },

  wishlist: {
    titulo: "Mis favoritos",
    emptyText: "Aún no tienes favoritos guardados",
    exploreText: "Explorar productos"
  },

  n8n: {
    webhookUrl: "https://cerebro.idento.es/webhook/demo-agentes-a65b5def-37e5-4fb5-ba93-220e97661ccb"
  },

  ecommerce: {
    addToCartEvent: "titan-add-to-cart",
    resizeEvent: "titan-chat-size",
    openChatEvent: "titan-open-chat"
  }
};
