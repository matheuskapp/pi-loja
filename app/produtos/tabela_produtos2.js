'use client';

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import "./botao_adicionar_produtos.css";

// Supabase (unificado)
const supabase = createClient(
    'https://walrpbrbskwawykdrwna.supabase.co',
    'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa'
);

export default function ProdutosTeste() {

    // ---------------- STATES ----------------
    const [nome, alteraNome] = useState("")
    const [sku, alteraSku] = useState("")
    const [preco, alteraPreco] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [descricao, alteraDescricao] = useState("")

    const [produtos, alteraProdutos] = useState([])

    const [editando, alteraEditando] = useState(null)

    const [inputPesquisaProduto, alteraInputPesquisaProduto] = useState("")

    // ---------------- BUSCAR ----------------
    async function buscar() {
        const { data } = await supabase
            .from('produtos')
            .select()
        alteraProdutos(data)
    }

    useEffect(() => {

        if (inputPesquisaProduto === "") {
            buscar()
        } else {
            pesquisaProduto()
        }

    }, [inputPesquisaProduto])

    // ---------------- PESQUISA ----------------
    async function pesquisaProduto() {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .ilike('nome', '%' + inputPesquisaProduto + '%')

        alteraProdutos(data)
        console.log("DATA:", data)
        console.log("ERROR:", error)
    }

    // ---------------- SALVAR (CREATE + UPDATE) ----------------
    async function salvar(e) {

        if (e) e.preventDefault()

        const objeto = {
            nome,
            sku,
            preco: preco.toString().replace(",", "."),
            quantidade,
            descricao
        }

        // validações (mantidas)
        if (objeto.nome.length < 3) {
            alert("O nome do produto deve conter mais de 3 caracteres")
            return
        }

        if (objeto.preco <= 0) {
            alert("O valor do produto não pode ser 0,00")
            return
        }

        if (objeto.descricao === "") {
            alert("Digite uma descrição para o produto")
            return
        }

        if (objeto.descricao.length > 100) {
            alert("A descrição deve conter menos de 100 caracteres")
            return
        }

        if (objeto.quantidade <= 0) {
            alert("A quantidade nao pode ser 0")
            return
        }

        let error = null

        // UPDATE
        if (editando != null) {
            const response = await supabase
                .from('produtos')
                .update(objeto)
                .eq('id', editando)

            error = response.error
        }
        // INSERT
        else {
            const response = await supabase
                .from('produtos')
                .insert(objeto)

            error = response.error
        }

        if (error == null) {
            alert(editando ? "Atualizado com sucesso!" : "Produto cadastrado com sucesso!")
            limparCampos()
            buscar()
        } else {
            alert("Erro! Verifique os dados.")
        }
        buscar()
    }

    // ---------------- EDITAR ----------------
    function editar(objeto) {
        alteraEditando(objeto.id)

        alteraNome(objeto.nome)
        alteraSku(objeto.sku)
        alteraPreco(objeto.preco)
        alteraQuantidade(objeto.quantidade)
        alteraDescricao(objeto.descricao)
    }

    function limparCampos() {
        alteraEditando(null)
        alteraNome("")
        alteraSku("")
        alteraPreco("")
        alteraQuantidade("")
        alteraDescricao("")
    }

    // ---------------- UI ----------------
    return (
        <div>

            {/* BOTÃO ADICIONAR */}
            <div className="containerBotao mb-3 text-end">
                <button
                    type="button"
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProduto"
                    onClick={limparCampos}
                >
                    + Adicionar Produto
                </button>
            </div>

            {/* PESQUISA */}
            <div className="barradepesquisa mb-3 p-5">
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <input
                                onChange={e => alteraInputPesquisaProduto(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar"
                            />
                            <button
                                onClick={pesquisaProduto}
                                className="btn btn-outline-secondary"
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL (ADD + EDIT) */}
            <div className="modal fade" id="modalProduto">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title">
                                {editando ? "Editar Produto" : "Novo Produto"}
                            </h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />

                            <input value={sku} onChange={e => alteraSku(e.target.value)} disabled={editando != null} className="form-control mb-2" placeholder="SKU (Código interno)" />

                            <input value={preco} onChange={e => alteraPreco(e.target.value)} className="form-control mb-2" placeholder="Preço" />

                            <input value={descricao} onChange={e => alteraDescricao(e.target.value)} className="form-control mb-2" placeholder="Descrição" />

                            <input value={quantidade} onChange={e => alteraQuantidade(e.target.value)} className="form-control mb-2" placeholder="Quantidade" />

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={limparCampos}>
                                Fechar
                            </button>

                            <button className="btn btn-primary" onClick={salvar} >
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* TABELA */}
            <div className="container py-5 bg-light ms-4 rounded-5">
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body">

                        <table className="table align-middle">
                            <thead>
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
                                {produtos.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.sku}</td>
                                        <td>{item.preco}</td>
                                        <td>{item.quantidade}</td>
                                        <td>{item.descricao}</td>
                                        <td className="text-end">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalProduto"
                                                onClick={() => editar(item)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

        </div>
    );
}