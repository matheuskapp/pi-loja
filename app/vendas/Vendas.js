'use client'

import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './estilizar.css'

export default function Vendas() {
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [desconto, setDesconto] = useState("");
    const [forma_pagamento, setFormaPagamento] = useState("");

    const [listaVendas, setListaVendas] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);

    const [filtroPagamento, setFiltroPagamento] = useState("");
    const [ordemValor, setOrdemValor] = useState("");
    const [buscaCliente, setBuscaCliente] = useState("");
    const [mostrarClientes, setMostrarClientes] = useState(false);
    const [mostrarProdutos, setMostrarProdutos] = useState(false);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [estoqueDisponivel, setEstoqueDisponivel] = useState(null);
    const [idPrioridade, setIdPrioridade] = useState(null);

    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const itensPorPagina = 30;

    async function buscarClientes() {
        const { data } = await supabase
            .from("clientes")
            .select(`id, nome`);
        setListaClientes(data || []);
    }

    async function buscarProdutos() {
        const { data } = await supabase
            .from("produtos")
            .select(`id, nome, preco, quantidade`);
        setListaProdutos(data || []);
    }

    async function salvar(e) {
        e.preventDefault();

        const cliSelecionado = listaClientes.find(c => c.nome === cliente);
        const prodSelecionado = listaProdutos.find(p => p.nome === produto);

        if (!cliSelecionado || !prodSelecionado) {
            toast.error("Por favor, selecione um Cliente e um Produto válidos da lista.", { icon: "👤" });
            return;
        }

        const qtdSelecionada = Number(quantidade) || 0;
        const estoqueAtual = Number(prodSelecionado.quantidade) || 0;
        const desc = parseFloat(desconto) || 0;

        if (qtdSelecionada <= 0) {
            toast.warning("A quantidade deve ser maior que zero.", { icon: "🔢" });
            return;
        }

        if (qtdSelecionada > estoqueAtual) {
            toast.error(`Estoque insuficiente! O produto "${prodSelecionado.nome}" tem apenas ${estoqueAtual} unidade(s) disponível(is).`, { icon: "⚠️" });
            return;
        }

        const precoUnitario = parseFloat(prodSelecionado.preco) || 0;
        const valorTotal = Number(((precoUnitario * qtdSelecionada) - desc).toFixed(2));

        if (valorTotal < 0) {
            toast.error("O desconto não pode ser maior que o valor total da venda!", { icon: "💸" });
            return;
        }

        const objetos = {
            cliente: cliSelecionado.id,
            produto: prodSelecionado.id,
            quantidade: qtdSelecionada,
            desconto: desc,
            forma_pagamento: forma_pagamento,
            total_compra: valorTotal
        }

        const { error } = await supabase
            .from('vendas')
            .insert([objetos]);

        if (error == null) {
            const novoEstoque = estoqueAtual - qtdSelecionada;
            await supabase
                .from('produtos')
                .update({ quantidade: novoEstoque })
                .eq('id', prodSelecionado.id);

            toast.success("cadastrada com sucesso!", { icon: "💰" });
            setCliente("");
            setProduto("");
            setQuantidade("");
            setFormaPagamento("");
            setDesconto("");
            setPagina(0);
            buscar(error == null ? objetos.id : null);
            buscarProdutos();
        } else {
            console.error(error);
            toast.error("Erro ao salvar venda. Verifique se a coluna no Supabase é do tipo 'numeric'.");
        }
    }

    async function buscar(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const de = pagina * itensPorPagina;
        const ate = de + itensPorPagina - 1;

        const { data, error, count } = await supabase
            .from('vendas')
            .select(`
                *,
                clientes (nome),
                produtos (nome)
            `, { count: 'exact' })
            .order('id', { ascending: false })
            .range(de, ate);

        if (!error) {
            const ordenado = (data || []).sort((a, b) => {
                if (String(a.id) === String(idAlvo)) return -1;
                if (String(b.id) === String(idAlvo)) return 1;
                return 0;
            });
            setListaVendas(ordenado);
            const calculoPaginas = Math.ceil(count / itensPorPagina);
            setTotalPaginas(calculoPaginas || 1);
        }
    }

    useEffect(() => {
        buscar();
        buscarClientes();
        buscarProdutos();
    }, [pagina])

    const CorPagamento = (forma) => {
        switch (forma) {
            case 'Pix': return 'bg-success text-white';
            case 'Cartão de Débito': return 'bg-secondary text-white';
            case 'Cartão de Crédito': return 'bg-primary text-white';
            case 'Dinheiro': return 'bg-warning text-dark';
            default: return 'bg-secondary text-white';
        }
    };

    const vendasFiltradas = [...listaVendas]
        .filter(item => {
            if (buscaCliente === "") return true;
            const nomeDoCliente = item.clientes?.nome?.toLowerCase() || "";
            return nomeDoCliente.includes(buscaCliente.toLowerCase());
        })
        .filter(item => filtroPagamento === "" ? true : item.forma_pagamento === filtroPagamento)
        .sort((a, b) => {
            if (ordemValor === "Crescente") return a.total_compra - b.total_compra;
            if (ordemValor === "Decrescente") return b.total_compra - a.total_compra;
            return 0;
        });

    return (
        <div className="pagina-vendas">
            <div className="card shadow mb-5 border-0 rounded-4 overflow-hidden">
                <div className="p-4 bg-white border-bottom">
                    <h5 className="fw-bold mb-0">Nova Venda</h5>
                </div>
                <div className="card-body p-4 bg-white">
                    <form onSubmit={salvar} className="row g-3">
                        <div className="col-md-12 position-relative">
                            <label className="form-label small fw-bold text-muted">CLIENTE</label>
                            <input
                                className="form-control bg-light border-0 py-2"
                                type="text"
                                placeholder="Selecione ou digite o nome..."
                                value={cliente}
                                onChange={(e) => {
                                    setCliente(e.target.value);
                                    setMostrarClientes(true);
                                    setMostrarProdutos(false);
                                }}
                                onFocus={() => setMostrarClientes(true)}
                                onBlur={() => setTimeout(() => setMostrarClientes(false), 150)}
                                required
                            />

                            {mostrarClientes && (
                                <div className="list-group shadow position-absolute w-100 bg-white" style={{ zIndex: 10, maxHeight: "180px", overflowY: "auto", top: '100%' }}>
                                    {listaClientes
                                        .filter((item) => item.nome.toLowerCase().includes(cliente.toLowerCase()))
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="list-group-item list-group-item-action border-0 py-2"
                                                onClick={() => {
                                                    setCliente(item.nome);
                                                    setMostrarClientes(false);
                                                }}
                                            >
                                                {item.nome}
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 position-relative">
                            <label className="form-label small fw-bold text-muted">PRODUTO</label>
                            <input
                                className="form-control bg-light border-0 py-2"
                                type="text"
                                placeholder="Selecione ou digite o produto..."
                                value={produto}
                                onChange={(e) => {
                                    setProduto(e.target.value);
                                    setEstoqueDisponivel(null);
                                    setMostrarProdutos(true);
                                }}
                                onFocus={() => setMostrarProdutos(true)}
                                onBlur={() => setTimeout(() => setMostrarProdutos(false), 150)}
                                required
                            />

                            {mostrarProdutos && (
                                <div className="list-group shadow position-absolute w-100 bg-white" style={{ zIndex: 10, maxHeight: "180px", overflowY: "auto", top: '100%' }}>
                                    {listaProdutos
                                        .filter((item) => item.nome.toLowerCase().includes(produto.toLowerCase()))
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 py-2"
                                                onClick={() => {
                                                    setProduto(item.nome);
                                                    setEstoqueDisponivel(item.quantidade);
                                                    setMostrarProdutos(false);
                                                }}
                                            >
                                                <span>{item.nome}</span>
                                                <small className="text-muted">R$ {item.preco}</small>
                                            </button>
                                        ))}
                                </div>
                            )}

                            {estoqueDisponivel !== null && produto !== "" && (
                                <div className="mt-2">
                                    <small className={`fw-bold px-2 py-1 rounded ${estoqueDisponivel <= 0 ? 'bg-danger-subtle text-danger' : estoqueDisponivel < 5 ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'}`}>
                                        {estoqueDisponivel <= 0 ? "⚠️ Esgotado" : `📦 Disponível: ${estoqueDisponivel}`}
                                    </small>
                                </div>
                            )}
                        </div>

                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted">QUANTIDADE</label>
                            <input
                                type="number"
                                className="form-control bg-light border-0 py-2"
                                value={quantidade}
                                min="1"
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted">DESCONTO (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="form-control bg-light border-0 py-2"
                                value={desconto}
                                onChange={(e) => setDesconto(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted">PAGAMENTO</label>
                            <select className="form-select bg-light border-0 py-2" value={forma_pagamento} onChange={(e) => setFormaPagamento(e.target.value)} required>
                                <option value="" disabled hidden>Selecione...</option>
                                <option value="Pix">Pix</option>
                                <option value="Cartão de Débito">Cartão de Débito</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Dinheiro">Dinheiro</option>
                            </select>
                        </div>

                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-gradient px-5 py-2">Finalizar Venda</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="actions-bar d-flex justify-content-between align-items-center mb-4">
                <div className="search-container d-flex align-items-center bg-white rounded-4 shadow-sm px-3 py-2 border w-100" style={{ maxWidth: '400px' }}>
                    <input 
                        type="text" 
                        className="form-control border-0 bg-transparent" 
                        placeholder="Pesquisar cliente..." 
                        value={buscaCliente} 
                        onChange={(e) => setBuscaCliente(e.target.value)} 
                    />
                    <button className="btn p-0 text-primary ms-2" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                        {mostrarFiltros ? '✕' : '⚙️'}
                    </button>
                </div>

                {mostrarFiltros && (
                    <div className="d-flex gap-2 ms-3 flex-wrap">
                        <select className="form-select w-auto border-0 shadow-sm bg-white" value={filtroPagamento} onChange={(e) => setFiltroPagamento(e.target.value)}>
                            <option value="">Todas as formas</option>
                            <option value="Pix">Pix</option>
                            <option value="Cartão de Débito">Débito</option>
                            <option value="Cartão de Crédito">Crédito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                        <select className="form-select w-auto border-0 shadow-sm bg-white" value={ordemValor} onChange={(e) => setOrdemValor(e.target.value)}>
                            <option value="">Sem ordenação</option>
                            <option value="Crescente">Menor Valor</option>
                            <option value="Decrescente">Maior Valor</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="table-card">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="ps-4">CLIENTE / PRODUTO</th>
                            <th className="text-center">QTD</th>
                            <th className="text-center">DESCONTO</th>
                            <th className="text-center">PAGAMENTO</th>
                            <th className="text-end pe-4">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendasFiltradas.length > 0 ? (
                            vendasFiltradas.map(item =>
                                <tr key={item.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center py-1">
                                            <div className="avatar-circle me-3">
                                                {item.clientes?.nome ? item.clientes.nome.charAt(0).toUpperCase() : 'C'}
                                            </div>
                                            <div>
                                                <p className="fw-bold text-dark mb-0 fs-6">{item.clientes?.nome || "Consumidor Final"}</p>
                                                <small className="text-muted">{item.produtos?.nome}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center text-muted fw-medium">{item.quantidade} unid.</td>
                                    <td className="text-center text-danger">R$ {parseFloat(item.desconto || 0).toFixed(2)}</td>
                                    <td className="text-center">
                                        <span className={`badge rounded-pill ${CorPagamento(item.forma_pagamento)}`}>
                                            {item.forma_pagamento}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4 fw-bold text-success fs-6">
                                        R$ {parseFloat(item.total_compra || 0).toFixed(2)}
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-5">
                                    <p className="mb-0">Nenhuma venda encontrada.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="premium-pagination d-flex justify-content-between align-items-center p-4">
                    <button
                        className="btn btn-outline-secondary btn-sm px-4 fw-bold rounded-pill"
                        onClick={() => setPagina(p => Math.max(0, p - 1))}
                        disabled={pagina === 0}
                    >
                        Anterior
                    </button>

                    <span className="small fw-bold text-muted">
                        Página {pagina + 1} de {totalPaginas}
                    </span>

                    <button
                        className="btn btn-outline-secondary btn-sm px-4 fw-bold rounded-pill"
                        onClick={() => setPagina(p => p + 1)}
                        disabled={pagina + 1 >= totalPaginas}
                    >
                        Próximo
                    </button>
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