'use client'


function TabelaClientes({ listaClientes, pesquisar, pesquisaClientes, alteraPesquisaClientes, editar }) {



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





            <div className="container py-5 bg-light ms-4 rounded-5">

                <table className="table align-middle">

                    <thead>
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
                                            onClick={() => editar(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEditar"
                                            className="btn btn-warning btn-sm"
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