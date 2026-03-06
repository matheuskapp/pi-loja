
export default function DashBoard() {
  return (
    <div className="container-fluid">

      
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Vendas Hoje</h6>
            <h4 className="fw-bold">R$ 0,00</h4>
            <small className="text-muted">0 vendas realizadas</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Ticket Médio</h6>
            <h4 className="fw-bold">R$ 0,00</h4>
            <small className="text-muted">Valor médio por venda</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Caixa Atual</h6>
            <h4 className="fw-bold">--</h4>
            <small className="text-muted">Nenhum caixa aberto</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100 border-warning">
            <h6 className="text-muted">Alertas</h6>
            <h4 className="fw-bold text-warning">4</h4>
            <small className="text-muted">Produtos com estoque baixo</small>
          </div>
        </div>

      </div>

      
      <div className="row mt-4">
        <div className="col-12">
          <div
            className="card shadow p-3 mb-4 bg-body-tertiary rounded"
            style={{ minHeight: "400px" }}
          >
            <h5 className="fw-bold mb-3">Aqui vai um gráfico de Vendas</h5>
          </div>
        </div>
      </div>

      
      <div className="row mt-4">

        <div className="col-sm-6 mb-4">
          <div
            className="card shadow p-3 bg-body-tertiary rounded h-100"
            style={{ minHeight: "300px" }}
          >
            <h5 className="fw-bold">Mais Vendidos</h5>
            <p className="text-muted">Top 5 produtos por quantidade.</p>
          </div>
        </div>

        <div className="col-sm-6 mb-4">
          <div
            className="card shadow p-3 bg-body-tertiary rounded h-100"
            style={{ minHeight: "300px" }}
          >
            <h5 className="fw-bold">Estoque Baixo</h5>
            <p className="text-muted">Produtos abaixo do mínimo.</p>
          </div>
        </div>

      </div>

      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded">

            <h5 className="fw-bold mb-3">
              ⚠ Sem Vendas a 30 Dias ⚠
            </h5>

            <p className="text-muted">
              Produtos precisando de reposição!
            </p>

            <div className="row g-3 mt-3">

              <div className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-muted">Camiseta Oversize</h6>
                  <p>Rosa-XXG</p>
                  <strong>0 vendas</strong>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-muted">Camiseta Polo</h6>
                  <p>Bege-M</p>
                  <strong>0 vendas</strong>
                </div>
              </div>

              <div className="col-md-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-muted">Camiseta Polo</h6>
                  <p>Azul-P</p>
                  <strong>0 vendas</strong>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}