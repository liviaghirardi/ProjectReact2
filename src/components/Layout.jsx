import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const [mostrarTopo, setMostrarTopo] = useState(false);

  // useEffect com limpeza: o evento de rolagem é removido quando o Layout sai da tela.
  useEffect(() => {
    function aoRolar() {
      setMostrarTopo(window.scrollY > 400);
    }
    window.addEventListener("scroll", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  return (
    <div className="app">
      <header className="cabecalho">
        <div className="container cabecalho__conteudo">
          <NavLink to="/" className="logo">
            Blog<span>React</span>
          </NavLink>
          <nav className="menu">
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/publicacoes" end>Publicações</NavLink>
            <NavLink to="/publicacoes/nova">Nova publicação</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
          </nav>
        </div>
      </header>

      <main className="container principal">
        <Outlet />
      </main>

      <footer className="rodape">
        <div className="container">
          Projeto React 02 · Frameworks Front-end · SENAI
        </div>
      </footer>

      {mostrarTopo && (
        <button
          className="botao-topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
        >
          ↑
        </button>
      )}
    </div>
  );
}
