import { useState } from "react";
import { Link } from "react-router-dom";
import { criarPublicacao } from "../services/api.js";
import useTitulo from "../hooks/useTitulo.js";

const valoresIniciais = { title: "", body: "", userId: "1" };

function validar(dados) {
  const erros = {};
  if (dados.title.trim().length < 5) {
    erros.title = "O título precisa ter pelo menos 5 caracteres.";
  }
  if (dados.body.trim().length < 20) {
    erros.body = "O texto precisa ter pelo menos 20 caracteres.";
  }
  if (!dados.userId) {
    erros.userId = "Selecione um autor.";
  }
  return erros;
}

export default function NovaPublicacao() {
  useTitulo("Nova publicação");

  const [dados, setDados] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [enviadas, setEnviadas] = useState([]);

  // Um único handler para todos os campos controlados.
  function atualizarCampo(e) {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    if (erros[name]) setErros({ ...erros, [name]: undefined });
  }

  async function enviar(e) {
    e.preventDefault(); // evita o recarregamento da página

    const novosErros = validar(dados);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    setErroEnvio("");
    try {
      const criada = await criarPublicacao({
        title: dados.title.trim(),
        body: dados.body.trim(),
        userId: Number(dados.userId),
      });
      setEnviadas([criada, ...enviadas]);
      setDados(valoresIniciais);
    } catch {
      setErroEnvio("Não foi possível enviar a publicação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  function limpar() {
    setDados(valoresIniciais);
    setErros({});
  }

  return (
    <section className="estreito">
      <div className="titulo-pagina">
        <h1>Nova publicação</h1>
        <p>Os dados são enviados com POST para a JSONPlaceholder, que simula o cadastro.</p>
      </div>

      <form className="formulario" onSubmit={enviar} noValidate>
        <label className="campo">
          <span>Título</span>
          <input
            name="title"
            value={dados.title}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.title)}
          />
          {erros.title && <small className="mensagem-erro">{erros.title}</small>}
        </label>

        <label className="campo">
          <span>Texto</span>
          <textarea
            name="body"
            rows="6"
            value={dados.body}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.body)}
          />
          <small className="contagem">{dados.body.trim().length} caracteres</small>
          {erros.body && <small className="mensagem-erro">{erros.body}</small>}
        </label>

        <label className="campo">
          <span>Autor</span>
          <select name="userId" value={dados.userId} onChange={atualizarCampo}>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Usuário {i + 1}</option>
            ))}
          </select>
          {erros.userId && <small className="mensagem-erro">{erros.userId}</small>}
        </label>

        {erroEnvio && <p className="mensagem-erro">{erroEnvio}</p>}

        <div className="hero__acoes">
          <button type="submit" className="botao" disabled={enviando}>
            {enviando ? "Enviando..." : "Publicar"}
          </button>
          <button type="button" className="botao botao--secundario" onClick={limpar}>
            Limpar
          </button>
        </div>
      </form>

      {enviadas.length > 0 && (
        <section className="enviadas">
          <h2>Enviadas nesta sessão</h2>
          {enviadas.map((p, i) => (
            <div key={`${p.id}-${i}`} className="sucesso">
              <strong>✓ “{p.title}”</strong>
              <p>A API respondeu com o id {p.id} (autor: usuário {p.userId}).</p>
            </div>
          ))}
          <Link to="/publicacoes">Ver todas as publicações →</Link>
        </section>
      )}
    </section>
  );
}
