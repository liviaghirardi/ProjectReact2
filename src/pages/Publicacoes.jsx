import { useEffect, useState } from "react";
import { buscarPublicacoes } from "../services/api.js";
import CardPublicacao from "../components/CardPublicacao.jsx";
import { Carregando, Erro, Vazio } from "../components/Estado.jsx";
import useTitulo from "../hooks/useTitulo.js";

const POR_PAGINA = 12;

export default function Publicacoes() {
  useTitulo("Publicações");

  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [quantidade, setQuantidade] = useState(POR_PAGINA);
  const [tentativa, setTentativa] = useState(0);

  // Busca os dados quando a página é exibida (e ao clicar em "Tentar novamente").
  // O AbortController cancela a requisição se o componente sair da tela.
  useEffect(() => {
    const controle = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await buscarPublicacoes(controle.signal);
        setPublicacoes(dados);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro("Não foi possível carregar as publicações. Verifique sua conexão.");
        }
      } finally {
        if (!controle.signal.aborted) setCarregando(false);
      }
    }

    carregar();
    return () => controle.abort();
  }, [tentativa]);

  const termo = busca.trim().toLowerCase();
  const filtradas = publicacoes.filter(
    (p) => p.title.toLowerCase().includes(termo) || p.body.toLowerCase().includes(termo)
  );
  const visiveis = filtradas.slice(0, quantidade);

  return (
    <section>
      <div className="titulo-pagina">
        <h1>Publicações</h1>
        <p>{publicacoes.length} publicações carregadas da API.</p>
      </div>

      <label className="campo campo--busca">
        <span>Buscar</span>
        <input
          type="search"
          placeholder="Digite um termo do título ou do texto..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setQuantidade(POR_PAGINA);
          }}
        />
      </label>

      {carregando && <Carregando texto="Buscando publicações..." />}

      {erro && <Erro mensagem={erro} aoTentarNovamente={() => setTentativa(tentativa + 1)} />}

      {!carregando && !erro && filtradas.length === 0 && (
        <Vazio texto={`Nenhuma publicação encontrada para "${busca}".`} />
      )}

      {!carregando && !erro && filtradas.length > 0 && (
        <>
          {termo && <p className="info">{filtradas.length} resultado(s) para "{busca}".</p>}
          <div className="grade">
            {visiveis.map((p) => (
              <CardPublicacao key={p.id} publicacao={p} />
            ))}
          </div>
          {quantidade < filtradas.length && (
            <div className="centro">
              <button className="botao" onClick={() => setQuantidade(quantidade + POR_PAGINA)}>
                Carregar mais
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
