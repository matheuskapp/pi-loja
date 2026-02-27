import "./Estrutura.css"

export default function Estrutura_vendas() {
  return (
    <div className="container-fluid">

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Vendas Hoje</h6>
              <h4 className="fw-bold">R$ 0,00</h4>
              <small className="text-muted">0 vendas realizadas</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Ticket Médio</h6>
              <h4 className="fw-bold">R$ 0,00</h4>
              <small className="text-muted">Valor médio por venda</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted">Caixa Atual</h6>
              <h4 className="fw-bold">--</h4>
              <small className="text-muted">Nenhum caixa aberto</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm h-100 border-warning">
            <div className="card-body">
              <h6 className="text-muted">Alertas</h6>
              <h4 className="fw-bold text-warning">4</h4>
              <small className="text-muted">Produtos com estoque baixo</small>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}