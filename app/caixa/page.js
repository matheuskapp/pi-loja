'use client'
import { useState, useEffect } from "react";
import supabase from "../conexao/supabase";
import BarraLateral from "../components/barra_lateral";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function GestaoCaixa() {
    const [caixaAberto, setCaixaAberto] = useState(null);
    const [valorInicial, setValorInicial] = useState("");
    const [vendasPeriodo, setVendasPeriodo] = useState([]);
    const [filtroDias, setFiltroDias] = useState("0");
    const [totalVendas, setTotalVendas] = useState(0);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);
    const [idPrioridade, setIdPrioridade] = useState(null);

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

    async function buscarHistorico(dias, paginaAtual, prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const dataInicio = new Date();
        dataInicio.setHours(0, 0, 0, 0);
        if (dias !== "0") {
            dataInicio.setDate(dataInicio.getDate() - parseInt(dias));
        }

        const desde = paginaAtual * itensPorPagina;
        const ate = desde + itensPorPagina - 1;

        const { data, error, count } = await supabase
            .from('vendas')
            .select(`
                *,
                clientes (nome),
                produtos (nome, preco)
            `, { count: 'exact' })
            .gte('created_at', dataInicio.toISOString())
            .order('id', { ascending: false })
            .range(desde, ate);

        if (!error) {
            const ordenado = (data || []).sort((a, b) => {
                if (String(a.id) === String(idAlvo)) return -1;
                if (String(b.id) === String(idAlvo)) return 1;
                return 0;
            });
            setVendasPeriodo(ordenado);
            const totalPags = Math.ceil(count / itensPorPagina);
            setTotalPaginas(totalPags || 1);

            const { data: todasVendas } = await supabase
                .from('vendas')
                .select('total_compra')
                .gte('created_at', dataInicio.toISOString());
            
            const soma = todasVendas?.reduce((acc, v) => acc + Number(v.total_compra), 0) || 0;
            setTotalVendas(soma);
        }
    }

    async function abrirCaixa() {
        if (!valorInicial) return toast.warning("Defina o troco inicial!", { icon: "💰" });
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
        <div style={{ display: "flex", backgroundColor: "var(--bg-body)", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }} className="pagina-caixa">
                
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold mb-1" style={{ letterSpacing: "-1px" }}>Gestão Financeira</h1>
                        <p className="text-muted mb-0">
                            Controle de Caixa Boy+ Plus • <span className="fw-semibold text-dark">Fluxo e Histórico</span>
                        </p>
                    </div>

                    <div className="actions-bar shadow-sm bg-white rounded-pill p-1 border">
                        <button className={`btn btn-sm px-4 rounded-pill fw-bold ${filtroDias === '0' ? 'btn-primary shadow-sm' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('0'); setPagina(0);}}>Hoje</button>
                        <button className={`btn btn-sm px-4 rounded-pill fw-bold ${filtroDias === '7' ? 'btn-primary shadow-sm' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('7'); setPagina(0);}}>7 Dias</button>
                        <button className={`btn btn-sm px-4 rounded-pill fw-bold ${filtroDias === '30' ? 'btn-primary shadow-sm' : 'btn-light border-0'}`} onClick={() => {setFiltroDias('30'); setPagina(0);}}>30 Dias</button>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-md-5">
                        {!caixaAberto ? (
                            <div className="card shadow border-0 p-4 rounded-4 text-center bg-white h-100 d-flex flex-column justify-content-center">
                                <div className="avatar-circle mx-auto mb-3" style={{ width: '60px', height: '60px', fontSize: '24px' }}>💰</div>
                                <h5 className="fw-bold">Caixa Fechado</h5>
                                <p className="text-muted small">Insira o fundo de troco para começar</p>
                                <input type="number" className="form-control mb-3 text-center bg-light border-0 py-2" placeholder="R$ 0,00" value={valorInicial} onChange={(e)=>setValorInicial(e.target.value)} />
                                <button onClick={abrirCaixa} className="btn btn-gradient fw-bold py-2">Abrir Caixa</button>
                            </div>
                        ) : (
                            <div className="card shadow border-0 p-4 rounded-4 bg-white border-start border-success border-5 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="text-success fw-bold mb-0">CAIXA ABERTO</h6>
                                    <span className="badge bg-success-subtle text-success">Em Operação</span>
                                </div>
                                <div className="my-2">
                                    <div className="d-flex justify-content-between mb-2">
                                        <small className="text-muted fw-medium">Troco Inicial:</small>
                                        <span className="fw-bold text-dark">R$ {Number(caixaAberto.valor_inicial).toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <small className="text-muted fw-medium">Vendas ({filtroDias === '0' ? 'Hoje' : 'Período'}):</small>
                                        <span className="fw-bold text-success">+ R$ {totalVendas.toFixed(2)}</span>
                                    </div>
                                    <div className="border-top pt-3 mt-2">
                                        <small className="text-muted d-block text-end small fw-bold">SALDO EM GAVETA</small>
                                        <h2 className="fw-bold text-dark text-end mb-0" style={{ letterSpacing: '-1.5px' }}>R$ {(caixaAberto.valor_inicial + totalVendas).toFixed(2)}</h2>
                                    </div>
                                </div>
                                <button onClick={fecharCaixa} className="btn btn-outline-danger btn-sm w-100 fw-bold rounded-3 mt-3 py-2">Fechar Dia</button>
                            </div>
                        )}
                    </div>

                    <div className="col-md-7">
                        <div className="card-gradient card shadow border-0 p-4 rounded-4 h-100 d-flex flex-column justify-content-center">
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-graph-up-arrow me-2 fs-5"></i>
                                <h6 className="fw-bold opacity-75 mb-0 uppercase small">TOTAL ACUMULADO</h6>
                            </div>
                            <h1 className="display-4 fw-bold mb-1" style={{ letterSpacing: '-2px' }}>R$ {totalVendas.toFixed(2)}</h1>
                            <p className="mb-0 opacity-75 small">Soma baseada no filtro selecionado ({filtroDias === '0' ? 'Hoje' : filtroDias + ' dias'})</p>
                        </div>
                    </div>
                </div>

                <div className="table-card">
                    <div className="p-4 bg-white border-bottom d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold mb-0">Histórico de Movimentações</h6>
                        <span className="badge bg-light text-muted border fw-bold text-dark">{vendasPeriodo.length} Registros</span>
                    </div>
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th className="ps-4">HORÁRIO / CLIENTE</th>
                                <th className="text-center">QTD ITENS</th>
                                <th className="text-center">PAGAMENTO</th>
                                <th className="text-end pe-4">VALOR TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendasPeriodo.length > 0 ? (
                                vendasPeriodo.map((v) => (
                                    <tr key={v.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center py-1">
                                                <div className="avatar-circle me-3" style={{ background: 'var(--input-bg)', color: 'var(--text-main)' }}>
                                                    <i className="bi bi-clock-history"></i>
                                                </div>
                                                <div>
                                                    <p className="fw-bold text-dark mb-0 fs-6">{new Date(v.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                                                    <small className="text-muted">{v.clientes?.nome || "Venda Avulsa"}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center text-muted fw-medium">{v.quantidade} unid.</td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-dark border px-3 py-1 rounded-pill">{v.forma_pagamento}</span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="d-flex flex-column align-items-end">
                                                <span className="fw-bold text-primary fs-6">R$ {Number(v.total_compra).toFixed(2)}</span>
                                                <button className="btn btn-link btn-sm p-0 m-0 text-decoration-none small" onClick={() => setVendaSelecionada(v)}>Ver Detalhes</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted py-5">Nenhuma venda registrada no período selecionado.</td>
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

                {vendaSelecionada && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-bottom p-4">
                                    <h5 className="fw-bold mb-0">Detalhes da Transação</h5>
                                    <button type="button" className="btn-close" onClick={() => setVendaSelecionada(null)}></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="mb-4">
                                        <small className="text-muted d-block small uppercase fw-bold mb-1">DADOS DO CLIENTE</small>
                                        <div className="d-flex align-items-center bg-light p-3 rounded-3">
                                            <div className="avatar-circle me-3" style={{ width: '40px', height: '40px' }}>
                                                {vendaSelecionada.clientes?.nome?.charAt(0) || 'C'}
                                            </div>
                                            <p className="mb-0 fw-bold fs-6">{vendaSelecionada.clientes?.nome || "Consumidor Final"}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <small className="text-muted d-block small uppercase fw-bold mb-1">PRODUTOS VENDIDOS</small>
                                        <div className="border rounded-3 p-3 bg-white">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <p className="mb-0 fw-semibold">{vendaSelecionada.produtos?.nome}</p>
                                                <span className="badge bg-light text-dark border">x{vendaSelecionada.quantidade}</span>
                                            </div>
                                            <small className="text-muted">Preço Unit: R$ {vendaSelecionada.produtos?.preco}</small>
                                        </div>
                                    </div>
                                    <div className="bg-light p-3 rounded-4 border-start border-4 border-success">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <small className="text-muted d-block mb-1">Forma de Pagto</small>
                                                <span className="fw-bold text-dark">{vendaSelecionada.forma_pagamento}</span>
                                            </div>
                                            <div className="col-6 text-end">
                                                <small className="text-muted d-block mb-1">Desconto</small>
                                                <span className="text-danger fw-bold">- R$ {vendaSelecionada.desconto}</span>
                                            </div>
                                            <div className="col-12 mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                                <span className="fw-bold text-muted uppercase small">Total Recebido:</span>
                                                <h3 className="fw-bold text-success mb-0">R$ {Number(vendaSelecionada.total_compra).toFixed(2)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 pt-0">
                                    <button type="button" className="btn btn-secondary w-100 fw-bold py-2 rounded-3" onClick={() => setVendaSelecionada(null)} text="Fechar">Fechar Detalhes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    theme="light"
                    toastClassName="premium-toast"
                    hideProgressBar={false}
                    newestOnTop={true}
                />
            </main>
        </div>
    );
}