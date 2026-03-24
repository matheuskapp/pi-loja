'use client';
import { useState } from "react";
import supabase from "../conexao/supabase";
import "./botao_adicionar_clientes.css"


export function BotaoAdicionarClientes() {



    const [nome, alteraNome] = useState("")
    const [data_nascimento, alteraDataNascimento] = useState("")
    const [cpf, alteraCpf] = useState()
    const [telefone, alteraTelefone] = useState()
    const [email, alteraEmail] = useState()
    const [endereco, alteraEndereco] = useState()


    async function salvar() {
        const objetos = {
            nome: nome,
            data_nascimento: data_nascimento,
            cpf: cpf,
            telefone: telefone,
            email: email,
            endereco: endereco

        }
        console.log(objetos)


        const { error } = await supabase
            .from('clientes')
            .insert(objetos)

        console.log(error)


        if (error == null) {
            alert("Cliente cadastrado com sucesso!")
            alteraNome("")
            alteraDataNascimento()
            alteraCpf()
            alteraTelefone()
            alteraEmail()
            alteraEndereco("")

        }
        else alert("Dados inválidos, verifique os campos e tente novamente...")
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
                    + Adicionar Cliente
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
                                    Novo Cliente
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
                                            placeholder="Nome"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={data_nascimento} onChange={e => alteraDataNascimento(e.target.value)}
                                            type="date"
                                            className="form-control"
                                            placeholder="Data de Nascimento"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={cpf} onChange={e => alteraCpf(e.target.value)}

                                            type="text"
                                            className="form-control"
                                            placeholder="CPF"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input value={telefone} onChange={e => alteraTelefone(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Telefone"
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
                                        <input value={endereco} onChange={e => alteraEndereco(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Endereço"
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