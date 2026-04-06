'use client';
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";





export function TabelaProdutos() {

    const [nome, alteraNome] = useState("")
    const [sku, alteraSku] = useState("")
    const [preco, alteraPreco] = useState()
    const [quantidade, alteraQuantidade] = useState()
    const [descricao, alteraDescricao] = useState("")

    //

    const [editando, alteraEditando] = useState(null)
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
            nome: nome,
            sku: sku,
            preco: preco,
            quantidade: quantidade,
            descricao: descricao
        }

        const { error } = await supabase
            .from('produtos')
            .update(objeto)
            .eq('id', editando) //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        console.log(error)
        if (error == null) {
            alert("Atualização realizada com sucesso!")
            cancelaEdicao()
            buscar()
        } else {
            alert("Dados inválidos! verifique os campos e tente novamente..")
        }
    }

    function editar(objeto) {
        alteraEditando(objeto.id)

        alteraNome(objeto.nome)
        alteraSku(objeto.sku)
        alteraPreco(objeto.preco)
        alteraQuantidade(objeto.quantidade)
        alteraDescricao(objeto.descricao)
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraNome("")
        alteraSku("")
        alteraPreco("")
        alteraQuantidade("")
        alteraDescricao("")
    }


    // a

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

    if (inputPesquisaProduto === "") {
        buscar()
    } else {
        pesquisaProduto()
    }

}, [inputPesquisaProduto])


    return (
        <div>



















            <div></div>

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

                    {/* <div className="col-4">
                        <select className="form-select" defaultValue="">
                            <option value="" hidden>
                                Filtrar
                            </option>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>
                        </select>
                    </div> */}
                </div>
            </div>





            {/* MODAL */}
            <div
                className="modal fade"
                id="modaledicao"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title fs-5">
                                Edição de Produto
                            </h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>




                        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}



                        <div className="modal-body">
                            <div className="mb-3">
                                {/* w-100 */}
                                <label className="form-label w-100">
                                    <input value={nome} onChange={e => alteraNome(e.target.value)}

                                        type="text"
                                        className="form-control"
                                        placeholder="Nome"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                {/* w-100 */}
                                <label className="form-label w-100">
                                    <input disabled={editando != null} value={sku} onChange={e => alteraSku(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="SKU"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                {/* w-100 */}
                                <label className="form-label w-100">
                                    <input  value={preco} onChange={e => alteraPreco(e.target.value)}

                                        type="text"
                                        className="form-control"
                                        placeholder="Preço"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                {/* w-100 */}
                                <label className="form-label w-100">
                                    <input value={descricao} onChange={e => alteraDescricao(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Descrição"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                {/* w-100 */}
                                <label className="form-label w-100">
                                    <input value={quantidade} onChange={e => alteraQuantidade(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Quantidade"
                                    />
                                </label>
                            </div>
                        </div>



                        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}




                        <div className="modal-footer">
                            <button onClick={cancelaEdicao}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Fechar
                            </button>

                            <button
                                onClick={salvar}
                                className="btn btn-primary"
                                
                            >
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {/* MODAL */}















            <div class="container py-5 bg-light text-align-left ms-4 rounded-5">
                
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
                                                <button onClick={() => editar(item)} class="btn btn-primary btn-sm me-2 " data-bs-target="#modaledicao" data-bs-toggle="modal" >Editar</button>
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
