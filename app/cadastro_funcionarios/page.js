import 'bootstrap/dist/css/bootstrap.min.css'
import BarraLateral from '../components/barra_lateral';
import ListaFuncionarios from './listafuncionarios';
import CadastroFuncionarios from '../cadastro_funcionarios/cadastro_funcionarios';




export default function CadastroUsuarios() {
    return (


        <div className="row">

            <div className='col-2'>
                <BarraLateral />

            </div>


            <div className='col-3'>
                <CadastroFuncionarios/>

            </div>
            <div className='col-10'>
                <ListaFuncionarios />
            </div>

        </div>
    );
}