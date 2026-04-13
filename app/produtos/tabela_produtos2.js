'use client';

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import "./produtos.css"; // ✅ CSS NOVO

const supabase = createClient(
    'https://walrpbrbskwawykdrwna.supabase.co',
    'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa'
);

export default function ProdutosTeste() {

    const [nome, alteraNome] = useState("")
    const [sku, alteraSku] = useState("")
    const [preco, alteraPreco] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [produtos, alteraProdutos] = useState([])
    const [editando, alteraEditando] = useState(null)
    const [inputPesquisaProduto, alteraInputPesquisaProduto] = useState("")

    async function buscar() {
        const { data } = await supabase.from('produtos').select().order('id', { ascending: false })
        alteraProdutos(data)
    }

    useEffect(() => {
        if (inputPesquisaProduto === "") {
            buscar()
        } else {
            pesquisaProduto()
        }
    }, [inputPesquisaProduto])

    async function pesquisaProduto() {
        const { data } = await supabase
            .from('produtos')
            .select('*')
            .ilike('nome', '%' + inputPesquisaProduto + '%')
            .order('id', { ascending: false })

        alteraProdutos(data)
    }

    async function salvar(e) {

        if (e) e.preventDefault()

        const objeto = {
            nome,
            sku,
            preco: preco.toString().replace(",", "."),
            quantidade,
            descricao
        }

        if (objeto.nome.length < 3) return alert("Nome inválido")
        if (objeto.preco <= 0) return alert("Preço inválido")
        if (objeto.descricao === "") return alert("Descrição obrigatória")
        if (objeto.quantidade <= 0) return alert("Quantidade inválida")

        let error = null

        if (editando != null) {
            const response = await supabase
                .from('produtos')
                .update(objeto)
                .eq('id', editando)

            error = response.error
        } else {
            const response = await supabase
                .from('produtos')
                .insert(objeto)

            error = response.error
        }

        if (!error) {
            alert(editando ? "Atualizado!" : "Criado!")
            limparCampos()
            buscar()
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

    function limparCampos() {
        alteraEditando(null)
        alteraNome("")
        alteraSku("")
        alteraPreco("")
        alteraQuantidade("")
        alteraDescricao("")
    }

    return (
        <div className="pagina-produtos">

            {/* TOPO */}
            <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Produtos</h1>
                    <p className="text-muted mb-0">
                        Catálogo Boy+ Plus • <span className="fw-semibold text-dark">Estoque e Variedades</span>
                    </p>
                </div>

                <div className="text-end">
                    <button
                        className="btn btn-gradient px-4 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalProduto"
                        onClick={limparCampos}
                    >
                        + Adicionar Produto
                    </button>
                </div>
            </div>

            {/* PESQUISA */}
            <div className="search-container">
                <input
                    onChange={e => alteraInputPesquisaProduto(e.target.value)}
                    type="text"
                    placeholder="Pesquisar produtos..."
                />
                <button onClick={pesquisaProduto}>🔍</button>
            </div>

            {/* TABELA */}
            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>SKU</th>
                            <th>Preço</th>
                            <th>Qtd</th>
                            <th>Descrição</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.sku}</td>
                                <td>{item.preco}</td>
                                <td><span className="badge-qty">{item.quantidade}</span></td>
                                <td>{item.descricao}</td>
                                <td>
                                    <button
                                        className="btn-edit"
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

            {/* MODAL */}
            <div className="modal fade" id="modalProduto">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>{editando ? "Editar" : "Novo Produto"}</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} placeholder="Nome" />
                            <input value={sku} onChange={e => alteraSku(e.target.value)} placeholder="SKU" disabled={editando != null} />
                            <input value={preco} onChange={e => alteraPreco(e.target.value)} placeholder="Preço" />
                            <input value={descricao} onChange={e => alteraDescricao(e.target.value)} placeholder="Descrição" />
                            <input value={quantidade} onChange={e => alteraQuantidade(e.target.value)} placeholder="Quantidade" />
                        </div>

                        <div className="modal-footer">
                            <button data-bs-dismiss="modal">Fechar</button>
                            <button onClick={salvar}>Salvar</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}