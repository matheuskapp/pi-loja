import 'bootstrap/dist/css/bootstrap.min.css'
import "./cadastro_clientes.css"
import BarraLateral from '../components/barra_lateral'

export default function CadastroClientes() {

    const clientes = [
  {
    nome: "Ana Souza",
    cpf: "123.456.789-01",
    telefone: "(11) 98765-4321",
    email: "ana.souza@email.com",
    endereco: "Rua das Flores, 123 - São Paulo/SP"
  },
  {
    nome: "Carlos Pereira",
    cpf: "234.567.890-12",
    telefone: "(21) 99876-5432",
    email: "carlos.pereira@email.com",
    endereco: "Av. Atlântica, 456 - Rio de Janeiro/RJ"
  },
  {
    nome: "Mariana Lima",
    cpf: "345.678.901-23",
    telefone: "(16) 99123-4567",
    email: "mariana.lima@email.com",
    endereco: "Rua XV de Novembro, 789 - São Carlos/SP"
  },
  {
    nome: "João Oliveira",
    cpf: "456.789.012-34",
    telefone: "(31) 99234-5678",
    email: "joao.oliveira@email.com",
    endereco: "Rua Afonso Pena, 101 - Belo Horizonte/MG"
  },
  {
    nome: "Fernanda Costa",
    cpf: "567.890.123-45",
    telefone: "(41) 99345-6789",
    email: "fernanda.costa@email.com",
    endereco: "Rua das Araucárias, 202 - Curitiba/PR"
  },
  {
    nome: "Lucas Martins",
    cpf: "678.901.234-56",
    telefone: "(51) 99456-7890",
    email: "lucas.martins@email.com",
    endereco: "Av. Ipiranga, 303 - Porto Alegre/RS"
  },
  {
    nome: "Juliana Rocha",
    cpf: "789.012.345-67",
    telefone: "(62) 99567-8901",
    email: "juliana.rocha@email.com",
    endereco: "Rua Goiás, 404 - Goiânia/GO"
  },
  {
    nome: "Rafael Almeida",
    cpf: "890.123.456-78",
    telefone: "(71) 99678-9012",
    email: "rafael.almeida@email.com",
    endereco: "Av. Paralela, 505 - Salvador/BA"
  },
  {
    nome: "Patrícia Gomes",
    cpf: "901.234.567-89",
    telefone: "(85) 99789-0123",
    email: "patricia.gomes@email.com",
    endereco: "Rua Beira Mar, 606 - Fortaleza/CE"
  },
  {
    nome: "Bruno Carvalho",
    cpf: "012.345.678-90",
    telefone: "(81) 99890-1234",
    email: "bruno.carvalho@email.com",
    endereco: "Av. Boa Viagem, 707 - Recife/PE"
  },
  {
    nome: "Camila Fernandes",
    cpf: "147.258.369-01",
    telefone: "(19) 99901-2345",
    email: "camila.fernandes@email.com",
    endereco: "Rua Campinas, 808 - Campinas/SP"
  },
  {
    nome: "Eduardo Ribeiro",
    cpf: "258.369.147-02",
    telefone: "(48) 99012-3456",
    email: "eduardo.ribeiro@email.com",
    endereco: "Av. Beira-Mar Norte, 909 - Florianópolis/SC"
  },
  {
    nome: "Larissa Mendes",
    cpf: "369.147.258-03",
    telefone: "(27) 99123-4567",
    email: "larissa.mendes@email.com",
    endereco: "Rua Vitória, 111 - Vitória/ES"
  },
  {
    nome: "Felipe Santos",
    cpf: "741.852.963-04",
    telefone: "(95) 99234-5678",
    email: "felipe.santos@email.com",
    endereco: "Av. Ville Roy, 222 - Boa Vista/RR"
  },
  {
    nome: "Aline Barbosa",
    cpf: "852.963.741-05",
    telefone: "(92) 99345-6789",
    email: "aline.barbosa@email.com",
    endereco: "Rua Amazonas, 333 - Manaus/AM"
  },
  {
    nome: "Gustavo Nunes",
    cpf: "963.741.852-06",
    telefone: "(98) 99456-7890",
    email: "gustavo.nunes@email.com",
    endereco: "Av. Litorânea, 444 - São Luís/MA"
  },
  {
    nome: "Tatiane Duarte",
    cpf: "159.753.486-07",
    telefone: "(83) 99567-8901",
    email: "tatiane.duarte@email.com",
    endereco: "Rua Cabo Branco, 555 - João Pessoa/PB"
  },
  {
    nome: "André Lopes",
    cpf: "357.159.486-08",
    telefone: "(79) 99678-9012",
    email: "andre.lopes@email.com",
    endereco: "Av. Beira Rio, 666 - Aracaju/SE"
  },
  {
    nome: "Bianca Teixeira",
    cpf: "468.357.159-09",
    telefone: "(91) 99789-0123",
    email: "bianca.teixeira@email.com",
    endereco: "Rua Nazaré, 777 - Belém/PA"
  },
  {
    nome: "Rodrigo Azevedo",
    cpf: "579.468.357-10",
    telefone: "(67) 99890-1234",
    email: "rodrigo.azevedo@email.com",
    endereco: "Av. Afonso Pena, 888 - Campo Grande/MS"
  }
];

    

    return (
        <div className="row">
            <div className='col-2'>

                <BarraLateral />

            </div>
            <div className="col-9">

                <div className="container-fluid" />
                <h1>Cadastro de Clientes</h1>




                <div className="titulo" >

                </div>


                <form onsubmit="salvar(event)">


                    <br /> <br />

                    <form>
                        <div class="nomeCompleto">
                            <label class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" />

                        </div>
                        <div class="cpf">
                            <label class="form-label">CPF</label>
                            <input type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="telefone">
                            <label class="form-label">Telefone</label>
                            <input type="number" class="form-control" />
                        </div>
                        <br />
                        <div class="emailSenha">
                            <label class="form-label">E-mail</label>
                            <input type="email" class="form-control" />
                        </div>
                        <br />
                        <div class="endereco">
                            <label class="form-label">Endereço</label>
                            <input class="form-control" />
                        </div>
                        <br />



                        <button type="Salvar" class="btn btn-primary me-3">Salvar</button>
                        <button type="button" class="btn btn-dark">Cancelar</button>

                    </form>

                    <br /><br />

                </form>

            </div>




        </div>


    )
}