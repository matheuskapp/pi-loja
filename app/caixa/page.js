'use client'
import { useState, useEffect } from "react";
import supabase from "../conexao/supabase";
import BarraLateral from "../components/barra_lateral";

export default function GestaoCaixa() {
    const [caixaAberto, setCaixaAberto] = useState(null);
    const [valorInicial, setValorInicial] = useState("");
    const [vendasDoPeriodo, setVendasDoPeriodo] = useState(0);

    // 1. Verificar se existe um caixa aberto
    async function verificarCaixa() {
        const { data, error } = await supabase
            .from('caixas')
            .select('*')
            .eq('status', 'aberto')
            .single();

        if (data) {
            setCaixaAberto(data);
            buscarVendasDesde(data.created_at);
        } else {
            setCaixaAberto(null);
        }
    }

    // 2. Buscar vendas realizadas desde que o caixa abriu
    async function buscarVendasDesde(dataAbertura) {
        const { data } = await supabase
            .from('vendas')
            .select('total_compra')
            .gte('created_at', dataAbertura);
        
        const total = data?.reduce((acc, v) => acc + Number(v.total_compra), 0) || 0;
        setVendasDoPeriodo(total);
    }

    // 3. Abrir o Caixa
    async function abrirCaixa() {
        if (!valorInicial) return alert("Digite o valor inicial do troco!");

        const { error } = await supabase
            .from('caixas')
            .insert([{ 
                valor_inicial: Number(valorInicial), 
                status: 'aberto',
                valor_total: Number(valorInicial) 
            }]);

        if (!error) {
            alert("Caixa aberto com sucesso!");
            verificarCaixa();
        }
    }

    // 4. Fechar o Caixa
    async function fecharCaixa() {
        const saldoFinal = Number(caixaAberto.valor_inicial) + vendasDoPeriodo;

        const { error } = await supabase
            .from('caixas')
            .update({ 
                status: 'fechado', 
                valor_total: saldoFinal,
                data_fechamento: new Date().toISOString()
            })
            .eq('id', caixaAberto.id);

        if (!error) {
            alert("Caixa fechado! Saldo final conferido.");
            verificarCaixa();
        }
    }

    useEffect(() => { verificarCaixa(); }, []);

    return (
        <div style={{ display: "flex", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
            <BarraLateral />
            <main style={{ marginLeft: "260px", width: "100%", padding: "40px" }}>
                <h2 className="fw-bold mb-4">Fluxo de Caixa - Boy+ Plus Size</h2>

                {!caixaAberto ? (
                    /* TELA DE ABERTURA */
                    <div className="card shadow-sm border-0 p-5 rounded-4 text-center mx-auto" style={{ maxWidth: "500px" }}>
                        <h4 className="fw-bold">O caixa está fechado</h4>
                        <p className="text-muted">Informe o valor em dinheiro para troco e abra o dia.</p>
                        <div className="mb-3">
                            <input 
                                type="number" 
                                className="form-control form-control-lg text-center" 
                                placeholder="R$ 0,00"
                                value={valorInicial}
                                onChange={(e) => setValorInicial(e.target.value)}
                            />
                        </div>
                        <button onClick={abrirCaixa} className="btn btn-primary btn-lg w-100 fw-bold">
                            Abrir Caixa Hoje
                        </button>
                    </div>
                ) : (
                    /* TELA DE CAIXA ABERTO */
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card shadow-sm border-0 p-4 rounded-4 bg-white mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold m-0 text-success">● Caixa Aberto</h5>
                                    <span className="text-muted small">Iniciado em: {new Date(caixaAberto.created_at).toLocaleString()}</span>
                                </div>
                                <hr />
                                <div className="row text-center my-4">
                                    <div className="col-4">
                                        <small className="text-muted d-block">Fundo Inicial</small>
                                        <span className="fs-4 fw-bold">R$ {caixaAberto.valor_inicial.toFixed(2)}</span>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-muted d-block text-primary">+ Vendas do Dia</small>
                                        <span className="fs-4 fw-bold text-primary">R$ {vendasDoPeriodo.toFixed(2)}</span>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-muted d-block">Saldo Atual</small>
                                        <span className="fs-4 fw-bold text-dark">R$ {(caixaAberto.valor_inicial + vendasDoPeriodo).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={fecharCaixa} className="btn btn-danger w-100 fw-bold py-3">
                                    Encerrar Expediente e Fechar Caixa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}