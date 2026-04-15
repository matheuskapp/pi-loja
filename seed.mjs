
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://walrpbrbskwawykdrwna.supabase.co',
  'sb_publishable_e6ELe320z3xGITtIk-2QVg_K3tLxQTa'
);

// ============================================================
// CLIENTES - 15 clientes brasileiros realistas
// ============================================================
const clientes = [
  { nome: 'Ana Carolina Ferreira', data_nascimento: '1990-03-15', cpf: '312.456.789-01', telefone: '11987452310', email: 'ana.ferreira@gmail.com', endereco: 'Rua das Palmeiras, 142, Jardim Paulista, São Paulo - SP' },
  { nome: 'Bruno Henrique Matos', data_nascimento: '1985-07-22', cpf: '421.567.890-12', telefone: '11976324801', email: 'b.matos@outlook.com', endereco: 'Av. Brigadeiro Faria Lima, 2320, Apt 84, Itaim Bibi, São Paulo - SP' },
  { nome: 'Camila Rodrigues Souza', data_nascimento: '1995-11-08', cpf: '534.678.901-23', telefone: '16998015522', email: 'camila.souza@hotmail.com', endereco: 'Rua XV de Novembro, 890, Centro, São Carlos - SP' },
  { nome: 'Diego Alves Pereira', data_nascimento: '1988-04-30', cpf: '645.789.012-34', telefone: '16985237740', email: 'diego.alves@empresa.com.br', endereco: 'Rua Conde do Pinhal, 55, Jardim Macarengo, São Carlos - SP' },
  { nome: 'Fernanda Lima Costa', data_nascimento: '1992-09-17', cpf: '756.890.123-45', telefone: '14977149930', email: 'fernanda.lima@gmail.com', endereco: 'Rua João Pessoa, 330, Centro, Bauru - SP' },
  { nome: 'Gabriel Nascimento', data_nascimento: '1998-01-25', cpf: '867.901.234-56', telefone: '11966098821', email: 'gabriel.nascimento@live.com', endereco: 'Rua Augusta, 1500, Consolação, São Paulo - SP' },
  { nome: 'Helena Martins Barbosa', data_nascimento: '1983-06-12', cpf: '978.012.345-67', telefone: '11955873312', email: 'h.martins@gmail.com', endereco: 'Alameda Santos, 770, Apt 32, Cerqueira César, São Paulo - SP' },
  { nome: 'Igor Santos Carvalho', data_nascimento: '1991-12-03', cpf: '089.123.456-78', telefone: '16944762201', email: 'igor.carvalho@hotmail.com', endereco: 'Rua Episcopal, 120, Centro, São Carlos - SP' },
  { nome: 'Juliana Oliveira Gomes', data_nascimento: '1987-08-19', cpf: '190.234.567-89', telefone: '19933651190', email: 'juliana.gomes@usp.br', endereco: 'Rua Barão de Jaguara, 410, Centro, Campinas - SP' },
  { nome: 'Leonardo Castro Pinto', data_nascimento: '1994-02-28', cpf: '201.345.678-90', telefone: '11922540089', email: 'leo.pinto@gmail.com', endereco: 'Rua Oscar Freire, 900, Jardins, São Paulo - SP' },
  { nome: 'Mariana Dias Rocha', data_nascimento: '1996-05-14', cpf: '312.456.789-11', telefone: '16911439978', email: 'mariana.rocha@yahoo.com.br', endereco: 'Rua São Sebastião, 215, Centro, Ribeirão Preto - SP' },
  { nome: 'Nicolas Andrade Luz', data_nascimento: '1993-10-07', cpf: '423.567.890-22', telefone: '11900328867', email: 'nicolas.luz@gmail.com', endereco: 'Av. Paulista, 800, Apt 12, Bela Vista, São Paulo - SP' },
  { nome: 'Patricia Mendes Almeida', data_nascimento: '1989-03-21', cpf: '534.678.901-33', telefone: '16989217756', email: 'patricia.almeida@gmail.com', endereco: 'Rua do Rosário, 78, São Carlos - SP' },
  { nome: 'Rafael Torres Monteiro', data_nascimento: '1997-07-09', cpf: '645.789.012-44', telefone: '19978106645', email: 'rafael.monteiro@outlook.com', endereco: 'Rua Conceição, 300, Centro, Campinas - SP' },
  { nome: 'Sofia Ribeiro Campos', data_nascimento: '1986-11-30', cpf: '756.890.123-55', telefone: '11966995534', email: 'sofia.campos@gmail.com', endereco: 'Rua Haddock Lobo, 1200, Cerqueira César, São Paulo - SP' },
];

