'use client';
import { useState } from "react";

export function TabelaProdutos() {

    const listaProdutos = [
        {
            id: 1,
            nome: "Camiseta Básica Branca",
            sku: "CAM-BRA-001",
            preco: 49.90,
            status: "Ativo"
        },
        {
            id: 2,
            nome: "Camiseta Básica Preta",
            sku: "CAM-PRE-002",
            preco: 49.90,
            status: "Ativo"
        },
        {
            id: 3,
            nome: "Calça Jeans Slim Azul",
            sku: "CAL-JEA-003",
            preco: 129.90,
            status: "Ativo"
        },
        {
            id: 4,
            nome: "Calça Moletom Cinza",
            sku: "CAL-MOL-004",
            preco: 99.90,
            status: "Inativo"
        },
        {
            id: 5,
            nome: "Jaqueta Jeans Masculina",
            sku: "JAQ-JEA-005",
            preco: 199.90,
            status: "Ativo"
        },
        {
            id: 6,
            nome: "Vestido Floral Curto",
            sku: "VES-FLO-006",
            preco: 149.90,
            status: "Ativo"
        },
        {
            id: 7,
            nome: "Shorts Esportivo Preto",
            sku: "SHO-ESP-007",
            preco: 59.90,
            status: "Ativo"
        },
        {
            id: 8,
            nome: "Blusa de Frio com Capuz",
            sku: "BLU-FRI-008",
            preco: 139.90,
            status: "Inativo"
        },
        {
            id: 9,
            nome: "Saia Midi Plissada",
            sku: "SAI-MID-009",
            preco: 119.90,
            status: "Ativo"
        },
        {
            id: 10,
            nome: "Camisa Social Azul",
            sku: "CAM-SOC-010",
            preco: 159.90,
            status: "Ativo"
        }
    ];

    return (
        <div>

            <div class="container py-5 bg-light text-align-left ms-4 rounded-5">
                <div class="card shadow-sm border-0 rounded-4">
                    <div class="card-body">

                        <table class="table align-middle">
                            <thead class="text-muted">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>SKU</th>
                                    <th>Preço</th>
                                    <th>Status</th>
                                    <th className="text-end">Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    listaProdutos.map(
                                        item => <tr>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.sku}</td>
                                            <td>{item.preco}</td>
                                            <td>{item.status}</td>
                                            <td class="text-end">
                                                <button class="btn btn-primary btn-sm me-2">Editar</button>
                                                <button class="btn btn-danger btn-sm">Excluir</button>
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
