export default function BarraPesquisa() {
    return (
        <div className="barradepesquisa mb-3 p-5">
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar"
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                        >
                            🔍
                        </button>
                    </div>
                </div>

                <div className="col-2"></div>

                <div className="col-4">
                    <select className="form-select" defaultValue="">
                        <option value="" hidden>
                            Filtrar
                        </option>
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>
                </div>
            </div>
        </div>

    );
}