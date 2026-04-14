'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import "./cadastro_funcionarios.css"

const supabase = createClient(
    'https://walrpbrbskwawykdrwna.supabase.co',
    'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa'
)

export default function PaginaFuncionarios() {

    const [listaFuncionarios, alteraListaFuncionarios] = useState([])
    const [pesquisaFuncionarios, alteraPesquisaFuncionarios] = useState("")

    const [nome, alteraNome] = useState("")
    const [cpf, alteraCpf] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [perfil, alteraPerfil] = useState("funcionario")
    const [status, alteraStatus] = useState("ativo")
    const [editando, alteraEditando] = useState(null)
    const [idPrioridade, setIdPrioridade] = useState(null)

    async function pesquisar(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('usuarios')
            .select()
            .ilike('nome', `%${pesquisaFuncionarios}%`)
            .order('id', { ascending: false })

        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraListaFuncionarios(ordenado)
    }

    async function buscar(prioId = null) {
        const idAlvo = prioId || idPrioridade;
        const { data } = await supabase
            .from('usuarios')
            .select()
            .order('id', { ascending: false })

        const ordenado = (data || []).sort((a, b) => {
            if (String(a.id) === String(idAlvo)) return -1;
            if (String(b.id) === String(idAlvo)) return 1;
            return 0;
        });

        alteraListaFuncionarios(ordenado)
    }

    const validarEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    async function cadastrar() {
        // Validações
        if (!nome || !cpf || !email || !senha) {
            toast.error("Todos os campos são obrigatórios!", { icon: "⚠️" });
            return;
        }

        if (!validarEmail(email)) {
            toast.error("Formato de e-mail inválido!", { icon: "📧" });
            return;
        }

        if (senha.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres!", { icon: "🔐" });
            return;
        }
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        if (authError) {
            toast.error(`Erro na autenticação: ${authError.message}`, { icon: "🚫" })
            console.error("Erro Auth:", authError)
            return
        }

        if (!data?.user) {
            toast.error("Não foi possível criar o usuário no sistema.", { icon: "🚫" })
            return
        }

        const obj = {
            id: data.user.id,
            nome: nome,
            cpf: cpf,
            email: email, // Salvar o e-mail também no perfil do banco de dados
            perfil: perfil,
            status: status
        }

        const { error: dbError } = await supabase.from('usuarios').insert(obj)

        if (dbError == null) {
            toast.success("Cadastrado com sucesso!", { icon: "👨‍💼" })
            alteraNome("")
            alteraCpf("")
            alteraEmail("")
            alteraSenha("")
            alteraPerfil("funcionario")
            alteraStatus("ativo")
            buscar()
        } else {
            toast.error(`Erro no banco: ${dbError.message}`)
            console.error("Erro Database:", dbError)
        }
    }

    async function salvar() {
        // Criamos o objeto de atualização
        // Se o erro persistir, pode ser que a coluna 'email' não exista na sua tabela 'usuarios'
        const obj = {
            nome: nome,
            perfil: perfil,
            status: status
        }

        // Se você tiver a coluna 'email' na tabela, pode descomentar a linha abaixo:
        // obj.email = email;

        const { error: dbError } = await supabase.from('usuarios').update(obj).eq('id', editando)

        if (dbError == null) {
            const idPrio = editando;
            toast.success("Atualizado com sucesso!", { icon: "✅" })
            setIdPrioridade(idPrio)
            alteraEditando(null)
            alteraNome("")
            alteraEmail("")
            alteraPerfil("funcionario")
            alteraStatus("ativo")
            buscar(idPrio)
        } else {
            // Log detalhado para descobrirmos o que é o {}
            console.error("Erro detalhado do Supabase:", {
                message: dbError.message,
                details: dbError.details,
                hint: dbError.hint,
                code: dbError.code
            });
            toast.error(`Erro ao atualizar: ${dbError.message || 'Verifique o console (F12)'}`)
        }
    }

    function editar(item) {
        alteraEditando(item.id)
        alteraNome(item.nome || "")
        alteraEmail(item.email || "")
        alteraPerfil(item.perfil || "funcionario")
        alteraStatus(item.status || "ativo")
    }

    function mascararCPF(cpfOculto) {
        if (!cpfOculto) return "***.***.***-**";
        // Limpa pra pegar só números
        const num = cpfOculto.replace(/\D/g, ''); 
        if (num.length === 11) {
            // Exibe apenas o miolo do CPF por questões de LGPD
            return `***.${num.substring(3, 6)}.${num.substring(6, 9)}-**`;
        }
        return `***.***.***-**`; // Fallback de proteção
    }

    useEffect(() => {
        if (pesquisaFuncionarios === "") {
            buscar()
        } else {
            pesquisar()
        }
    }, [pesquisaFuncionarios])

    return (
        <div className="pagina-funcionarios">

            <div className="header-section">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Funcionários</h1>
                    <p className="text-muted mb-0">
                       <span className="fw-semibold text-dark">Cadastro e Permissões</span>
                    </p>
                </div>
            </div>

            <div className="actions-bar">
                <div className="search-container">
                    <input
                        value={pesquisaFuncionarios}
                        onChange={e => alteraPesquisaFuncionarios(e.target.value)}
                        placeholder="Pesquisar funcionários..."
                    />
                    <button onClick={pesquisar}>🔍</button>
                </div>

                <button
                    type="button"
                    className="btn btn-gradient px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAdd"
                >
                    + Adicionar Funcionário
                </button>
            </div>

            <div className="table-card">
                <table className="premium-table align-middle">
                    <thead>
                        <tr>
                            <th className="ps-4">FUNCIONÁRIO</th>
                            <th className="text-center">ACESSO</th>
                            <th className="text-center">STATUS</th>
                            <th className="text-end pe-4">AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaFuncionarios.map((item, i) => (
                            <tr key={item.id || i}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="avatar-circle me-3">
                                            {item.nome ? item.nome.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="fw-bold text-dark mb-0 fs-6">{item.nome}</p>
                                            
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <span className={`badge-premium ${item.perfil === 'admin' ? 'bg-primary text-white' : 'bg-light text-dark border'}`}>
                                        {item.perfil === 'admin' ? '🗝️ Admin' : '👤 Funcionário'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <span className={`badge-premium ${item.status === 'ativo' ? 'bg-success-soft' : 'bg-danger-soft'}`}>
                                        {item.status === 'ativo' ? '● Ativo' : '○ Inativo'}
                                    </span>
                                </td>
                                <td className="text-end pe-4">
                                    <div className="d-flex justify-content-end">
                                        <button
                                            onClick={() => editar(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdit"
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
                {listaFuncionarios.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5 mt-2">Nenhum funcionário encontrado.</p>
                    </div>
                )}
            </div>

            {/* MODAL ADD */}
            <div className="modal fade" id="modalAdd">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-bold m-0">Novo Funcionário</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NOME COMPLETO</label>
                                <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control bg-light border-0" placeholder="Ex: Lucas Abreu" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">CPF</label>
                                <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control bg-light border-0" placeholder="000.000.000-00" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">EMAIL</label>
                                <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control bg-light border-0" placeholder="exemplo@loja.com" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">SENHA</label>
                                <input value={senha} onChange={e => alteraSenha(e.target.value)} type="password" className="form-control bg-light border-0" placeholder="Mínimo 6 caracteres" />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">NÍVEL DE ACESSO</label>
                                    <select className="form-select bg-light border-0" value={perfil} onChange={e => alteraPerfil(e.target.value)}>
                                        <option value="funcionario">Funcionário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">STATUS</label>
                                    <select className="form-select bg-light border-0" value={status} onChange={e => alteraStatus(e.target.value)}>
                                        <option value="ativo">Ativo</option>
                                        <option value="desligado">Desligado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light px-4" data-bs-dismiss="modal">Fechar</button>
                            <button onClick={cadastrar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Salvar Acesso</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EDIT */}
            <div className="modal fade" id="modalEdit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-bold m-0">Editar Funcionário</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">NOME COMPLETO</label>
                                <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control bg-light border-0" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">EMAIL</label>
                                <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control bg-light border-0" />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">NÍVEL DE ACESSO</label>
                                    <select className="form-select bg-light border-0" value={perfil} onChange={e => alteraPerfil(e.target.value)}>
                                        <option value="funcionario">Funcionário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">STATUS</label>
                                    <select className="form-select bg-light border-0" value={status} onChange={e => alteraStatus(e.target.value)}>
                                        <option value="ativo">Ativo</option>
                                        <option value="desligado">Desligado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-light px-4" data-bs-dismiss="modal">Fechar</button>
                            <button onClick={salvar} className="btn btn-gradient px-4" data-bs-dismiss="modal">Atualizar Dados</button>
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
    );
}