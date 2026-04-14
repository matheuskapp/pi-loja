import BarraLateral from "../components/barra_lateral";
import CadastroClientes from "./cadastro_clientes_completo";

function page() {
    return (
        <div style={{ display: "flex", backgroundColor: "var(--bg-body)", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <CadastroClientes />
            </main>
        </div>
    );
}

export default page;