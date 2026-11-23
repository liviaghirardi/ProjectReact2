# Blog React — Projeto React 02

Aplicação React desenvolvida para a atividade **Projeto React 02** da disciplina **Frameworks Front-end (SENAI)**.

## Descrição

O **Blog React** é um blog que consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com). Com ele é possível listar e buscar publicações, abrir os detalhes de cada uma com autor e comentários, curtir, comentar e cadastrar novas publicações por meio de um formulário com validação.

## Funcionalidades

- **Página inicial** com apresentação, resumo dos conceitos e um contador de exemplo.
- **Lista de publicações** carregada da API, com:
  - busca em tempo real por título ou texto;
  - botão "Carregar mais" para paginar a lista;
  - mensagens de carregamento, erro (com "Tentar novamente") e lista vazia.
- **Detalhes da publicação** (`/publicacoes/:id`), com:
  - texto completo, autor e lista de comentários vindos da API;
  - botão de curtir/descurtir com contador;
  - formulário para adicionar comentários;
  - navegação para a publicação anterior e a próxima.
- **Nova publicação**: formulário com validação dos campos e envio por `POST` para a API, mostrando a resposta recebida.
- **Página Sobre** e **página 404** para rotas inexistentes.
- Título da aba do navegador atualizado conforme a página.
- Botão "voltar ao topo", que aparece ao rolar a página.
- Layout responsivo com tema claro/escuro automático.

## Conceitos utilizados

| Conceito | Onde foi aplicado |
| --- | --- |
| **State e useState** | Contador da página inicial, termo de busca, paginação, curtidas, dados dos formulários, estados de carregamento e erro. |
| **Formulários** | Campos controlados (`value` + `onChange`), `onSubmit` com `preventDefault()` e validação com mensagens de erro em [NovaPublicacao.jsx](src/pages/NovaPublicacao.jsx) e no formulário de comentários. |
| **useEffect** | Busca de dados ao montar a página ou quando o `id` muda; hook [useTitulo](src/hooks/useTitulo.js) que atualiza `document.title`; evento de `scroll` com função de limpeza em [Layout.jsx](src/components/Layout.jsx); `AbortController` para cancelar requisições. |
| **Consumo de APIs** | `fetch` com `async/await`, verificação de `response.ok`, `try/catch`, requisições `GET` e `POST` em [api.js](src/services/api.js). |
| **React Router** | `BrowserRouter`, `Routes`, `Route`, rotas aninhadas com `Outlet`, `Link`/`NavLink`, parâmetro de rota com `useParams` e rota curinga `*` para a página 404. |

## Rotas

| Caminho | Página |
| --- | --- |
| `/` | Início |
| `/publicacoes` | Lista de publicações |
| `/publicacoes/nova` | Formulário de nova publicação |
| `/publicacoes/:id` | Detalhes da publicação |
| `/sobre` | Sobre o projeto |
| `*` | Página não encontrada (404) |

## Tecnologias

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- CSS puro

## Como executar

É necessário ter o [Node.js](https://nodejs.org) (versão 18 ou superior) instalado.

```bash
# instalar as dependências
npm install

# rodar em modo de desenvolvimento
npm run dev

# gerar a versão de produção
npm run build
```

Depois de rodar `npm run dev`, acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Estrutura de pastas

```
src/
├── components/   # Layout, cards e componentes de estado (carregando, erro, vazio)
├── hooks/        # Hook personalizado useTitulo
├── pages/        # Páginas ligadas às rotas
├── services/     # Funções de acesso à API
├── App.jsx       # Definição das rotas
├── main.jsx      # Ponto de entrada com BrowserRouter
└── index.css     # Estilos globais
```

> Observação: a JSONPlaceholder é uma API de testes. O `POST` devolve uma resposta de sucesso, mas os dados não ficam salvos no servidor.
