export default function BarraPesquisaClientes() {
    return (
        <div className="barradepesquisa mb-3 p-5">
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar Cliente.."
                        />
                        <button
                            className="btn btn-outline-secondary "
                            type="button col-10"
                            id="button-addon2"
                        >
                            🔍
                        </button>
                    </div>
                </div>


            </div>
        </div>

    );
}