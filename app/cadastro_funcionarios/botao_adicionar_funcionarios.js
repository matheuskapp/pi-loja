'use client';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://walrpbrbskwawykdrwna.supabase.co', 'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa')
import { useState } from "react";
import "./botao_adicionar_funcionarios.css"
import { Alert } from 'bootstrap';


export function BotaoAdicionarFuncionarios() {

 const [nome, alteraNome] = useState("")
 const [email, alteraEmail] = useState ("")
 const [senha, alteraSenha] = useState ("")
    

    async function salvar() {
        const objetos = {
            nome: nome,
            email: email,
            senha: senha
        }
        console.log(objetos)


        if (objetos.nome.length < 3){
            alert("O nome deve conter mais de 3 caracteres")
            return
        }

        const { error } = await supabase
            .from('usuarios')
            .insert(objetos)

        console.log(error)


        if (error == null) {
            alert("Funcionario cadastrado com sucesso!")
           
        } else {
            alert("Dados invalidos, verifique os campos e tente novamente")
        }
    }

    
    return (
        <div className="containerBotao mb-3 text-end">

            <div >
                <button
                    type="button"
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    + Adicionar Funcionario
                </button>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h3 className="modal-title fs-5">
                                    Novo Funcionario
                                </h3>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>




                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}



                            <div className="modal-body">
                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={nome} onChange={e => alteraNome(e.target.value)}

                                            type="text"
                                            className="form-control"
                                            placeholder="Nome Completo"
                                        />
                                    </label>
                                </div>


                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={email} onChange={e => alteraEmail(e.target.value)}

                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </label>
                                </div>


                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input  value={senha} onChange={e => alteraSenha(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            placeholder="Senha"
                                        />
                                    </label>
                                </div>

                                
                            </div>
                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}




                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fechar
                                </button>

                                <button onClick={salvar}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Salvar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}