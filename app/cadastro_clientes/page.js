import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'
export default function CadastroClientes() {
    return (
        <div className="row">
            <div className='col-2'>

                <BarraLateral />

            </div>
            <div className="col-9">

                <div className="container-fluid" />
                <h1>Cadastro de Clientes</h1>




                <div className="titulo" >

                </div>


                <form onsubmit="salvar(event)">


                    <br /> <br />

                    <form>
                        <div class="nomeCompleto">
                            <label class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" />

                        </div>
                        <div class="cpf">
                            <label class="form-label">CPF</label>
                            <input type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="telefone">
                            <label class="form-label">Telefone</label>
                            <input type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="emailSenha">
                            <label class="form-label">E-mail</label>
                            <input type="email" class="form-control" />
                        </div>
                        <br />
                        <div class="endereco">
                            <label class="form-label">Endereço</label>
                            <input class="form-control" />
                        </div>
                        <br />



                        <button type="Salvar" class="btn btn-primary mp-5">Salvar</button>
                        <button type="button" class="btn btn-dark">Cancelar</button>

                    </form>

                    <br /><br />

                </form>

            </div>




        </div>


    )
}