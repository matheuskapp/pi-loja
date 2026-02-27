import Link from "next/link";
import "./barra_lateral.css";

export default function BarraLateral() {
    return (
        <div className="containerBarraLateral">

            <div className="BarraLateral">
                <div className="text-center mb-4">
                    <h4 className="fw-bold">Boy+ Plus</h4>
                </div>

                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <Link href="login" className="nav-link active">
                            <i className="bi bi-grid me-2"></i> Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link">
                            <i className="bi bi-kanban me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="produtos" className="nav-link">
                            <i className="bi bi-credit-card me-2"></i> Produtos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="#" className="nav-link">
                            <i className="bi bi-gear me-2"></i> Categorias
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="vendas2" className="nav-link">
                            <i className="bi bi-gear me-2"></i> Vendas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="cadastro_clientes" className="nav-link">
                            <i className="bi bi-gear me-2"></i> Clientes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="cadastro_usuarios" className="nav-link">
                            <i className="bi bi-gear me-2"></i> Usuários
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

