import Vendas from "./Vendas";

import BarraLateral from "../components/barra_lateral";

export default function vendas() {
    return (
    <div style={{ display: "flex" }}>
      
      <BarraLateral />

      
      <main style={{ marginLeft: "260px", width: "100%", padding: "24px" }}>
        
        
        <div className="mb-4">
          <h2 className="fw-bold">Gestão de Vendas</h2>
          <p className="text-muted">Cadastre e gerencie as vendas do sistema Boy+ Plus</p>
          <hr />
        </div>

        
        <Vendas />

      </main>
    </div>
  );
}