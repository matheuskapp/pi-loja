import "./Estrutura.css"

export default function Estrutura_vendas() {
  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <span>Visão geral do seu negócio • 26/02/2026</span>
        </div>

        <button className="btn-nova-venda">
          🛒 Nova Venda
        </button>
      </div>

      {/* CARDS */}
      <div className="cards">

        <div className="card">
          <p>Vendas Hoje</p>
          <h3>R$ 0,00</h3>
          <span>0 vendas realizadas</span>
        </div>

        <div className="card">
          <p>Ticket Médio</p>
          <h3>R$ 0,00</h3>
          <span>Valor médio por venda</span>
        </div>

        <div className="card">
          <p>Caixa Atual</p>
          <h3>—</h3>
          <span>Nenhum caixa aberto</span>
        </div>

        <div className="card alerta">
          <p>Alertas</p>
          <h3>4</h3>
          <span>Produtos com estoque baixo</span>
        </div>

      </div>

      {/* GRÁFICO */}
      <div className="grafico-card">
        <h3>📊 Vendas dos Últimos 7 Dias</h3>
        <div className="grafico-placeholder">
          (*)
        </div>
      </div>

    </div>
    
    

  );
}
