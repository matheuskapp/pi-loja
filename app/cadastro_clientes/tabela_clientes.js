'use client'

import { useState } from "react"


function TabelaClientes({ listaClientes, pesquisar, pesquisaClientes, alteraPesquisaClientes, editar }) {
    const [editando, alteraEditando] = useState([])
    const [nome, alteraNome] = useState("")
    const [data_nascimento, alteraData_Nascimento] = useState()
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

     function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome)
        alteraData_Nascimento(objeto.data_nascimento)
        alteraCpf(objeto.cpf)
        alteraTelefone(objeto.telefone)
        alteraEmail(objeto.email)
        alteraEndereco(objeto.endereco)
    }

    return (


        <div>

            <div className="barradepesquisa mb-3 p-5">
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <input value={pesquisaClientes} onChange={e => alteraPesquisaClientes(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar Cliente.."
                            />
                            <button onClick={pesquisar}
                                className="btn btn-outline-secondary "
                                type="button col-10"
                                id="button-addon2"
                            >
                                Pesquisar 🔍
                            </button>
                        </div>
                    </div>


                </div>
            </div>





            <div className="table-responsive bg-white rounded shadow p-3 border-0">
                <table className="table table-hover">
                    

                    <thead className="table-light">
                        <tr>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaClientes.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nome}</td>
                                    <td>{item.data_nascimento}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.endereco}</td>
                                    <td>
                                        <button
                                            onClick={editar(item)}
                                            className="btn btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modaledicao"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>

        </div>



    );
}

export default TabelaClientes;