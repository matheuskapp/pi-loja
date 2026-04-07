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

    useEffect(() => {
        if (pesquisaFuncionarios === "") {
            buscar()
        } else {
            pesquisar()
        }
    }, [pesquisaFuncionarios])

    return (
        <div className="container">

            <div className="row mb-4 fw-bold">
                <h1>Cadastro Funcionarios</h1>
            </div>

            <div className="barradepesquisa mb-3 p-5">
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <input
                                value={pesquisaFuncionarios}
                                onChange={e => alteraPesquisaFuncionarios(e.target.value)}
                                className="form-control"
                                placeholder="Pesquisar"
                            />
                            <button onClick={pesquisar} className="btn btn-outline-secondary">
                                🔍
                            </button>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>

            <div className="text-end mb-3">
                <button
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAdd"
                >  + Adicionar Funcionario
                </button>
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

            <div className="container py-3 bg-light rounded-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Usuários</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaFuncionarios.map((item, i) => (
                            <tr key={i}>
                                <td>{item.nome}</td>
                                <td>
                                    <button
                                        onClick={() => editar(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEdit"
                                        className="btn btn-primary btn-sm me-"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                position="top-right"
                autoClose={2500}
                theme="dark"
            />

        </div>
    );
}