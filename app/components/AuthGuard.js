'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Rotas que não exigem login
const rotasPublicas = ['/', '/homepage', '/login', '/apresentacao'];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    // 1. O usuário tá tentando acessar tela que não precisa de login?
    if (rotasPublicas.includes(pathname)) {
      setAutorizado(true);
      return;
    }

    // 2. Se for privada, checar o identificador do usuário no localStorage
    const idUsuario = localStorage.getItem('id_usuario');

    if (!idUsuario) {
      // Força voltar pro login e não mostra a tela
      setAutorizado(false);
      router.replace('/login');
    } else {
      // Liberado
      setAutorizado(true);
    }
  }, [pathname, router]);

  // Enquanto avalia as regras de rota, impede que a tela seja exibida para não "piscar" conteúdo
  if (!autorizado && !rotasPublicas.includes(pathname)) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  return children;
}
