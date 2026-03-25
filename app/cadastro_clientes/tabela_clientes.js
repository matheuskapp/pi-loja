'use client'


function TabelaClientes({listaClientes, pesquisar}) {


    return (


        <div>

            <div className="barradepesquisa mb-3 p-5">
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <input onChange={e => alteraPesquisaClientes(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar Cliente.."
                            />
                            <button onClick={pesquisar}
                                className="btn btn-outline-secondary "
                                type="button col-10"
                                id="button-addon2"
                            >
                                🔍
                            </button>
                        </div>
                    </div>


                </div>
            </div>





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
                                    <td>{item.data_nascimento}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.telefone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.endereco}</td>
                                    <td><button data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">Editar</button></td>
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