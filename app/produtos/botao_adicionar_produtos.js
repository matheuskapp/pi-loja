'use client';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://walrpbrbskwawykdrwna.supabase.co', 'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa')
import { useState } from "react";
import "./botao_adicionar_produtos.css";



export function BotaoAdicionarProdutos() {



    const [nome, alteraNome] = useState("")
    const [sku, alteraSku] = useState("")
    const [preco, alteraPreco] = useState()
    // const [status, alteraStatus] = useState("")
    // const [desconto, alteraDesconto] = useState("")
    const [quantidade, alteraQuantidade] = useState()
    const [descricao, alteraDescricao] = useState("")

     async function buscar() {
        const { data, error } = await supabase
            .from('produtos')
            .select()
        console.log(data)
        alteraProdutos(data)
    }


    async function salvar() {
        const objetos = {
            nome: nome,
            sku: sku,
            preco: preco.replace(",", "."),
            // status: status,
            // desconto: desconto,
            quantidade: quantidade,
            descricao: descricao
        }
        console.log(objetos)


        if (objetos.nome.length < 3){
            alert("O nome do produte deve conter mais de 3 caracteres")
            return
        }

        if (objetos.preco <= 0){
            alert("O valor do produto não pode ser 0,00")
            return
        }

        if (objetos.descricao == ""){
            alert("Digite uma descrição para o produto")
            return
        }
        if (objetos.descricao.length > 100){
            alert("A descrição deve conter menos de 100 caracteres")
            return
        }
        if (objetos.quantidade <= 0 ){
            alert("A quantidade nao pode ser 0 ")
            return
        }


        const { error } = await supabase
            .from('produtos')
            .insert(objetos)

        console.log(error)


        if (error == null) {
            alert("Produto cadastrado com sucesso!")
            alteraNome("")
            alteraSku("")
            alteraPreco("")
            // alteraStatus("")
            // alteraDesconto("")
            alteraQuantidade("")
            alteraDescricao("")
            buscar()
            
        } else {
            alert("Dados invalidos, verifique os campos e tente novamente")
        }
    }

    
    return (
        <div className="containerBotao mb-3 text-end">

            <div >
                <button
                    type="button"
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    + Adicionar Produto
                </button>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h3 className="modal-title fs-5">
                                    Novo Produto
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
                                        <input value={sku} onChange={e => alteraSku(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="SKU"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={preco} onChange={e => alteraPreco(e.target.value)}

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
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fechar
                                </button>

                                <button onClick={salvar}
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Salvar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}