import { useState } from "react";
import { Link } from "react-router-dom";
import useTitulo from "../hooks/useTitulo.js";

const conceitos = [
  { nome: "useState", descricao: "Busca, paginação, curtidas e campos do formulário." },
  { nome: "Formulários", descricao: "Campos controlados, validação e envio com onSubmit." },
  { nome: "useEffect", descricao: "Busca de dados, título da aba e evento de rolagem com limpeza." },
  { nome: "Consumo de API", descricao: "GET e POST na JSONPlaceholder com fetch e tratamento de erros." },
  { nome: "React Router", descricao: "Rotas, Link, rota aninhada, parâmetro :id e página 404." },
];

export default function Inicio() {
  useTitulo("Início");
  const [visitas, setVisitas] = useState(0);

  return (
    <>
      <section className="hero">
        <h1>Bem-vindo ao Blog React</h1>
        <p>
          Uma aplicação que lista, busca, exibe e cadastra publicações
          consumindo a API pública JSONPlaceholder.
        </p>
        <div className="hero__acoes">
          <Link to="/publicacoes" className="botao">Ver publicações</Link>
          <Link to="/publicacoes/nova" className="botao botao--secundario">
            Escrever publicação
          </Link>
        </div>
      </section>

      <section>
        <h2>Conceitos aplicados</h2>
        <div className="grade">
          {conceitos.map((c) => (
            <div key={c.nome} className="card">
              <h3 className="card__titulo">{c.nome}</h3>
              <p className="card__texto">{c.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contador">
        <h2>Exemplo de state</h2>
        <p>Você clicou <strong>{visitas}</strong> {visitas === 1 ? "vez" : "vezes"}.</p>
        <div className="hero__acoes">
          <button className="botao" onClick={() => setVisitas(visitas + 1)}>
            Incrementar
          </button>
          <button className="botao botao--secundario" onClick={() => setVisitas(0)}>
            Zerar
          </button>
        </div>
      </section>
    </>
  );
}
