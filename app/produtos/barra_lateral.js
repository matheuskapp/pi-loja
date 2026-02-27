export default function BarraLateral() {
    return (
        <div className="containerBarraLateral">

            {/* barra lateral + botoes */}


            <div>
                <h2 className="mb-5 p-5 text-dark">BOY+ PLUS</h2>
                <div className="list-group list-group-flush fs-4">
                    <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                        Inicio
                    </a>
                    <a href="#" className="list-group-item list-group-item-action active">Dashboard</a>
                    <a href="#" className="list-group-item list-group-item-action">Produtos</a>
                    <a href="#" className="list-group-item list-group-item-action">Categorias</a>

                    <div className="text-center barralateralPerfil">

                        <div className="btn-group dropend position-fixed bottom-0 mb-3 start-0">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Perfil
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                                <li><a className="dropdown-item" href="#">Sair</a></li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
