import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarComentarios, buscarPublicacao, buscarUsuario } from "../services/api.js";
import { Carregando, Erro } from "../components/Estado.jsx";
import useTitulo from "../hooks/useTitulo.js";

export default function PublicacaoDetalhe() {
  // Parâmetro de rota: /publicacoes/:id
  const { id } = useParams();

  const [publicacao, setPublicacao] = useState(null);
  const [autor, setAutor] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [curtidas, setCurtidas] = useState(0);
  const [curtiu, setCurtiu] = useState(false);

  // Campos controlados do formulário de comentário
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [erroComentario, setErroComentario] = useState("");

  useTitulo(publicacao ? publicacao.title : "Publicação");

  // Busca novamente sempre que o id da URL muda.
  // A limpeza (abort) cancela a requisição anterior se o usuário trocar de página.
  useEffect(() => {
    const controle = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);
      setCurtidas(0);
      setCurtiu(false);
      try {
        const [post, lista] = await Promise.all([
          buscarPublicacao(id, controle.signal),
          buscarComentarios(id, controle.signal),
        ]);
        const usuario = await buscarUsuario(post.userId, controle.signal);
        setPublicacao(post);
        setComentarios(lista);
        setAutor(usuario);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro("Publicação não encontrada ou serviço indisponível.");
        }
      } finally {
        if (!controle.signal.aborted) setCarregando(false);
      }
    }

    carregar();
    return () => controle.abort();
  }, [id]);

  function alternarCurtida() {
    setCurtidas(curtiu ? curtidas - 1 : curtidas + 1);
    setCurtiu(!curtiu);
  }

  function enviarComentario(e) {
    e.preventDefault();
    if (nome.trim().length < 2 || texto.trim().length < 5) {
      setErroComentario("Informe seu nome (mín. 2 letras) e um comentário (mín. 5 caracteres).");
      return;
    }
    const novo = { id: Date.now(), name: nome.trim(), email: "você", body: texto.trim() };
    setComentarios([novo, ...comentarios]);
    setNome("");
    setTexto("");
    setErroComentario("");
  }

  if (carregando) return <Carregando texto="Carregando publicação..." />;

  if (erro) {
    return (
      <>
        <Erro mensagem={erro} />
        <div className="centro">
          <Link to="/publicacoes" className="botao">Voltar para publicações</Link>
        </div>
      </>
    );
  }

  const idNumero = Number(id);

  return (
    <article className="detalhe">
      <Link to="/publicacoes" className="voltar">← Voltar</Link>

      <span className="card__tag">Publicação #{publicacao.id}</span>
      <h1>{publicacao.title}</h1>
      {autor && (
        <p className="autor">
          por <strong>{autor.name}</strong> · {autor.email} · {autor.company.name}
        </p>
      )}
      <p className="detalhe__texto">{publicacao.body}</p>

      <button
        className={curtiu ? "botao" : "botao botao--secundario"}
        onClick={alternarCurtida}
      >
        {curtiu ? "♥ Curtido" : "♡ Curtir"} ({curtidas})
      </button>

      <nav className="paginacao">
        {idNumero > 1 && <Link to={`/publicacoes/${idNumero - 1}`}>← Anterior</Link>}
        {idNumero < 100 && <Link to={`/publicacoes/${idNumero + 1}`}>Próxima →</Link>}
      </nav>

      <section className="comentarios">
        <h2>Comentários ({comentarios.length})</h2>

        <form className="formulario" onSubmit={enviarComentario} noValidate>
          <label className="campo">
            <span>Nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label className="campo">
            <span>Comentário</span>
            <textarea rows="3" value={texto} onChange={(e) => setTexto(e.target.value)} />
          </label>
          {erroComentario && <p className="mensagem-erro">{erroComentario}</p>}
          <button type="submit" className="botao">Comentar</button>
        </form>

        <ul className="lista-comentarios">
          {comentarios.map((c) => (
            <li key={c.id} className="comentario">
              <strong>{c.name}</strong>
              <small>{c.email}</small>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
