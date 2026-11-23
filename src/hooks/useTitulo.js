import { useEffect } from "react";

// useEffect sincronizando o título da aba com a página exibida.
export default function useTitulo(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Blog React`;
  }, [titulo]);
}
