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
  const [totalProdutosCriticos, setTotalProdutosCriticos] = useState(0); 
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
    const { count, error: errCount } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true })
      .lt('quantidade', 10);

    if (!errCount) setTotalProdutosCriticos(count || 0);

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
          <div className="card shadow border-0 p-4 rounded-4 h-100 bg-white">
            <h6 className="text-muted fw-bold small uppercase">Vendas</h6>
            <h4 className="fw-bold text-primary mb-0" style={{ letterSpacing: '-1px' }}>{somaVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
            <small className="text-muted mt-2 d-block">Total no período</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-4 rounded-4 h-100 bg-white">
            <h6 className="text-muted fw-bold small uppercase">Ticket Médio</h6>
            <h4 className="fw-bold mb-0" style={{ letterSpacing: '-1px' }}>{ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
            <small className="text-muted mt-2 d-block">Média por cliente</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className={`card shadow border-0 p-4 rounded-4 h-100 bg-white ${caixaStatus ? 'border-start border-success border-4' : ''}`}>
            <h6 className="text-muted fw-bold small uppercase">Caixa Atual</h6>
            <h4 className={`fw-bold mb-0 ${caixaStatus ? 'text-success' : 'text-secondary'}`} style={{ letterSpacing: '-1px' }}>
              {caixaStatus ? (Number(caixaStatus.valor_inicial) + somaVendas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Fechado"}
            </h4>
            <small className="text-muted mt-2 d-block">{caixaStatus ? "Dinheiro em gaveta" : "Aguardando abertura"}</small>
          </div>
        </div>

        <div className="col-md-3">
          <div
            onClick={scrollParaEstoque}
            style={{ cursor: 'pointer' }}
            className={`card shadow border-0 p-4 rounded-4 h-100 border-start border-4 bg-white ${totalProdutosCriticos > 0 ? 'border-danger' : 'border-success'}`}
          >
            <h6 className="text-muted fw-bold small uppercase">Reposição</h6>
            <h4 className={`fw-bold mb-0 ${totalProdutosCriticos > 0 ? 'text-danger' : 'text-success'}`} style={{ letterSpacing: '-1px' }}>
              {totalProdutosCriticos} itens
            </h4>
            <small className="text-muted mt-2 d-block">Estoque crítico</small>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow border-0 p-4 bg-white rounded-4 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-3 border-bottom pb-4">
              <h5 className="fw-bold mb-0">Fluxo de Faturamento</h5>
              <div className="d-flex gap-2 flex-wrap">
                <select className="form-select w-auto border-0 shadow-sm bg-light fw-semibold" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                  <option value="hoje">Hoje</option>
                  <option value="mes">Mensal</option>
                  <option value="personalizado">Personalizado</option>
                </select>
                {tipoFiltro === 'personalizado' && (
                  <>
                    <input type="date" className="form-control w-auto border-0 shadow-sm bg-light" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                    <input type="date" className="form-control w-auto border-0 shadow-sm bg-light" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                  </>
                )}
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={(val) => `R$${val}`} />
                  <Tooltip cursor={{ fill: 'var(--table-row-hover)' }} contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="table-card h-100">
            <div className="p-4 bg-white border-bottom">
              <h5 className="fw-bold mb-0">🔥 Top 5 Mais Vendidos</h5>
            </div>
            <table className="premium-table">
              <thead>
                <tr>
                  <th className="ps-4">PRODUTO</th>
                  <th className="text-end pe-4">QUANTIDADE</th>
                </tr>
              </thead>
              <tbody>
                {listaVendas.map((item, index) => (
                  <tr key={index}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-light-subtle text-muted text-dark me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '12px', border: '1px solid var(--border-color)' }}>{index + 1}</span>
                        <span className="fw-bold text-dark">{item.produto_nome}</span>
                      </div>
                    </td>
                    <td className="text-end pe-4">
                      <span className="badge bg-primary-subtle text-primary border border-primary px-3 rounded-pill fw-bold">{item.quantidade} unid.</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="sessao-estoque" className="col-md-6 mb-4">
          <div className="table-card h-100">
            <div className="p-4 bg-white border-bottom">
              <h5 className="fw-bold mb-0 text-danger">⚠️ Reposição Imediata</h5>
            </div>
            <table className="premium-table">
              <thead>
                <tr>
                  <th className="ps-4">PRODUTO CRÍTICO</th>
                  <th className="text-end pe-4">EM ESTOQUE</th>
                </tr>
              </thead>
              <tbody>
                {estoqueBaixo.map((item, index) => (
                  <tr key={index}>
                    <td className="ps-4 fw-bold text-dark">{item.nome}</td>
                    <td className="text-end pe-4">
                      <span className="badge bg-danger text-white px-3 rounded-pill fw-bold shadow-sm">{item.quantidade} restando</span>
                    </td>
                  </tr>
                ))}
                {estoqueBaixo.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-5 text-success fw-bold">
                        <i className="bi bi-check2-circle me-2"></i> Estoque em dia!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}