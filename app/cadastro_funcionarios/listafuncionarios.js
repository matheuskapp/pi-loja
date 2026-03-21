'use client';
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";

export function ListaFuncionarios() {

    const [listafuncionarios, alteraListaFuncionarios] = useState([])

    async function excluir(id) {
        const response = await supabase
            .from("produtos")
            .delete()
            .eq("id", id);

        if (response) {
            console.log("Erro ao deletar:", response);
        } else {
            console.log("Registro deletado");
        }
    }

    async function buscar() {
        const { data, error } = await supabase
            .from('usuarios')
            .select()
        console.log(data)
        alteraListaFuncionarios(data)
    }

    useEffect(() => {
        buscar()
    }, [])

   

    return (
        <div>

            <div class="container py-5 bg-light text-align-left ms-4 rounded-5">
                <div class="col text-end">
                    <button onClick={() => buscar()} class="btn btn-primary p-1 mb-2">🔄</button>
                </div>
                <div class="card shadow-sm border-0 rounded-4">
                    <div class="card-body">

                        <table class="table align-middle">
                            <thead class="text-muted">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Senha</th>
                                    <th className="text-end">Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    listafuncionarios.map(
                                        (item, index) => <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.email}</td>
                                            <td>{item.senha}</td>

                                            <td class="text-end">
                                                <button class="btn btn-primary btn-sm me-2">Editar</button>
                                                <button onClick={() => { excluir(item.id); buscar() }} class="btn btn-danger btn-sm">Excluir</button>
                                            </td>
                                        </tr>

                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
