const PRODUTOS = [
  {
    id: "n1-flat",
    nome: "N1 Flat",
    subtitulo: "Identificador personalizado em impressão 3D",
    arquivo: "produto-n1-flat.html",
    categoria: ["Pets", "Pessoas", "Empresas", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Identificador personalizado, leve e resistente, disponível para coleira, chaveiro, empresas, brindes e diversas aplicações.",
    uso: "Cães, gatos, chaveiros personalizados, identificação de mochilas, bagagens, brindes corporativos, eventos, lembranças, coleiras para pets e equipamentos.",
    dimensoes: "Aproximadamente 47 × 38 mm.",
    material: "Impressão 3D personalizada, leve e resistente.",
    prazo: "Produção sob encomenda. Prazo confirmado pelo WhatsApp.",
    precoInicial: 24.9,
    imagem: "produto-n1-flat.png",
    galeria: ["produto-n1-flat.png", "foto-produto-na-mao.png", "foto-acabamento.png"],
    imagemNota: "Foto do N1 Flat personalizado.",
    nfc: false,
    caracteristicas: [
      "Impressão 3D personalizada",
      "Diversas opções de cores",
      "Produção sob encomenda",
      "Desenvolvido exclusivamente para cada cliente"
    ],
    campos: [
      { id: "modelo", label: "Modelo", tipo: "select", obrigatorio: true, opcoes: ["N1 Flat Pet", "N1 Flat Pessoa", "N1 Flat Empresa", "N1 Flat Personalizado"] },
      { id: "uso", label: "Tipo de uso", tipo: "select", obrigatorio: true, opcoes: ["Coleira", "Chaveiro", "Mochila", "Bagagem", "Brinde corporativo", "Evento", "Equipamento", "Outro"] },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true, placeholder: "Ex.: preto, branco, rosa" },
      { id: "personalizacao", label: "Informações personalizadas", tipo: "textarea", obrigatorio: true, placeholder: "Nome, telefone, logotipo, frase, data especial ou QR Code opcional" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-tag-nfc", "n1-mini-pet", "n1-art-3d"]
  },
  {
    id: "n1-tag-nfc",
    nome: "N1 Tag NFC",
    subtitulo: "Identificador inteligente com tecnologia NFC",
    arquivo: "produto-n1-tag-nfc.html",
    categoria: ["NFC", "Pets", "Pessoas", "Empresas", "Personalizados"],
    destaque: true,
    descricao: "Identificador inteligente com NFC programada e página personalizada para pessoas, pets, empresas, mochilas, malas e bicicletas.",
    uso: "Coleiras de cães e gatos, mochilas, malas, bicicletas, identificação de crianças, idosos, pessoas e empresas.",
    dimensoes: "Aproximadamente 47 × 38 mm.",
    material: "Identificador personalizado com tecnologia NFC incorporada. A programação da tag NFC já está incluída no preço.",
    prazo: "Produção sob encomenda. Prazo confirmado pelo WhatsApp.",
    precoInicial: 49.9,
    imagem: "produto-n1-tag-nfc.png",
    galeria: ["produto-n1-tag-nfc.png", "foto-produto-na-mao.png", "foto-bastidores.png"],
    imagemNota: "Foto do N1 Tag NFC personalizado.",
    nfc: true,
    caracteristicas: [
      "NFC programada incluída",
      "Página personalizada",
      "Botão para WhatsApp",
      "Pode incluir fotos, Instagram, informações médicas e localização autorizada"
    ],
    campos: [
      { id: "modelo", label: "Modelo", tipo: "select", obrigatorio: true, opcoes: ["Tag para coleira", "Tag para mochila", "Tag para mala", "Tag para bicicleta", "Tag para idosos", "Tag para crianças", "Cartão NFC"] },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "pagina", label: "Informações para a página", tipo: "textarea", obrigatorio: true, placeholder: "Nome, telefones, Instagram, fotos, informações importantes ou redes sociais" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    nota: "Ao aproximar um celular compatível, a pessoa pode acessar informações cadastradas, como telefone, WhatsApp, identificação, página personalizada, redes sociais ou informações importantes. O NFC não é vendido separadamente; ele fica incorporado ao produto personalizado.",
    relacionados: ["n1-flat", "n1-mini-pet", "n1-pet-move"]
  },
  {
    id: "n1-mini-pet",
    nome: "N1 Mini Pet",
    subtitulo: "Mini escultura personalizada do seu pet",
    arquivo: "produto-n1-mini-pet.html",
    categoria: ["Pets", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Mini escultura personalizada exclusiva para pets, produzida a partir das fotos do seu melhor amigo.",
    uso: "Decoração de mesa, lembrança do pet, presente para tutores, coleção de miniaturas e decoração de home office.",
    dimensoes: "Altura aproximada: 8 cm.",
    material: "Impressão 3D personalizada com acabamento artesanal.",
    prazo: "Produção sob encomenda após envio das fotos do pet.",
    precoInicial: 49.9,
    imagem: "foto-pet-demo.png",
    galeria: ["foto-pet-demo.png", "foto-produto-na-mao.png", "foto-acabamento.png"],
    imagemNota: "Foto do N1 Mini Pet personalizado.",
    nfc: false,
    caracteristicas: [
      "Produzido a partir das fotos do pet",
      "Cada peça é criada sob encomenda",
      "Acabamento artesanal",
      "Produto exclusivo para pets"
    ],
    campos: [
      { id: "nomePet", label: "Nome do pet", tipo: "text", obrigatorio: true },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "fotos", label: "Fotos do pet", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-pet-move", "n1-tag-nfc", "n1-flat"]
  },
  {
    id: "n1-pet-move",
    nome: "N1 Pet Move",
    subtitulo: "Escultura personalizada com movimento divertido",
    arquivo: "produto-n1-pet-move.html",
    categoria: ["Pets", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Uma miniatura personalizada que ganha ainda mais personalidade com o movimento do corpo.",
    uso: "Presente para apaixonados por pets, decoração de mesa, home office, lembrança especial e colecionável personalizado.",
    dimensoes: "Altura aproximada: 8 cm.",
    material: "Impressão 3D personalizada com corpo articulado e acabamento artesanal.",
    prazo: "Produção sob encomenda após envio das fotos do pet.",
    precoInicial: 59.9,
    imagem: "produto-n1-pet-move.png",
    galeria: ["produto-n1-pet-move.png", "foto-produto-na-mao.png", "foto-bastidores.png"],
    imagemNota: "Foto do N1 Pet Move personalizado.",
    nfc: false,
    caracteristicas: [
      "Corpo articulado com movimento",
      "Produzido a partir das fotos do pet",
      "Impressão 3D personalizada",
      "Acabamento artesanal"
    ],
    campos: [
      { id: "nomePet", label: "Nome do pet", tipo: "text", obrigatorio: true },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "fotos", label: "Fotos do pet", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-mini-pet", "n1-tag-nfc", "n1-art-3d"]
  },
  {
    id: "n1-art-3d",
    nome: "N1 Art 3D",
    subtitulo: "Retrato personalizado em relevo com suporte",
    arquivo: "produto-n1-art-3d.html",
    categoria: ["Decoração", "Presentes", "Personalizados", "Pets", "Pessoas"],
    destaque: true,
    descricao: "Retrato personalizado em relevo, produzido a partir de uma fotografia especial, acompanhado de suporte independente.",
    uso: "Retratos de pessoas, retratos de pets, casamentos, aniversários, homenagens, decoração de salas, quartos e escritórios, presentes personalizados.",
    dimensoes: "Disponível nos tamanhos 10 × 15 cm, 15 × 20 cm e 20 × 25 cm.",
    material: "Imagem em relevo produzida em impressão 3D, com suporte independente incluído.",
    prazo: "Produção sob encomenda após análise da fotografia.",
    precoInicial: 79.9,
    imagem: "produto-n1-art-3d.png",
    galeria: ["produto-n1-art-3d.png", "hero-n1-art-3d.png", "foto-acabamento.png"],
    imagemNota: "Foto do N1 Art 3D personalizado.",
    nfc: false,
    caracteristicas: [
      "Produzido a partir de uma fotografia",
      "Imagem criada em relevo",
      "Suporte independente incluído",
      "Versão em preto e branco ou multicolorida"
    ],
    campos: [
      { id: "variacao", label: "Tamanho e acabamento", tipo: "select", obrigatorio: true, opcoes: [
        { label: "10 × 15 cm - Preto e branco", preco: 79.9 },
        { label: "10 × 15 cm - Até 6 cores", preco: 119.9 },
        { label: "15 × 20 cm - Preto e branco", preco: 99.9 },
        { label: "15 × 20 cm - Até 6 cores", preco: 149.9 },
        { label: "20 × 25 cm - Preto e branco", preco: 129.9 },
        { label: "20 × 25 cm - Até 6 cores", preco: 199.9 }
      ]},
      { id: "foto", label: "Foto de referência", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-mini-me", "n1-sculpt", "n1-mini-pet"]
  },
  {
    id: "n1-mini-me",
    nome: "N1 Mini Me",
    subtitulo: "Miniatura personalizada em estilo bobblehead",
    arquivo: "produto-n1-mini-me.html",
    categoria: ["Pessoas", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Miniatura personalizada da pessoa em estilo bobblehead, criada a partir de fotografias.",
    uso: "Presente de aniversário, formatura, profissões, uniformes, casamentos, homenagens, decoração de mesa e presente para amigos, familiares e colegas de trabalho.",
    dimensoes: "Disponível em 10 cm, 13 cm com base e 16 cm com base.",
    material: "Impressão 3D personalizada, com roupa, aparência e base independente.",
    prazo: "Produção sob encomenda após análise das fotografias.",
    precoInicial: 99.9,
    imagem: "produto-n1-mini-me.png",
    galeria: ["produto-n1-mini-me.png", "foto-produto-na-mao.png", "foto-acabamento.png"],
    imagemNota: "Foto do N1 Mini Me personalizado.",
    nfc: false,
    caracteristicas: [
      "Produzido a partir das fotos da pessoa",
      "Estilo divertido inspirado em bobbleheads",
      "Roupa e aparência personalizadas",
      "Base independente incluída"
    ],
    campos: [
      { id: "variacao", label: "Tamanho e acabamento", tipo: "select", obrigatorio: true, opcoes: [
        { label: "10 cm - Branco", preco: 99.9 },
        { label: "10 cm - Até 6 cores", preco: 249.9 },
        { label: "13 cm com base - Branco", preco: 129.9 },
        { label: "13 cm com base - Até 6 cores", preco: 349.9 },
        { label: "16 cm com base - Branco", preco: 179.9 },
        { label: "16 cm com base - Até 6 cores", preco: 449.9 }
      ]},
      { id: "nome", label: "Nome da pessoa", tipo: "text", obrigatorio: true },
      { id: "fotos", label: "Fotos de referência", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Roupa, profissão, pose ou observações", tipo: "textarea" }
    ],
    relacionados: ["n1-sculpt", "n1-art-3d", "n1-flat"]
  },
  {
    id: "n1-sculpt",
    nome: "N1 Sculpt",
    subtitulo: "Escultura personalizada em busto",
    arquivo: "produto-n1-sculpt.html",
    categoria: ["Pessoas", "Decoração", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Escultura personalizada em busto, com foco na fidelidade da fisionomia, expressão e principais traços da pessoa.",
    uso: "Presentes especiais, homenagens, formaturas, aniversários, casamentos, decoração, empresas e colecionadores.",
    dimensoes: "Disponível em 13 cm, 16 cm e 20 cm.",
    material: "Escultura personalizada em impressão 3D com base independente inclusa.",
    prazo: "Produção sob encomenda após análise das fotografias.",
    precoInicial: 199.9,
    imagem: "produto-n1-sculpt.png",
    galeria: ["produto-n1-sculpt.png", "foto-produto-na-mao.png", "foto-acabamento.png"],
    imagemNota: "Foto do N1 Sculpt personalizado.",
    nfc: false,
    caracteristicas: [
      "Produzido a partir de fotografias",
      "Alta fidelidade aos principais traços",
      "Base independente inclusa",
      "Produção artesanal sob encomenda"
    ],
    campos: [
      { id: "variacao", label: "Tamanho e acabamento", tipo: "select", obrigatorio: true, opcoes: [
        { label: "13 cm - Branco", preco: 199.9 },
        { label: "16 cm - Branco", preco: 269.9 },
        { label: "20 cm - Branco", preco: 349.9 },
        { label: "Versão colorida - Sob consulta via WhatsApp", preco: 0, sobConsulta: true }
      ]},
      { id: "fotos", label: "Fotos de referência", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    nota: "A cotação da versão colorida será realizada pelo WhatsApp após a análise das fotografias, pois o preço depende do tamanho, quantidade de cores, detalhes do cabelo, barba, roupas, acessórios e complexidade do modelo.",
    relacionados: ["n1-mini-me", "n1-art-3d", "n1-flat"]
  }
];

const CATEGORIAS = ["Todos", "Pets", "Pessoas", "NFC", "Decoração", "Empresas", "Presentes", "Personalizados"];

function produtoPorId(id) {
  return PRODUTOS.find((produto) => produto.id === id);
}

