'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'
import { useState } from 'react'
import supabase from '../conexao/supabase'

export default function CadastroClientes() {

    const [nome, alteraNome] = useState("")
    const [nascimento, alteraDataNascimento] = useState()
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState([]);

    async function cancelar() {
        const { data, error } = await supabase
            .from('clientes')
            .select()
        console.log(data)
        alteraListaClientes(data)
    }

    async function salvar() {

        const objeto = {
            nome: nome,
            nascimento: nascimento,
            cpf: cpf.replaceAll(".", ""),
            telefone: telefone,
            email: email,
            endereco: endereco,


        }

        function salvar(e) {
            e.preventDefault()
            const objeto = {
                nome: nome,
                nascimento: nascimento,
                cpf: cpf,
                telefone: telefone,
                email: email,
                endereco: endereco,


            }
            console.log(objeto)
        }

        const { error } = await supabase
            .from('clientes')
            .insert(objeto)

        console.log(error)
        console.log(objeto)

        if (error == null) {
            alert("Cliente cadastrado com sucesso!")
            alteraNome("")
            alteraDataNascimento()
            alteraCpf("")
            alteraTelefone()
            alteraEmail("")
            alteraEndereco("")

        } else alert("Dados inválidos, verifique os campos e tente novamente...")

    }

    return (
        <div className="row">
            <div className='col-2'>

                <BarraLateral />

            </div>
            <div className="col-9">

                <div className="container-fluid" />
                <h1>Cadastro de Clientes</h1>




                <div className="titulo" >

                </div>


                <form onsubmit="salvar(event)">


                    <br /> <br />

                    <form>
                        <div class="nomeCompleto">
                            <label class="form-label">Nome Completo</label>
                            <input onChange={e => alteraNome(e.target.value)} type="text" class="form-control" />
                        </div>
                        <br />
                        <div class="dataNascimento">
                            <label class="form-label">Data de Nascimento</label>
                            <input onChange={e => alteraDataNascimento(e.target.value)} type="number" class="form-control" />
                        </div>

                        <br />

                        <div class="cpf">
                            <label class="form-label">CPF</label>
                            <input onChange={e => alteraCpf(e.target.value)} type="number" class="form-control" />
                        </div>

                        <br />

                        <div class="telefone">
                            <label class="form-label">Telefone</label>
                            <input onChange={e => alteraTelefone(e.target.value)} type="number" class="form-control" />
                        </div>

                        <br />
                        
                        <div class="emailSenha">
                            <label class="form-label">E-mail</label>
                            <input onChange={e => alteraEmail(e.target.value)} type="email" class="form-control" />
                        </div>
                        <br />
                        <div class="endereco">
                            <label class="form-label">Endereço</label>
                            <input onChange={e => alteraEndereco(e.target.value)} class="form-control" />
                        </div>
                        <br />



                        <button onClick={salvar} type="Salvar" class="btn btn-primary me-3">Salvar</button>
                        <button onClick={cancelar} type="button" class="btn btn-dark">Cancelar</button>

                    </form>

                    <br /><br />

                </form>

            </div>

            <ul>
                {
                    listaClientes.map(
                        item => <li> Nome: {item.nome} CPF: {item.cpf} Telefone: {item.telefone}  E-mail: {item.email} Endereço: {item.endereco}</li>
                    )
                }
            </ul>


        </div>


    )
}