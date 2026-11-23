import useTitulo from "../hooks/useTitulo.js";

export default function Sobre() {
  useTitulo("Sobre");

  return (
    <section className="estreito">
      <div className="titulo-pagina">
        <h1>Sobre o projeto</h1>
      </div>
      <p>
        Este projeto foi desenvolvido para a atividade <strong>Projeto React 02</strong> da
        disciplina Frameworks Front-end (SENAI). O objetivo é aplicar os conceitos de state,
        formulários, efeitos, consumo de APIs e roteamento em uma aplicação real.
      </p>
      <h2>Tecnologias</h2>
      <ul className="lista">
        <li>React 19 com Vite</li>
        <li>React Router DOM</li>
        <li>Fetch API</li>
        <li>CSS puro com variáveis e tema claro/escuro automático</li>
      </ul>
      <h2>API utilizada</h2>
      <p>
        <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer">
          JSONPlaceholder
        </a>{" "}
        — API REST gratuita para testes, com publicações, comentários e usuários.
      </p>
    </section>
  );
}
