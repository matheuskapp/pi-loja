
import BarraLateral from "../components/barra_lateral";
import BarraPesquisa from "./barra_pesquisa";
import { BotaoAdicionarProdutos } from "./botao_adicionar_produtos";
import { TabelaProdutos } from "./tabela_produtos";
import Cabecalho from "./cabecalho";
import "./home.css";



export default function Produtos() {
    return (
        <div className="row">
            <div className="col-2">

                <BarraLateral/>

            </div>

            <div className="col-10 mb-5 p-5">

                <Cabecalho />
                <BarraPesquisa />
                <BotaoAdicionarProdutos />
                <TabelaProdutos />

            </div>
            <div className="col-10 ">

            </div>
        </div>

    );
}