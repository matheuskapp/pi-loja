'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import supabase from '../conexao/supabase';
import { createClient } from '@supabase/supabase-js'

import BarraLateral from '../components/barra_lateral';
import { useState } from 'react';


export default function Login() {

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,

            
        })
        
        if(data.user == null ){
            alert("Dados inválidos...")
            return
        }

        alert("Autenticado com sucesso!")
        localStorage.setItem("id_usuario",data.user.id)
    }

    return (

        <div>

            <div className="container-fluid">
                <div className="row">

                    <div className='col-2'>
                        <BarraLateral />

                    </div>

                    {/* CONTEÚDO */}
                    <div className="col-10 ">


                        <div className="titulo">
                            <h1> Login </h1>
                            <br />
                            <form onsubmit="salvar(event)">

                                <div>
                                    <label for="exampleInputPassword1" class="form-label">Email</label>
                                    <input onChange={e => alteraEmail(e.target.value)} type="text" class="form-control" id="exampleInputPassword1" />
                                </div>

                                <br /> <br />

                                <form>

                                    <div>
                                        <label for="exampleInputPassword1" class="form-label">Senha</label>
                                        <input onChange={e => alteraSenha(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <br />



                                    <button onClick={autenticar} type="button" class="btn btn-outline-success me-3">Salvar</button>
                                    <button type="button" class="btn btn-outline-danger me-3">Cancelar</button>


                                </form>

                                <br /><br />

                            </form>
                        </div>

                    </div>

                </div>
            </div>





        </div>




    );
}
