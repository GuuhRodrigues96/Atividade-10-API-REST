# Relato de Implementação: Atividade-10-API-REST

Este documento serve como um relatório detalhado e um guia para o projeto **Atividade-10-API-REST**, uma aplicação front-end desenvolvida para interagir com uma API REST.

## 🚀 Visão Geral do Projeto

O projeto é uma aplicação front-end completa que implementa as quatro operações fundamentais de um sistema (CRUD - Create, Read, Update, Delete) para gerenciar "posts". A aplicação é construída com HTML, CSS e JavaScript puro (vanilla JS), e foi projetada para consumir uma API REST simulada com `json-server`, que utiliza o arquivo `db.json` como sua base de dados.

## ✨ Funcionalidades

-   **Visualização de Posts (Read):** Lista todos os posts da API de forma paginada.
-   **Criação de Posts (Create):** Permite adicionar novos posts através de um formulário.
-   **Edição de Posts (Update):** Permite atualizar o conteúdo de posts existentes.
-   **Exclusão de Posts (Delete):** Permite remover posts da API.
-   **Interface Responsiva:** O design se adapta a diferentes tamanhos de tela.
-   **Feedback Visual:** Indicadores de carregamento e mensagens de sucesso/erro para o usuário.

## 🛠️ Tecnologias Utilizadas

-   HTML5
-   CSS3 (com Variáveis, Flexbox e Grid)
-   JavaScript (ES6+)
-   json-server
-   Font Awesome (para ícones)

## ⚡ Como Executar

Para rodar este projeto em sua máquina local, siga os passos abaixo:

**Pré-requisitos:**
-   Ter o [Node.js](https://nodejs.org/) instalado.
-   Ter o `json-server` instalado globalmente. Se não tiver, instale com o comando:
    ```bash
    npm install -g json-server
    ```

**Passos:**

1.  **Clone ou baixe este repositório.**

2.  **Inicie o servidor da API:**
    -   Abra um terminal na pasta raiz do projeto.
    -   Execute o seguinte comando para iniciar o `json-server`:
        ```bash
        json-server --watch db.json
        ```
    -   O servidor estará rodando em `http://localhost:3000`.

3.  **Abra a aplicação no navegador:**
    -   Abra o arquivo `index.html` em seu navegador.

## 📝 Análise Detalhada da Implementação

### 1. Relevância

O projeto é **altamente relevante** como um exercício prático e portfólio para demonstrar habilidades essenciais de desenvolvimento front-end.

-   **Contexto Acadêmico e Prático:** O nome "Atividade-10" sugere um projeto acadêmico, e seu escopo é ideal para solidificar o conhecimento sobre o consumo de APIs REST.
-   **Demonstração de Competências:** O código demonstra de forma objetiva o domínio sobre:
    -   **Operações CRUD:** Mapeamento correto das ações para os métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`).
    -   **JavaScript Assíncrono:** Uso do `fetch` para lidar com requisições de rede.
    -   **Manipulação do DOM:** Criação e atualização dinâmica de elementos da página.

### 2. Usabilidade e Padronização

O projeto apresenta uma organização limpa e segue boas práticas, facilitando sua manutenção e compreensão.

-   **Estrutura de Arquivos:** Clara separação entre estrutura (HTML), estilo (CSS) e lógica (JavaScript). A nomeclatura dos arquivos é intuitiva (`create-post.html`, `edit-post.html`, etc.).
-   **Código CSS (`styles.css`):**
    -   O uso de **CSS Variables** (`:root`) facilita a manutenção do tema e garante consistência visual.
    -   O design é **responsivo**, adaptando-se a diferentes telas através de `@media` queries.
-   **Código JavaScript (`main.js`):**
    -   As funções são bem nomeadas e com responsabilidades claras (`loadPosts`, `createPostElement`, `setupPostForm`).
    -   A definição de `API_BASE_URL` como uma constante facilita a configuração do endereço da API.

### 3. Funcionamento e Completude

O projeto está **funcional e completo** dentro do escopo proposto, com todas as funcionalidades de CRUD implementadas e operantes.

-   **Leitura e Paginação:** A função `loadPosts` busca os posts e os exibe de forma paginada.
-   **Criação:** O formulário em `create-post.html` envia uma requisição `POST` e gerencia a submissão.
-   **Edição:** A aplicação busca os dados de um post, preenche o formulário de edição e envia uma requisição `PUT` para atualizá-lo.
-   **Exclusão:** A função `deletePost` envia uma requisição `DELETE` e remove o elemento da interface, com confirmação do usuário.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---
Desenvolvido por **Gustavo Rodrigues**.