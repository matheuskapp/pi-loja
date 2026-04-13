'use client'
import { useState, useEffect } from "react";
import supabase from "../conexao/supabase";
import BarraLateral from "../components/barra_lateral";

export default function GestaoCaixa() {
    const [caixaAberto, setCaixaAberto] = useState(null);
    const [valorInicial, setValorInicial] = useState("");
    const [vendasPeriodo, setVendasPeriodo] = useState([]);
    const [filtroDias, setFiltroDias] = useState("0");
    const [totalVendas, setTotalVendas] = useState(0);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);

    // Estados para Paginação
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const itensPorPagina = 10;

    useEffect(() => {
        verificarCaixa();
    }, []);

    useEffect(() => {
        buscarHistorico(filtroDias, pagina);
    }, [filtroDias, pagina]);

    async function verificarCaixa() {
        const { data } = await supabase
            .from('caixas')
            .select('*')
            .eq('status', 'aberto')
            .single();
        if (data) setCaixaAberto(data);
    }

    async function buscarHistorico(dias, paginaAtual) {
        const dataInicio = new Date();
        dataInicio.setHours(0, 0, 0, 0);
        if (dias !== "0") {
            dataInicio.setDate(dataInicio.getDate() - parseInt(dias));
        }

        const desde = paginaAtual * itensPorPagina;
        const ate = desde + itensPorPagina - 1;

        // Busca dados com contagem exata para a paginação
        const { data, error, count } = await supabase
            .from('vendas')
            .select(`
                *,
                clientes (nome),
                produtos (nome, preco)
            `, { count: 'exact' })
            .gte('created_at', dataInicio.toISOString())
            .order('created_at', { ascending: false })
            .range(desde, ate);

        if (!error) {
            setVendasPeriodo(data || []);
            
            // Calcula o total de páginas baseado no count do banco
            const totalPags = Math.ceil(count / itensPorPagina);
            setTotalPaginas(totalPags || 1);

            // Busca a soma total de todas as vendas do período (não apenas da página)
            const { data: todasVendas } = await supabase
                .from('vendas')
                .select('total_compra')
                .gte('created_at', dataInicio.toISOString());
            
            const soma = todasVendas?.reduce((acc, v) => acc + Number(v.total_compra), 0) || 0;
            setTotalVendas(soma);
        }
    }

    async function abrirCaixa() {
        if (!valorInicial) return alert("Defina o troco inicial!");
        const { error } = await supabase.from('caixas').insert([
            { valor_inicial: Number(valorInicial), status: 'aberto', valor_total: Number(valorInicial) }
        ]);
        if (!error) window.location.reload();
    }

    async function fecharCaixa() {
        const saldoFinal = Number(caixaAberto.valor_inicial) + totalVendas;
        const { error } = await supabase.from('caixas')
            .update({ status: 'fechado', valor_total: saldoFinal, data_fechamento: new Date().toISOString() })
            .eq('id', caixaAberto.id);
        if (!error) window.location.reload();
    }

    return (
        <div style={{ display: "flex", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Gestão Financeira</h1>
                        <p className="text-muted mb-0">
                            Controle de Caixa Boy+ Plus • <span className="fw-semibold text-dark">Fluxo e Histórico</span>
                        </p>
                    </div>

                    <div className="btn-group shadow-sm bg-white rounded-3 p-1">
                        <button className={`btn btn-sm px-3 ${filtroDias === '0' ? 'btn-primary' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('0'); setPagina(0);}}>Hoje</button>
                        <button className={`btn btn-sm px-3 ${filtroDias === '7' ? 'btn-primary' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('7'); setPagina(0);}}>7 Dias</button>
                        <button className={`btn btn-sm px-3 ${filtroDias === '30' ? 'btn-primary' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('30'); setPagina(0);}}>30 Dias</button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-5">
                        {!caixaAberto ? (
                            <div className="card shadow-sm border-0 p-4 rounded-4 text-center bg-white h-100 d-flex flex-column justify-content-center">
                                <h5 className="fw-bold">Caixa Fechado</h5>
                                <p className="text-muted small">Insira o fundo de troco para começar</p>
                                <input type="number" className="form-control mb-3 text-center" placeholder="R$ 0,00" value={valorInicial} onChange={(e)=>setValorInicial(e.target.value)} />
                                <button onClick={abrirCaixa} className="btn btn-primary fw-bold">Abrir Caixa</button>
                            </div>
                        ) : (
                            <div className="card shadow-sm border-0 p-4 rounded-4 bg-white border-start border-success border-5">
                                <h6 className="text-success fw-bold">CAIXA ABERTO</h6>
                                <div className="my-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <small className="text-muted">Abertura (Troco):</small>
                                        <span className="fw-bold text-secondary text-end">R$ {Number(caixaAberto.valor_inicial).toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <small className="text-muted">Vendas no Período:</small>
                                        <span className="fw-bold text-success text-end">+ R$ {totalVendas.toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <small className="text-muted d-block text-end">Saldo Total:</small>
                                    <h2 className="fw-bold text-dark text-end">R$ {(caixaAberto.valor_inicial + totalVendas).toFixed(2)}</h2>
                                </div>
                                <button onClick={fecharCaixa} className="btn btn-outline-danger btn-sm w-100 fw-bold">Fechar Dia</button>
                            </div>
                        )}
                    </div>

                    <div className="col-md-7">
                        <div className="card shadow-sm border-0 p-4 rounded-4 bg-primary text-white h-100">
                            <h6 className="fw-bold opacity-75">TOTAL NO PERÍODO ({filtroDias === '0' ? 'Hoje' : filtroDias + ' dias'})</h6>
                            <h1 className="display-5 fw-bold mb-0">R$ {totalVendas.toFixed(2)}</h1>
                            <small>Soma baseada no filtro selecionado</small>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4 mt-4 bg-white overflow-hidden">
                    <div className="p-3 border-bottom">
                        <h6 className="fw-bold mb-0">Listagem de Vendas</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Hora</th>
                                    <th>Total</th>
                                    <th>Qtd Itens</th>
                                    <th className="text-end pe-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasPeriodo.map((v) => (
                                    <tr key={v.id}>
                                        <td className="ps-4 text-muted">{new Date(v.created_at).toLocaleTimeString('pt-BR')}</td>
                                        <td className="fw-bold text-primary">R$ {Number(v.total_compra).toFixed(2)}</td>
                                        <td>{v.quantidade} unid.</td>
                                        <td className="text-end pe-4">
                                            <button className="btn btn-sm btn-light border" onClick={() => setVendaSelecionada(v)}>Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* BARRA DE PAGINAÇÃO DINÂMICA */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                        <button
                            className="btn btn-outline-secondary btn-sm px-4 fw-bold"
                            onClick={() => setPagina(p => Math.max(0, p - 1))}
                            disabled={pagina === 0}
                        >
                            Anterior
                        </button>
                        <span className="small fw-bold text-muted">
                            Página {pagina + 1} de {totalPaginas}
                        </span>
                        <button
                            className="btn btn-outline-secondary btn-sm px-4 fw-bold"
                            onClick={() => setPagina(p => p + 1)}
                            disabled={pagina + 1 >= totalPaginas}
                        >
                            Próximo
                        </button>
                    </div>
                </div>

                {/* MODAL DE DETALHES */}
                {vendaSelecionada && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow rounded-4">
                                <div className="modal-header border-0 pb-0">
                                    <h5 className="fw-bold">Detalhes da Venda</h5>
                                    <button type="button" className="btn-close" onClick={() => setVendaSelecionada(null)}></button>
                                </div>
                                <div className="modal-body py-4">
                                    <div className="mb-3">
                                        <small className="text-muted d-block small uppercase fw-bold">CLIENTE</small>
                                        <p className="mb-0 fw-semibold">{vendaSelecionada.clientes?.nome || "Consumidor Final"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <small className="text-muted d-block small uppercase fw-bold">PRODUTO</small>
                                        <p className="mb-0 fw-semibold">{vendaSelecionada.produtos?.nome}</p>
                                        <small className="text-muted">{vendaSelecionada.quantidade} unidades x R$ {vendaSelecionada.produtos?.preco}</small>
                                    </div>
                                    <div className="row bg-light p-3 rounded-3 g-2">
                                        <div className="col-6">
                                            <small className="text-muted d-block">Pagamento</small>
                                            <span className="badge bg-white text-dark border">{vendaSelecionada.forma_pagamento}</span>
                                        </div>
                                        <div className="col-6 text-end">
                                            <small className="text-muted d-block">Desconto</small>
                                            <span className="text-danger">- R$ {vendaSelecionada.desconto}</span>
                                        </div>
                                        <div className="col-12 mt-2 pt-2 border-top">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-bold">Total Pago:</span>
                                                <h4 className="fw-bold text-success mb-0">R$ {vendaSelecionada.total_compra}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 pt-0">
                                    <button type="button" className="btn btn-secondary w-100 fw-bold" onClick={() => setVendaSelecionada(null)}>Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}