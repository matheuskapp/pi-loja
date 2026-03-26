'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import BarraLateral from '../components/barra_lateral';
import BarraPesquisa from './barra_pesquisa';
import { BotaoAdicionarFuncionarios } from './botao_adicionar_funcionarios';
import { ListaFuncionarios } from './listafuncionarios';
import CabecalhoFuncionarios from './cabecalho_funcionarios';
import { useEffect, useState } from 'react';
import supabase from '../conexao/supabase';




export default function CadastroUsuarios() {

    const [listafuncionarios, alteraListaFuncionarios] = useState([])
    const [pesquisaFuncionarios, alteraPesquisaFuncionarios] = useState("")




    async function buscar() {

        const { data, error } = await supabase
            .from('usuarios')
            .select()
        console.log(data)
        console.log(error)
        alteraListaFuncionarios(data)

    }

    async function pesquisar() {

        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .ilike('nome', '%' + pesquisaFuncionarios + '%')

        console.log(data)
        console.log(error)

        alteraListaFuncionarios(data)
        

    }

    useEffect(() => {
        buscar()
        pesquisar()
    }, [])


    return (


        <div className="row">

            <div className='col-2'>
                <BarraLateral />

            </div>



            <div className='col-10'>
                <CabecalhoFuncionarios />

                <BarraPesquisa
                    pesquisar={pesquisar}
                    pesquisaFuncionarios={pesquisaFuncionarios}
                    alteraPesquisaFuncionarios={alteraPesquisaFuncionarios}
                />

                <BotaoAdicionarFuncionarios />

                <ListaFuncionarios
                    listafuncionarios={listafuncionarios}
                    pesquisar={pesquisar}
                    alteraPesquisaFuncionarios={alteraPesquisaFuncionarios}
                    alteraListaFuncionarios={alteraListaFuncionarios}
                />
            </div>

        </div>
    );
}