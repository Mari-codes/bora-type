# Bora - Jogo Adaptativo de Velocidade de Digitação

## Leia este README em outros idiomas

- [English](./README.md)

Um aplicativo completo de velocidade de digitação, desenvolvido como solução para um **Front End Mentor Hackathon**. Este projeto oferece duas experiências de usuário totalmente distintas: um ambiente minimalista e profissional para adultos e uma interface vibrante, em estilo "Cartoon Pop", para crianças.

> **Por que "Bora"?**  
> "Bora" é uma expressão muito usada por nós, e para este hackathon internacional caiu super bem. Ela transmite energia e motivação, incentivando os usuários a começarem, se divertirem e melhorarem sua velocidade de digitação. E aí, bora? ;)

## A Solução

O conceito principal foi criar uma ferramenta que se adapta à personalidade e à faixa etária do usuário. Isso foi alcançado através de uma robusta **arquitetura de troca de temas**, permitindo que toda a interface, desde fontes até física dos botões, se transforme instantaneamente.

### Modo Adulto (Minimalista & Focado)
Projetado para alta produtividade e concentração.
- **Temas:** Light, Dark, Sepia, Sakura e VS Code.
- **Modos:** Standard, Quotes, Code e Lyrics.
- **Dificuldade:** Fácil, Médio, Difícil.
- **Opções de Tempo:** 15s, 30s, 60s, 120s e Infinito (contador progressivo).

### Modo Crianças (Estilo Cartoon Pop)
Projetado para ser divertido, usando Neo-Brutalismo.
- **Temas:** Candy, Minecraft, Kitty e Melancia.
- **Modos:** Standard, Quotes, Code e Lyrics.
- **Dificuldade:** Fácil, Médio, Difícil.
- **Opções de Tempo:** 15s, 30s, 45s, 60s.

---

## Stack de Tecnologias

| Tecnologia              | Propósito                                                |
| ----------------------- | -------------------------------------------------------- |
| **React 18 + Vite**     | Configuração do app e interface                          |
| **TypeScript**          | Lógica e tipagem segura                                   |
| **SASS (SCSS)**         | Mixins, loops, tokens e arquitetura modular             |
| **CSS Modules**         | Estilos encapsulados e metodologia BEM                  |
| **Metodologia BEM**     | Estrutura de CSS organizada e manutenível               |
| **Lucide-React**        | Ícones para elementos da interface                      |
| **Canvas-Confetti**     | Efeitos de celebração quando um recorde pessoal é quebrado |
| **CSS Keyframes**       | Animações para transições e interações                  |
| **Prettier**            | Formatação e padronização do código                     |

---

## Principais Funcionalidades

* **Temas Avançados & Seletor de Modo:** Uso profundo do atributo `data-theme` para trocar paletas de cores, bordas e sombras globais sem recarregar a página. Inclui um **Mode Selector** para alternar entre os modos **Type** e **Kids**.
* **Persistência Local:** Os recordes de Personal Best (PB) são salvos no **Local Storage**, categorizados por modo de jogo (type ou kids).
* **Gamificação:** Uma explosão de confete é disparada sempre que o usuário quebra seu recorde pessoal.
* **Layout Responsivo:** Totalmente otimizado para dispositivos móveis, tablets e desktops, com breakpoints customizados e tipografia fluida.
* **Compartilhamento Social:** Botão de **Share** integrado permite que o usuário compartilhe suas pontuações com outros.

---

## Aprendizados

O maior desafio técnico e conquista foi a **Implementação do Data Theme**.  

> "Aprendi como o `data-theme` é poderoso quando combinado com variáveis CSS. Estruturando meus tokens SCSS para reagir aos atributos `data-theme` no body, pude mudar toda a aparência do app — do minimalista VS Code ao estilo robusto do Minecraft — usando a mesma lógica de HTML. Gerenciar o estado entre duas direções visuais tão diferentes foi uma curva de aprendizado enorme."

### Principais Desafios
1. **Abstração Lógica:** Manter o motor de digitação idêntico enquanto a UI mudava drasticamente.
2. **Precisão do WPM:** Ajustes finos no cálculo de palavras por minuto e na lógica de Personal Best.

---

## Instalação & Configuração

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/mari-codes/bora-type.git
    ```
2. **Instale as dependências:**
    ```bash
    npm install
    ```
3. **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

## Capturas de Tela

### Bora Home - Mobile
![Bora mobile home](/src/assets/screenshots/bora-home.png)

### Bora Kids Modal - Mobile
![Bora kids mobile modal](/src/assets/screenshots/bora-kids-mobile.png)

### Bora Type - Tablet
![Bora type Tablet](/src/assets/screenshots/bora-type-tablet.png)

### Bora Type - Tablet Modal
![Bora type Tablet Modal](/src/assets/screenshots/bora-type-tablet-modal.png)

### Bora Kids - Tablet
![Bora kids Tablet](/src/assets/screenshots/bora-kids-tablet.png)

### Bora Kids - Desktop
![Bora kids Desktop](/src/assets/screenshots/bora-kids-desktop.png)

### Bora Type - Desktop
![Bora type Desktop](/src/assets/screenshots/bora-type.png)

---

## Front End Mentor Hackathon

Este projeto foi desenvolvido como uma solução personalizada para o desafio Type Speed Game, com foco em versatilidade de UI e arquitetura de código limpa.

## Autor

- Mariana Borges (Perfil no Frontend Mentor) - [@mari-codes](https://www.frontendmentor.io/profile/mari-codes)
