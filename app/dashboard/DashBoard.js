'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DashBoard() {

  const [listaVendas, setListaVendas] = useState([]);
  const [somaVendas, setSomaVendas] = useState(0);
  const [estoqueBaixo, setEstoqueBaixo] = useState([]);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataFiltro = hoje.toISOString();

  // 🔹 Busca vendas do dia + ticket médio + gráfico
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

      if (quantidadeVendas > 0) {
        setTicketMedio(total / quantidadeVendas);
      } else {
        setTicketMedio(0);
      }

      // 🔥 GRAFICO POR HORA
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

  // 🔹 TOP 5 MAIS VENDIDOS
  async function buscaMaisVendidos() {

    const { data: vendas, error: erroVendas } = await supabase
      .from('vendas')
      .select('*');

    if (erroVendas) {
      console.error("Erro vendas:", erroVendas);
      return;
    }

    const lista = vendas || [];
    const agrupado = {};

    lista.forEach((venda) => {
      const idProduto = venda.produto;
      const quantidade = parseInt(venda.quantidade) || 0;

      if (!agrupado[idProduto]) {
        agrupado[idProduto] = 0;
      }

      agrupado[idProduto] += quantidade;
    });

    const topProdutos = Object.entries(agrupado)
      .map(([produtoId, totalQuantidade]) => ({
        produto: Number(produtoId),
        quantidade: totalQuantidade
      }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);

    const { data: produtos, error: erroProdutos } = await supabase
      .from('produtos')
      .select('*');

    if (erroProdutos) {
      console.error("Erro produtos:", erroProdutos);
      return;
    }

    const listaProdutos = produtos || [];

    const resultado = topProdutos.map((item) => {
      const produtoEncontrado = listaProdutos.find(
        (p) => p.id === item.produto
      );

      return {
        ...item,
        produto_nome: produtoEncontrado?.nome || "Produto não encontrado"
      };
    });

    setListaVendas(resultado);
  }

  // 🔹 ESTOQUE BAIXO
  async function buscaEstoqueBaixo() {

    const { data, error } = await supabase
      .from('produtos')
      .select('*');

    if (error) {
      console.error("Erro estoque baixo:", error);
      return;
    }

    const lista = data || [];

    const filtrado = lista
      .map(item => ({
        ...item,
        quantidade: Number(item.quantidade)
      }))
      .filter(item => item.quantidade < 10)
      .sort((a, b) => a.quantidade - b.quantidade)
      .slice(0, 5);

    setEstoqueBaixo(filtrado);
  }

  useEffect(() => {
    buscaVendasHoje();
    buscaMaisVendidos();
    buscaEstoqueBaixo();
  }, []);

  return (
    <div className="container-fluid">

      {/* CARDS */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Vendas Hoje</h6>
            <p className="fw-bold">
              {somaVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <small className="text-muted">Total do dia</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Ticket Médio</h6>
            <h4 className="fw-bold">
              {ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h4>
            <small className="text-muted">Valor médio por venda</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100">
            <h6 className="text-muted">Caixa Atual</h6>
            <h4 className="fw-bold">--</h4>
            <small className="text-muted">Nenhum caixa aberto</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded h-100 border-warning">
            <h6 className="text-muted">Alertas</h6>
            <h4 className="fw-bold text-warning">{estoqueBaixo.length}</h4>
            <small className="text-muted">Produtos com estoque baixo</small>
          </div>
        </div>

      </div>

      {/* 🔥 GRÁFICO MELHORADO */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow p-3 mb-4 bg-body-tertiary rounded" style={{ minHeight: "400px" }}>
            <h5 className="fw-bold mb-3">Vendas do Dia</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGrafico}>
                <XAxis dataKey="hora" />
                <YAxis tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Bar dataKey="total" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>

      {/* RESTO IGUAL */}
      <div className="row mt-4">

        <div className="col-sm-6 mb-4">
          <div className="card shadow p-3 bg-body-tertiary rounded h-100" style={{ minHeight: "300px" }}>
            <h5 className="fw-bold">Mais Vendidos</h5>

            <div className="text-muted">
              {listaVendas.length > 0 ? (
                listaVendas.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>#{index + 1} - {item.produto_nome}</strong></p>
                    <p>Quantidade: {item.quantidade}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Carregando...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-sm-6 mb-4">
          <div className="card shadow p-3 bg-body-tertiary rounded h-100" style={{ minHeight: "300px" }}>
            <h5 className="fw-bold">Estoque Baixo</h5>

            <div className="text-muted">
              {estoqueBaixo.length > 0 ? (
                estoqueBaixo.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>{item.nome}</strong></p>
                    <p>Estoque: {item.quantidade}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Nenhum produto com estoque baixo</p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}