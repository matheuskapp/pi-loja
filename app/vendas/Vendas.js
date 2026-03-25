'use client'

import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import './FinalizarVenda.css'

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

    async function buscarClientes() {
        const { data } = await supabase
            .from("clientes")
            .select(`id, nome`);
        setListaClientes(data || []);
    }

    async function buscarProdutos() {
        const { data } = await supabase
            .from("produtos")
            .select(`id, nome, preco`);
        setListaProdutos(data || []);
    }

    async function salvar(e) {
        e.preventDefault()

        const cliSelecionado = listaClientes.find(c => c.nome === cliente);
        const prodSelecionado = listaProdutos.find(p => p.nome === produto);

        if (!cliSelecionado || !prodSelecionado) {
            alert("Por favor, selecione um Cliente e um Produto válidos da lista.");
            return;
        }

        const precoUnitario = prodSelecionado.preco;
        const valorTotal = (precoUnitario * parseInt(quantidade)) - (parseFloat(desconto) || 0)

        const objetos = {
            cliente: cliSelecionado.id,
            produto: prodSelecionado.id,
            quantidade: parseInt(quantidade),
            desconto: parseFloat(desconto) || 0,
            forma_pagamento: forma_pagamento,
            total_compra: valorTotal
        }

        const { error } = await supabase
            .from('vendas')
            .insert([objetos])

        if (error == null) {
            alert("VENDA cadastrada com sucesso!")
            setCliente("")
            setProduto("")
            setQuantidade("")
            setFormaPagamento("")
            setDesconto("")
            buscar();
        } else {
            console.error(error);
            alert("Erro ao salvar venda.");
        }
    }

    async function buscar() {
        const { data, error } = await supabase
            .from('vendas')
            .select(`
                *,
                clientes (nome),
                produtos (nome)
            `)
        if (!error) {
            setListaVendas(data || []);
        }
    }

    useEffect(() => {
        buscar();
        buscarClientes();
        buscarProdutos();
    }, [])

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
        <>
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <form onSubmit={salvar} className="row g-3">

                        {/* CLIENTE */}
                        <div className="col-md-12 position-relative">
                            <label className="form-label fw-bold">Cliente</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                placeholder="Selecione ou digite o nome..."
                                value={cliente}
                                onChange={(e) => {
                                    setCliente(e.target.value);
                                    setMostrarClientes(true);
                                    setMostrarProdutos(false);
                                }}
                                onFocus={() => {
                                    setMostrarClientes(true);
                                    setMostrarProdutos(false);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setMostrarClientes(false), 150);
                                }}
                                required
                            />

                            {mostrarClientes && (
                                <div
                                    className="list-group shadow-sm position-absolute w-100 bg-white"
                                    style={{
                                        zIndex: 10,
                                        maxHeight: "180px",
                                        overflowY: "auto"
                                    }}
                                >
                                    {listaClientes
                                        .filter((item) =>
                                            item.nome.toLowerCase().includes(cliente.toLowerCase())
                                        )
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="list-group-item list-group-item-action"
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

                        {/* PRODUTO */}
                        <div className="col-md-6 position-relative">
                            <label className="form-label fw-bold">Produto</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Selecione ou digite o produto..."
                                value={produto}
                                onChange={(e) => {
                                    setProduto(e.target.value);
                                    setMostrarProdutos(true);
                                    setMostrarClientes(false);
                                }}
                                onFocus={() => {
                                    setMostrarProdutos(true);
                                    setMostrarClientes(false);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setMostrarProdutos(false), 150);
                                }}
                                required
                            />

                            {mostrarProdutos && (
                                <div
                                    className="list-group shadow-sm position-absolute w-100 bg-white"
                                    style={{
                                        zIndex: 10,
                                        maxHeight: "180px",
                                        overflowY: "auto"
                                    }}
                                >
                                    {listaProdutos
                                        .filter((item) =>
                                            item.nome.toLowerCase().includes(produto.toLowerCase())
                                        )
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                onClick={() => {
                                                    setProduto(item.nome);
                                                    setMostrarProdutos(false);
                                                }}
                                            >
                                                <span>{item.nome}</span>
                                                <small className="text-muted">R$ {item.preco}</small>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-bold">Quantidade</label>
                            <input
                                type="number"
                                className="form-control"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-bold">Desconto (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={desconto}
                                onChange={(e) => setDesconto(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label fw-bold">Forma de Pagamento</label>
                            <select
                                className="form-select"
                                value={forma_pagamento}
                                onChange={(e) => setFormaPagamento(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>Selecione...</option>
                                <option value="Pix">Pix</option>
                                <option value="Cartão de Débito">Cartão de Débito</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Dinheiro">Dinheiro</option>
                            </select>
                        </div>

                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-primary px-5 btn-gradient">
                                Finalizar Venda
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
                <h3 className="fw-bold mb-0">Vendas Recentes</h3>

                <div className="d-flex gap-2 align-items-center flex-wrap">
                    <input
                        type="text"
                        className="form-control form-control-sm border-secondary"
                        placeholder="Pesquisar cliente..."
                        value={buscaCliente}
                        onChange={(e) => setBuscaCliente(e.target.value)}
                        style={{ minWidth: '180px' }}
                    />

                    <select
                        className="form-select form-select-sm border-secondary"
                        value={filtroPagamento}
                        onChange={(e) => setFiltroPagamento(e.target.value)}
                        style={{ width: 'auto' }}
                    >
                        <option value="">Formas de Pagamento</option>
                        <option value="Pix">Pix</option>
                        <option value="Cartão de Débito">Cartão de Débito</option>
                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </select>

                    <select
                        className="form-select form-select-sm border-secondary"
                        value={ordemValor}
                        onChange={(e) => setOrdemValor(e.target.value)}
                        style={{ width: 'auto' }}
                    >
                        <option value="">Ordenar Valor</option>
                        <option value="Crescente">Menor Valor (Crescente)</option>
                        <option value="Decrescente">Maior Valor (Decrescente)</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm p-3">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Cliente</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Desconto</th>
                            <th>Forma de Pagamento</th>
                            <th>Total da Compra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendasFiltradas.length > 0 ? (
                            vendasFiltradas.map(item =>
                                <tr key={item.id}>
                                    <td>{item.clientes?.nome}</td>
                                    <td>{item.produtos?.nome}</td>
                                    <td>{item.quantidade}</td>
                                    <td>R$ {item.desconto}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${CorPagamento(item.forma_pagamento)}`}>
                                            {item.forma_pagamento}
                                        </span>
                                    </td>
                                    <td className="fw-bold text-success">
                                        R$ {item.total_compra}
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-3">
                                    Nenhuma venda encontrada com esses filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}