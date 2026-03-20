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

    async function buscarClientes() {
        const { data } = await supabase
            .from("clientes")
            .select(`id,
                nome`); { /*coluna simples nao precisa de (*)  */ }
        setListaClientes(data || []);
    }

    async function buscarProdutos() {
        const { data } = await supabase
            .from("produtos")
            .select(`id,
            nome,
            preco`);
        setListaProdutos(data || []);
    }

    async function salvar(e) {
        e.preventDefault()

        const prodSelecionado = listaProdutos.find(produtoDaLista => produtoDaLista.id == produto);



        let precoUnitario

        if (prodSelecionado) {
            precoUnitario = prodSelecionado.preco;
        } else {
            precoUnitario = 0
        }

        const valorTotal = (precoUnitario * parseInt(quantidade)) - (parseFloat(desconto) || 0)

        const objetos = {
            cliente: cliente,
            produto: produto,
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
            alert("Erro: ");
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

    return (
        <>
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <form onSubmit={salvar} className="row g-3">

                        <div className="col-md-12">
                            <label className="form-label fw-bold">Cliente</label>
                            <select
                                className="form-select mb-3"
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                required
                            >
                                <option value="">Selecione um cliente</option>
                                {listaClientes.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Produto</label>
                            <select
                                className="form-select"
                                value={produto}
                                onChange={(e) => setProduto(e.target.value)}
                                required
                            >
                                <option value="">Selecione um produto</option>
                                {listaProdutos.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nome} - R$ {item.preco}
                                    </option>
                                ))}
                            </select>
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
                                <option value="">Selecione...</option>
                                <option value="PIX">PIX</option>
                                <option value="Cartão">Cartão</option>
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

            <h3 className="fw-bold mb-3">Vendas Recentes</h3>
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
                        {listaVendas.map(item =>
                            <tr key={item.id}>
                                <td>{item.clientes?.nome}</td>
                                <td>{item.produtos?.nome}</td>
                                <td>{item.quantidade}</td>
                                <td className="">R$ {item.desconto}</td>
                                <td>
                                    <span className="badge bg-info text-dark">
                                        {item.forma_pagamento}
                                    </span>
                                </td>
                                <td className="fw-bold text-success">
                                    R$ {item.total_compra}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}