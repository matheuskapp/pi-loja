'use client'
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const dicionarioAjuda = {
    "/dashboard": {
        icone: "bi-grid",
        titulo: "Painel Principal (Dashboard)",
        tag: "Início",
        descricao: "É a primeira tela que você vê. Um resumo rápido de como a loja está indo hoje.",
        passos: [
            "O que ver primeiro? Confira o card 'Total de Vendas' para saber quanto a loja já faturou hoje.",
            "Ticket Médio: Esse valor mostra, em média, quanto cada cliente tem gastado na loja hoje. Ajuda a definir metas!",
            "Gráficos: O gráfico desenha as vendas ao longo das horas. Bom para descobrir o horário 'de pico'.",
            "Fique de olho: A seção 'Alerta de Estoque' é super importante. Ela mostra produtos que estão acabando."
        ]
    },
    "/produtos": {
        icone: "bi-box-seam",
        titulo: "Catálogo Virtual (Produtos)",
        tag: "Estoque",
        descricao: "Onde todo o estoque ganha vida. Cadastre e administre tudo que será vendido no caixa.",
        passos: [
            "Onde Adicionar?: O botão azul '+ Adicionar Produto' cadastra novas peças.",
            "Código SKU: Toda vez que for cadastrar um produto, crie ou adicione o código SKU único (ex: BST-M-01) - ele não pode mudar.",
            "Correções: Achou um erro na descrição de um produto? Clique no botão lápis que fica do lado dele na tabela.",
            "Filtro Rápido: Na barra de pesquisa lá no topo, você digita o nome do produto e a tabela buscará para você."
        ]
    },
    "/vendas": {
        icone: "bi-cart3",
        titulo: "Ponto de Venda",
        tag: "Terminal",
        descricao: "É o coração da loja! Aqui você fecha pedidos e entrega as peças ao cliente no balcão.",
        passos: [
            "Atenção: Você NÃO vai conseguir fechar uma venda se a página do 'Caixa' não estiver aberta no dia. Fique ligado!",
            "Como vender: Primeiro busque o produto que o cliente escolheu e digite a quantidade.",
            "Cliente Oculto: Você pode buscar clientes do banco de dados ou fazer vendas diretas sem cliente (venda rápida).",
            "Transação de Dinheiro: Qualquer venda feita e aprovada nesta página entra automaticamente para o lucro diário do seu Caixa."
        ]
    },
    "/caixa": {
        icone: "bi-cash-stack",
        titulo: "Fluxo do Caixa",
        tag: "Giro Diário",
        descricao: "Para não haver furos financeiros. Você abre pela manhã e o encerra no fim do turno.",
        passos: [
            "A primeira coisa do dia: Quando você chegar, insira o valor inicial que já tem na gaveta (Troco) e clique em 'Abrir Caixa'.",
            "Fique Atento: Na tabela aparecerá todo o registro do dinheiro que circulou hoje. Vendas entram magicamente na lista.",
            "Auditoria: A lista paginada te dará transparência total de todos os horários e formas de pagamento adotados.",
            "O fim do dia: Clicando em 'Fechar Dia', o sistema entende que aquela jornada contábil de faturamento foi interrompida."
        ]
    },
    "/cadastro_clientes": {
        icone: "bi-person-plus",
        titulo: "Gestão de Clientes",
        tag: "Fidelidade",
        descricao: "Área reservada para você registrar os compradores frequentes ou captar contatos.",
        passos: [
            "O Cadastro: Clique em '+ Adicionar Cliente' e cadastre o novo freguês colocando Nome, CPF e contatos no formulário.",
            "Onde é usado?: Ter o cliente salvo faz com que, lá na hora do 'Ponto de Venda', você só precise buscar o nome dele.",
            "Atualizações (LGPD): Caso o freguês deseje atualizar o seu e-mail, entre nesta aba e clique em Editar.",
        ]
    },
    "/cadastro_funcionarios": {
        icone: "bi-people",
        titulo: "Equipe e Usuários",
        tag: "Acesso Privado",
        descricao: "Onde o administrador concede permissão (vendedores e caixas) para acessarem a loja.",
        passos: [
            "Aviso Restrito: Este menu define quem consegue entrar no painel. O passe-livre só ocorre criando um cadastro aqui.",
            "Segurança de Telas: O site te proíbe de abrir partes críticas se você não for um usuário desta lista.",
            "Máscara na Tabela: Por respeito às leis da internet (LGPD/Senhas), repare que a lista exibe proteções severas aos seus funcionários."
        ]
    }
};

