'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'
import { useState } from 'react'

export default function CadastroClientes() {

    const [nome, alteraNome] = useState("")
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState("")
    const [endereco, alteraEndereco] = useState("")

    const [listaClientes, alteraListaClientes] = useState([]);

    function salvar(e) {
        e.preventDefault()
        const objeto = {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco,

        }
        console.log(objeto)
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
                        <button type="button" class="btn btn-dark">Cancelar</button>

                    </form>

                    <br /><br />

                </form>

            </div>




        </div>


    )
}