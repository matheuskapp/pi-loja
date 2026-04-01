'use client'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>

            {/* MENU SUPERIOR */}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
                <div className="container">

                    <span className="navbar-brand fw-bold">
                        Sistema Clientes
                    </span>

                    <div className="ms-auto">

                        <a href="/login" className="btn btn-primary px-3">
                            Login
                        </a>
                    </div>

                </div>
            </nav>

            {/* HERO */}
            <div className="container py-5 text-center">
                <h1 className="fw-bold display-5 mb-3">
                    Gestão de Clientes de forma simples e eficiente
                </h1>

                <p className="text-muted fs-5 col-md-7 mx-auto">
                    Centralize informações, agilize atendimentos e mantenha seus dados sempre organizados com uma plataforma prática e intuitiva.
                </p>

                <div className="mt-4">
                    <a href="/login" className="btn btn-primary btn-lg px-4 me-2">
                        Começar agora
                    </a>

                                    </div>
            </div>

            {/* CARDS DE VALOR */}
            <div className="container pb-5">
                <div className="row text-center">

                    <div className="col-md-4 mb-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                            <h5 className="fw-bold">Organização</h5>
                            <p className="text-muted">
                                Todas as informações dos clientes centralizadas em um único lugar.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                            <h5 className="fw-bold">Agilidade</h5>
                            <p className="text-muted">
                                Acesso rápido aos dados para otimizar o atendimento.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                            <h5 className="fw-bold">Controle</h5>
                            <p className="text-muted">
                                Atualização fácil garantindo dados sempre corretos.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <hr className="container" />

            {/* CADASTRO */}
            <div className="container py-5">
                <div className="row align-items-center">

                    <div className="col-md-6">
                        <h4 className="fw-bold mb-3">Cadastro completo de clientes</h4>

                        <p className="text-muted">
                            O sistema permite registrar clientes com todas as informações necessárias,
                            garantindo organização e facilidade de acesso.
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="bg-white p-4 rounded-4 shadow-sm border">
                            <small className="text-muted">Dados armazenados:</small>
                            <ul className="mt-2 text-muted">
                                <li>Nome completo</li>
                                <li>CPF</li>
                                <li>Telefone</li>
                                <li>Email</li>
                                <li>Endereço</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <hr className="container" />

            {/* BUSCA */}
            <div className="container py-5">
                <div className="row align-items-center flex-md-row-reverse">

                    <div className="col-md-6">
                        <h4 className="fw-bold mb-3">Busca rápida e eficiente</h4>

                        <p className="text-muted">
                            Localize clientes instantaneamente através do nome,
                            facilitando consultas e atendimentos.
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="bg-white p-4 rounded-4 shadow-sm border">
                            <small className="text-muted">Funcionalidades:</small>
                            <ul className="mt-2 text-muted">
                                <li>Pesquisa por nome</li>
                                <li>Resultados imediatos</li>
                                <li>Interface simples</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <hr className="container" />

            {/* EDIÇÃO */}
            <div className="container py-5">
                <div className="row align-items-center">

                    <div className="col-md-6">
                        <h4 className="fw-bold mb-3">Atualização de dados</h4>

                        <p className="text-muted">
                            Edite e mantenha os dados dos clientes sempre atualizados
                            com um processo simples e intuitivo.
                        </p>
                    </div>

                    <div className="col-md-6">
                        <div className="bg-white p-4 rounded-4 shadow-sm border">
                            <small className="text-muted">Ações:</small>
                            <ul className="mt-2 text-muted">
                                <li>Editar informações</li>
                                <li>Salvar alterações</li>
                                <li>Atualização em tempo real</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA FINAL */}
            <div className="container text-center py-5">
                <h4 className="fw-bold mb-3">
                    Comece a organizar seus clientes hoje mesmo
                </h4>

                <a href="/login" className="btn btn-dark btn-lg px-5">
                    Acessar sistema
                </a>
            </div>

            {/* FOOTER */}
            <footer className="bg-white border-top">
                <div className="container py-4 text-center text-muted">
                    <small>
                        © 2026 Sistema de Gestão de Clientes • Todos os direitos reservados
                    </small>
                </div>
            </footer>

        </div>
    )
}