export default function AjudaGlobal() {
    const pathname = usePathname() || "";
    // Nao exibe em telas soltas como login
    if (pathname === "/login" || pathname === "/") return null;

    // Busca no dicionário, se não cair numa rota registrada usa o genérico
    const conteudo = dicionarioAjuda[pathname] || {
        icone: "bi-info-circle",
        titulo: "Bula da Loja PI",
        tag: "Ajuda",
        descricao: "Use os menus da lateral esquerda para navegar pela loja.",
        passos: ["Navegue em Cadastros para configurar primeiro os Produtos e Usuários.", "Depois, abra o Caixa para conseguir vender!"]
    };

    return (
        <>
            <style jsx>{`
                /* FAB - Floating Action Button */
                .fab-button {
                    position: fixed;
                    right: 32px;
                    bottom: 32px;
                    width: 58px;
                    height: 58px;
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    border: none;
                    border-radius: 50%;
                    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
                    color: white;
                    font-size: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1040;
                    transition: transform 0.25s, box-shadow 0.25s;
                }
                .fab-button:hover {
                    transform: scale(1.08) translateY(-4px);
                    box-shadow: 0 12px 30px rgba(99, 102, 241, 0.4);
                }

                /* Offcanvas Moderno */
                .offcanvas-premium {
                    border-left: none !important;
                    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.08) !important;
                    width: 380px !important;
                }
                .offcanvas-premium .offcanvas-header {
                    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                    border-bottom: 1px solid #e2e8f0;
                    padding: 24px 32px;
                }
                .offcanvas-premium .offcanvas-body {
                    padding: 32px;
                    background: #ffffff;
                }
                
                /* Estilos Internos Contextuais */
                .ajuda-badge {
                    font-size: 11px;
                    font-family: monospace;
                    text-transform: uppercase;
                    background: #e0e7ff;
                    color: #4338ca;
                    padding: 4px 10px;
                    border-radius: 99px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .passo-card {
                    background: #fafbfc;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 14px;
                    border: 1px solid #f1f5f9;
                    display: flex;
                    gap: 14px;
                }
                .passo-numero {
                    background: linear-gradient(135deg, #6366f1, #0d6efd);
                    color: #fff;
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                }
                .passo-texto {
                    font-size: 13px;
                    color: #475569;
                    line-height: 1.5;
                    margin: 0;
                }
            `}</style>

            {/* O Botão Flutuante */}
            <button 
                className="fab-button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasAjuda" 
                aria-controls="offcanvasAjuda"
                title="Ajuda desta página"
            >
                <i className="bi bi-question"></i>
            </button>

            {/* O Modal Offcanvas Lateral */}
            <div className="offcanvas offcanvas-end offcanvas-premium" tabIndex="-1" id="offcanvasAjuda" aria-labelledby="offcanvasAjudaLabel">
                <div className="offcanvas-header pb-4 pt-4">
                    <div>
                        <span className="ajuda-badge mb-2 d-inline-block">{conteudo.tag}</span>
                        <h4 className="offcanvas-title fw-bold text-dark d-flex align-items-center" id="offcanvasAjudaLabel">
                            <i className={`bi ${conteudo.icone} me-2 text-primary`}></i>
                            {conteudo.titulo}
                        </h4>
                    </div>
                    <button type="button" className="btn-close mb-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
                <div className="offcanvas-body">
                    <p className="text-secondary fw-medium mb-4 fs-6">
                        {conteudo.descricao}
                    </p>
                    
                    <h6 className="fw-bold mb-3 mt-2 text-dark">Passo a Passo Rápido:</h6>
                    
                    <div className="passos-lista">
                        {conteudo.passos.map((texto, i) => (
                            <div className="passo-card" key={i}>
                                <div className="passo-numero">{i + 1}</div>
                                <p className="passo-texto">{texto}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 p-3 rounded-4 bg-light border text-center">
                        <i className="bi bi-emoji-smile fs-4 text-primary d-block mb-1"></i>
                        <small className="text-muted">A Loja PI foi feita pensando em facilitar o seu negócio todos os dias.</small>
                    </div>
                </div>
            </div>
        </>
    );
}
