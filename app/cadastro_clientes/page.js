'use client'
import BarraLateral from "../components/barra_lateral";
import TabelaClientes from "../cadastro_clientes/tabela_clientes";
import CadastroClientes from "./cadastro_clientes";




function cadastroClientes() {
    return (
        <div className="row">
            <div className="col-2">
                <BarraLateral />

            </div>

            <div className="col-09">
                <CadastroClientes/>

            </div>

            <div className="col-10">

                <h1>Lista de clientes cadastrados</h1>

                <TabelaClientes/>

            </div>




        </div>
    );
}

export default cadastroClientes;