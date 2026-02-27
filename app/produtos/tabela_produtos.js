export function TabelaProdutos() {
    return (
        <div>

            <div class="container py-5 bg-light">
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
                                    <th class="text-end">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tênis Runner X</td>
                                    <td>RUN-001</td>
                                    <td>R$ 199,90</td>
                                    <td>
                                        <span class="badge bg-success-subtle text-success rounded-pill px-3">
                                            Ativo
                                        </span>
                                    </td>
                                    <td class="text-end">
                                        <button class="btn btn-primary btn-sm me-2">Editar</button>
                                        <button class="btn btn-danger btn-sm">Excluir</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Camiseta Premium</td>
                                    <td>CAM-045</td>
                                    <td>R$ 89,90</td>
                                    <td>
                                        <span class="badge bg-success-subtle text-success rounded-pill px-3">
                                            Ativo
                                        </span>
                                    </td>
                                    <td class="text-end">
                                        <button class="btn btn-primary btn-sm me-2">Editar</button>
                                        <button class="btn btn-danger btn-sm">Excluir</button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>Jaqueta Corta Vento</td>
                                    <td>JKT-332</td>
                                    <td>R$ 249,90</td>
                                    <td>
                                        <span class="badge bg-danger-subtle text-danger rounded-pill px-3">
                                            Inativo
                                        </span>
                                    </td>
                                    <td class="text-end">
                                        <button class="btn btn-primary btn-sm me-2">Editar</button>
                                        <button class="btn btn-danger btn-sm">Excluir</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}
