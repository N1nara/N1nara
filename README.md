# N1nara - catálogo estático para GitHub Pages

Esta versão funciona no GitHub Pages sem servidor, sem banco de dados, sem login e sem pagamento online.

## Como publicar

Envie o conteúdo desta pasta para a raiz do repositório `N1nara`.

O arquivo `index.html` precisa ficar diretamente na raiz do repositório, junto com os arquivos `.html`, `.css`, `.js`, imagens e pastas de compatibilidade.

## Arquivos principais

- `config.js`: WhatsApp, Instagram e link manual do Reels.
- `produtos.js`: fonte única dos dados dos produtos, com nomes, descrições, imagens, preços e opções.
- `app.js`: cabeçalho, rodapé, botão flutuante, cards e funções compartilhadas.
- `produtos-page.js`: busca, filtros, ordenação e resultados do catálogo.
- `produto-page.js`: páginas individuais dos produtos.
- `carrinho.js`: pedido salvo temporariamente no navegador e finalização pelo WhatsApp.
- `identificacao.js`: páginas modelo de Pet, Pessoa e Bagagem.

## Produtos

Para alterar preços, textos, imagens, opções ou links de páginas, edite o arquivo `produtos.js`.

O arquivo `produto.js` foi mantido apenas como compatibilidade para links antigos. Ele não deve ser usado para cadastrar preços ou descrições novas.

## Instagram

Para trocar o Reels mostrado na página inicial, edite somente o campo `latestPostUrl` em `config.js`.

Se o Instagram bloquear a incorporação dentro do site, o visitante verá uma área visual com botões para assistir no Instagram e seguir `@n1nara`.

## Privacidade

As páginas Pet, Pessoa e Bagagem incluídas neste pacote usam dados fictícios de demonstração. Em páginas reais, exiba apenas as informações necessárias para identificação e contato.

O e-mail não aparece nas páginas públicas. O atendimento visível fica por WhatsApp e Instagram.
