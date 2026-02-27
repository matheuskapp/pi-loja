import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'
export default function CadastroClientes() {
    return (
        <div className='row'>
            <div className='col-2'>

                <BarraLateral />

            </div>
            <div className='col-9'>

                <div className="container-fluid">
                    <h1>Cadastro de Clientes</h1>

                    <div className="voltar">
                        ⬅ Voltar
                    </div>

                </div>


                {/* CONTEÚDO */}
                <div>

                    <div className="titulo" >
                        <p>Cadastro de Clientes</p>

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







    )
}