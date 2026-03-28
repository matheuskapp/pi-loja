'use client';
import { useState } from "react";
import supabase from "../conexao/supabase";
import { BotaoAdicionarFuncionarios } from "./botao_adicionar_funcionarios";

export function ListaFuncionarios({ listafuncionarios, alteraListaFuncionarios,buscar }) {
   
    const [nome, alteraNome] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [editando, alteraEditando] = useState(null)

    async function buscar() {
        const { data, error } = await supabase
            .from('usuarios')
            .select()

        console.log(data)
        console.log(error)

        alteraListaFuncionarios(data)
    }

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            nome: nome,
            email: email,
            senha: senha
        }

        const { error } = await supabase
            .from('usuarios')
            .update(objeto)
            .eq('id', editando)

        console.log(error)

        if (error == null) {
            alert("Atualização realizada com sucesso")
            cancelaEdicao()
            buscar()
        } else {
            alert("Verifique os campos e tente novamente!")
        }
    }

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome)
        alteraEmail(objeto.email)
        alteraSenha(objeto.senha)
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraNome("")
        alteraEmail("")
        alteraSenha("")
    }

    return (
        <div>

            <div className="container py-5 bg-light text-align-left ms-4 rounded-5">
                <div className="col text-end">
                    <button onClick={buscar} className="btn btn-primary p-1 mb-2">🔄</button>
                </div>

                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body">

                        <table className="table align-middle">
                            <thead className="text-muted">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Senha</th>
                                    <th className="text-end">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    listafuncionarios.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.email}</td>
                                            <td>****</td>

                                            <td className="text-end">
                                                <button 
                                                    onClick={() => editar(item)} 
                                                    className="btn btn-primary btn-sm me-2"
                                                    data-bs-target="#modaledicao" 
                                                    data-bs-toggle="modal" 
                                                >
                                                    Editar
                                                </button>

                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="modaledicao"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title fs-5">
                                Edição de Produto
                            </h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label w-100">
                                    <input 
                                        value={nome} 
                                        onChange={e => alteraNome(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="form-label w-100">
                                    <input 
                                        value={email} 
                                        onChange={e => alteraEmail(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="form-label w-100">
                                    <input 
                                        value={senha} 
                                        onChange={e => alteraSenha(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Senha"
                                    />
                                </label>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button 
                                onClick={cancelaEdicao}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Fechar
                            </button>

                            <button
                                onClick={salvar}
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                
                            >
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}