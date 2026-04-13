import BarraLateral from "../components/barra_lateral";
import CadastroClientes from "./cadastro_clientes_completo";

function page() {
    return (
        <div style={{ display: "flex", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <CadastroClientes />
            </main>
        </div>
    );
}

export default page;