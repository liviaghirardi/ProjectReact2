import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Publicacoes from "./pages/Publicacoes.jsx";
import PublicacaoDetalhe from "./pages/PublicacaoDetalhe.jsx";
import NovaPublicacao from "./pages/NovaPublicacao.jsx";
import Sobre from "./pages/Sobre.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

// React Router: cada caminho da URL exibe uma página diferente.
// As rotas ficam aninhadas dentro do Layout (cabeçalho + rodapé).
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="publicacoes" element={<Publicacoes />} />
        <Route path="publicacoes/nova" element={<NovaPublicacao />} />
        <Route path="publicacoes/:id" element={<PublicacaoDetalhe />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
