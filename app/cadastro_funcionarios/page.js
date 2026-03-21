import 'bootstrap/dist/css/bootstrap.min.css'
import BarraLateral from '../components/barra_lateral';
import BarraPesquisa from './barra_pesquisa';
import { BotaoAdicionarFuncionarios } from './botao_adicionar_funcionarios';
import { ListaFuncionarios } from './listafuncionarios';
import Cabecalho from '../produtos/cabecalho';
import CabecalhoFuncionarios from './cabecalho_funcionarios';




export default function CadastroUsuarios() {
    return (


        <div className="row">

            <div className='col-2'>
                <BarraLateral />

            </div>



            <div className='col-10'>
                <CabecalhoFuncionarios/>
                <BarraPesquisa />
                <BotaoAdicionarFuncionarios/>
                <ListaFuncionarios/>
            </div>

        </div>
    );
}