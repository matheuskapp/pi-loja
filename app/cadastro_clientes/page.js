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

    const [editando, alteraEditando] = useState()

    async function atualizar() {
        e.preventDefault()

        const objeto = {
            nome: nome,
            data_nascimento: data_nascimento,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco,
        }

        const { error } = await supabase
        .from('usuarios')
        .update(objeto)
        .eq('id', editando)


        if (error == null){
            alert("Atualização realizada com sucesso")
            cancelaEdicao()
            buscar()
        }else{
            alert("Verifique os campos e tente novamente!")
        }
    }

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

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome)
        alteraData_Nascimento(objeto.data_nascimento)
        alteraCpf(objeto.cpf)
        alteraTelefone(objeto.telefone)
        alteraEmail(objeto.email)
        alteraEndereco(objeto.endereco)
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraNome("")
        alteraData_Nascimento()
        alteraCpf("")
        alteraTelefone()
        alteraEmail("")
        alteraEndereco("")
    }

    useEffect(() => {
        buscar()
    }, [])

    return (

        <div className="row">
            <div className="col-2">

                <BarraLateral />

            </div>

            <div className="col-10">


                <BotaoAdicionarClientes />
                <TabelaClientes listaClientes={listaClientes} pesquisar={pesquisar} pesquisaClientes={pesquisaClientes} alteraPesquisaClientes={alteraPesquisaClientes} editar={editar} />
                <CadastroClientes />

            </div>

        </div>
    );
}

export default cadastroClientes;