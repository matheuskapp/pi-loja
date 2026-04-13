'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'

export default function Home() {
    return (
        <div className="hero-wrapper">
            {/* MENU SUPERIOR */}
            <nav className="navbar navbar-expand-lg glass-nav sticky-top py-3">
                <div className="container d-flex align-items-center justify-content-between">
                    <span className="navbar-brand-gradient">
                        Boy+ Plus
                    </span>
                    <div>
                        <a href="/login" className="premium-btn" style={{ padding: "8px 24px", fontSize: "0.95rem" }}>
                            Login
                        </a>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="flex-grow-1 d-flex flex-column justify-content-center py-5">
                
                {/* HERO SECTION */}
                <div className="container text-center mb-5 pb-4">
                    <h1 className="hero-title mb-4 mx-auto" style={{ maxWidth: "800px" }}>
                        Gestão inteligente para sua loja Plus Size
                    </h1>

                    <p className="text-muted fs-5 mx-auto mb-5" style={{ maxWidth: "600px", lineHeight: "1.6" }}>
                        Tudo que você precisa para gerenciar vendas, estoque e clientes em uma plataforma elegante, minimalista e fácil de usar.
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        <a href="/login" className="premium-btn">
                            Acessar Sistema
                        </a>
                        <a href="/apresentacao" className="outline-btn">
                            Saiba mais
                        </a>
                    </div>
                </div>

                {/* CARDS DE VALOR */}
                <div className="container mt-4">
                    <div className="row g-4 justify-content-center">
                        
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold text-dark mb-3">Gestão de Vendas</h4>
                                <p className="text-muted mb-0">
                                    Controle o fluxo de caixa, registre vendas e acompanhe os resultados do seu negócio em tempo real.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold text-dark mb-3">Controle de Clientes</h4>
                                <p className="text-muted mb-0">
                                    Fidelize seu público mantendo os dados organizados. Registre histórico e preferências com segurança.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold text-dark mb-3">Estoque Preciso</h4>
                                <p className="text-muted mb-0">
                                    Monitore as peças em tempo real. Evite furos e tenha informações atualizadas sobre os produtos.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            {/* FOOTER */}
            <footer className="mt-auto py-4 text-center pb-5">
                <div className="container">
                    <p className="text-muted small mb-0 fw-medium">
                        © {new Date().getFullYear()} Boy+ Plus • Todos os direitos reservados
                    </p>
                </div>
            </footer>

        </div>
    )
}