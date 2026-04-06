'use client'
import { useState } from "react";
import supabase from "../conexao/supabase";



export default function BarraPesquisa() {

    // const [produtos, alteraListaProdutos] = useState([])
    const [inputPesquisaProduto, alteraInputPesquisaProduto] = useState("")


    async function pesquisaProduto() {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .ilike('nome', '%' + inputPesquisaProduto + '%')
        alteraListaProdutos(data)
        console.log("DATA:", data)
        console.log("ERROR:", error)
    }



    

    return (
        <div className="barradepesquisa mb-3 p-5">
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input onChange={e => alteraInputPesquisaProduto(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar"
                        />
                        <button onClick={pesquisaProduto}
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                        >
                            🔍
                        </button>
                    </div>
                </div>

                <div className="col-2"></div>

                <div className="col-4">
                    <select className="form-select" defaultValue="">
                        <option value="" hidden>
                            Filtrar
                        </option>
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>
                </div>
            </div>
        </div>

    );
}