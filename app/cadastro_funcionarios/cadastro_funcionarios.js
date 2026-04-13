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

    async function pesquisar() {
        const { data } = await supabase
            .from('usuarios')
            .select()
            .ilike('nome', `%${pesquisaFuncionarios}%`)
            .order('id', { ascending: false })

        alteraListaFuncionarios(data)
    }

    async function buscar() {
        const { data } = await supabase
            .from('usuarios')
            .select()
            .order('id', { ascending: false })

        alteraListaFuncionarios(data)
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
            toast.success("Atualizado com sucesso!", { icon: "✅" })
            alteraEditando(null)
            alteraNome("")
            alteraEmail("")
            alteraPerfil("funcionario")
            alteraStatus("ativo")
            buscar()
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
        <div className="w-100">

            <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Funcionários</h1>
                    <p className="text-muted mb-0">
                        Gestão de equipe Boy+ Plus • <span className="fw-semibold text-dark">Cadastro e Permissões</span>
                    </p>
                </div>
            </div>

            <div className="barradepesquisa mb-4 p-4 bg-white rounded-4 shadow-sm border-0 mt-3">
                <div className="row align-items-center">

                    <div className="col-6">
                        <div className="input-group">
                            <input
                                value={pesquisaFuncionarios}
                                onChange={e => alteraPesquisaFuncionarios(e.target.value)}
                                className="form-control"
                                placeholder="Pesquisar Funcionário..."
                            />
                            <button onClick={pesquisar} className="btn btn-outline-secondary px-3">
                                Pesquisar 🔍
                            </button>
                        </div>
                    </div>

                    <div className="col-6 text-end">
                        <button
                            type="button"
                            className="btn btn-gradient px-4 shadow-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAdd"
                        >
                            + Adicionar Funcionário
                        </button>
                    </div>

                </div>
            </div>

            <div className="modal fade" id="modalAdd">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header border-0 pb-0">
                            <h5 className="fw-bold">Novo Funcionário</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />
                            <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control mb-2" placeholder="CPF" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                            <input value={senha} onChange={e => alteraSenha(e.target.value)} type="password" className="form-control mb-3" placeholder="Senha" />
                            
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1 fw-bold">Nível de Acesso</label>
                                    <select className="form-select shadow-sm" value={perfil} onChange={e => alteraPerfil(e.target.value)}>
                                        <option value="funcionario">Funcionário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1 fw-bold">Status</label>
                                    <select className="form-select shadow-sm" value={status} onChange={e => alteraStatus(e.target.value)}>
                                        <option value="ativo">Ativo</option>
                                        <option value="desligado">Desligado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button onClick={cadastrar} className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="premium-table-container bg-white rounded-4 shadow-sm p-4 border-0">
                <table className="table premium-table align-middle">
                     
                    <thead>
                        <tr>
                            <th className="ps-3 text-muted fw-semibold border-0">Funcionário</th>
                            <th className="text-center text-muted fw-semibold border-0">Status</th>
                            <th className="text-end pe-4 text-muted fw-semibold border-0">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaFuncionarios.map((item, i) => (
                            <tr key={i} className="hover-row custom-tr">
                                <td className="ps-3 border-0">
                                    <div className="d-flex align-items-center py-2">
                                        <div className="avatar-circle me-3 shadow-sm">
                                            {item.nome ? item.nome.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="fw-bold text-dark mb-0 fs-6">{item.nome}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center border-0">
                                    <span style={{ fontSize: '11px', letterSpacing: '0.05em' }} className={`badge rounded-pill px-3 py-2 fw-bold text-uppercase ${item.perfil === 'admin' ? 'bg-primary text-white' : 'bg-light text-dark border'}`}>
                                        {item.perfil === 'admin' ? '🗝️ Admin' : '👤 Staff'}
                                    </span>
                                </td>
                                <td className="text-center border-0">
                                    <span style={{ fontSize: '11px', letterSpacing: '0.05em' }} className={`badge rounded-pill px-3 py-2 fw-bold text-uppercase ${item.status === 'ativo' ? 'bg-success-soft text-success border border-success' : 'bg-danger-soft text-danger border border-danger'}`}>
                                        {item.status === 'ativo' ? '● Ativo' : '○ Desligado'}
                                    </span>
                                </td>
                                <td className="text-end pe-4 border-0">
                                    <button
                                        onClick={() => editar(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEdit"
                                        className="btn btn-icon-edit scale-hover"
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
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

            <div className="modal fade" id="modalEdit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="fw-bold">Editar Funcionário</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-3" placeholder="Email" />
                            
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1 fw-bold">Nível de Acesso</label>
                                    <select className="form-select shadow-sm" value={perfil} onChange={e => alteraPerfil(e.target.value)}>
                                        <option value="funcionario">Funcionário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-1 fw-bold">Status</label>
                                    <select className="form-select shadow-sm" value={status} onChange={e => alteraStatus(e.target.value)}>
                                        <option value="ativo">Ativo</option>
                                        <option value="desligado">Desligado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button onClick={salvar} className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast bonito */}
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