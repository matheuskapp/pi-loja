'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import "./barra_lateral.css"
import { useRouter } from "next/navigation";
import supabase from "../conexao/supabase";

export default function BarraLateral() {
    const router = useRouter();
    const [perfil, setPerfil] = useState("");

    useEffect(() => {
        const p = localStorage.getItem("perfil_usuario");
        if (p) setPerfil(p);
    }, []);

    async function sair() {
        await supabase.auth.signOut();
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("perfil_usuario");
        router.push("/login");
    }


    return (
        <div className="containerBarraLateral">

            <div className="BarraLateral">
                <div className="text-center mb-4">
                    <h4 className="fw-bold">Boy+ Plus</h4>
                </div>

                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <Link href="dashboard" className="nav-link">
                            <i className="bi bi-grid me-2"></i> Inicio
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link href="dashboard" className="nav-link">
                            <i className="bi bi-kanban me-2"></i> Dashboard
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link href="/produtos" className="nav-link">
                            <i className="bi bi-box-seam me-2"></i> Produtos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/caixa" className="nav-link">
                            <i className="bi bi-cash-stack me-2"></i> Caixa
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/vendas" className="nav-link">
                            <i className="bi bi-cart3 me-2"></i> Vendas
                        </Link>
                    </li>
                    
                    {perfil === 'admin' && (
                        <li className="nav-item">
                            <Link href="/cadastro_funcionarios" className="nav-link">
                                <i className="bi bi-people me-2"></i> Funcionários
                            </Link>
                        </li>
                    )}

                    <li className="nav-item">
                        <Link href="/cadastro_clientes" className="nav-link">
                            <i className="bi bi-person-plus me-2"></i> Clientes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/apresentacao" className="nav-link">
                            <i className="bi bi-patch-question me-2"></i> FAQ / Ajuda
                        </Link>
                    </li>
                </ul>
                <div className="mt-auto pt-5 pb-3">
                    <button onClick={sair} type="button" className="btn btn-light text-danger fw-bold w-100 d-flex align-items-center justify-content-center py-2 rounded-3 shadow-sm align-middle" style={{ border: "1px solid #ffe4e6", backgroundColor: "#fff5f5" }}>
                        <i className="bi bi-box-arrow-left me-2 fs-5"></i> Sair do Sistema
                    </button>
                </div>
            </div>

        </div >
    )
}
