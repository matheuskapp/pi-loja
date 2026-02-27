import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
export default function CadastroClientes() {
    return (
        <div>

            <h1>Cadastro de Clientes</h1>

            <div className="container-fluid">
                <div className="row">

                    {/* MENU */}
                    <div className="col-3 menu">

                        <div className="text-center mt-4">
                            <img src="/logo.png" width="120" />
                        </div>

                        <div class="menu-links list-group list-group-flush my-5">

                            <ul className="menu-links">
                                <li><a href="#" class="list-group-item-action">Vendas</a></li>
                                <li><a href="#" class="list-group-item list-group-item-action ">Produtos</a></li>
                                <li><a href="#" class="list-group-item list-group-item-action">Prdutos</a></li>
                            </ul>

                        </div>


                        
                        <hr />

                        <div className="usuario">
                            👤 Usuários
                            <div className="admin">admin</div>
                        </div>

                        <div className="voltar">
                            ⬅ Voltar
                        </div>

                    </div>


                    {/* CONTEÚDO */}
                    <div className="col-9 conteudo">

                        <div className="titulo">
                            Cadastro de clientes

                            <form>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Nome completo</span>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">CPF</span>
                                    <input type="number" class="form-control" />
                                </div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
                                    <input class="form-control" />
                                </div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">E-mail</span>
                                    <input type="Email" class="form-control" />
                                </div>
                                <div class="input-group input-group-sm mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Endereço</span>
                                    <input type="text" class="form-control" />
                                </div>
                                <button>Salvar</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
            <form>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Nome completo</span>
                    <input type="text" class="form-control" />
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">CPF</span>
                    <input type="number" class="form-control" />
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
                    <input type="number" class="form-control" />
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">E-mail</span>
                    <input type="text" class="form-control" />
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Endereço</span>
                    <input type="text" class="form-control" />
                </div>
                <button>Salvar Cliente</button>
            </form>
            <br></br>
            <br></br>


            <div class="card">
                <h3 class="text-center">📋 Clientes cadastrados</h3>

                <table lass="text-center" >
                    <thead lass="text-center">
                        <tr>
                            <th>Cliente</th>
                            <th>Contato</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaClientes"></tbody>
                </table>
            </div>



        </div>

    )
}