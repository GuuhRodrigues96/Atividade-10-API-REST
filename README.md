
# Relato de Implementação – Atividade 10: API REST

## 1. Relevância
O projeto implementa uma API REST simples com integração a um front-end básico em HTML, CSS e JavaScript.
O uso de um arquivo `db.json` sugere o uso de um **JSON Server** ou outro mock de API para simular operações CRUD (Create, Read, Update, Delete).  

A relevância está na prática de conceitos fundamentais de APIs REST e consumo de endpoints via JavaScript no navegador.  
É um projeto introdutório, útil para aprendizado de integração entre front-end e back-end.

---

## 2. Usabilidade – Design e Organização/Padronização

### Organização de Pastas
O projeto está na raiz, sem subpastas para separar front-end e back-end. Apesar disso, existe uma divisão mínima:
- `css/` → arquivos de estilo.
- `js/` → scripts JavaScript.
- HTMLs organizados de forma intuitiva (`index.html`, `posts.html`, `create-post.html`, `edit-post.html`).

### Design
O CSS é simples e cumpre a função de estilizar os elementos, mas não há foco em responsividade ou design moderno.  
A interface é funcional, mas básica.

### Padronização de Código
- JavaScript segue uma lógica clara, mas carece de comentários explicativos.
- Poderia haver padronização no uso de `const` e `let`.
- As chamadas à API poderiam ser organizadas em um módulo separado para melhor manutenção.

---

## 3. Funcionamento/Completude

### Funcionalidade
O arquivo `main.js` implementa interações com a API para:
- Listar posts.
- Criar novos posts.
- Editar posts existentes.
- Excluir posts.

### Completu de CRUD
Todas as operações básicas de CRUD estão contempladas, simulando o comportamento esperado de uma API REST.

### Dependências Externas
O arquivo `db.json` indica uso do **JSON Server** para simular o banco de dados.

### Pontos Positivos
- Implementa todo o fluxo CRUD.
- Interface simples para testar funcionalidades.

### Possíveis Melhorias
- Adicionar validação de campos no front-end.
- Incluir mensagens claras de erro e sucesso.
- Melhorar a documentação, explicando como rodar o projeto.

---

## Conclusão
O projeto cumpre seu papel como exercício de API REST com front-end simples, sendo relevante para consolidar conhecimentos básicos.  
A usabilidade é aceitável para um protótipo, mas a organização de pastas e a documentação podem ser melhoradas.  
O funcionamento cobre o CRUD, mas faltam validações e feedback visual mais elaborado.
