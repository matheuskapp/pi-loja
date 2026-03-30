'use client'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
    return (
        <div className="container py-5">

            {/* HERO */}
            <div className="text-center mb-5">
                <h1 className="fw-bold">Sistema de Gestão de Clientes</h1>
                <p className="text-muted">
                    Organize, cadastre e gerencie seus clientes de forma simples, rápida e eficiente.
                </p>

                <a href="/cadastro_clientes" className="btn btn-primary mt-3">
                    Começar agora 🚀
                </a>
            </div>

            {/* BENEFÍCIOS */}
            <div className="row text-center">

                <div className="col-md-4 mb-4">
                    <div className="p-4 shadow rounded">
                        <h4>📋 Cadastro Fácil</h4>
                        <p>Adicione clientes rapidamente com informações completas.</p>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="p-4 shadow rounded">
                        <h4>🔍 Busca Inteligente</h4>
                        <p>Encontre clientes pelo nome de forma rápida.</p>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="p-4 shadow rounded">
                        <h4>✏️ Edição Rápida</h4>
                        <p>Atualize informações com poucos cliques.</p>
                    </div>
                </div>

            </div>

            {/* SOBRE */}
            <div className="mt-5 text-center">
                <h3>Sobre o sistema</h3>
                <p className="text-muted">
                    Este sistema foi desenvolvido para facilitar o controle de clientes,
                    permitindo cadastro, edição e busca de dados de forma prática.
                    Ideal para pequenos negócios e uso administrativo.
                </p>
            </div>

        </div>
    )
}