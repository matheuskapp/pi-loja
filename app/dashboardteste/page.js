'use client'

import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";


const [somaVendas, alteraSomaVendas] = useState(0);
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);
const dataFiltro = hoje.toISOString();




function teste() {

    async function buscaVendasHoje() {
        const { data, error } = await supabase
            .from('vendas')
            .select('total_compra')
            .gte('created_at', dataFiltro)
        if (data) {
            const totalSomado = data.reduce((acumulador, item) => {
                return acumulador + item.valor_venda;
            }, 0);
        }
        alteraSomaVendas(totalSomado)
    }


    return (
        <div>
            
                <span>Total de Hoje:</span>
                <strong>
                    {somaVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>
           
        </div>
    );
}

export default teste;