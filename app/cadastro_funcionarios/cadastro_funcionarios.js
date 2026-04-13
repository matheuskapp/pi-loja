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
    const [editando, alteraEditando] = useState(null)

    async function pesquisar() {
        const { data } = await supabase
            .from('usuarios')
            .select()
            .ilike('nome', `%${pesquisaFuncionarios}%`)

        alteraListaFuncionarios(data)
    }

    async function buscar() {
        const { data } = await supabase
            .from('usuarios')
            .select()

        alteraListaFuncionarios(data)
    }

    async function cadastrar() {

        const { data } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        if (data == null) {
            toast.error("Dados inválidos...", { icon: "🚫" })
            return
        }

        const obj = {
            id: data.user.id,
            nome: nome,
            cpf: cpf,
        }

        const resposta = await supabase.from('usuarios').insert(obj)

        if (resposta.error == null) {
            toast.success("Cadastrado com sucesso!", { icon: "👨‍💼" })
            buscar()
        } else {
            toast.error("Erro ao cadastrar")
        }
    }

    async function salvar(e) {
        e.preventDefault()

        const objeto = { nome: nome }

        const { error } = await supabase
            .from('usuarios')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            toast.success("Atualizado com sucesso", { icon: "✏️" })
            buscar()
        } else {
            toast.error("Erro ao atualizar")
        }
    }

    function editar(obj) {
        alteraEditando(obj.id)
        alteraNome(obj.nome)
        alteraEmail(obj.Email)
        alteraSenha(obj.senha)
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
        <div className="container">

            <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                <h1 className="fw-bold m-0 text-dark">Cadastro de Funcionários</h1>
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

                        <div className="modal-header">
                            <h3>Novo Funcionario</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />
                            <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control mb-2" placeholder="CPF" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                            <input value={senha} onChange={e => alteraSenha(e.target.value)} type="password" className="form-control" placeholder="Senha" />
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
                                    <span className="badge-premium badge-active">Ativo</span>
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

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
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