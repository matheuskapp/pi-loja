'use client'
import supabase from "@/app/conexao/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function consultaVenda() {

    const [listaProdutos, alteraListaProdutos] = useState([])
     
    async function buscaProdutos() {

        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', params.id)
        alteraListaVendas(data)
    }

    const params = useParams()

    useEffect(() => {
        buscaVendas()
    }, [])

    return (
        <div>
            <h1>Consulta de vendas</h1>

            <hr />
            {
                listaProdutos.map(
                    item => <div> 
                        <p>ID: {item.id}</p>
                        <p>Comprador: {item.id_usuario.nome}</p>
                        <p>Livro: {item.id_livro.nome} </p>
                        <p>quantidade: {item.quantidade} </p>
                        <p>datetime: {item.created_at}</p>

                    </div>
                )
            }


        </div>
    );
}

export default consultaVenda;