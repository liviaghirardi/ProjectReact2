// Consumo de API: funções que conversam com a JSONPlaceholder.
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE_URL}${caminho}`, opcoes);
  if (!resposta.ok) {
    throw new Error(`Erro na consulta (status ${resposta.status})`);
  }
  return resposta.json();
}

export function buscarPublicacoes(signal) {
  return requisitar("/posts", { signal });
}

export function buscarPublicacao(id, signal) {
  return requisitar(`/posts/${id}`, { signal });
}

export function buscarComentarios(id, signal) {
  return requisitar(`/posts/${id}/comments`, { signal });
}

export function buscarUsuario(id, signal) {
  return requisitar(`/users/${id}`, { signal });
}

// POST: envia uma nova publicação. A API simula o cadastro e devolve o objeto com um id.
export function criarPublicacao(publicacao) {
  return requisitar("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(publicacao),
  });
}
