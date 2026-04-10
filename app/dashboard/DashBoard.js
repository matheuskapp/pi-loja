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
  CartesianGrid
} from "recharts";

export default function DashBoard() {
  const [somaVendas, setSomaVendas] = useState(0);
  const [totalProdutosCriticos, setTotalProdutosCriticos] = useState(0); // Novo estado para o número total
  const [estoqueBaixo, setEstoqueBaixo] = useState([]);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [caixaStatus, setCaixaStatus] = useState(null);
  const [listaVendas, setListaVendas] = useState([]);

  const [tipoFiltro, setTipoFiltro] = useState('hoje');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  async function buscaStatusCaixa() {
    const { data, error } = await supabase.from('caixas').select('*').eq('status', 'aberto').single();
    if (!error) setCaixaStatus(data);
  }

  async function buscaEstoque() {
    // 1. Busca todos que estão abaixo de 10 para o contador do card
    const { count, error: errCount } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true })
      .lt('quantidade', 10);

    if (!errCount) setTotalProdutosCriticos(count || 0);

    // 2. Busca apenas os 5 mais críticos (menor quantidade) para a lista de baixo
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .lt('quantidade', 10)
      .order('quantidade', { ascending: true })
      .limit(5);

    if (!error) setEstoqueBaixo(data || []);
  }

  async function buscaVendasGrafico() {
    let query = supabase.from('vendas').select('*');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (tipoFiltro === 'hoje') {
      query = query.gte('created_at', hoje.toISOString());
    } else if (tipoFiltro === 'mes') {
      const primeiroDiaAno = new Date(hoje.getFullYear(), 0, 1);
      query = query.gte('created_at', primeiroDiaAno.toISOString());
    } else if (tipoFiltro === 'personalizado' && dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      inicio.setHours(0, 0, 0, 0);
      const fim = new Date(dataFim);
      fim.setHours(23, 59, 59, 999);
      query = query.gte('created_at', inicio.toISOString()).lte('created_at', fim.toISOString());
    }

    const { data, error } = await query;
    if (error) return;

    const total = data.reduce((acc, item) => acc + Number(item.total_compra), 0);
    setSomaVendas(total);
    setTicketMedio(data.length > 0 ? total / data.length : 0);

    const agrupado = {};
    data.forEach((item) => {
      const dataVenda = new Date(item.created_at);
      let chave = tipoFiltro === 'hoje' ? `${dataVenda.getHours()}h` :
        tipoFiltro === 'mes' ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][dataVenda.getMonth()] :
          `${dataVenda.getDate().toString().padStart(2, '0')}/${(dataVenda.getMonth() + 1).toString().padStart(2, '0')}`;

      agrupado[chave] = (agrupado[chave] || 0) + Number(item.total_compra);
    });

    setDadosGrafico(Object.entries(agrupado).map(([label, total]) => ({ label, total })));
  }

  const scrollParaEstoque = () => {
    const elemento = document.getElementById('sessao-estoque');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };


  async function buscaMaisVendidos() {
    const { data: topProdutos } = await supabase.rpc('top_produtos');
    const { data: produtos } = await supabase.from('produtos').select('*');
    if (topProdutos && produtos) {
      const resultado = topProdutos.map((item) => ({
        ...item,
        quantidade: item.total_quantidade,
        produto_nome: produtos.find((p) => p.id === item.produto)?.nome || 'Produto'
      }));
      setListaVendas(resultado);
    }
  }

  useEffect(() => {
    buscaVendasGrafico();
  }, [tipoFiltro, dataInicio, dataFim]);

  useEffect(() => {
    buscaMaisVendidos();
    buscaEstoque();
    buscaStatusCaixa();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-4 h-100">
            <h6 className="text-muted fw-bold">Vendas</h6>
            <h4 className="fw-bold text-primary">{somaVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
            <small className="text-muted">Total no período</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 bg-white rounded-4 h-100">
            <h6 className="text-muted fw-bold">Ticket Médio</h6>
            <h4 className="fw-bold">{ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
            <small className="text-muted">Média por cliente</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className={`card shadow-sm border-0 p-3 rounded-4 h-100 ${caixaStatus ? 'bg-white' : 'bg-light'}`}>
            <h6 className="text-muted fw-bold">Caixa Atual</h6>
            <h4 className={`fw-bold ${caixaStatus ? 'text-success' : 'text-secondary'}`}>
              {caixaStatus ? (Number(caixaStatus.valor_inicial) + somaVendas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Caixa Fechado"}
            </h4>
            <small className="text-muted">{caixaStatus ? "Dinheiro em gaveta" : "Aguardando abertura"}</small>
          </div>
        </div>

        {/* CARD DINÂMICO DE ALERTA */}
        <div className="col-md-3">
          <div
            onClick={scrollParaEstoque}
            style={{ cursor: 'pointer' }}
            className={`card shadow-sm border-0 p-3 rounded-4 h-100 border-start border-4 ${totalProdutosCriticos > 0 ? 'border-danger bg-white' : 'border-success bg-white'}`}
          >
            <h6 className="text-muted fw-bold">Produtos abaixo do Mínimo</h6>
            <h4 className={`fw-bold ${totalProdutosCriticos > 0 ? 'text-danger' : 'text-success'}`}>
              {totalProdutosCriticos}
            </h4>
            <small className="text-muted">Total de itens no estoque baixo (Clique para ver)</small>
          </div>
        </div>
      </div>

      {/* GRAFICO */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-4 bg-white rounded-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3">
              <h5 className="fw-bold mb-0">Fluxo de Vendas</h5>
              <div className="d-flex gap-2 flex-wrap">
                <select className="form-select w-auto shadow-sm" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                  <option value="hoje">Hoje (Por Hora)</option>
                  <option value="mes">Comparativo Mensal</option>
                  <option value="personalizado">Período Personalizado</option>
                </select>
                {tipoFiltro === 'personalizado' && (
                  <>
                    <input type="date" className="form-control w-auto shadow-sm" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                    <input type="date" className="form-control w-auto shadow-sm" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                  </>
                )}
              </div>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} tickFormatter={(val) => `R$${val}`} />
                  <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="total" fill="#0d6efd" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* LISTA MAIS VENDIDOS */}
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

        {/* LISTA CRÍTICA DE ESTOQUE */}
        <div id="sessao-estoque" className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-white rounded-4 h-100">
            <h5 className="fw-bold mb-3 text-danger">Top 5 Críticos (Reposição Imediata)</h5>
            <div className="list-group list-group-flush">
              {estoqueBaixo.map((item, index) => (
                <div key={index} className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{item.nome}</span>
                  <span className="badge bg-danger-subtle text-danger fw-bold">{item.quantidade} em estoque</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}