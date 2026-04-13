'use client'
import { useState, useEffect } from 'react'
import BarraLateral from '../components/barra_lateral'

const secoes = [
    {
        icone: "bi-grid",
        titulo: "Dashboard (Seu Painel de Destaques)",
        numero: "01",
        tag: "Início",
        descricao: "É a primeira tela que você vê. Um resumo rápido de como a loja está indo hoje.",
        passos: [
            "O que ver primeiro? Confira o card 'Total de Vendas' para saber quanto a loja já faturou hoje.",
            "Ticket Médio: Esse valor mostra, em média, quanto cada cliente tem gastado na loja hoje. Ajuda a definir metas!",
            "Gráficos: O gráfico central desenha as vendas ao longo das horas. Bom para descobrir o horário 'de pico'.",
            "Fique de olho: A seção 'Alerta de Estoque' é super importante. Ela mostra produtos que estão a um passo de acabar.",
            "Dica de Ouro: Sempre que abrir a tela, você pode clicar no botão 'Atualizar Dados' lá no topo."
        ]
    },
    {
        icone: "bi-box-seam",
        titulo: "Produtos (Catálogo Virtual)",
        numero: "02",
        tag: "Gestão do Estoque",
        descricao: "Onde todo o estoque ganha vida. Cadastre e administre tudo que será vendido no caixa.",
        passos: [
            "Para onde olho?: O botão azul '+ Adicionar Produto' cadastra novas peças. Tenha os dados do produto em mãos.",
            "Código SKU: Toda vez que for cadastrar um produto, crie ou adicione o código SKU único (ex: BST-M-01) - ele não pode mudar.",
            "Correções: Achou um erro na descrição de um produto? Clique no botão 'Editar' que fica do lado dele na tabela.",
            "Na barra de pesquisa lá no topo, você digita o nome do produto e a tabela fará a filtragem instantaneamente pra você."
        ]
    },
    {
        icone: "bi-cart3",
        titulo: "Vendas (Ponto de Venda)",
        numero: "03",
        tag: "Bater pedido",
        descricao: "É o coração da loja! Aqui você fecha pedidos e entrega as peças ao cliente no balcão.",
        passos: [
            "Atenção: Você NÃO vai conseguir fechar uma venda se a página do 'Caixa' não estiver aberta no dia. Fique ligado!",
            "Como vender: Primeiro busque o produto que o cliente escolheu e digite quantas vai levar.",
            "Selecionando Clientes: Você pode buscar clientes já cadastrados pelo banco de dados ou fazer vendas sem cliente específico.",
            "Descontos: O sistema permite inserir um botão de desconto no valor (útil para pagamentos à vista).",
            "Dinheiro entra na hora: Qualquer venda feita nesta página entra automaticamente para o lucro diário do seu Caixa."
        ]
    },
    {
        icone: "bi-cash-stack",
        titulo: "Caixa (Controle Financeiro)",
        numero: "04",
        tag: "Giro Diário",
        descricao: "Para não haver furos financeiros. Você abre pela manhã e o encerra no fim do turno.",
        passos: [
            "A primeira coisa do dia: Quando você chegar, insira o valor inicial que já tem na gaveta (Troco) e clique em 'Abrir Caixa'.",
            "Fique Atento: Na tabela aparecerá todo o registro do dinheiro que circulou. Vendas batidas aparecem magicamente na lista.",
            "Transparência: A lista paginada te dará uma auditoria de todos os horários e formas de pagamento que seu funcionário usou.",
            "O fim do dia: Clicando em 'Fechar Dia', o sistema entende que aquela jornada de faturamento foi interrompida com segurança."
        ]
    },
    {
        icone: "bi-person-plus",
        titulo: "Clientes (Cartela e Fidelidade)",
        numero: "05",
        tag: "Relacionamento",
        descricao: "Área reservada para você registrar os compradores frequentes ou captar contatos.",
        passos: [
            "Como funciona: Clique em '+ Adicionar Cliente' e cadastre o novo freguês colocando Nome, CPF e meios de comunicação.",
            "Onde é usado?: Ter o cliente salvo faz com que, lá na hora do 'Ponto de Venda', você só precise buscar o nome dele rápido.",
            "Organização: A lista de clientes pode crescer muito, portanto, conte com a lupa na barra de pesquisa para achar quem precisa.",
            "Sempre que o cliente solicitar atualização de telefone ou e-mail, entre nesta aba e clique no botão de lapis para Editar."
        ]
    },
    {
        icone: "bi-people",
        titulo: "Funcionários (Acesso Privado)",
        numero: "06",
        tag: "Permissões",
        descricao: "Onde o administrador cadastra os usuários (vendedores e caixas) que acessarão a loja.",
        passos: [
            "Restrito: Este menu define quem consegue entrar no painel. Novos funcionários terão que dar e-mail e senha à você aqui.",
            "Autenticação Segura: Cadastrando a pessoa aqui, o site gera o passe-livre de autenticação automática no Banco de Dados.",
            "Importante LGPD: A tabela de usuários esconde parte do CPF com asteriscos, respeitando as leis de proteção da internet.",
            "Bloqueios: Lembre-se, o site te bloqueia de acessar abas que precisam de funcionário logado caso tente burlar a segurança."
        ]
    }
]

