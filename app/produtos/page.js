import BarraLateral from "../components/barra_lateral";
import ProdutosTeste from "./tabela_produtos2";

export default function Produtos() {
    return (
        <div style={{ display: "flex", backgroundColor: "var(--bg-body)", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <ProdutosTeste />
            </main>
        </div>
    );
}
