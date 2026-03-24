'use client'
import BarraLateral from "../components/barra_lateral";
import TabelaClientes from "../cadastro_clientes/tabela_clientes";
import CadastroClientes from "./cadastro_clientes";
import { BotaoAdicionarClientes } from "./botao_adicionar_cliente";




function cadastroClientes() {
    return (
      
          <div className="row">
                      <div className="col-2">
          
                          <BarraLateral/>
          
                      </div>
          
                      <div className="col-10">
          
                          
                          <BotaoAdicionarClientes/>
                          <TabelaClientes />
                          
          
                      </div>
                      
                  </div>
    );
}

export default cadastroClientes;