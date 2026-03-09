'use client'

import { useState } from "react";


export default function Vendas() {
    
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [desconto, setDesconto] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("");
    const [obsVenda, setObsVenda] = useState("");

    
    const [listaVendas, setListaVendas] = useState([
        { cliente: "João Silva", produto: "Camiseta Oversize", qtd: 2, desconto: "5.00", total: 114.00, pagto: "PIX" },
        { cliente: "Maria Oliveira", produto: "Calça Jeans", qtd: 1, desconto: "0.00", total: 89.90, pagto: "Cartão" }
    ]);

    function salvarVenda(e) {
        e.preventDefault();

        const novaVenda = {
            cliente,
            produto,
            qtd: quantidade,
            desconto,
            pagto: formaPagamento,
            obs: obsVenda,
            
            total: (quantidade * 50) - (desconto || 0) 
        };

        setListaVendas([...listaVendas, novaVenda]);

        
        setCliente("");
        setProduto("");
        setQuantidade("");
        setDesconto("");
        setObsVenda("");
    }

    return (
        <div style={{ display: "flex" }}>
            

            <main style={{ marginLeft: "260px", width: "100%", padding: "24px" }}>
                <h2 className="fw-bold mb-4">🛒 Lançar Nova Venda</h2>

                
                <div className="card shadow-sm mb-5">
                    <div className="card-body">
                        <form onSubmit={salvarVenda} className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Cliente</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={cliente}
                                    onChange={e => setCliente(e.target.value)} 
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
                                    onChange={e => setProduto(e.target.value)} 
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
                                    onChange={e => setQuantidade(e.target.value)} 
                                    required
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="form-label fw-bold">Desconto (R$)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={desconto}
                                    onChange={e => setDesconto(e.target.value)} 
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Forma de Pagamento</label>
                                <select 
                                    className="form-select" 
                                    value={formaPagamento}
                                    onChange={e => setFormaPagamento(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="PIX">PIX</option>
                                    <option value="Cartão">Cartão de Crédito/Débito</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Observação</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={obsVenda}
                                    onChange={e => setObsVenda(e.target.value)} 
                                />
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
                                <th>Qtd</th>
                                <th>Desconto</th>
                                <th>Pagamento</th>
                                <th>Total Est.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaVendas.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.cliente}</td>
                                    <td>{item.produto}</td>
                                    <td>{item.qtd}</td>
                                    <td className="text-danger">R$ {item.desconto}</td>
                                    <td><span className="badge bg-info text-dark">{item.pagto}</span></td>
                                    <td className="fw-bold text-success">R$ {item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}