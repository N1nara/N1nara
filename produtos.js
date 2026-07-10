const PRODUTOS = [
  {
    id: "n1-art-3d",
    nome: "N1 Art 3D",
    arquivo: "produto-n1-art-3d.html",
    categoria: ["Decoração", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Quadro personalizado em impressão 3D, com relevo, camadas, suporte incluído e acabamento exclusivo.",
    uso: "Presentes especiais, decoração afetiva, nomes, personagens, logos e peças comemorativas.",
    dimensoes: "Sob consulta, conforme a arte e o tamanho escolhido.",
    material: "Impressão 3D com acabamento personalizado.",
    prazo: "Prazo confirmado pelo WhatsApp após análise da arte.",
    precoInicial: 49.9,
    imagem: "N1",
    nfc: false,
    campos: [
      { id: "cores", label: "Quantidade de cores", tipo: "select", obrigatorio: true, opcoes: [
        { label: "Preto e branco", preco: 49.9 },
        { label: "2 cores", preco: 49.9 },
        { label: "3 cores", preco: 59.9 },
        { label: "4 cores", preco: 69.9 },
        { label: "5 cores", preco: 79.9 },
        { label: "6 cores", preco: 89.9 }
      ]},
      { id: "cor", label: "Cores desejadas", tipo: "text", obrigatorio: true, placeholder: "Ex.: preto, branco e dourado" },
      { id: "personalizacao", label: "Nome, tema ou arte", tipo: "text", obrigatorio: true },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-flat", "n1-mini-me", "n1-stencil"]
  },
  {
    id: "n1-flat",
    nome: "N1 Flat",
    arquivo: "produto-n1-flat.html",
    categoria: ["Pets", "Pessoas", "Empresas", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Produto personalizado plano e versátil para pessoas, pets, empresas, presentes, chaveiros, coleiras, mochilas e identificação.",
    uso: "Identificação, chaveiros, brindes, presentes personalizados, mochilas, coleiras e usos criativos.",
    dimensoes: "Sob consulta, conforme o uso escolhido.",
    material: "Impressão 3D com acabamento plano personalizado.",
    prazo: "Prazo confirmado pelo WhatsApp.",
    precoInicial: 39.9,
    imagem: "FLAT",
    nfc: false,
    campos: [
      { id: "tipo", label: "Tipo de uso", tipo: "select", obrigatorio: true, opcoes: ["Pessoa", "Pet", "Empresa", "Presente", "Identificação", "Chaveiro", "Coleira", "Mochila", "Outro"] },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "personalizacao", label: "Personalização", tipo: "text", obrigatorio: true },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-flat-tag-nfc", "n1-stencil", "n1-art-3d"]
  },
  {
    id: "n1-flat-tag-nfc",
    nome: "N1 Flat Tag NFC",
    arquivo: "produto-n1-flat-tag-nfc.html",
    categoria: ["NFC", "Pets", "Pessoas", "Empresas", "Personalizados"],
    destaque: true,
    descricao: "Tag personalizada com NFC incorporado ao produto. Ao aproximar um celular compatível, a pessoa pode acessar informações cadastradas, telefone, WhatsApp, página personalizada, redes sociais ou informações importantes.",
    uso: "Coleiras, mochilas, malas, bicicletas, idosos, crianças, cartão de contato e identificação inteligente.",
    dimensoes: "Varia conforme o modelo selecionado.",
    material: "Tag personalizada com NFC integrado. O NFC não é vendido separadamente.",
    prazo: "Prazo confirmado pelo WhatsApp.",
    precoInicial: 49.9,
    imagem: "NFC",
    nfc: true,
    campos: [
      { id: "modelo", label: "Modelo", tipo: "select", obrigatorio: true, opcoes: [
        { label: "Cartão NFC", preco: 59.9, descricao: "Cartão digital para contatos e links." },
        { label: "Tag para coleira", preco: 49.9, descricao: "Identificação para pets." },
        { label: "Tag para mochila", preco: 49.9, descricao: "Identificação para escola, passeio e trabalho." },
        { label: "Tag para mala", preco: 54.9, descricao: "Identificação para bagagens." },
        { label: "Tag para bicicleta", preco: 54.9, descricao: "Identificação para bike." },
        { label: "Tag para idosos", preco: 59.9, descricao: "Contato de emergência." },
        { label: "Tag para crianças", preco: 59.9, descricao: "Contato do responsável." }
      ]},
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "personalizacao", label: "Informações ou link desejado", tipo: "text", obrigatorio: true },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-mini-pet", "n1-flat", "n1-pet-move"]
  },
  {
    id: "n1-mini-pet",
    nome: "N1 Mini Pet",
    arquivo: "produto-n1-mini-pet.html",
    categoria: ["Pets", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Mini escultura personalizada do pet, feita a partir de foto ou arte de referência.",
    uso: "Presentes para tutores, lembranças afetivas e decoração.",
    dimensoes: "Sob consulta, conforme o modelo.",
    material: "Impressão 3D personalizada.",
    prazo: "Prazo confirmado após análise da foto ou arte.",
    precoInicial: 34.9,
    imagem: "PET",
    nfc: false,
    campos: [
      { id: "nomePet", label: "Nome do pet", tipo: "text", obrigatorio: true },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "arte", label: "Foto ou arte de referência", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-pet-move", "n1-flat-tag-nfc", "n1-flat"]
  },
  {
    id: "n1-pet-move",
    nome: "N1 Pet Move",
    arquivo: "produto-n1-pet-move.html",
    categoria: ["Pets", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Movimento que dá ainda mais vida à personalidade do seu melhor amigo.",
    uso: "Presentes criativos, lembranças de pets e peças personalizadas.",
    dimensoes: "Sob consulta.",
    material: "Impressão 3D articulada.",
    prazo: "Prazo confirmado pelo WhatsApp.",
    precoInicial: 44.9,
    imagem: "MOVE",
    nfc: false,
    campos: [
      { id: "nomePet", label: "Nome do pet", tipo: "text", obrigatorio: true },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "arte", label: "Arte personalizada", tipo: "text", placeholder: "Enviar referência pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-mini-pet", "n1-flat-tag-nfc", "n1-art-3d"]
  },
  {
    id: "n1-stencil",
    nome: "N1 Stencil",
    arquivo: "produto-n1-stencil.html",
    categoria: ["Empresas", "Decoração", "Personalizados"],
    destaque: true,
    descricao: "Stencil personalizado para pintura, marcação, artesanato, decoração e projetos criativos.",
    uso: "Pintura, embalagens, logos, decoração, artesanato e marcação.",
    dimensoes: "Conforme tamanho escolhido.",
    material: "Material recortado conforme a aplicação.",
    prazo: "Prazo confirmado após análise do desenho.",
    precoInicial: 29.9,
    imagem: "ST",
    nfc: false,
    campos: [
      { id: "tamanho", label: "Tamanho", tipo: "select", obrigatorio: true, opcoes: [
        { label: "Pequeno", preco: 29.9 },
        { label: "Médio", preco: 49.9 },
        { label: "Grande", preco: 79.9 },
        { label: "Valor sujeito à análise da arte e das dimensões", preco: 0, sobConsulta: true }
      ]},
      { id: "modelo", label: "Modelo", tipo: "text", obrigatorio: true },
      { id: "finalidade", label: "Finalidade", tipo: "text", obrigatorio: true },
      { id: "observacoes", label: "Texto, desenho ou observações", tipo: "textarea" }
    ],
    relacionados: ["n1-art-3d", "n1-flat", "n1-mini-me"]
  },
  {
    id: "n1-mini-me",
    nome: "N1 Mini Me",
    arquivo: "produto-n1-mini-me.html",
    categoria: ["Pessoas", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Escultura personalizada estilo mini pessoa, feita a partir de foto ou arte de referência.",
    uso: "Presentes personalizados, homenagens, lembranças e decoração.",
    dimensoes: "Sob consulta.",
    material: "Impressão 3D com acabamento personalizado.",
    prazo: "Prazo confirmado após análise da referência.",
    precoInicial: 69.9,
    imagem: "ME",
    nfc: false,
    campos: [
      { id: "nome", label: "Nome", tipo: "text", obrigatorio: true },
      { id: "cor", label: "Cor", tipo: "text", obrigatorio: true },
      { id: "arte", label: "Foto ou arte", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    relacionados: ["n1-sculpt", "n1-art-3d", "n1-stencil"]
  },
  {
    id: "n1-sculpt",
    nome: "N1 Sculpt",
    arquivo: "produto-n1-sculpt.html",
    categoria: ["Pessoas", "Decoração", "Presentes", "Personalizados"],
    destaque: true,
    descricao: "Busto ou escultura personalizada com acabamento artístico. Na versão colorida, o valor é sob consulta.",
    uso: "Presentes premium, homenagens, decoração e peças especiais.",
    dimensoes: "Sob consulta.",
    material: "Impressão 3D com acabamento simples ou colorido.",
    prazo: "Prazo confirmado após análise ou criação da arte.",
    precoInicial: 89.9,
    imagem: "SC",
    nfc: false,
    campos: [
      { id: "modelo", label: "Modelo", tipo: "select", obrigatorio: true, opcoes: [
        { label: "Simples", preco: 89.9 },
        { label: "Colorido - valor sob consulta", preco: 0, sobConsulta: true }
      ]},
      { id: "cor", label: "Cor", tipo: "text" },
      { id: "arte", label: "Foto ou arte de referência", tipo: "text", placeholder: "Enviar pelo WhatsApp" },
      { id: "observacoes", label: "Observações", tipo: "textarea" }
    ],
    nota: "A cotação será realizada pelo WhatsApp após a análise ou criação da arte, pois o preço depende do tamanho, quantidade de cores e complexidade do modelo.",
    relacionados: ["n1-mini-me", "n1-art-3d", "n1-stencil"]
  }
];

const CATEGORIAS = ["Todos", "Pets", "Pessoas", "NFC", "Decoração", "Empresas", "Presentes", "Personalizados"];

function produtoPorId(id) {
  return PRODUTOS.find((produto) => produto.id === id);
}
