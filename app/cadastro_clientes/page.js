'use client'

import BarraLateral from "../components/barra_lateral";
import supabase from "../conexao/supabase";
import CadastroClientes from "./teste";





function page() {

    return (
        <div className="row">


            <div className="col-2">

                <BarraLateral />

            </div>
            <div className="col-8" >

                <CadastroClientes />

            </div>

            {/* <div className="col-2">
    
    <BarraLateral />
    
    </div>
    
    <div className="col-10">
    
    
    <BotaoAdicionarClientes />
    <TabelaClientes listaClientes={listaClientes} pesquisar={pesquisar} pesquisaClientes={pesquisaClientes} alteraPesquisaClientes={alteraPesquisaClientes} />
    <CadastroClientes />
    
    </div> */}

        </div>


    );
}

export default page;