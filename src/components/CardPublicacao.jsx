import { Link } from "react-router-dom";

export default function CardPublicacao({ publicacao }) {
  return (
    <article className="card">
      <span className="card__tag">#{publicacao.id}</span>
      <h3 className="card__titulo">{publicacao.title}</h3>
      <p className="card__texto">{publicacao.body}</p>
      <Link to={`/publicacoes/${publicacao.id}`} className="card__link">
        Ler publicação →
      </Link>
    </article>
  );
}
