# Biel Play — versão cacheproof

Esta versão corrige o risco de HTML novo carregar CSS/JS antigo em cache.

## Diferenças
- CSS e JavaScript ficam embutidos no `index.html`.
- Assets têm nomes versionados novos.
- Nenhuma seção depende de JavaScript para ficar visível.
- O botão flutuante só é habilitado após sair do hero.
- Sem dependência de Google Fonts.

## Upload
Apague/substitua o conteúdo antigo da raiz e envie:
- `index.html`
- `robots.txt`
- `.nojekyll`
- pasta `assets/`

`styles.css` e `script.js` NÃO são necessários nesta versão.

Build marker: 2026-09-09-cacheproof-1
