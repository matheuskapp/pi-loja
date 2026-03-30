'use client'

import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import './FinalizarVenda.css'

export default function Vendas() {
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState(""); // Quantidade da venda
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

    const [pagina, setPagina] = useState(0);
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
            // Alterado para 'quantidade' conforme o seu banco
            .select(`id, nome, preco, quantidade`);
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

        const qtdSelecionada = parseInt(quantidade) || 0; // O que foi digitado no input
        const estoqueAtual = parseInt(prodSelecionado.quantidade) || 0; // O que veio do banco

        // VERIFICAÇÃO 1: Impede a venda se não tiver estoque suficiente
        if (qtdSelecionada > estoqueAtual) {
            alert(`Estoque insuficiente! O produto "${prodSelecionado.nome}" tem apenas ${estoqueAtual} unidade(s) disponível(is).`);
            return;
        }

        // VERIFICAÇÃO 2: Alerta se tiver apenas 1 no estoque
        if (estoqueAtual === 1) {
            alert("Atenção: Só tem um produto em estoque!");
        }

        const precoUnitario = parseFloat(prodSelecionado.preco) || 0;
        const desc = parseFloat(desconto) || 0;

        const valorTotal = Number(((precoUnitario * qtdSelecionada) - desc).toFixed(2));

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
            .insert([objetos])

        if (error == null) {
            // ATUALIZAÇÃO DO ESTOQUE (COLUNA QUANTIDADE) NO BANCO DE DADOS
            const novoEstoque = estoqueAtual - qtdSelecionada;
            await supabase
                .from('produtos')
                .update({ quantidade: novoEstoque }) // Atualiza a coluna 'quantidade'
                .eq('id', prodSelecionado.id);

            alert("VENDA cadastrada com sucesso!")
            setCliente("")
            setProduto("")
            setQuantidade("")
            setFormaPagamento("")
            setDesconto("")
            setPagina(0);
            buscar();
            buscarProdutos();
        } else {
            console.error(error);
            alert("Erro ao salvar venda.");
        }
    }

    async function buscar() {
        const de = pagina * itensPorPagina;
        const ate = de + itensPorPagina - 1;

        const { data, error } = await supabase
            .from('vendas')
            .select(`
                *,
                clientes (nome),
                produtos (nome)
            `)
            .order('created_at', { ascending: false })
            .range(de, ate);

        if (!error) {
            setListaVendas(data || []);
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
                                    setEstoqueDisponivel(null); // Reseta se o usuário apagar o nome
                                    setMostrarProdutos(true);
                                }}
                                onFocus={() => setMostrarProdutos(true)}
                                onBlur={() => setTimeout(() => setMostrarProdutos(false), 150)}
                                required
                            />

                            {mostrarProdutos && (
                                <div className="list-group shadow-sm position-absolute w-100 bg-white" style={{ zIndex: 10, maxHeight: "180px", overflowY: "auto" }}>
                                    {listaProdutos
                                        .filter((item) => item.nome.toLowerCase().includes(produto.toLowerCase()))
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                onClick={() => {
                                                    setProduto(item.nome);
                                                    setEstoqueDisponivel(item.quantidade); // Define o estoque aqui
                                                    setMostrarProdutos(false);
                                                }}
                                            >
                                                <span>{item.nome}</span>
                                                <small className="text-muted">R$ {item.preco}</small>
                                            </button>
                                        ))}
                                </div>
                            )}

                            {/* MENSAGEM DE ESTOQUE */}
                            {estoqueDisponivel !== null && produto !== "" && (
                                <div className="mt-1">
                                    <small className={`fw-bold ${estoqueDisponivel <= 0 ? 'text-danger' : estoqueDisponivel < 5 ? 'text-warning' : 'text-success'}`}>
                                        {estoqueDisponivel <= 0 ? "⚠️ Esgotado" : `📦 Disponível: ${estoqueDisponivel}`}
                                    </small>
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

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <h3 className="fw-bold mb-0">Vendas Recentes</h3>

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setMostrarFiltros((prev) => !prev)}
                        >
                            {mostrarFiltros ? "Fechar filtros" : "Filtrar"}
                        </button>
                    </div>

                    {mostrarFiltros && (
                        <div className="bg-light p-3 rounded-3 border">
                            <div className="row g-3">
                                <div className="col-12 col-lg-6">
                                    <label className="form-label fw-semibold text-secondary small">
                                        Pesquisar Cliente
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-secondary shadow-sm"
                                        placeholder="Digite o nome do cliente..."
                                        value={buscaCliente}
                                        onChange={(e) => setBuscaCliente(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 col-md-6 col-lg-3">
                                    <label className="form-label fw-semibold text-secondary small">
                                        Forma de Pagamento
                                    </label>
                                    <select
                                        className="form-select border-secondary shadow-sm"
                                        value={filtroPagamento}
                                        onChange={(e) => setFiltroPagamento(e.target.value)}
                                    >
                                        <option value="">Todas as formas</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Cartão de Débito">Cartão de Débito</option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Dinheiro">Dinheiro</option>
                                    </select>
                                </div>

                                <div className="col-12 col-md-6 col-lg-3">
                                    <label className="form-label fw-semibold text-secondary small">
                                        Ordenar por Valor
                                    </label>
                                    <select
                                        className="form-select border-secondary shadow-sm"
                                        value={ordemValor}
                                        onChange={(e) => setOrdemValor(e.target.value)}
                                    >
                                        <option value="">Sem ordenação</option>
                                        <option value="Crescente">Menor Valor (Crescente)</option>
                                        <option value="Decrescente">Maior Valor (Decrescente)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
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

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                        className="btn btn-outline-secondary btn-sm px-4"
                        onClick={() => setPagina(p => Math.max(0, p - 1))}
                        disabled={pagina === 0}
                    >
                        Anterior
                    </button>
                    <span className="small fw-bold">Página {pagina + 1}</span>
                    <button
                        className="btn btn-outline-secondary btn-sm px-4"
                        onClick={() => setPagina(p => p + 1)}
                        disabled={listaVendas.length < itensPorPagina}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </>
    );
}