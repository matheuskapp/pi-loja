import "./botao_adicionar_produtos.css";


export function BotaoAdicionarProdutos() {
    return (
        <div className="containerBotao mb-3 text-end">

            <div >
                <button
                    type="button"
                    className="btn btn-gradient"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    + Adicionar Produto
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
                                    Novo Produto
                                </h3>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nome"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="SKU"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Preço"
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    {/* w-100 */}
                                    <label className="form-label w-100">
                                        <textarea className="form-control" placeholder="Descrição"></textarea>
                                    </label>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fechar
                                </button>

                                <button
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