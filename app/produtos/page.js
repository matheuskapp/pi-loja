import BarraLateral from "./barra_lateral";
import Cabecalho from "./cabecalho";
import TabelaProdutos from "./tabela_produtos";
import "./home.css"
import { BotaoAdicionarProdutos } from "./botao_adicionar_produtos";

export default function Produtos2(){
    return(
        <div>
        <Cabecalho />
    
        <TabelaProdutos />

        <BarraLateral />

        <BotaoAdicionarProdutos />
        
        <TabelaProdutos />


        </div>
    )
}