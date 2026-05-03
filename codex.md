# Contexto do Projeto: Rede Raízes do Nordeste

## 1. Visão Geral
[cite_start]Sistema de atendimento multicanal (App, Totem de autoatendimento e Web) para a rede de lanchonetes "Raízes do Nordeste"[cite: 63]. [cite_start]O foco é projetar fluxos claros de interação, garantir a coerência funcional e demonstrar maturidade técnica nas decisões de interface[cite: 14, 15].

## 2. Stack Tecnológica
* Framework Principal: Angular
* Estilização: Tailwind CSS (foco em utilitários e responsividade rápida)
* Componentes Base: Angular Material
* [cite_start]Abordagem de Design: Mobile-First [cite: 92]

## 3. Requisitos Funcionais (Obrigatórios)
* [cite_start]RF01 - Cadastro e Autenticação: Gerenciamento de usuários[cite: 83].
* [cite_start]RF02 - Cardápio Dinâmico: Exibição de itens com base na unidade da franquia selecionada[cite: 84].
* [cite_start]RF03 - Gestão de Pedidos: Fluxo completo desde a seleção de itens até o fechamento do carrinho[cite: 85].
* [cite_start]RF04 - Status do Pedido: Acompanhamento em tempo real (ex: Na fila, Preparando, Pronto)[cite: 86].
* [cite_start]RF05 - Programa de Fidelidade: Sistema de recompensas, pontos e descontos[cite: 87, 90].
* [cite_start]RF06 - Campanhas: Exibição de promoções e ofertas[cite: 88].
* [cite_start]RF07 - Pagamento Integrado: Simulação visual do envio de pagamento via serviço externo (ex: Pix, Cartão) e retorno de status[cite: 89, 91].
* [cite_start]RF08 - LGPD: Elementos explícitos na interface para consentimento de coleta de dados e avisos de privacidade[cite: 114].

## 4. Requisitos Não Funcionais
* [cite_start]RNF01 - Mobile-first: Interface desenhada primariamente para telas menores[cite: 92].
* [cite_start]RNF02 - Responsividade: Adaptação fluida para resoluções de App, Totem e Web Desktop[cite: 92].
* [cite_start]RNF03 - Performance: Otimização de carregamento e escalabilidade[cite: 93].
* RNF04 - Acessibilidade e Usabilidade: Fluxos intuitivos e feedback visual claro para o usuário (tratamento de erros e sucesso).

## 5. Diretrizes para a IA
Ao sugerir códigos para este projeto:
* Utilize boas práticas do Angular.
* Mantenha o código limpo e com responsividade feita via Tailwind.
* Considere sempre o estado de carregamento e o tratamento de erros em simulações (ex: falha no pagamento simulado).