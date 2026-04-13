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
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState([])
    const [pesquisaClientes, alteraPesquisaClientes] = useState("")
    const [colunaFiltro, alteraColunaFiltro] = useState("nome")
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
            .ilike(colunaFiltro, '%' + pesquisaClientes + '%')

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
            toast.success("Cliente cadastrado com sucesso!", { icon: "👤" })
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
            toast.success("Cliente atualizado!", { icon: "✏️" })
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
        <div className="w-100">

            <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                <div>
                    <h1 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-1px" }}>Clientes</h1>
                    <p className="text-muted mb-0">
                        Gestão de Clientes Boy+ Plus • <span className="fw-semibold text-dark">Fidelização e Histórico</span>
                    </p>
                </div>
            </div>

            <div className="barradepesquisa mb-3 p-4 bg-white rounded-4 shadow-sm border-0">
                <div className="row align-items-center">

                    <div className="col-7">
                        <div className="input-group shadow-sm rounded-3">
                            <select
                                className="form-select bg-light text-secondary fw-medium"
                                style={{ maxWidth: "140px", border: "1px solid #dee2e6" }}
                                value={colunaFiltro}
                                onChange={e => alteraColunaFiltro(e.target.value)}
                            >
                                <option value="nome">Por Nome</option>
                                <option value="cpf">Por CPF</option>
                                <option value="email">Por E-mail</option>
                                <option value="telefone">Por Telefone</option>
                            </select>
                            <input
                                value={pesquisaClientes}
                                onChange={e => alteraPesquisaClientes(e.target.value)}
                                className="form-control"
                                placeholder={`Digite para pesquisar...`}
                            />
                            <button onClick={pesquisar} className="btn border bg-light text-primary px-3">
                                <i className="bi bi-search"></i> Pesquisar
                            </button>
                        </div>
                    </div>

                    <div className="col-5 text-end">
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
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome Completo" />
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

            <div className="premium-table-container bg-white rounded-4 shadow-sm p-4 border-0 mt-3">
                <table className="table premium-table align-middle">
                     
                    <thead>
                        <tr>
                            <th className="ps-3 text-muted fw-semibold border-0">Cliente</th>
                            <th className="text-center text-muted fw-semibold border-0">Data Nasc.</th>
                            <th className="text-center text-muted fw-semibold border-0">CPF</th>
                            <th className="text-center text-muted fw-semibold border-0">Telefone</th>
                            <th className="text-end pe-4 text-muted fw-semibold border-0">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaClientes.map((item, i) => (
                            <tr key={i} className="hover-row custom-tr">
                                <td className="ps-3 border-0">
                                    <div className="d-flex align-items-center py-2">
                                        <div className="avatar-circle me-3 shadow-sm">
                                            {item.nome ? item.nome.charAt(0).toUpperCase() : 'C'}
                                        </div>
                                        <div>
                                            <p className="fw-bold text-dark mb-0 fs-6">{item.nome}</p>
                                            <small className="text-muted">{item.email || item.Email || "Sem e-mail"}</small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center text-secondary border-0">
                                    {item.data_nascimento ? new Date(item.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                                </td>
                                <td className="text-center text-secondary fw-medium border-0">
                                    {mascararCPF(item.cpf)}
                                </td>
                                <td className="text-center text-secondary border-0">
                                    {item.telefone || '-'}
                                </td>
                                <td className="text-end pe-4 border-0">
                                    <button
                                        onClick={() => editar(item)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modaledicao"
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
                {listaClientes.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5 mt-2">Nenhum cliente encontrado.</p>
                    </div>
                )}
            </div>

            <div className="modal fade" id="modaledicao">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3>Edição de Cliente</h3>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input value={nome} onChange={e => alteraNome(e.target.value)} className="form-control mb-2" placeholder="Nome Completo" />
                            <input value={data_nascimento} onChange={e => alteraData_Nascimento(e.target.value)} type="date" className="form-control mb-2" />
                            <input value={cpf} onChange={e => alteraCpf(e.target.value)} className="form-control mb-2" placeholder="CPF" />
                            <input value={telefone} onChange={e => alteraTelefone(e.target.value)} className="form-control mb-2" placeholder="Telefone" />
                            <input value={email} onChange={e => alteraEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                            <input value={endereco} onChange={e => alteraEndereco(e.target.value)} className="form-control mb-2" placeholder="Endereço" />
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