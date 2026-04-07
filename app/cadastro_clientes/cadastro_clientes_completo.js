'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import "./botao_adicionar_clientes.css"
import { useEffect, useState } from 'react'
import supabase from '../conexao/supabase'
import "./cadastro_clientes_completo.css"

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
        if(pesquisaClientes === ""){
           buscarClientes()
        }else{
            pesquisar()
        }
    }, [pesquisaClientes])


    return (
        <div className="container mt-5">

            
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


            <div >

                <div className="card shadow-sm border-10 rounded-10 d-inline-block">
                    <div className="card-body">

                        <table className="table align-middle">
                            <thead className="text-muted">
                                <tr>
                                    <th className="text-center">Nome</th>
                                    <th className="text-center">Data</th>
                                    <th className="text-center">CPF</th>
                                    <th className="text-center">Telefone</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Endereço</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaClientes.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{item.nome}</td>

                                        <td className="text-center">
                                            {new Date(item.data_nascimento).toLocaleDateString('pt-BR')}
                                        </td>

                                        <td className="text-center">{item.cpf}</td>
                                        <td className="text-center">{item.telefone}</td>
                                        <td className="text-center">{item.email}</td>
                                        <td className="text-center">{item.endereco}</td>

                                        <td className="text-center">
                                            <button
                                                onClick={() => editar(item)}
                                                className="btn btn-primary btn-sm px-3"
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
                </div>

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