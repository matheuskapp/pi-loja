'use client'

import { useState } from "react";

export default function listaFuncionarios() {

    const [nome, alteraNome] = useState("");
    const [email, alteraemail] = useState("");
    const [senha, alteraSenha] = useState("");

    const [funcionarios, alterafuncionarios] = useState([
        {
            nomeCompleto: "Ana Carolina Souza",
            email: "ana.souza@email.com",
            senha: "Ana@1234",
            tipoUsuario: "administrador"
        },
        {
            nomeCompleto: "Bruno Henrique Lima",
            email: "bruno.lima@email.com",
            senha: "Bruno@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "Carla Mendes Oliveira",
            email: "carla.oliveira@email.com",
            senha: "Carla@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "Daniel Alves Pereira",
            email: "daniel.pereira@email.com",
            senha: "Daniel@1234",
            tipoUsuario: "administrador"
        },
        {
            nomeCompleto: "Eduarda Santos Rocha",
            email: "eduarda.rocha@email.com",
            senha: "Eduarda@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "Felipe Martins Costa",
            email: "felipe.costa@email.com",
            senha: "Felipe@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "Gabriela Nunes Ferreira",
            email: "gabriela.ferreira@email.com",
            senha: "Gabriela@1234",
            tipoUsuario: "administrador"
        },
        {
            nomeCompleto: "Henrique Almeida Barbosa",
            email: "henrique.barbosa@email.com",
            senha: "Henrique@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "Isabela Ribeiro Gomes",
            email: "isabela.gomes@email.com",
            senha: "Isabela@1234",
            tipoUsuario: "colaborador"
        },
        {
            nomeCompleto: "João Pedro Castro",
            email: "joao.castro@email.com",
            senha: "Joao@1234",
            tipoUsuario: "administrador"
        },
        {
            nomeCompleto: "Larissa Teixeira Silva",
            email: "larissa.silva@email.com",
            senha: "Larissa@1234",
            tipoUsuario: "colaborador"
        },

        {
            nomeCompleto: "Patrícia Lima Cardoso",
            email: "patricia.cardoso@email.com",
            senha: "Patricia@1234",
            tipoUsuario: "colaborador"
        }


    ]);

    function salvar(e) {
        e.preventDefault();

        const item = {
            nome: nome,
            email: email,
            senha: senha,
            tipoUsuario: false


        }
        console.log(item)
       
    }


return (



    <div>

        <h1> Lista de Funcionários</h1>

        <form onSubmit={salvar}>

            <p> Digite o Nome Completo</p>
            <input onChange={e => alteraNome(e.target.value)} />
            <p> Digite seu Email</p>
            <input onChange={e => alteraEmail(e.target.value)} />
            <p> Digite a Senha</p>
            <input onChange={e => alteraSenha(e.target.value)} />
            
            <br />
            <button onSubmit={salvar}>Salvar</button>
            <br /><br />

        </form>


        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome Completo</th>
                    <th scope="col">Email</th>
                    <th scope="col">Senha</th>
                    


                </tr>
            </thead>
            <tbody>

                {
                funcionarios.map(
                        item =>
                            <tr>

                                <td>{item.nomeCompleto}</td>
                                <td>{item.email}</td>
                                <td>{item.senha}</td>
                                

                            </tr>

                    )
                }

            </tbody>
        </table>
    </div >
)
}
