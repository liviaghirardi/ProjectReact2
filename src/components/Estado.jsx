// Componentes para os estados de carregamento, erro e lista vazia.
export function Carregando({ texto = "Carregando..." }) {
  return (
    <div className="estado">
      <div className="spinner" aria-hidden="true" />
      <p>{texto}</p>
    </div>
  );
}

export function Erro({ mensagem, aoTentarNovamente }) {
  return (
    <div className="estado estado--erro" role="alert">
      <p>{mensagem}</p>
      {aoTentarNovamente && (
        <button className="botao" onClick={aoTentarNovamente}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function Vazio({ texto }) {
  return (
    <div className="estado">
      <p>{texto}</p>
    </div>
  );
}
