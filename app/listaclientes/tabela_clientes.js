'use client'
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://walrpbrbskwawykdrwna.supabase.co', 'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa')


function TabelaClientes() {

    const [nome, alteraNome] = useState("")
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState()

    async function salvar(e) {
        e.preventDefault()
        const objeto = {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco,

        }
       alteraListaClientes(listaClientes.concat(objeto))

       const { error } = await supabase
            .from('clientes')
            .select(objeto)      
    }

       

    return (
        <div>

           {/* <form onSubmit={salvar}>

                <p>Nome Completo: </p>
                <input onChange={e => alteraNome(e.target.value)} />
                <p>CPF: </p>
                <input onChange={e => alteraCpf(e.target.value)} />
                <p>Telefone: </p>
                <input onChange={e => alteraTelefone(e.target.value)} />
                <p>Email: </p>
                <input onChange={e => alteraEmail(e.target.value)} />
                <p>Endereço: </p>
                <input onChange={e => alteraEndereco(e.target.value)} />
                <br></br>

                <button>Salvar</button>



            </form>

           */}


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