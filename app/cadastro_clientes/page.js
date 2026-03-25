'use client'
import BarraLateral from "../components/barra_lateral";
import TabelaClientes from "../cadastro_clientes/tabela_clientes";
import CadastroClientes from "./cadastro_clientes";
import { BotaoAdicionarClientes } from "./botao_adicionar_cliente";
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";




function cadastroClientes() {

    const [listaClientes, alteraListaClientes] = useState([])
    const [pesquisaClientes, alteraPesquisaClientes] = useState("")

    const [editarUsuario, alteraEditarUsuario] = useState()


    async function buscar() {

        const { data, error } = await supabase
            .from('clientes')
            .select()
        console.log(data)
        alteraListaClientes(data)

    }

    async function pesquisar() {
        const { data, error } = await supabase
            .from('clientes')
            .select('*')
            .ilike('nome', '%' + pesquisaClientes + '%')
        console.log(data)
        console.log(error)

        alteraListaClientes(data)

    }

    
    useEffect(() => {
        buscar()
    }, [])

    return (
      
          <div className="row">
                      <div className="col-2">
          
                          <BarraLateral/>
          
                      </div>
          
                      <div className="col-10">
          
                          
                          <BotaoAdicionarClientes/>
                          <TabelaClientes listaClientes={listaClientes} pesquisar={pesquisar} />
                          
          
                      </div>
                      
                  </div>
    );
}

export default cadastroClientes;