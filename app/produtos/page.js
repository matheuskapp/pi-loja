import BarraLateral from "./barra_lateral";
import Cabecalho from "./cabecalho";
import { BotaoAdicionarProdutos } from "./botao_adicionar_produtos";
import { TabelaProdutos } from "./tabela_produtos";
import "./home.css"
import BarraPesquisa from "./barra_pesquisa";

export default function Produtos2() {
    return (
        <div className="containerProdutos">

            <BarraLateral />

            <div className="containerTabela">

                <div className="containerCabecalho">
                    
                    <Cabecalho />

                    <BarraPesquisa />
        
                    <BotaoAdicionarProdutos />

                </div>

                <TabelaProdutos />
            </div>


        </div>
    )
}
