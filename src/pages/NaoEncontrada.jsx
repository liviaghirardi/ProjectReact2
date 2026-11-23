import { Link } from "react-router-dom";
import useTitulo from "../hooks/useTitulo.js";

export default function NaoEncontrada() {
  useTitulo("Página não encontrada");

  return (
    <section className="estado">
      <h1 className="codigo-404">404</h1>
      <p>A página que você procurou não existe.</p>
      <Link to="/" className="botao">Voltar ao início</Link>
    </section>
  );
}
