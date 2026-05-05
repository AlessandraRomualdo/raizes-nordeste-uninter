# Raizes do Nordeste

Aplicacao web mobile-first desenvolvida em Angular para simular a experiencia digital de uma rede de comida regional nordestina. O projeto reune autenticacao, selecao de unidade, cardapio, carrinho, pagamento, acompanhamento de pedido e programa de fidelidade em uma interface inspirada em aplicativos de delivery.

## Contexto academico

Este projeto foi desenvolvido para a faculdade UNINTER, na materia Projeto Multidisciplinar - Front-End.

## Resumo do projeto

O Raizes do Nordeste permite que o usuario entre ou se cadastre, escolha uma unidade disponivel, navegue por produtos do cardapio, adicione itens ao carrinho e finalize um pedido com retirada ou entrega. O fluxo tambem inclui pontos de fidelidade: o cliente visualiza o saldo no perfil e pode aplicar pontos no carrinho para receber desconto no valor da compra.

Os dados da aplicacao sao mockados no servico `OrderStore`, que centraliza unidades, produtos, carrinho, forma de entrega, pagamento, pedido ativo e saldo de pontos. A navegacao usa rotas lazy-loaded para manter cada tela isolada em sua feature.

## Funcionalidades

- Login e cadastro com validacao de formulario.
- Modal de privacidade nas telas de acesso.
- Selecao de unidade com disponibilidade e cardapio filtrado.
- Cardapio por categorias, promocoes e itens com pontuacao.
- Carrinho com controle de quantidade, retirada ou entrega.
- Uso de pontos de fidelidade para gerar desconto no pedido.
- Resumo de pagamento com subtotal, taxa de entrega, desconto e total.
- Confirmacao de pagamento simulada.
- Tela de status do pedido com linha do tempo e dados da unidade.
- Perfil com saldo de pontos, premios ativos e historico.

## Stack

- Angular 21
- Angular Router
- Angular Reactive Forms
- Angular Material
- TypeScript
- SCSS
- Vitest

## Prototipo e diagramas

- Prototipo/FigJam: https://www.figma.com/board/l0gnn9WYvp3kfESGKBy4iD/Untitled?node-id=0-1&p=f
- Diagramas/Miro: https://miro.com/app/board/uXjVHde3V20=/?share_link_id=605002804178

## Estrutura principal

```text
src/app
|-- core
|   |-- layouts/main-layout
|   `-- services/order-store.ts
|-- features
|   |-- cadastro
|   |-- cardapio
|   |-- carrinho
|   |-- home
|   |-- pagamento
|   |-- pedidos
|   |-- perfil
|   `-- unidades
`-- app.routes.ts
```

## Como executar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Depois acesse:

```text
http://localhost:4200/
```

## Scripts disponiveis

```bash
npm start
```

Executa o servidor local com `ng serve`.

```bash
npm run build
```

Gera a versao de producao no diretorio `dist/`.

```bash
npm test
```

Executa os testes configurados pelo Angular/Vitest.

## Observacoes

Este projeto usa dados simulados e nao possui integracao real com APIs de pagamento, autenticacao, geolocalizacao ou banco de dados. O objetivo e demonstrar o fluxo completo da experiencia do cliente e a organizacao de uma aplicacao Angular por features.
