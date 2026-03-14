'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://walrpbrbskwawykdrwna.supabase.co', 'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa')


function TabelaClientes() {

    const [listaClientes, alteraListaClientes] = useState([])

    async function buscar() {

        const { data, error } = await supabase
            .from('clientes')
            .select()
        console.log(data)
        alteraListaClientes(data)

    }

    useEffect(() => {
        buscar()
    }, [])



    return (
        <div>



          

            <table class="table">

                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Endereço</th>
                </tr>
                <thead />
                <tbody>

                    {
                        listaClientes.map(

                            item => <tr>

                                <td>{item.nome}</td>
                                <td>{item.cpf}</td>
                                <td>{item.telefone}</td>
                                <td>{item.email}</td>
                                <td>{item.endereco}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>



    );
}

export default TabelaClientes;