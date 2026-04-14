'use client'
import DashBoard from "./DashBoard";
import BarraLateral from "../components/barra_lateral";

export default function dashboard() {

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div style={{ display: "flex", backgroundColor: "var(--bg-body)", minHeight: "100vh" }}>

      <BarraLateral />

      <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>

        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold mb-1" style={{ letterSpacing: "-1px" }}>Dashboard</h1>
            <p className="text-muted mb-0">
              <span className="fw-semibold text-dark">{dataAtual}</span>
            </p>
          </div>
          
          <div className="d-flex gap-2">
            <button className="btn btn-primary shadow-sm rounded-3 px-4 fw-bold" onClick={() => window.location.reload()}>
              Atualizar Dados
            </button>
          </div>
        </div>
        
        <DashBoard />

      </main>
    </div>
  );
}