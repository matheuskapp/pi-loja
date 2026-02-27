import 'bootstrap/dist/css/bootstrap.min.css'
import "./login.css"



export default function Login() {
    return (

        <div>

            <div className="container-fluid">
                <div className="row">

                    {/* MENU */}
                    <div className="col-3 menu">

                        <div className="text-center mt-4">
                            <img src="/logo.png" width="120" />
                        </div>



                        <hr />

                        <div className="voltar">
                            Voltar
                        </div>

                    </div>


                    {/* CONTEÚDO */}
                    <div className="col-9 conteudo">

                        <div className="titulo">
                            <h1> Login </h1>
                            <br />
                            <form onsubmit="salvar(event)">

                                <label>
                                    Usuário:
                                    <input size="50" type="text" class="form-control" aria-label="Username"></input>

                                </label>

                                <br /> <br />

                                <form>

                                    <div class="emailSenha">
                                        <label for="exampleInputPassword1" class="form-label">Senha</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <br />


                                    <button type="Salvar" class="btn btn-primary">Salvar</button>
                                    <button type="button" class="btn btn-dark">Cancelar</button>

                                </form>

                                <br /><br />

                            </form>
                        </div>

                    </div>

                </div>
            </div>





        </div>




    );
}
