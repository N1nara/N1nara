# Roadmap de funcionalidades - N1nara

## Objetivo

Organizar a evolução do site N1nara em etapas para manter o código simples, reutilizável e fácil de atualizar no GitHub Pages, usando HTML, CSS e JavaScript estático com arquivos de configuração centralizados.

---

## Etapa 1 - Estrutura base do site

### Objetivo

Preparar a base do projeto antes de adicionar muitas funcionalidades.

### Implementar

- Criar ou reorganizar a estrutura de pastas:
  - `index.html`
  - `produtos.html`
  - `pet.html`
  - `pessoa.html`
  - `bagagem.html`
  - `sobre.html`
  - `assets/css/`
  - `assets/js/`
  - `assets/img/`
  - `data/produtos.json`
  - `data/config.json`
- Separar o JavaScript por responsabilidade:
  - `main.js`
  - `products.js`
  - `whatsapp.js`
  - `location.js`
  - `qrcode.js`
  - `age.js`
- Criar menu padrão reutilizável.
- Criar botões flutuantes:
  - WhatsApp
  - Instagram
  - Voltar ao topo

### Resultado

O site fica organizado para crescer sem repetir código em todas as páginas.

---

## Etapa 2 - Página inicial

### Objetivo

Criar uma entrada clara para a marca e direcionar o visitante para Instagram, WhatsApp, catálogo e produtos.

### Estrutura

- Banner principal no topo.
- Logo N1nara.
- Botão Instagram.
- Botão WhatsApp.
- Botão Catálogo.
- Área para vídeo mais recente do Instagram.
- Chamada: "Conheça nossos produtos".

### Instagram

#### Versão simples

- Criar uma configuração com o link do Reels.
- O site incorpora esse link.
- Para trocar o vídeo, altera-se apenas um campo em `config.json`.

#### Versão avançada

- Usar Instagram Graph API ou serviço intermediário.
- Buscar automaticamente a publicação mais recente.
- Exige configuração de token, conta profissional e manutenção da integração.

### Recomendação prática

Começar com a versão simples e deixar o código preparado para trocar depois pela integração automática.

---

## Etapa 3 - Menu principal

### Objetivo

Facilitar a navegação e deixar o site mais claro para visitantes e para o Google.

### Itens

- Home
- Produtos
- Pet
- Pessoa
- Bagagem
- Sobre
- Instagram
- WhatsApp

### Observação

Instagram e WhatsApp podem abrir em nova aba, enquanto os demais itens navegam dentro do site.

---

## Etapa 4 - Funcionalidades compartilhadas

### Objetivo

Criar funções únicas para serem usadas nas páginas Pet, Pessoa, Bagagem e Produtos.

### Criar

#### Cálculo automático de idade

Arquivo sugerido: `assets/js/age.js`

Entrada:

- Data de nascimento.

Saída:

- Idade atual calculada automaticamente.

#### Compartilhar localização

Arquivo sugerido: `assets/js/location.js`

Fluxo:

- Visitante clica em "Compartilhar minha localização".
- Navegador solicita permissão de localização.
- Site gera link do Google Maps.
- Site abre WhatsApp com mensagem pronta.

#### Mensagens de WhatsApp

Arquivo sugerido: `assets/js/whatsapp.js`

Usar para:

- Comprar produto.
- Enviar dúvida.
- Compartilhar localização de pet.
- Compartilhar localização de pessoa.
- Compartilhar localização de bagagem.

#### QR Code automático

Arquivo sugerido: `assets/js/qrcode.js`

Usar para:

- Página Pet.
- Página Pessoa.
- Página Bagagem.
- Páginas de produto.

### Resultado

Essas funções ficam prontas uma vez e são reaproveitadas em várias páginas.

---

## Etapa 5 - Página Pet

### Objetivo

Criar uma página útil para identificação e recuperação de pets.

### Campos

- Foto.
- Nome.
- Raça.
- Sexo.
- Data de nascimento.
- Idade calculada automaticamente.
- Instagram.
- Telefone.
- Endereço.
- Informações médicas.

### Botões

- Compartilhar minha localização.
- WhatsApp do tutor.

### QR Code

- Gerado automaticamente no final da página.
- Texto: "Escaneie para abrir esta página."

### Mensagem de localização

Exemplo:

```text
Meu pet foi encontrado.

Minha localização:
https://maps.google.com/?q=-23.000000,-46.000000
```

---

## Etapa 6 - Página Pessoa

### Objetivo

Criar uma página de identificação pessoal com informações importantes em caso de emergência.

### Campos

- Foto.
- Nome.
- Instagram.
- Sexo.
- Data de nascimento.
- Idade calculada automaticamente.
- Alergias.
- Medicamentos.
- Plano de saúde.
- Telefone.
- Contato de emergência.

### Botões

- Compartilhar minha localização.
- WhatsApp do contato de emergência.

### QR Code

- Gerado automaticamente no final da página.

---

## Etapa 7 - Página Bagagem

### Objetivo

Criar uma página simples para ajudar na devolução de malas, mochilas e objetos.

### Campos

- Nome.
- Telefone.
- WhatsApp.

### Botões

- Compartilhar minha localização.
- Entrar em contato pelo WhatsApp.

### Mensagem de localização

Exemplo:

```text
Encontrei sua bagagem.

Minha localização:
https://maps.google.com/?q=-23.000000,-46.000000
```

---

