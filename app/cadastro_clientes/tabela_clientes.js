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

    function editar(objeto){
        
    }

    useEffect(() => {
        buscar()
    }, [])



    return (
        <div>



          

            <table className="container py-5 bg-light text-align-left ms-4 rounded-5">

               <table class="table align-middle">


                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Ações</th>
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
                                <td><button onClick={() => editar(item)}>Editar</button></td>
                            </tr>
                        )
                    }
                </tbody>
               </table>
            </table>

        </div>



    );
}

export default TabelaClientes;