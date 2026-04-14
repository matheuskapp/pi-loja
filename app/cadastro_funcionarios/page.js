import BarraLateral from "../components/barra_lateral";
import PaginaFuncionarios from "./cadastro_funcionarios";

function CadastroUsuarios() {
    return (
        <div style={{ display: "flex", backgroundColor: "var(--bg-body)", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <PaginaFuncionarios />
            </main>
        </div>
    );
}

export default CadastroUsuarios;