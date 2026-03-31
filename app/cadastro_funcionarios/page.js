import BarraLateral from "../components/barra_lateral";
import PaginaFuncionarios from "./cadastro_funcionarios";


function CadastroUsuarios() {
    return (
        <div>
            <div>
                <BarraLateral/>
            </div>
            <div>
                <PaginaFuncionarios />
            </div>
        </div>
    );
}

export default CadastroUsuarios;