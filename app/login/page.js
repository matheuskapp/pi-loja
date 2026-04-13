'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'; // IMPORTANTE
import { ToastContainer, toast } from 'react-toastify';
import supabase from '../conexao/supabase';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function Login() {

    const [autenticado, alteraAutenticado] = useState(false)
    const [usuario, alteraUsuario] = useState("")
    
    const router = useRouter();

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if (!data || !data.user) {
            toast.error("Dados inválidos...", { icon: "🚫" })
            return
        }

        localStorage.setItem("id_usuario", data.user.id)

        toast.success("Autenticado com sucesso!", { icon: "✅" })

        // pequeno delay pra dar tempo de aparecer
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    }

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">

            <div className="col-12 col-md-6 col-lg-4">

                <div className="card shadow-lg border-0 rounded-4 p-4">

                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Login</h2>
                        <p className="text-muted">Acesse sua conta</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            onChange={e => alteraEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Senha</label>
                        <input
                            onChange={e => alteraSenha(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            onClick={autenticar}
                            className="btn btn-primary w-100 me-2"
                        >
                            Entrar
                        </button>

                        <a href='homepage'
                            className="btn btn-outline-secondary w-100 me-2"
                        >
                            Cancelar
                        </a>
                    </div>

                </div>

            </div>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                theme="light"
            />

        </div>
    );
}