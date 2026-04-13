import Vendas from "./Vendas";

import BarraLateral from "../components/barra_lateral";

export default function vendas() {
    return (
        <div style={{ display: "flex", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                    <div>
                        <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Vendas</h1>
                        <p className="text-muted mb-0">
                            PDV Boy+ Plus • <span className="fw-semibold text-dark">Realizar Venda e Histórico</span>
                        </p>
                    </div>
                </div>

                <Vendas />
            </main>
        </div>
    );
}