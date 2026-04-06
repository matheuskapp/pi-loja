'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  defs,
  linearGradient,
  stop
} from "recharts";

export default function DashBoard() {

  const [listaVendas, setListaVendas] = useState([]);
  const [somaVendas, setSomaVendas] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState([]);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [caixaStatus, setCaixaStatus] = useState(null);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataFiltro = hoje.toISOString();

  async function buscaStatusCaixa() {
    const { data, error } = await supabase
      .from('caixas')
      .select('*')
      .eq('status', 'aberto')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Erro caixa:", error);
      return;
    }

    setCaixaStatus(data || null);
  }

  async function buscaVendasHoje() {
    const { data, error } = await supabase
      .from('vendas')
      .select('*')
      .gte('created_at', dataFiltro);

    if (error) {
      console.error("Erro vendas hoje:", error);
      return;
    }

    if (data) {
      const total = data.reduce((acc, item) => acc + Number(item.total_compra), 0);
      setSomaVendas(total);

      const quantidadeVendas = data.length;
      setTicketMedio(quantidadeVendas > 0 ? total / quantidadeVendas : 0);

      const agrupadoPorHora = {};
      data.forEach((item) => {
        const hora = new Date(item.created_at).getHours();
        if (!agrupadoPorHora[hora]) {
          agrupadoPorHora[hora] = 0;
        }
        agrupadoPorHora[hora] += Number(item.total_compra);
      });

      const dadosFormatados = Object.entries(agrupadoPorHora).map(([hora, total]) => ({
        hora: `${hora}h`,
        total
      }));

      dadosFormatados.sort((a, b) => parseInt(a.hora) - parseInt(b.hora));
      setDadosGrafico(dadosFormatados);
    }
  }

  async function buscaMaisVendidos() {
    const { data: vendas, error: erroVendas } = await supabase
      .from('vendas')
      .select('*');

    if (erroVendas) return;

    const agrupado = {};
    vendas?.forEach((venda) => {
      const idProduto = venda.produto;
      const quantidade = parseInt(venda.quantidade) || 0;
      agrupado[idProduto] = (agrupado[idProduto] || 0) + quantidade;
    });

    const topProdutos = Object.entries(agrupado)
      .map(([produtoId, totalQuantidade]) => ({
        produto: Number(produtoId),
        quantidade: totalQuantidade
      }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);

    const { data: produtos } = await supabase.from('produtos').select('*');
    
    const resultado = topProdutos.map((item) => {
      const produtoEncontrado = produtos?.find((p) => p.id === item.produto);
      return {
        ...item,
        produto_nome: produtoEncontrado?.nome || "Produto não encontrado"
      };
    });

    setListaVendas(resultado);
  }

  async function buscaEstoqueBaixo() {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) return;

    const filtrado = data
      .map(item => ({ ...item, quantidade: Number(item.quantidade) }))
      .filter(item => item.quantidade < 10)
      .sort((a, b) => a.quantidade - b.quantidade)
      .slice(0, 5);

    setEstoqueBaixo(filtrado);
  }

  useEffect(() => {
    buscaVendasHoje();
    buscaMaisVendidos();
    buscaEstoqueBaixo();
    buscaStatusCaixa();
  }, []);

  return (
    <div className="container-fluid px-0">

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-4 h-100">
            <h6 className="text-muted fw-bold">Vendas Hoje</h6>
            <h4 className="fw-bold text-primary">
              {somaVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h4>
            <small className="text-muted">Total acumulado</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-4 h-100">
            <h6 className="text-muted fw-bold">Ticket Médio</h6>
            <h4 className="fw-bold">
              {ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h4>
            <small className="text-muted">Média por cliente</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className={`card shadow-sm border-0 p-3 rounded-4 h-100 ${caixaStatus ? 'bg-white' : 'bg-light'}`}>
            <h6 className="text-muted fw-bold">Caixa Atual</h6>
            <h4 className={`fw-bold ${caixaStatus ? 'text-success' : 'text-secondary'}`}>
              {caixaStatus 
                ? (Number(caixaStatus.valor_inicial) + somaVendas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : "Caixa Fechado"}
            </h4>
            <small className="text-muted">
              {caixaStatus ? "Dinheiro em gaveta" : "Aguardando abertura"}
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-4 h-100 border-start border-warning border-4">
            <h6 className="text-muted fw-bold">Alertas de Estoque</h6>
            <h4 className="fw-bold text-warning">{estoqueBaixo.length}</h4>
            <small className="text-muted">Produtos críticos</small>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4 bg-white rounded-4">
            <h5 className="fw-bold mb-4">Fluxo de Vendas (Por Hora)</h5>
            
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={dadosGrafico} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="hora" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#999', fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#999', fontSize: 12}}
                    tickFormatter={(val) => `R$${val}`}
                  />
                  <Tooltip 
                    cursor={{fill: '#f8f9fa'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="url(#colorTotal)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-white rounded-4 h-100">
            <h5 className="fw-bold mb-3">Top 5 Mais Vendidos</h5>
            <div className="list-group list-group-flush">
              {listaVendas.map((item, index) => (
                <div key={index} className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-light text-dark me-2">{index + 1}º</span>
                    <span className="fw-semibold">{item.produto_nome}</span>
                  </div>
                  <span className="badge rounded-pill bg-primary">{item.quantidade} unid.</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-white rounded-4 h-100">
            <h5 className="fw-bold mb-3 text-danger">Atenção ao Estoque</h5>
            <div className="list-group list-group-flush">
              {estoqueBaixo.map((item, index) => (
                <div key={index} className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{item.nome}</span>
                  <span className="text-danger fw-bold">{item.quantidade} em estoque</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}