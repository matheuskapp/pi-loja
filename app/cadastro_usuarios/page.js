import 'bootstrap/dist/css/bootstrap.min.css'
import "./usuarios.css"
import BarraLateral from '../components/barra_lateral';



export default function CadastroUsuarios() {
  return (

    <div>

      <div className="container-fluid">
        <div className="row">

          <div className='col-2'>

          <BarraLateral />

          </div>


          {/* CONTEÚDO */}
          <div className="col-10 conteudo">

            <div className="titulo">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Usuário</a></li>
                <li class="breadcrumb-item active" aria-current="page">Cadastro de Usuários</li>
              </ol>
              <h1> Cadastro de Usuários </h1>

              <form onsubmit="salvar(event)">

                <label>
                  Nome Completo:
                  <input size="50" type="text" class="form-control" aria-label="Username"></input>

                </label>

                <br /> <br />

                <form>
                  <div class="emailSenha">
                    <label for="exampleInputEmail1" class="form-label">Digite seu Email</label>
                    <input size="20" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>
                  <div class="emailSenha">
                    <label for="exampleInputPassword1" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                  </div>
                  <br />
                  <select class="form-select form-select-lg mb-3" aria-label="Large select example">
                    <option selected> Tipo de Cadastro </option>
                    <option value="1">Administrador</option>
                    <option value="2">Colaborador</option>

                  </select>

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
