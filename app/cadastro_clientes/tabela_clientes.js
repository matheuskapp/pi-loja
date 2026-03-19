'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";



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
                    <th scope="col">Data de Nascimento</th>
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
                                <td>{item.data_nascimento}</td>
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