// ============================================================
// PRODUTOS - 20 produtos de vestuário/moda profissional
// ============================================================
const produtos = [
  { nome: 'Camiseta Slim Fit Algodão Premium', sku: 'CAM-001', preco: 89.90, quantidade: 120, descricao: 'Camiseta masculina slim fit em algodão 100% penteado. Disponível em branco, preto e cinza.' },
  { nome: 'Calça Jeans Skinny Feminina', sku: 'CAL-001', preco: 179.90, quantidade: 85, descricao: 'Calça jeans skinny feminina com elastano para maior conforto. Modelagem moderna e versátil.' },
  { nome: 'Vestido Midi Floral', sku: 'VES-001', preco: 219.90, quantidade: 60, descricao: 'Vestido midi com estampa floral exclusiva, tecido viscose de alta qualidade. Ideal para o dia a dia.' },
  { nome: 'Blazer Masculino Slim', sku: 'BLZ-001', preco: 399.90, quantidade: 40, descricao: 'Blazer masculino slim em tecido misto. Forro interno, botões dourados e dois bolsos laterais.' },
  { nome: 'Tênis Casual Couro Legítimo', sku: 'TEN-001', preco: 349.90, quantidade: 55, descricao: 'Tênis casual em couro legítimo com solado de borracha antiderrapante. Conforto e estilo.' },
  { nome: 'Moletom Canguru Unissex', sku: 'MOL-001', preco: 159.90, quantidade: 95, descricao: 'Moletom canguru unissex com capuz, bolso frontal e punhos canelados. Tecido fleece macio.' },
  { nome: 'Saia Plissada Midi', sku: 'SAI-001', preco: 149.90, quantidade: 70, descricao: 'Saia plissada midi com cinto incluso. Tecido acetinado de alta qualidade. Várias cores disponíveis.' },
  { nome: 'Camisa Social Oxford Masculina', sku: 'CMI-001', preco: 139.90, quantidade: 100, descricao: 'Camisa social em tecido Oxford, modelagem slim, colarinho clássico. Ideal para ambiente corporativo.' },
  { nome: 'Shorts Esportivo Dryfit', sku: 'SHO-001', preco: 79.90, quantidade: 140, descricao: 'Shorts esportivo em tecido Dryfit com tecnologia de secagem rápida. Elástico e cordão ajustável.' },
  { nome: 'Jaqueta Corta-Vento Impermeável', sku: 'JAQ-001', preco: 289.90, quantidade: 35, descricao: 'Jaqueta corta-vento com impermeabilização e capuz embutido. Leve e compacta para viagens.' },
  { nome: 'Legging Fitness Premium', sku: 'LEG-001', preco: 119.90, quantidade: 110, descricao: 'Legging fitness com cintura alta, tecido compressivo e bolso lateral. Ideal para academia e yoga.' },
  { nome: 'Polo Masculina Piquet', sku: 'POL-001', preco: 109.90, quantidade: 88, descricao: 'Camisa polo masculina em piquet de algodão. Colarinho modelado e botões de madrepérola.' },
  { nome: 'Bolsa Tote Canvas', sku: 'BOL-001', preco: 129.90, quantidade: 50, descricao: 'Bolsa tote em canvas resistente com alças reforçadas. Espaçosa e elegante para o dia a dia.' },
  { nome: 'Cinto Couro Trabalhado', sku: 'CIN-001', preco: 89.90, quantidade: 75, descricao: 'Cinto em couro legítimo com fivela dourada trabalhada. Largura 3,5cm. Unissex.' },
  { nome: 'Conjunto Monocromático Feminino', sku: 'CON-001', preco: 269.90, quantidade: 45, descricao: 'Conjunto calça e blusa cropped em tecido canelado. Modelagem elegante para diversas ocasiões.' },
  { nome: 'Meia Cano Médio Premium Pack', sku: 'MEI-001', preco: 49.90, quantidade: 200, descricao: 'Pack com 3 pares de meias cano médio em algodão premium. Acabamento reforçado no calcanhar.' },
  { nome: 'Calçado Sandália Flatform', sku: 'SAN-001', preco: 199.90, quantidade: 65, descricao: 'Sandália flatform em material sintético premium. Tira ajustável e solado 5cm. Várias cores.' },
  { nome: 'Regata Recortada Fitness', sku: 'REG-001', preco: 69.90, quantidade: 130, descricao: 'Regata recortada em tecido Supplex de alta performance. Design moderno para treinos intensos.' },
  { nome: 'Sobretudo Trench Coat Feminino', sku: 'SOB-001', preco: 459.90, quantidade: 25, descricao: 'Trench coat feminino em gabardine italiano. Cinto ajustável e forro estampado exclusivo.' },
  { nome: 'Bermuda Alfaiataria Masculina', sku: 'BER-001', preco: 149.90, quantidade: 90, descricao: 'Bermuda de alfaiataria masculina com pinças frontais. Elástico interno discreto para conforto.' },
];

