'use client'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://walrpbrbskwawykdrwna.supabase.co', 'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa')
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

    async function cancelar() {
        const { data, error } = await supabase
            .from('cadastro_clientes')
            .select()
        console.log(data)
        alteraListaClientes(data)
    }

    async function salvar() {

        const objeto = {
            nome: nome,
            cpf: cpf.replaceAll(".", ""),
            telefone: telefone,
            email: email,
            endereco: endereco,


        }

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

         const { error } = await supabase
            .from('cadastro_clientes')
            .insert(objeto)

        console.log(error)

        if(error == null){
            alert("Cliente cadastrado com sucesso!")
            alteraNome("")
            alteraCpf("")
            alteraTelefone()
            alteraEmail("")
            alteraEndereco("")

        }else alert("Dados inválidos, verifique os campos e tente novamente...")

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
                            <button onClick={cancelar} type="button" class="btn btn-dark">Cancelar</button>

                        </form>

                        <br /><br />

                    </form>

                </div>




            </div>


        )
    }