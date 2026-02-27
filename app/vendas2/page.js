import Estrutura_vendas from "./Estrutura_vendas";

import "./Style.css";
import "./Estrutura.css";

export default function Vendas() {
    return (
        <div className="container-fluid">
            <div className="row">

                {/* MENU */}
                <div className="col-3 menu">

                    <div className="text-center mt-4">
                        <img src="/logo.png" width="120" />
                    </div>

                    <ul className="menu-links">
                        <li>📊 Vendas</li>
                        <li>📦 Produtos</li>
                        <li>👥 Clientes</li>
                    </ul>

                    <hr />

                    <div className="usuario">
                        👤 Usuários
                        <div className="admin">admin</div>
                    </div>

                    <div className="voltar">
                        ⬅ Voltar
                    </div>

                </div>


                {/* CONTEÚDO */}
                <div className="col-9 conteudo">

                    {/* TÍTULO */}
                    <div className="titulo">
                        Vendas
                    </div>

                    {/* VISUALIZAÇÃO */}
                    <Estrutura_vendas />

                </div>

            </div>
        </div>
    );
}