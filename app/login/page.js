'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'; // IMPORTANTE
import { ToastContainer, toast } from 'react-toastify';
import '../home.css';
import supabase from '../conexao/supabase';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Login() {

    const [autenticado, alteraAutenticado] = useState(false)
    const [usuario, alteraUsuario] = useState("")
    
    const router = useRouter();

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    // Limpar sessões antigas ou inválidas ao carregar a página de login
    // Isso evita o erro de "Invalid Refresh Token"
    useEffect(() => {
        const limparSessao = async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("id_usuario");
            localStorage.removeItem("perfil_usuario");
        };
        limparSessao();
    }, []);

    async function autenticar() {
        const emailLimpo = email.trim().toLowerCase();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailLimpo,
            password: senha,
        })

        if (!data || !data.user) {
            toast.error("Erro na senha ou no usuário", { icon: "🚫" })
            return
        }

        // Buscar perfil e status no banco
        const { data: perfis, error: perfilError } = await supabase
            .from('usuarios')
            .select('perfil, status')
            .eq('id', data.user.id);

        const perfilData = perfis && perfis.length > 0 ? perfis[0] : null;

        // ACESSO DE EMERGÊNCIA: Se for o admin mestre, libera direto
        if (emailLimpo === 'admin@admin.com') {
            localStorage.setItem("id_usuario", data.user.id);
            localStorage.setItem("perfil_usuario", 'admin');
            toast.success("Logado com sucesso!", { icon: "✅" });
            
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
            return;
        }

        if (perfilError || !perfilData) {
            toast.error("Não encontrado na base de dados tente novamente", { icon: "🚫" });
            await supabase.auth.signOut();
            return;
        }

        if (perfilData.status === 'desligado') {
            toast.error("Não encontrado na base de dados tente novamente", { icon: "⚠️" });
            await supabase.auth.signOut();
            return;
        }

        localStorage.setItem("id_usuario", data.user.id)
        localStorage.setItem("perfil_usuario", perfilData.perfil || 'funcionario')

        toast.success("Logado com sucesso!", { icon: "✅" })

        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    }

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)" }}>

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
                            className="btn w-100 me-2 text-white"
                            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none" }}
                        >
                            Entrar
                        </button>

                        <a href='/'
                            className="btn w-100"
                            style={{ border: "1px solid #cbd5e1", color: "#475569", background: "transparent" }}
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