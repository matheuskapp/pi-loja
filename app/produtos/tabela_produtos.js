'use client';
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";





export function TabelaProdutos() {

    const [observacao, alteraObservacao] = useState()
    const [produtos, alteraProdutos] = useState([])

    const [inputPesquisaProduto, alteraInputPesquisaProduto] = useState("")
    const [inputPesquisaObservacao, alteraInputPesquisaObservacao] = useState([])

    async function pesquisaProduto() {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .ilike('nome', '%' + inputPesquisaProduto + '%')
        alteraProdutos(data)
        console.log("DATA:", data)
        console.log("ERROR:", error)
    }

    async function salvar(e) {

        e.preventDefault()
        const objeto = {
            observacao: observacao
        }

        const { error } = await supabase
            .from('produtos')
            .insert(objeto)
    }

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraObservacao(objeto.observacao)
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraQuantidade("")
        alteraPagamento("")
        alteraObservacao("")
    }




    // async function excluir(id) {
    //     const opcao =  confirm("Tem certeza que deseja excluir?")
    //     if (opcao == false){
    //         return
    //     }
    //     const response = await supabase
    //         .from("produtos")
    //         .delete()
    //         .eq("id", id);

    //     if (response) {
    //         console.log("Erro ao deletar:", response);
    //     } else {
    //         console.log("Registro deletado");
    //     }
    //     buscar()
    // }

    async function buscar() {
        const { data, error } = await supabase
            .from('produtos')
            .select()
        console.log(data)
        alteraProdutos(data)
    }

    useEffect(() => {
        buscar()
    }, [])



    return (
        <div>





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























            <div class="container py-5 bg-light text-align-left ms-4 rounded-5">
                <div class="col text-end">
                    <button onClick={() => buscar()} class="btn btn-primary p-1 mb-2">🔄</button>
                </div>
                <div class="card shadow-sm border-0 rounded-4">
                    <div class="card-body">

                        <table class="table align-middle">
                            <thead class="text-muted">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>SKU</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Descrição</th>
                                    <th className="text-end">Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    produtos.map(
                                        (item, index) => <tr key={index}>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.id}</td>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.nome}</td>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.sku}</td>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.preco}</td>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.quantidade}</td>
                                            <td onClick={() => location.href = "/produtos/" + item.id}>{item.descricao}</td>
                                            <td class="text-end">
                                                <button class="btn btn-primary btn-sm me-2">Editar</button>
                                                {/* <button onClick={() => { excluir(item.id)}} class="btn btn-danger btn-sm">Excluir</button> */}
                                            </td>
                                        </tr>

                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