## Etapa 8 - Página Produtos

### Objetivo

Organizar os produtos de forma escalável e melhorar SEO.

### Página geral

Criar uma página `produtos.html` com lista de produtos.

### Páginas individuais

Criar uma página para cada produto:

- `/produto/n1-art3d`
- `/produto/n1-flat`
- `/produto/n1-flat-tag-nfc`
- `/produto/n1-mini-pet`
- `/produto/n1-pet-move`
- `/produto/n1-stencil`
- `/produto/n1-mini-me`
- `/produto/n1-scult`

### Estrutura de cada página

- Fotos.
- Descrição.
- Características.
- Dimensões.
- Material.
- Prazo.
- Preço.
- Opções.
- Perguntas frequentes.
- Avaliações.
- Galeria.
- Produtos relacionados.
- QR Code.
- Botão Comprar.

---

## Etapa 9 - Configuração central de produtos

### Objetivo

Evitar editar várias páginas quando preço, descrição ou dimensões mudarem.

### Arquivo sugerido

`data/produtos.json`

### Conteúdo

- Nome do produto.
- URL.
- Fotos.
- Descrição.
- Características.
- Dimensões.
- Material.
- Prazo.
- Preço base.
- Opções.
- Perguntas frequentes.
- Produtos relacionados.

### Resultado

O site lê os dados do arquivo e monta as páginas automaticamente.

---

## Etapa 10 - Preços dinâmicos

### N1 Art 3D

Adicionar seleção de quantidade de cores:

- 2 cores.
- 3 cores.
- 4 cores.
- 5 cores.
- 6 cores.

Ao trocar a opção, o preço muda automaticamente.

### N1 Flat Tag NFC

Adicionar modelos:

- Cartão NFC.
- Tag para coleira.
- Tag para mochila.
- Tag para mala.
- Tag para bicicleta.
- Tag para idosos.
- Tag para crianças.

Cada modelo pode ter preço diferente.

### Resultado

O cliente escolhe as opções e o site monta o preço e a mensagem de compra automaticamente.

---

## Etapa 11 - Compra pelo WhatsApp

### Objetivo

Reduzir esforço do cliente e evitar mensagens incompletas.

### Fluxo

Cliente escolhe:

- Produto.
- Modelo.
- Cor.
- Quantidade.
- Outras opções.

Ao clicar em Comprar, abre o WhatsApp com mensagem pronta.

### Exemplo

```text
Olá!

Quero comprar:

Produto:
N1 Flat Tag NFC

Modelo:
Coleira

Cor:
Preta

Quantidade:
2
```

---

## Etapa 12 - Dúvidas pelo WhatsApp

### Objetivo

Permitir que o visitante envie dúvidas sobre um produto específico.

### Estrutura

- Campo: "Tem alguma dúvida?"
- Botão: "Enviar"

### Mensagem

```text
Olá!

Tenho uma dúvida sobre o produto N1 Flat Tag NFC:

(pergunta digitada pelo cliente)
```

---

## Etapa 13 - Melhorias de produto

### Comparação

Adicionar tabela com:

- Ideal para.
- Resistência.
- NFC.
- Personalização.
- Preço.

### Avaliações

Adicionar:

- Estrelas.
- Comentários.
- Nome do cliente, se houver autorização.

### Galeria

Adicionar:

- Fotos.
- Vídeos.
- Clientes usando.

### Produtos relacionados

Exemplo:

- N1 Mini Pet.
- N1 Flat.
- N1 Stencil.

---

## Etapa 14 - Compartilhamento

### Objetivo

Facilitar divulgação dos produtos e páginas de identificação.

### Opções

- WhatsApp.
- Facebook.
- Instagram.
- Copiar link.
- QR Code.

### Observação

Instagram não aceita compartilhamento direto por link como WhatsApp e Facebook. O botão pode abrir o perfil ou copiar o link para o usuário colar.

---

## Etapa 15 - SEO e acabamento

### Objetivo

Melhorar o resultado no Google e a apresentação quando o link for compartilhado.

### Implementar

- Título único por página.
- Descrição única por página.
- URLs amigáveis.
- Imagem de compartilhamento.
- Dados estruturados simples para produtos.
- Textos alternativos nas imagens.
- Sitemap.
- Arquivo `robots.txt`.

### Resultado

Produtos individuais passam a ter mais chance de aparecer em buscas.

---

## Ordem recomendada

1. Estrutura base do site.
2. Menu e página inicial.
3. Funções reutilizáveis: idade, WhatsApp, localização e QR Code.
4. Páginas Pet, Pessoa e Bagagem.
5. Página geral de Produtos.
6. Arquivo central `produtos.json`.
7. Páginas individuais de produto.
8. Preços dinâmicos.
9. Compra e dúvidas pelo WhatsApp.
10. Comparação, avaliações, galeria e relacionados.
11. Compartilhamento.
12. SEO e acabamento.

---

## Recomendação final

Para GitHub Pages, a melhor arquitetura é manter o site estático com HTML, CSS e JavaScript, centralizando produtos e configurações em arquivos JSON. Isso permite atualizar preços, textos, links e opções em um único lugar, sem precisar mexer em várias páginas.

Para o Instagram, o caminho mais seguro é começar com um link manual de Reels em `config.json`. Depois, se fizer sentido, integrar com Instagram Graph API ou serviço intermediário para buscar o vídeo mais recente automaticamente.
