import BarraLateral from "../components/barra_lateral";
import TabelaClientes from "./tabela_clientes";



function listaClientes() {
    return (
        <div className="row">
            <div className="col-2">
                <BarraLateral />

            </div>

            <div className="col-10">

                <h1>Lista de clientes cadastrados</h1>

                <TabelaClientes/>

            </div>




        </div>
    );
}

export default listaClientes;