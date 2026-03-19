'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'
import { useState } from 'react'
import supabase from '../conexao/supabase'

export default function CadastroClientes() {

    const [nome, alteraNome] = useState("")
    const [data_nascimento, alteraData_Nascimento] = useState()
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

    async function salvar(e) {
        e.preventDefault();
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
        .insert(objeto)
        
        alteraListaClientes(listaClientes.concat(objeto))
        
        console.log(objeto)


        console.log(error)

        if (error == null) {
            alert("Cliente cadastrado com sucesso!")
            alteraNome("")
            alteraData_Nascimento()
            alteraCpf("")
            alteraTelefone()
            alteraEmail("")
            alteraEndereco("")

        }
        else alert("Dados inválidos, verifique os campos e tente novamente...")
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





                <br /> <br />

                <form onSubmit={() => salvar(event)} type="Salvar">
                    <div className="nomeCompleto">
                        <label className="form-label">Nome Completo</label>
                        <input onChange={e => alteraNome(e.target.value)} type="text" className="form-control" />
                    </div>
                    <br />
                    <div className="data_nascimento">
                        <label className="form-label">Data de Nascimento</label>
                        <input onChange={e => alteraData_Nascimento(e.target.value)} type="date" className="form-control" />
                    </div>

                    <br />

                    <div className="cpf">
                        <label className="form-label">CPF</label>
                        <input onChange={e => alteraCpf(e.target.value)} type="text" className="form-control" />
                    </div>

                    <br />

                    <div className="telefone">
                        <label className="form-label">Telefone</label>
                        <input onChange={e => alteraTelefone(e.target.value)} type="number" className="form-control" />
                    </div>

                    <br />

                    <div className="emailSenha">
                        <label className="form-label">E-mail</label>
                        <input onChange={e => alteraEmail(e.target.value)} type="email" className="form-control" />
                    </div>
                    <br />
                    <div className="endereco">
                        <label className="form-label">Endereço</label>
                        <input onChange={e => alteraEndereco(e.target.value)} className="form-control" />
                    </div>
                    <br />



                    <button  className="btn btn-primary me-3">Salvar</button>
                    <button  onClick={cancelar} className="btn btn-dark">Cancelar</button>

                </form>

                <br /><br />



            </div>

        
                

        </div>


    )
}