// ============================================================
// Utilitários para gerar vendas realistas
// ============================================================
const formasPagamento = ['Pix', 'Cartão de Débito', 'Cartão de Crédito', 'Dinheiro'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================================
// EXECUÇÃO
// ============================================================
async function seed() {
  console.log('🌱 Iniciando seed profissional...\n');

  // --- 1. Limpar tabelas (ordem importa por FK) ---
  console.log('🗑️  Limpando dados existentes...');
  const { error: errVendas } = await supabase.from('vendas').delete().gte('id', 0);
  if (errVendas) console.warn('   ⚠️  Vendas:', errVendas.message);

  const { error: errClientes } = await supabase.from('clientes').delete().gte('id', 0);
  if (errClientes) console.warn('   ⚠️  Clientes:', errClientes.message);

  const { error: errProdutos } = await supabase.from('produtos').delete().gte('id', 0);
  if (errProdutos) console.warn('   ⚠️  Produtos:', errProdutos.message);

  console.log('   ✅ Tabelas limpas!\n');

  // --- 2. Inserir Clientes ---
  console.log('👥 Inserindo clientes...');
  const { data: clientesInseridos, error: errInsClientes } = await supabase
    .from('clientes')
    .insert(clientes)
    .select();

  if (errInsClientes) {
    console.error('   ❌ Erro ao inserir clientes:', errInsClientes.message);
    return;
  }
  console.log(`   ✅ ${clientesInseridos.length} clientes inseridos!\n`);

  // --- 3. Inserir Produtos ---
  console.log('📦 Inserindo produtos...');
  const { data: produtosInseridos, error: errInsProdutos } = await supabase
    .from('produtos')
    .insert(produtos)
    .select();

  if (errInsProdutos) {
    console.error('   ❌ Erro ao inserir produtos:', errInsProdutos.message);
    return;
  }
  console.log(`   ✅ ${produtosInseridos.length} produtos inseridos!\n`);

  // --- 4. Gerar Vendas realistas (30 vendas) ---
  console.log('💰 Gerando vendas...');
  const vendas = [];

  for (let i = 0; i < 30; i++) {
    const clienteAleatorio = randomItem(clientesInseridos);
    const produtoAleatorio = randomItem(produtosInseridos);
    const qtd = randomInt(1, 3);
    const preco = parseFloat(produtoAleatorio.preco);
    const subtotal = preco * qtd;

    // Desconto só em ~30% das vendas (0, 5, 10 ou 15 reais)
    const descontoPossivel = [0, 0, 0, 5, 10, 15];
    const desconto = Math.random() < 0.3 ? randomItem(descontoPossivel.filter(d => d < subtotal)) : 0;
    const total = parseFloat((subtotal - desconto).toFixed(2));

    vendas.push({
      cliente: clienteAleatorio.id,
      produto: produtoAleatorio.id,
      quantidade: qtd,
      desconto: desconto,
      forma_pagamento: randomItem(formasPagamento),
      total_compra: total,
    });
  }

  const { data: vendasInseridas, error: errInsVendas } = await supabase
    .from('vendas')
    .insert(vendas)
    .select();

  if (errInsVendas) {
    console.error('   ❌ Erro ao inserir vendas:', errInsVendas.message);
    return;
  }
  console.log(`   ✅ ${vendasInseridas.length} vendas inseridas!\n`);

  // --- Resumo final ---
  const totalFaturado = vendasInseridas.reduce((acc, v) => acc + parseFloat(v.total_compra || 0), 0);
  console.log('══════════════════════════════════════');
  console.log('🎉 SEED CONCLUÍDO COM SUCESSO!');
  console.log('══════════════════════════════════════');
  console.log(`   👥 Clientes:  ${clientesInseridos.length}`);
  console.log(`   📦 Produtos:  ${produtosInseridos.length}`);
  console.log(`   💰 Vendas:    ${vendasInseridas.length}`);
  console.log(`   💵 Faturado:  R$ ${totalFaturado.toFixed(2).replace('.', ',')}`);
  console.log('══════════════════════════════════════\n');
}

seed().catch(console.error);
