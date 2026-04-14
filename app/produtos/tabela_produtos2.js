'use client';

import { useEffect, useState } from "react";
import supabase from '../conexao/supabase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./produtos.css";

export default function ProdutosTeste() {

    const [nome, alteraNome] = useState("")
    const [sku, alteraSku] = useState("")
    const [preco, alteraPreco] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [descricao, alteraDescricao] = useState("")
    const [produtos, alteraProdutos] = useState([])
    const [editando, alteraEditando] = useState(null)
    const [inputPesquisaProduto, alteraInputPesquisaProduto] = useState("")
    const [colunaFiltro, alteraColunaFiltro] = useState("nome")
    const [idPrioridade, setIdPrioridade] = useState(null)

    async function buscar(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('produtos')
            .select('*')
            .order('id', { ascending: false })
        
        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraProdutos(ordenado)
    }

    useEffect(() => {
        if (inputPesquisaProduto === "") {
            buscar()
        } else {
            pesquisaProduto()
        }
    }, [inputPesquisaProduto])

    async function pesquisaProduto(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('produtos')
            .select('*')
            .ilike(colunaFiltro, '%' + inputPesquisaProduto + '%')
            .order('id', { ascending: false })

        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraProdutos(ordenado)
    }

    async function salvar() {
        if (!nome || !preco || !descricao || !quantidade) {
            toast.error("Todos os campos básicos são obrigatórios!", { icon: "⚠️" });
            return;
        }

        const objeto = {
            nome,
            sku,
            preco: parseFloat(preco.toString().replace(",", ".")),
            quantidade: parseInt(quantidade),
            descricao
        }

        if (objeto.nome.length < 3) {
            toast.warning("O nome do produto é muito curto!");
            return;
        }

        const { error } = await supabase
            .from('produtos')
            .insert(objeto)

        if (error == null) {
            toast.success("Produto criado com sucesso!", { icon: "📦" });
            limparCampos()
            // Se for novo, o Supabase retorna o dado inserido se usarmos .select().single()
            // Mas para simplificar e garantir o topo, buscaremos normalmente e o id DESC cuida
            buscar()
        } else {
            toast.error("Erro ao salvar produto.");
        }
    }

    async function atualizar() {
        const objeto = {
            nome,
            sku,
            preco: parseFloat(preco.toString().replace(",", ".")),
            quantidade: parseInt(quantidade),
            descricao
        }

        const { error } = await supabase
            .from('produtos')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            const idPrio = editando;
            toast.success("Produto atualizado!", { icon: "✏️" });
            setIdPrioridade(idPrio)
            limparCampos()
            buscar(idPrio)
        } else {
            toast.error("Erro ao atualizar produto.");
        }
    }

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome || "")
        alteraSku(objeto.sku || "")
        alteraPreco(objeto.preco || "")
        alteraQuantidade(objeto.quantidade || "")
        alteraDescricao(objeto.descricao || "")
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

            {/* HEADER SECTION */}
            <div className="header-section">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Produtos</h1>
                    <p className="text-muted mb-0">
                        <span className="fw-semibold text-dark">Estoque e Variedades</span>
                    </p>
                </div>
            </div>

            <div className="actions-bar">
                {/* SEARCH BOX */}
                <div className="search-container">
                    <select
                        value={colunaFiltro}
                        onChange={e => alteraColunaFiltro(e.target.value)}
                    >
                        <option value="nome">Nome</option>
                        <option value="sku">SKU</option>
                        <option value="descricao">Descrição</option>
                    </select>
                    <input
                        value={inputPesquisaProduto}
                        onChange={e => alteraInputPesquisaProduto(e.target.value)}
                        placeholder="Pesquisar produtos..."
                    />
                    <button onClick={pesquisaProduto}>🔍</button>
                </div>

                <button
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProduto"
                    onClick={limparCampos}
                >
                    + Adicionar Produto
                </button>
            </div>

            {/* TABLE CARD */}
            <div className="table-card">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="ps-4">PRODUTO</th>
                            <th className="text-center">SKU</th>
                            <th className="text-center">PREÇO</th>
                            <th className="text-center">ESTOQUE</th>
                            <th className="text-end pe-4">AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((item) => (
                            <tr key={item.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="avatar-circle me-3">
                                            {item.nome ? item.nome.charAt(0).toUpperCase() : 'P'}
                                        </div>
                                        <div>
                                            <p className="fw-bold text-dark mb-0 fs-6">{item.nome}</p>
                                            <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                                                {item.descricao || "Sem descrição"}
                                            </small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center text-secondary fw-medium">
                                    {item.sku || '-'}
                                </td>
                                <td className="text-center text-dark fw-bold">
                                    {new Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td className="text-center">
                                    <span className={`badge-qty ${item.quantidade <= 0 ? 'bg-danger text-white' : ''}`}>
                                        {item.quantidade} unid.
                                    </span>
                                </td>
                                <td className="text-end pe-4">
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn-icon-edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalProduto"
                                            onClick={() => editar(item)}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {produtos.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5 mt-2">Nenhum produto encontrado.</p>
                    </div>
                )}
            </div>

            {/* MODAL (Cadastro e Edição) */}
            <div className="modal fade" id="modalProduto">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-bold m-0">{editando ? "Editar Produto" : "Novo Produto"}</h5>
                            <button className="btn-close" data-bs-dismiss="modal" onClick={limparCampos}></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NOME DO PRODUTO</label>
                                <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control bg-light border-0" placeholder="Ex: Camiseta Blue" />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">SKU</label>
                                    <input value={sku} onChange={e => alteraSku(e.target.value)} className="form-control bg-light border-0" placeholder="SKU-123" disabled={editando != null} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">PREÇO (R$)</label>
                                    <input value={preco} onChange={e => alteraPreco(e.target.value)} className="form-control bg-light border-0" placeholder="0.00" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">QUANTIDADE EM ESTOQUE</label>
                                <input value={quantidade} onChange={e => alteraQuantidade(e.target.value)} type="number" className="form-control bg-light border-0" placeholder="0" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">DESCRIÇÃO</label>
                                <textarea 
                                    value={descricao} 
                                    onChange={e => alteraDescricao(e.target.value)} 
                                    className="form-control bg-light border-0" 
                                    placeholder="Detalhes do produto..."
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-light px-4" data-bs-dismiss="modal" onClick={limparCampos}>Cancelar</button>
                            {editando ? (
                                <button onClick={atualizar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Salvar Alterações</button>
                            ) : (
                                <button onClick={salvar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Criar Produto</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                theme="light"
                toastClassName="premium-toast"
                hideProgressBar={false}
                newestOnTop={true}
            />

        </div>
    );
}