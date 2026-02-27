export default function BarraLateral() {
    return (
        <div>

            {/* barra lateral + botoes */}


            <div class="barralateral row flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px", height: "100vh" }}>
                <h2>Admin</h2>
                <div class="list-group list-group-flush fs-4">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        Inicio
                    </a>
                    <a href="#" class="list-group-item list-group-item-action active">Dashboard</a>
                    <a href="#" class="list-group-item list-group-item-action">Produtos</a>
                    <a href="#" class="list-group-item list-group-item-action">Categorias</a>

                    <div class="text-center barralateralPerfil">

                        <div class="btn-group dropend">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Perfil
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Editar</a></li>
                                <li><a class="dropdown-item" href="#">Sair</a></li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