function getDelay(i) {
    const linha = Math.floor(i / 2)
    const col = i % 2
    return linha * 100 + col * 55
}

export default function Ajuda() {
    const [aberto, setAberto] = useState(null)
    const [visiveis, setVisiveis] = useState([])
    const [passosVisiveis, setPassosVisiveis] = useState({})

    useEffect(() => {
        secoes.forEach((_, i) => {
            setTimeout(() => setVisiveis(v => [...v, i]), getDelay(i))
        })
    }, [])

    function toggle(i) {
        if (aberto === i) { setAberto(null); setPassosVisiveis({}); return }
        setAberto(i)
        setPassosVisiveis({})
        secoes[i].passos.forEach((_, j) => {
            setTimeout(() => setPassosVisiveis(p => ({ ...p, [`${i}-${j}`]: true })), 55 * j)
        })
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap');

                .ajuda-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

                /* ── HERO BANNER ── */
                .hero {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    padding: 48px 48px 44px;
                    margin-bottom: 40px;
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #0d6efd 100%);
                    opacity: 0;
                    transform: translateY(-14px);
                    animation: fadeDown 0.55s ease 0.05s forwards;
                }
                .hero-noise {
                    position: absolute; inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
                    pointer-events: none;
                }
                .hero-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                }
                .hero-orb-1 {
                    width: 260px; height: 260px;
                    background: rgba(255,255,255,0.07);
                    top: -80px; right: -60px;
                }
                .hero-orb-2 {
                    width: 140px; height: 140px;
                    background: rgba(255,255,255,0.05);
                    bottom: -40px; right: 160px;
                }
                .hero-pretitle {
                    font-family: 'DM Mono', monospace;
                    font-size: 11px;
                    color: rgba(255,255,255,0.55);
                    letter-spacing: 0.08em;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }
                .hero-title {
                    font-size: 36px;
                    font-weight: 600;
                    color: #fff;
                    letter-spacing: -0.8px;
                    line-height: 1.15;
                    margin: 0 0 10px;
                }
                .hero-title em {
                    font-style: italic;
                    font-weight: 300;
                    color: rgba(255,255,255,0.75);
                }
                .hero-sub {
                    font-size: 14px;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                    font-weight: 400;
                    max-width: 380px;
                }
                .hero-badge {
                    position: absolute;
                    bottom: 32px; right: 40px;
                    font-family: 'DM Mono', monospace;
                    font-size: 11px;
                    color: rgba(255,255,255,0.35);
                    letter-spacing: 0.05em;
                }

                /* ── GRID ── */
                .ajuda-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    align-items: start;
                }

                /* ── CARD ── */
                .ajuda-item {
                    border-radius: 18px;
                    border: 1px solid #e8e8f0;
                    overflow: hidden;
                    background: #fff;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .col-left {
                    opacity: 0; transform: translateY(24px);
                    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.22,.68,0,1.15), border-color 0.2s, box-shadow 0.2s;
                }
                .col-right {
                    opacity: 0; transform: translateY(-24px);
                    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.22,.68,0,1.15), border-color 0.2s, box-shadow 0.2s;
                }
                .ajuda-item.visivel { opacity: 1; transform: translateY(0); }
                .ajuda-item:hover { border-color: #c7c7e0; box-shadow: 0 6px 28px rgba(99,102,241,0.08); }
                .ajuda-item.ativo {
                    border-color: #6366f1;
                    box-shadow: 0 6px 32px rgba(99,102,241,0.15);
                    grid-column: span 2;
                }

                /* ── TOPO COLORIDO DO CARD ── */
                .card-accent {
                    height: 3px;
                    background: linear-gradient(90deg, #6366f1, #0d6efd);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.35s cubic-bezier(.4,0,.2,1);
                }
                .ajuda-item.ativo .card-accent,
                .ajuda-item:hover .card-accent { transform: scaleX(1); }

                /* ── BOTÃO ── */
                .ajuda-btn {
                    width: 100%; background: transparent; border: none;
                    padding: 20px 22px 18px;
                    display: flex; align-items: center; gap: 14px;
                    cursor: pointer; text-align: left;
                }

                .ajuda-numero {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px; color: #bbb; min-width: 20px; flex-shrink: 0;
                }

                .ajuda-icone-wrap {
                    width: 38px; height: 38px; border-radius: 10px;
                    background: #f3f3fb;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.25s, transform 0.2s;
                }
                .ajuda-btn:hover .ajuda-icone-wrap { transform: scale(1.08); }
                .ajuda-item.ativo .ajuda-icone-wrap {
                    background: linear-gradient(135deg, #6366f1, #0d6efd);
                }

                .ajuda-icone { font-size: 16px; color: #6366f1; transition: color 0.25s; }
                .ajuda-item.ativo .ajuda-icone { color: #fff; }

                .ajuda-tag {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px; color: #a5b4fc;
                    background: #eef2ff;
                    padding: 2px 8px; border-radius: 99px;
                    display: inline-block; margin-bottom: 3px;
                }
                .ajuda-item.ativo .ajuda-tag { background: #e0e7ff; color: #6366f1; }

                .ajuda-titulo { font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0; line-height: 1.3; }
                .ajuda-sub { font-size: 12px; color: #aaa; margin: 2px 0 0; }

                .ajuda-seta {
                    font-size: 13px; color: #ccc; margin-left: auto; flex-shrink: 0;
                    transition: transform 0.3s cubic-bezier(.4,0,.2,1), color 0.2s;
                }
                .ajuda-item.ativo .ajuda-seta { transform: rotate(180deg); color: #6366f1; }

                /* ── CORPO ── */
                .ajuda-corpo {
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(.4,0,.2,1);
                }
                .ajuda-linha { height: 1px; background: #f0f0f8; margin: 0 22px; }
                .ajuda-passos { padding: 18px 22px 22px; }

                /* layout de 2 colunas nos passos quando expandido */
                .ajuda-item.ativo .passos-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0 24px;
                }

                .passo-item {
                    display: flex; align-items: flex-start; gap: 10px;
                    padding: 9px 0; border-bottom: 1px solid #f3f3fb;
                    opacity: 0; transform: translateX(-8px);
                    transition: opacity 0.28s ease, transform 0.28s ease;
                }
                .passo-item:last-child { border-bottom: none; }
                .passo-item.visivel { opacity: 1; transform: translateX(0); }

                .passo-num {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px; color: #fff;
                    background: linear-gradient(135deg, #6366f1, #0d6efd);
                    width: 20px; height: 20px; border-radius: 6px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; margin-top: 2px;
                }

                .passo-texto { font-size: 13px; color: #555; line-height: 1.6; margin: 0; }

                /* ── DICA ── */
                .dica-rodape {
                    display: flex; align-items: flex-start; gap: 14px;
                    padding: 18px 22px;
                    background: linear-gradient(135deg, #eef2ff, #eff6ff);
                    border: 1px solid #e0e7ff;
                    border-radius: 16px; margin-top: 10px;
                    opacity: 0;
                    animation: fadeDown 0.45s ease 0.8s forwards;
                }

                @keyframes fadeDown { to { opacity: 1; transform: translateY(0); } }

                .rodape-txt {
                    font-size: 11px; color: #ccc; text-align: center; margin-top: 40px;
                    font-family: 'DM Mono', monospace;
                    opacity: 0;
                    animation: fadeDown 0.45s ease 1s forwards;
                }

                .page-header {
                    opacity: 0; transform: translateY(-10px);
                    animation: fadeDown 0.45s ease 0.05s forwards;
                }
            `}</style>

            <div className="ajuda-root" style={{ display: "flex", backgroundColor: "#f5f5fb", minHeight: "100vh" }}>
                <BarraLateral />

                <main style={{ marginLeft: "260px", width: "100%", padding: "40px 48px", maxWidth: "980px" }}>

                    {/* HERO */}
                    <div className="hero">
                        <div className="hero-noise"></div>
                        <div className="hero-orb hero-orb-1"></div>
                        <div className="hero-orb hero-orb-2"></div>
                        <p className="hero-pretitle">boy+ plus</p>
                        <h1 className="hero-title">
                            Tudo que você precisa<br />
                            <em>saber para usar o sistema</em>
                        </h1>
                        <p className="hero-sub">
                            Selecione um módulo abaixo e veja o passo a passo completo de cada funcionalidade.
                        </p>
                        
                    </div>

                    {/* GRID */}
                    <div className="ajuda-grid">
                        {secoes.map((s, i) => {
                            const estaAberto = aberto === i
                            const col = i % 2 === 0 ? "col-left" : "col-right"

                            return (
                                <div
                                    key={i}
                                    className={[
                                        "ajuda-item", col,
                                        visiveis.includes(i) ? "visivel" : "",
                                        estaAberto ? "ativo" : ""
                                    ].join(" ")}
                                >
                                    <div className="card-accent"></div>

                                    <button className="ajuda-btn" onClick={() => toggle(i)}>
                                        <span className="ajuda-numero">{s.numero}</span>
                                        <div className="ajuda-icone-wrap">
                                            <i className={`bi ${s.icone} ajuda-icone`}></i>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <span className="ajuda-tag">{s.tag}</span>
                                            <p className="ajuda-titulo">{s.titulo}</p>
                                            <p className="ajuda-sub">{s.descricao}</p>
                                        </div>
                                        <i className="bi bi-chevron-down ajuda-seta"></i>
                                    </button>

                                    <div
                                        className="ajuda-corpo"
                                        style={{ maxHeight: estaAberto ? `${s.passos.length * 80}px` : "0px" }}
                                    >
                                        <div className="ajuda-linha"></div>
                                        <div className="ajuda-passos">
                                            <div className="passos-grid">
                                                {s.passos.map((passo, j) => (
                                                    <div
                                                        key={j}
                                                        className={`passo-item${passosVisiveis[`${i}-${j}`] ? " visivel" : ""}`}
                                                    >
                                                        <span className="passo-num">{j + 1}</span>
                                                        <p className="passo-texto">{passo}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* DICA */}
                    <div className="dica-rodape">
                        <i className="bi bi-lightbulb" style={{ fontSize: "16px", color: "#6366f1", flexShrink: 0, marginTop: "1px" }}></i>
                        <p style={{ fontSize: "13px", color: "#6366f1", margin: 0, lineHeight: 1.6 }}>
                            <strong>Dica:</strong> Sempre abra o caixa antes de registrar vendas.
                            Produtos com menos de 10 unidades aparecem como alerta no Dashboard.
                        </p>
                    </div>

                   

                </main>
            </div>
        </>
    )
}