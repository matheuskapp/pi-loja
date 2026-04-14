'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./cadastro_clientes.css"
import "./botao_adicionar_clientes.css"
import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'
import "./cadastro_clientes_completo.css"

export default function CadastroClientes() {

    const [nome, alteraNome] = useState("")
    const [data_nascimento, alteraData_Nascimento] = useState("")
    const [cpf, alteraCpf] = useState("")
    const [telefone, alteraTelefone] = useState("")
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState([])
    const [pesquisaClientes, alteraPesquisaClientes] = useState("")
    const [colunaFiltro, alteraColunaFiltro] = useState("nome")
    const [editando, alteraEditando] = useState(null)
    const [idPrioridade, setIdPrioridade] = useState(null)

    async function buscarClientes(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('clientes')
            .select('*')
            .order('id', { ascending: false })
        
        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraListaClientes(ordenado)
    }

    async function pesquisar(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('clientes')
            .select('*')
            .ilike(colunaFiltro, '%' + pesquisaClientes + '%')
            .order('id', { ascending: false })

        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraListaClientes(ordenado)
    }

    const validarEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    async function salvar() {
        if (!nome || !cpf || !email) {
            toast.error("Nome, CPF e E-mail são obrigatórios!", { icon: "⚠️" });
            return;
        }

        if (email && !validarEmail(email)) {
            toast.error("Formato de e-mail inválido!", { icon: "📧" });
            return;
        }
        const objetos = {
            nome: nome,
            data_nascimento: data_nascimento,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco
        }

        const { error } = await supabase
            .from('clientes')
            .insert(objetos)

        if (error == null) {
            toast.success("Cliente cadastrado com sucesso!", { icon: "👤" })
            buscarClientes()
            alteraNome("")
            alteraData_Nascimento("")
            alteraCpf("")
            alteraTelefone("")
            alteraEmail("")
            alteraEndereco("")
        }
    }

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome || "")
        alteraData_Nascimento(objeto.data_nascimento || "")
        alteraCpf(objeto.cpf || "")
        alteraTelefone(objeto.telefone || "")
        alteraEmail(objeto.email || "")
        alteraEndereco(objeto.endereco || "")
    }

    async function atualizar() {
        const objeto = {
            nome: nome,
            data_nascimento: data_nascimento,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco,
        }

        const { error } = await supabase
            .from('clientes')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            const idPrio = editando;
            toast.success("Cliente atualizado!", { icon: "✏️" })
            setIdPrioridade(idPrio)
            cancelaEdicao()
            buscarClientes(idPrio)
        }
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraNome("")
        alteraData_Nascimento("")
        alteraCpf("")
        alteraTelefone("")
        alteraEmail("")
        alteraEndereco("")
    }

    function mascararCPF(cpfOculto) {
        if (!cpfOculto) return "***.***.***-**";
        const num = cpfOculto.replace(/\D/g, ''); 
        if (num.length === 11) {
            return `***.${num.substring(3, 6)}.${num.substring(6, 9)}-**`;
        }
        return `***.***.***-**`; 
    }

    useEffect(() => {
        if(pesquisaClientes === ""){
           buscarClientes()
        }else{
            pesquisar()
        }
    }, [pesquisaClientes])

    return (
        <div className="pagina-clientes">

            <div className="header-section">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Clientes</h1>
                    <p className="text-muted mb-0">
                       <span className="fw-semibold text-dark">Fidelização e Histórico</span>
                    </p>
                </div>
            </div>

            <div className="actions-bar">
                <div className="search-container">
                    <select
                        value={colunaFiltro}
                        onChange={e => alteraColunaFiltro(e.target.value)}
                    >
                        <option value="nome">Nome</option>
                        <option value="cpf">CPF</option>
                        <option value="email">E-mail</option>
                        <option value="telefone">Telefone</option>
                    </select>
                    <input
                        value={pesquisaClientes}
                        onChange={e => alteraPesquisaClientes(e.target.value)}
                        placeholder={`Pesquisar...`}
                    />
                    <button onClick={pesquisar}>
                        🔍
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    + Adicionar Cliente
                </button>
            </div>

            <div className="table-card">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th className="ps-4">CLIENTE</th>
                            <th className="text-center">DATA NASC.</th>
                            <th className="text-center">CPF</th>
                            <th className="text-center">TELEFONE</th>
                            <th className="text-end pe-4">AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaClientes.map((item, i) => (
                            <tr key={item.id || i}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="avatar-circle me-3">
                                            {item.nome ? item.nome.charAt(0).toUpperCase() : 'C'}
                                        </div>
                                        <div>
                                            <p className="fw-bold text-dark mb-0 fs-6">{item.nome}</p>
                                            <small className="text-muted">{item.email || "Sem e-mail"}</small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center text-secondary">
                                    {item.data_nascimento ? new Date(item.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                                </td>
                                <td className="text-center text-secondary fw-medium">
                                    {mascararCPF(item.cpf)}
                                </td>
                                <td className="text-center text-secondary">
                                    {item.telefone || '-'}
                                </td>
                                <td className="text-end pe-4">
                                    <div className="d-flex justify-content-end">
                                        <button
                                            onClick={() => editar(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modaledicao"
                                            className="btn-icon-edit"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {listaClientes.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5 mt-2">Nenhum cliente encontrado.</p>
                    </div>
                )}
            </div>

            {/* MODAL CADASTRO */}
            <div className="modal fade" id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-bold m-0">Novo Cliente</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NOME COMPLETO</label>
                                <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control form-control-lg bg-light border-0 fs-6" placeholder="Ex: João Silva" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">DATA NASCIMENTO</label>
                                    <input value={data_nascimento} onChange={e => alteraData_Nascimento(e.target.value)} type="date" className="form-control bg-light border-0" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">CPF</label>
                                    <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control bg-light border-0" placeholder="000.000.000-00" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">TELEFONE</label>
                                    <input value={telefone} onChange={e => alteraTelefone(e.target.value)} className="form-control bg-light border-0" placeholder="(00) 00000-0000" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">EMAIL</label>
                                    <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control bg-light border-0" placeholder="exemplo@email.com" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">ENDEREÇO</label>
                                <input value={endereco} onChange={e => alteraEndereco(e.target.value)} className="form-control bg-light border-0" placeholder="Rua, Número, Bairro, Cidade" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light px-4" data-bs-dismiss="modal">Cancelar</button>
                            <button onClick={salvar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Salvar Cliente</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EDIÇÃO */}
            <div className="modal fade" id="modaledicao">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-bold m-0">Editar Cliente</h5>
                            <button className="btn-close" data-bs-dismiss="modal" onClick={cancelaEdicao}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NOME COMPLETO</label>
                                <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control form-control-lg bg-light border-0 fs-6" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">DATA NASCIMENTO</label>
                                    <input value={data_nascimento} onChange={e => alteraData_Nascimento(e.target.value)} type="date" className="form-control bg-light border-0" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">CPF</label>
                                    <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control bg-light border-0" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">TELEFONE</label>
                                    <input value={telefone} onChange={e => alteraTelefone(e.target.value)} className="form-control bg-light border-0" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">EMAIL</label>
                                    <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control bg-light border-0" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">ENDEREÇO</label>
                                <input value={endereco} onChange={e => alteraEndereco(e.target.value)} className="form-control bg-light border-0" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={cancelaEdicao} className="btn btn-light px-4" data-bs-dismiss="modal">Cancelar</button>
                            <button onClick={atualizar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Salvar Alterações</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                theme="light"
                toastClassName="premium-toast"
                hideProgressBar={false}
                newestOnTop={true}
            />

        </div>
    )
}