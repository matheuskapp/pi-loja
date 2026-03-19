'use client'

import { useEffect, useState } from "react";

import supabase from "../conexao/supabase";


export default function Vendas() {
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [desconto, setDesconto] = useState("");
    const [forma_pagamento, setFormaPagamento] = useState("");

    const [listaVendas, setListaVendas] = useState([]);


    async function salvar(e) {
        e.preventDefault()
        const objetos = {
            cliente: cliente,
            produto: produto,
            quantidade: quantidade,
            forma_pagamento: forma_pagamento,
            desconto: desconto,
            total_compra: 0
        }

        const { data, error } = await supabase
            .from('vendas')
            .insert(objetos)
            .select(`
                *,
                cliente.id(*)
                `)

        console.log(error)

        if (error == null) {
            alert("VENDA cadastrado com sucesso!")
             setCliente("")
             setProduto("")
             setQuantidade("")
             setFormaPagamento("")
             setDesconto("")

        } else {
            alert("Dados invalidos, verifique os campos e tente novamente")
        }
    }



    


    async function buscar() {
        const { data, error } = await supabase
            .from('vendas')
            .select(`
                *,
                cliente (nome),
                produto (nome)
            `)
        console.log(data)
        setListaVendas(data)
    }

    useEffect(() => {
        buscar()
    }, [])



    return (
        <>


            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <form onSubmit={salvar} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Cliente</label>
                            <input
                                type="text"
                                className="form-control"
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                placeholder="Nome do cliente"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold">Produto</label>
                            <input
                                type="text"
                                className="form-control"
                                value={produto}
                                onChange={(e) => setProduto(e.target.value)}
                                placeholder="Ex: Camiseta Polo"
                                required
                            />
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
                                className="form-control"
                                value={desconto}
                                onChange={(e) => setDesconto(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
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
                            <button type="submit" className="btn btn-primary px-5">
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
                                <td>{item.cliente?.nome}</td>
                                <td>{item.produto?.nome}</td>
                                <td>{item.quantidade}</td>
                                <td className="text-danger">R$ {item.desconto}</td>
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