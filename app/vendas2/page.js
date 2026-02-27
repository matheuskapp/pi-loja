import Estrutura_vendas from "./Estrutura_vendas";



import BarraLateral from "../components/barra_lateral";

export default function Vendas() {
  return (


    <div className="row">
      


        {/* SIDEBAR */}

        <div className="col-2">

          <BarraLateral />

        </div>

        <div className="col-10 p-4">

          {/* TOPO DASHBOARD */}
          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">Dashboard</h2>
              <small className="text-muted">
                Visão geral do seu negócio • 26/02/2026
              </small>
            </div>

            <button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2">
              <i className="bi bi-cart3"></i>
              Nova Venda
            </button>

          </div>

          <Estrutura_vendas />

        </div>


      
    </div>
  );
}