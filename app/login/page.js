import 'bootstrap/dist/css/bootstrap.min.css'

import BarraLateral from '../components/barra_lateral';


export default function Login() {
    return (

        <div>

            <div className="container-fluid">
                <div className="row">

                    <div className='col-2'>
                        <BarraLateral />

                    </div>

                    {/* CONTEÚDO */}
                    <div className="col-10 ">


                        <div className="titulo">
                            <h1> Login </h1>
                            <br />
                            <form onsubmit="salvar(event)">

                                <div>
                                    <label for="exampleInputPassword1" class="form-label">Usuário</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" />
                                </div>

                                <br /> <br />

                                <form>

                                    <div>
                                        <label for="exampleInputPassword1" class="form-label">Senha</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <br />



                                    <button type="button" class="btn btn-outline-success me-3">Salvar</button>
                                    <button type="button" class="btn btn-outline-danger me-5">Cancelar</button>


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
