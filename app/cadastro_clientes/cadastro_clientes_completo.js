'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import "./botao_adicionar_clientes.css"
import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'

export default function CadastroClientes() {

    const [nome, alteraNome] = useState("")
    const [data_nascimento, alteraData_Nascimento] = useState("")
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState([])
    const [pesquisaClientes, alteraPesquisaClientes] = useState("")
    const [editando, alteraEditando] = useState(null)



    async function buscarClientes() {
        const { data } = await supabase
            .from('clientes')
            .select('*')

        alteraListaClientes(data)
    }

    async function pesquisar() {
        const { data } = await supabase
            .from('clientes')
            .select('*')
            .ilike('nome', '%' + pesquisaClientes + '%')

        alteraListaClientes(data)
    }

    async function salvar() {
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
            alert("Cliente cadastrado com sucesso!")
            alteraListaClientes(listaClientes.concat(objetos))
            alteraNome("")
            alteraData_Nascimento("")
            alteraCpf()
            alteraTelefone()
            alteraEmail("")
            alteraEndereco("")

            
        }
    }

    function editar(objeto) {
        alteraEditando(objeto.id)
        alteraNome(objeto.nome)
        alteraData_Nascimento(objeto.data_nascimento)
        alteraCpf(objeto.cpf)
        alteraTelefone(objeto.telefone)
        alteraEmail(objeto.email)
        alteraEndereco(objeto.endereco)
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
        cancelaEdicao()
        buscarClientes()


        if (error == null) {

            alert("Cliente atualizado!")
            buscarClientes()

     
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

    useEffect(() => {
        buscarClientes()
    }, [])

    return (
        <div className="container mt-5">

            {/* 🔥 BOTÃO + PESQUISA NA MESMA LINHA */}
            <div className="barradepesquisa mb-3 p-5">
                <div className="row align-items-center">

                    <div className="col-6">
                        <div className="input-group">
                            <input
                                value={pesquisaClientes}
                                onChange={e => alteraPesquisaClientes(e.target.value)}
                                className="form-control"
                                placeholder="Pesquisar Cliente.."
                            />
                            <button onClick={pesquisar} className="btn btn-outline-secondary">
                                Pesquisar 🔍
                            </button>
                        </div>
                    </div>

                    <div className="col-6 text-end">
                        <button
                            type="button"
                            className="btn btn-gradient"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            + Adicionar Cliente
                        </button>
                    </div>

                </div>
            </div>


            {/* MODAL ADICIONAR */}
            <div className="modal fade" id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3>Novo Cliente</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome" />
                            <input value={data_nascimento} onChange={e => alteraData_Nascimento(e.target.value)} type="date" className="form-control mb-2" />
                            <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control mb-2" placeholder="CPF" />
                            <input value={telefone} onChange={e => alteraTelefone(e.target.value)} className="form-control mb-2" placeholder="Telefone" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                            <input value={endereco} onChange={e => alteraEndereco(e.target.value)} className="form-control mb-2" placeholder="Endereço" />

                        </div>

                        <div className="modal-footer" >
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button onClick={salvar} className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="container py-5 bg-light ms-4 rounded-5">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaClientes.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td>{item.data_nascimento}</td>
                                <td>{item.cpf}</td>
                                <td>{item.telefone}</td>
                                <td>{item.email}</td>
                                <td>{item.endereco}</td>
                                <td>
                                    <button
                                        onClick={() => editar(item)}
                                        className="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modaledicao"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* MODAL EDIÇÃO */}
            <div className="modal fade" id="modaledicao">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3>Edição de Cliente</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" />
                            <input value={data_nascimento} onChange={e => alteraData_Nascimento(e.target.value)} className="form-control mb-2" />
                            <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control mb-2" />
                            <input value={telefone} onChange={e => alteraTelefone(e.target.value)} className="form-control mb-2" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" />
                            <input value={endereco} onChange={e => alteraEndereco(e.target.value)} className="form-control mb-2" />

                        </div>

                        <div className="modal-footer">
                            <button onClick={cancelaEdicao} className="btn btn-secondary" data-bs-dismiss="modal">
                                Fechar
                            </button>

                            <button onClick={atualizar} className="btn btn-primary" data-bs-dismiss="modal">
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}