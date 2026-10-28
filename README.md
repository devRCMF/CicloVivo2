# devRCMF.github.io

## Projeto 2 - Front End

# Ciclo Vivo

Site institucional de uma ONG fictícia voltada à reciclagem, à inclusão social e ao apoio a cooperativas de catadores. Esta versão amplia a entrega anterior com **CSS3 modularizado, layout responsivo e recursos interativos em JavaScript**.

## Objetivo do projeto

Apresentar a iniciativa Ciclo Vivo, divulgar seus projetos socioambientais e permitir que pessoas interessadas demonstrem interesse em participar ou apoiar a organização por meio de um formulário de cadastro.

## Páginas do site

- **`index.html`** — página inicial com apresentação da organização, missão, visão, valores, áreas de atuação, história, resultados, equipe, transparência e contatos.
- **`pages/projetos.html`** — apresenta os projetos sociais, campanhas de arrecadação, oportunidades de voluntariado, formas de doação e dúvidas frequentes. Inclui uma janela modal para informações sobre voluntariado.
- **`pages/cadastro.html`** — formulário para cadastro de voluntários e apoiadores, com máscaras e validação dos campos por JavaScript.
- **`pages/obrigado.html`** — página de confirmação após o envio do formulário.
- **`pages/guia-de-estilo.html`** — demonstra o sistema visual do projeto e componentes como botões, badges, alertas, toast e modal.

## Estrutura de pastas

```text
.
├── index.html
├── README.md
├── pages/
│   ├── projetos.html
│   ├── cadastro.html
│   ├── obrigado.html
│   └── guia-de-estilo.html
├── css/
│   ├── estilo.css
│   ├── variaveis.css
│   ├── base.css
│   ├── layout.css
│   ├── navegacao.css
│   ├── botoes.css
│   ├── cards.css
│   ├── formularios.css
│   ├── feedback.css
│   ├── badges.css
│   ├── tabelas.css
│   ├── rodape.css
│   ├── guia.css
│   └── responsivo.css
├── js/
│   ├── menu.js
│   ├── modal.js
│   ├── avisos.js
│   └── formulario.js
└── img/
    ├── hero-coleta.svg
    ├── projeto-oficina.svg
    ├── projeto-escolas.svg
    ├── projeto-cooperativa.svg
    ├── cadastro-muda.svg
    └── equipe-triagem.svg
```

## Tecnologias utilizadas

- **HTML5:** estrutura semântica e conteúdo das páginas.
- **CSS3:** estilos, layout, sistema visual e adaptação a diferentes tamanhos de tela.
- **JavaScript:** menu responsivo, modal acessível, mensagens toast e validação/máscaras do formulário.
- **SVG:** ilustrações vetoriais utilizadas nas páginas.

Não são utilizados frameworks de front-end. O formulário consulta a API pública ViaCEP para buscar informações de endereço a partir do CEP, portanto esse recurso depende de conexão com a internet.

## Organização do CSS

O arquivo `css/estilo.css` importa os demais módulos de estilo:

- **`variaveis.css`** — cores, tipografia e espaçamentos do sistema visual.
- **`base.css`** — estilos básicos, tipografia e links.
- **`layout.css`** — estrutura de seções e grid de 12 colunas.
- **`navegacao.css`** — cabeçalho, menu, submenu e menu hambúrguer.
- **`botoes.css`** — botões e estados visuais.
- **`cards.css`** — cards, indicadores, listas e metas.
- **`formularios.css`** — campos e estados de validação.
- **`feedback.css`** — alertas, toast e modal.
- **`badges.css`** — badges e tags.
- **`tabelas.css`** — tabelas e detalhes relacionados.
- **`rodape.css`** — rodapé das páginas.
- **`guia.css`** — estilos específicos do guia de estilo.
- **`responsivo.css`** — regras para diferentes larguras de tela.

## Recursos implementados

- Layout responsivo com CSS Grid e Flexbox, incluindo grid de 12 colunas.
- Menu hambúrguer para telas menores e submenu de navegação.
- Estados visuais de foco, hover, ativo e desabilitado para componentes interativos.
- Modal com suporte a teclado e gerenciamento de foco.
- Mensagens toast para feedback ao usuário.
- Máscaras para CPF, telefone e CEP no formulário.
- Validação de CPF pelos dígitos verificadores e mensagens de erro por campo.
- Consulta de endereço pelo CEP usando a API ViaCEP.
- Elementos de acessibilidade, como link para pular ao conteúdo, rótulos de campos e atributos ARIA nos componentes interativos.

## Licença

Projeto acadêmico/demonstrativo. Nenhuma licença específica foi definida.
