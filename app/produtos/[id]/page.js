'use client'
import supabase from "@/app/conexao/supabase"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
function consultaProdutos() {
     
        
    const [listaProdutos, alteraListaProdutos] = useState([])
     
    async function buscaProdutos() {

        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', params.id)
        alteraListaProdutos(data)
    }

    const params = useParams()

    useEffect(() => {
        buscaProdutos()
    }, [])

    return (
        <div>
            <h1>Consulta de Produtos</h1>

            <hr />
            
            




            {
                listaProdutos.map(
                    item => <div> 
                        <p>ID: {item.id}</p>
                        <p>produto: {item.nome} </p>
                        <p>quantidade: {item.quantidade} </p>
                        <p>datetime: {item.created_at}</p>
                    </div>
                )
            }
            

        </div>
     );
}

export default consultaProdutos;