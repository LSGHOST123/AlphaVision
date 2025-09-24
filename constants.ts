import { Asset, ChartDataPoint } from './types';

const generateChartData = (basePrice: number, days: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      price: parseFloat(currentPrice.toFixed(2)),
    });
    // Use a smaller fluctuation for more realistic daily changes in the historical chart
    const change = (Math.random() - 0.48) * (basePrice / 25);
    currentPrice += change;
    if (currentPrice < 0) currentPrice = 0.1; // Prevent negative prices
  }
  return data;
};

const getBaseCurrency = (symbol: string): 'BRL' | 'USD' => {
  if (/\d$/.test(symbol) && symbol !== 'AURA33' && symbol !== 'G2DI33' && symbol !== 'INBR32') {
     return 'BRL';
  }
  if (symbol.includes('/BRL')) {
    return 'BRL';
  }
  return 'USD';
};

const MOCK_ASSETS_BASE: Asset[] = [
  {
    id: 'ibovespa',
    name: 'Ibovespa',
    symbol: 'IBOV',
    price: 121635.00,
    baseCurrency: 'BRL',
    change: 0,
    changePercent: 0,
    chartData: generateChartData(121635.00, 30),
    logo: 'https://img.icons8.com/color/48/brazil.png',
    profile: 'O Índice Bovespa é o principal indicador de desempenho das ações negociadas na B3 e reflete o comportamento dos principais papéis do mercado acionário brasileiro.',
    news: [],
  },
  {
    id: 's&p500',
    name: 'S&P 500',
    symbol: 'SPX',
    price: 5447.87,
    baseCurrency: 'USD',
    change: 0,
    changePercent: 0,
    chartData: generateChartData(5447.87, 30),
    logo: 'https://img.icons8.com/color/48/usa.png',
    profile: 'O S&P 500 é um índice composto por 500 das maiores empresas de capital aberto listadas nas bolsas de valores dos Estados Unidos. É um dos indicadores mais comuns para o mercado de ações dos EUA.',
    news: [],
  },
  {
    id: 'dowjones',
    name: 'Dow Jones',
    symbol: 'DJI',
    price: 39112.16,
    baseCurrency: 'USD',
    change: 0,
    changePercent: 0,
    chartData: generateChartData(39112.16, 30),
    logo: 'https://img.icons8.com/office/48/parse-from-clipboard.png',
    profile: 'O Dow Jones Industrial Average é um índice que mede o desempenho das ações de 30 das maiores empresas de capital aberto dos Estados Unidos.',
    news: [],
  },
  {
    id: 'nasdaq',
    name: 'Nasdaq Composite',
    symbol: 'IXIC',
    price: 17717.65,
    baseCurrency: 'USD',
    change: 0,
    changePercent: 0,
    chartData: generateChartData(17717.65, 30),
    logo: 'https://img.icons8.com/fluency/48/nasdaq.png',
    profile: 'O Nasdaq Composite é um índice do mercado de ações das ações ordinárias e títulos semelhantes listados na bolsa de valores NASDAQ. É fortemente ponderado para empresas de tecnologia da informação.',
    news: [],
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 61850.00,
    baseCurrency: getBaseCurrency('BTC'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(61850.00, 30),
    logo: 'https://img.icons8.com/fluency/48/bitcoin.png',
    profile: 'Bitcoin é uma criptomoeda descentralizada e um sistema de pagamento online. É a primeira moeda digital descentralizada, pois o sistema funciona sem um banco central ou administrador único.',
    news: [
      { title: 'Reguladores globais propõem novas regras para exposição de bancos a criptoativos', source: 'Reuters', date: '2024-07-25', url: '#' },
      { title: 'Adoção de Bitcoin como meio de pagamento cresce em El Salvador', source: 'Bloomberg', date: '2024-07-24', url: '#' },
    ]
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3390.00,
    baseCurrency: getBaseCurrency('ETH'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(3390.00, 30),
    logo: 'https://img.icons8.com/fluency/48/ethereum.png',
    profile: 'Ethereum é uma plataforma descentralizada que executa contratos inteligentes: aplicativos que funcionam exatamente como programado, sem qualquer possibilidade de tempo de inatividade, censura, fraude ou interferência de terceiros.',
    news: []
  },
  {
    id: 'petrobras',
    name: 'Petrobras',
    symbol: 'PETR4',
    price: 38.80,
    baseCurrency: getBaseCurrency('PETR4'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(38.80, 30),
    logo: 'https://img.icons8.com/color/48/gas-station.png',
    profile: 'A Petrobras é uma empresa de capital aberto, cujo acionista majoritário é o Governo do Brasil. Atua como uma empresa de energia nos setores de exploração e produção, refino, comercialização e transporte de óleo e gás natural.',
    news: [
      { title: 'Petrobras anuncia novo plano de investimentos em energias renováveis', source: 'Valor Econômico', date: '2024-07-25', url: '#' },
      { title: 'Produção no pré-sal atinge novo recorde no segundo trimestre', source: 'InfoMoney', date: '2024-07-24', url: '#' },
    ]
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Corp',
    symbol: 'NVDA',
    price: 126.09,
    baseCurrency: getBaseCurrency('NVDA'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(126.09, 30),
    logo: 'https://img.icons8.com/color/48/nvidia.png',
    profile: 'A NVIDIA Corporation é uma empresa multinacional de tecnologia que projeta unidades de processamento gráfico (GPUs) para os mercados de jogos e profissionais, bem como sistemas em um chip (SoCs) para o mercado de computação móvel e automotivo.',
    news: [
      { title: 'NVIDIA revela nova arquitetura de GPU com foco em Inteligência Artificial', source: 'The Verge', date: '2024-07-22', url: '#' },
    ]
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: 209.75,
    baseCurrency: getBaseCurrency('AAPL'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(209.75, 30),
    logo: 'https://img.icons8.com/ios-filled/50/mac-os.png',
    profile: 'A Apple Inc. é uma empresa multinacional de tecnologia americana que projeta, desenvolve e vende eletrônicos de consumo, software de computador e serviços online. É conhecida por produtos como o iPhone, iPad, Mac, Apple Watch e Apple TV.',
    news: [
        { title: 'Apple anuncia data de lançamento para o novo iPhone', source: 'TechCrunch', date: '2024-07-26', url: '#' },
    ]
  },
  {
    id: 'magalu',
    name: 'Magazine Luiza',
    symbol: 'MGLU3',
    price: 11.50,
    baseCurrency: getBaseCurrency('MGLU3'),
    change: 0,
    changePercent: 0,
    chartData: generateChartData(11.50, 30),
    logo: 'https://img.icons8.com/color/48/shopping-bag--v1.png',
    profile: 'O Magazine Luiza é uma das maiores redes varejistas do Brasil, com forte presença no comércio eletrônico. A empresa oferece uma vasta gama de produtos, desde eletrônicos e móveis até itens de moda e beleza.',
    news: [
        { title: 'Magazine Luiza expande serviço de entrega para novas cidades', source: 'Exame', date: '2024-07-19', url: '#' },
    ]
  },
  { id: 'tesla', name: 'Tesla, Inc.', symbol: 'TSLA', price: 231.20, baseCurrency: getBaseCurrency('TSLA'), change: 0, changePercent: 0, chartData: generateChartData(231.20, 30), logo: 'https://img.icons8.com/fluency/48/tesla-logo.png', profile: 'A Tesla, Inc. é uma empresa automotiva e de energia americana com sede em Austin, Texas. Ela projeta e fabrica carros elétricos, armazenamento de energia de bateria de escala residencial a escala de rede, painéis solares e telhas solares, e produtos e serviços relacionados.', news: [] },
  { id: 'dollar', name: 'Dólar Americano', symbol: 'USD/BRL', price: 5.56, baseCurrency: getBaseCurrency('USD/BRL'), change: 0, changePercent: 0, chartData: generateChartData(5.56, 30), logo: 'https://img.icons8.com/fluency/48/us-dollar-circled.png', profile: 'O Dólar Americano é a moeda oficial dos Estados Unidos e de vários outros países. O par de moedas USD/BRL representa a taxa de câmbio entre o Dólar e o Real Brasileiro.', news: [] },
  { id: 'vale', name: 'Vale S.A.', symbol: 'VALE3', price: 61.50, baseCurrency: getBaseCurrency('VALE3'), change: 0, changePercent: 0, chartData: generateChartData(61.50, 30), logo: 'https://img.icons8.com/color/48/mining-cart.png', profile: 'A Vale S.A. é uma mineradora multinacional brasileira e uma das maiores operadoras de logística do país. É a maior produtora de minério de ferro, pelotas e níquel.', news: [] },
  { id: 'itau', name: 'Itaú Unibanco', symbol: 'ITUB4', price: 32.70, baseCurrency: getBaseCurrency('ITUB4'), change: 0, changePercent: 0, chartData: generateChartData(32.70, 30), logo: 'https://img.icons8.com/color/48/itau.png', profile: 'O Itaú Unibanco é o maior banco privado do Brasil, com sede em São Paulo. O banco oferece uma gama completa de serviços financeiros para clientes individuais e corporativos.', news: [] },
  { id: 'b3', name: 'B3 S.A.', symbol: 'B3SA3', price: 10.50, baseCurrency: getBaseCurrency('B3SA3'), change: 0, changePercent: 0, chartData: generateChartData(10.50, 30), logo: 'https://img.icons8.com/fluency/48/b3.png', profile: 'A B3 (Brasil, Bolsa, Balcão) é a bolsa de valores oficial do Brasil, sediada na cidade de São Paulo. É uma das maiores bolsas de valores do mundo em valor de mercado.', news: [] },
  { id: 'ambev', name: 'Ambev S.A.', symbol: 'ABEV3', price: 11.90, baseCurrency: getBaseCurrency('ABEV3'), change: 0, changePercent: 0, chartData: generateChartData(11.90, 30), logo: 'https://img.icons8.com/color/48/beer.png', profile: 'A Ambev é uma empresa brasileira dedicada à produção de bebidas, incluindo cervejas, refrigerantes, energéticos, sucos, chás e água. É a maior cervejaria da América Latina.', news: [] },
  { id: 'microsoft', name: 'Microsoft Corp.', symbol: 'MSFT', price: 430.50, baseCurrency: getBaseCurrency('MSFT'), change: 0, changePercent: 0, chartData: generateChartData(430.50, 30), logo: 'https://img.icons8.com/color/48/microsoft.png', profile: 'A Microsoft Corporation é uma empresa multinacional americana de tecnologia com sede em Redmond, Washington. Ela desenvolve, fabrica, licencia, apoia e vende softwares de computador, eletrônicos de consumo e computadores pessoais e serviços.', news: [] },
  { id: 'amazon', name: 'Amazon.com, Inc.', symbol: 'AMZN', price: 181.90, baseCurrency: getBaseCurrency('AMZN'), change: 0, changePercent: 0, chartData: generateChartData(181.90, 30), logo: 'https://img.icons8.com/color/48/amazon.png', profile: 'A Amazon.com, Inc. é uma empresa multinacional de tecnologia americana focada em e-commerce, computação em nuvem, streaming digital e inteligência artificial. É uma das cinco grandes empresas de tecnologia da informação dos EUA.', news: [] },
  { 
    id: 'google', 
    name: 'Alphabet Inc.', 
    symbol: 'GOOGL', 
    price: 247.70,
    baseCurrency: getBaseCurrency('GOOGL'), 
    change: 0, 
    changePercent: 0, 
    chartData: generateChartData(247.70, 30), 
    logo: 'https://img.icons8.com/color/48/google-logo.png', 
    profile: 'A Alphabet Inc. é uma holding e conglomerado de tecnologia multinacional americana com sede em Mountain View, Califórnia. Foi criada através de uma reestruturação corporativa do Google em 2 de outubro de 2015 e tornou-se a empresa-mãe do Google e de várias antigas subsidiárias do Google.', 
    news: [
      { title: 'Alphabet supera estimativas de receita com crescimento de busca e nuvem', source: 'Reuters', date: '2024-07-28', url: '#' },
      { title: 'Google anuncia novas funcionalidades de IA para o Workspace', source: 'The Verge', date: '2024-07-25', url: '#' },
    ]
  },
  { id: 'euro', name: 'Euro', symbol: 'EUR/BRL', price: 5.98, baseCurrency: getBaseCurrency('EUR/BRL'), change: 0, changePercent: 0, chartData: generateChartData(5.98, 30), logo: 'https://img.icons8.com/fluency/48/euro-money-circulation.png', profile: 'O Euro é a moeda oficial de 20 dos 27 estados-membros da União Europeia. O par EUR/BRL representa a taxa de câmbio entre o Euro e o Real Brasileiro.', news: [] },
];

const userStockSymbols = [ 'AERI3', 'AFLT3', 'AGXY3', 'RPAD3', 'RPAD5', 'RPAD6', 'AALR3', 'ALLD3', 'ALOS3', 'ALPK3', 'ALPA3', 'ALPA4', 'AVLL3', 'ALUP3', 'ALUP4', 'ALUP11', 'AMBP3', 'AMER3', 'CBEE3', 'ANIM3', 'BVMF:AAPL34', 'ARML3', 'CRFB3', 'ATMP3', 'AURA33', 'AURE3', 'AMOB3', 'AZEV3', 'AZEV4', 'AZUL4', 'AZZA3', 'ABCB4', 'BMGB4', 'BBDC3', 'BBDC4', 'BPAC3', 'BPAC5', 'BPAC11', 'BAZA3', 'BBAS3', 'BGIP3', 'BGIP4', 'BPAR3', 'BRSR3', 'BRSR5', 'BRSR6', 'BNBR3', 'BMIN3', 'BMIN4', 'BMEB3', 'BMEB4', 'BPAN4', 'PINE3', 'PINE4', 'SANB3', 'SANB4', 'SANB11', 'BEES3', 'BEES4', 'BDLL3', 'BDLL4', 'BALM3', 'BALM4', 'BBSE3', 'BMOB3', 'BMKS3', 'BIOM3', 'BLAU3', 'SOJA3', 'BOBR4', 'BRBI11', 'BVMF:BBDC4', 'BRAP3', 'BRAP4', 'AGRO3', 'BRKM3', 'BRKM5', 'BRKM6', 'BRAV3', 'BSLI3', 'BSLI4', 'BRFS3', 'BRST3', 'CEAB3', 'CXSE3', 'BVMF:CXSE3', 'CAMB3', 'CAML3', 'CCRO3', 'MAPT3', 'MAPT4', 'ELET3', 'ELET5', 'ELET6', 'CLSC3', 'CLSC4', 'CLSA3', 'VVEO3', 'COGN3', 'CBAV3', 'PCAR3', 'CASN3', 'GPAR3', 'SBSP3', 'CEDO3', 'CEDO4', 'FESA3', 'FESA4', 'CGAS3', 'CGAS5', 'CEEB3', 'CEEB5', 'PEAB3', 'PEAB4', 'CSMG3', 'SAPR3', 'SAPR4', 'SAPR11', 'CTNM3', 'CTNM4', 'CEGR3', 'CEBR3', 'CEBR5', 'CEBR6', 'COCE3', 'COCE5', 'CEED3', 'HBTS5', 'MSPA3', 'MSPA4', 'CPLE3', 'CPLE5', 'CPLE6', 'CSNA3', 'CTSA3', 'CTSA4', 'ODER4', 'CALI3', 'TEND3', 'CSAN3', 'CPFE3', 'CRPG5', 'CRPG6', 'CSED3', 'CMIN3', 'CSUD3', 'CURY3', 'CVCB3', 'BVMF:CVCB3', 'CYRE3', 'DMVF3', 'DESK3', 'DXCO3', 'DEXP3', 'DEXP4', 'DASA3', 'PNVL3', 'DIRR3', 'DOHL3', 'DOHL4', 'DOTZ3', 'DTCY3', 'ECOR3', 'EALT3', 'EALT4', 'EKTR4', 'LIPR3', 'ELMD3', 'EMAE3', 'EMAE4', 'EPAR3', 'EMBR3', 'PGMN3', 'ENMT3', 'ENMT4', 'ENGI3', 'ENGI4', 'ENGI11', 'CMIG3', 'CMIG4', 'ENEV3', 'EGIE3', 'ENJU3', 'EQPA3', 'EQPA6', 'EQPA5', 'EQTL3', 'ETER3', 'EUCA3', 'EUCA4', 'EVEN3', 'BAUH4', 'EZTC3', 'FHER3', 'FIEI3', 'FLRY3', 'FRAS3', 'G2DI33', 'GFSA3', 'GSHP3', 'GGBR3', 'GGBR4', 'GOLL4', 'GPIV33', 'GGPS3', 'CGRA3', 'CGRA4', 'GRND3', 'BHIA3', 'GMAT3', 'SBFG3', 'GUAR3', 'HAGA3', 'HAGA4', 'HAPV3', 'HBRE3', 'HBOR3', 'HETA4', 'HBSA3', 'MATD3', 'HOOT4', 'HYPE3', 'INDEXBVMF:IBOV', 'IGTI3', 'IGTI4', 'IGTI11', 'INEP3', 'INEP4', 'IFCM3', 'INTB3', 'INBR32', 'MEAL3', 'FIGE3', 'MYPK3', 'RANI3', 'IRBR3', 'ISAE3', 'ISAE4', 'ITUB3', 'BVMF:ITUB4', 'ITSA3', 'ITSA4', 'JALL3', 'JBSS3', 'JHSF3', 'JFEN3', 'JOPA3', 'JOPA4', 'JSLG3', 'CTKA3', 'CTKA4', 'KEPL3', 'KLBN3', 'KLBN4', 'KLBN11', 'KRSA3', 'LAVV3', 'LIGT3', 'LVTC3', 'RENT3', 'LOGG3', 'LOGN3', 'LJQQ3', 'LREN3', 'LPSB3', 'LUPA3', 'LWSA3', 'MDIA3', 'BVMF:MGLU3', 'LEVE3', 'MGEL4', 'ESTR3', 'ESTR4', 'POMO3', 'POMO4', 'MRFG3', 'AMAR3', 'CASH3', 'MELK3', 'MERC4', 'FRIO3', 'GOAU3', 'GOAU4', 'RSUL4', 'MTSA3', 'MTSA4', 'BVMF:MSFT34', 'MILS3', 'BEEF3', 'MNPR3', 'MTRE3', 'MBLY3', 'MOAR3', 'MDNE3', 'MOVI3', 'ESPA3', 'MRSA5B', 'MRSA6B', 'MRSA3B', 'MRVE3', 'MLAS3', 'MULT3', 'MNDL3', 'NTCO3', 'NEOE3', 'NGRD3', 'BVMF:NFLX34', 'NEXP3', 'NORD3', 'NUTR3', 'OPCT3', 'ODPV3', 'OIBR3', 'OIBR4', 'ONCO3', 'ORVR3', 'OSXB3', 'OFSA3', 'PDTC3', 'PATI3', 'PATI4', 'PMAM3', 'PTBL3', 'PDGR3', 'PETZ3', 'BVMF:PETR4', 'RECV3', 'BVMF:RECV3', 'PTNT3', 'PTNT4', 'PLPL3', 'PLAS3', 'PSSA3', 'POSI3', 'PPLA11', 'PRNR3', 'PRIO3', 'PFRM3', 'QUAL3', 'RADL3', 'RAIZ4', 'RAPT3', 'RAPT4', 'RCSL3', 'RCSL4', 'RDOR3', 'REDE3', 'RPMG3', 'BVMF:LREN3', 'RNEW3', 'RNEW4', 'RNEW11', 'GEPA3', 'GEPA4', 'RDNI3', 'ROMI3', 'RSID3', 'RAIL3', 'SNSY3', 'SNSY5', 'SNSY6', 'BVMF:SANB11', 'STBP3', 'SCAR3', 'SMTO3', 'AHEB5', 'AHEB6', 'AHEB3', 'SHUL4', 'ASAI3', 'SEQL3', 'SEER3', 'SRNA3', 'SIMH3', 'SLCE3', 'SMFT3', 'SOND5', 'SOND6', 'SGPS3', 'SUZB3', 'SYNE3', 'SHOW3', 'TASA3', 'TASA4', 'TRAD3', 'TECN3', 'TCSA3', 'TGMA3', 'TEKA3', 'TEKA4', 'TKNO3', 'TKNO4', 'TELB3', 'TELB4', 'VIVT3', 'LAND3', 'TXRX3', 'TXRX4', 'TIMS3', 'TOTS3', 'TPIS3', 'TFCO4', 'TAEE3', 'TAEE4', 'TAEE11', 'TTEN3', 'LUXM4', 'TRIS3', 'CRPG3', 'TUPY3', 'UGPA3', 'UCAS3', 'FIQE3', 'UNIP3', 'UNIP5', 'UNIP6', 'USIM3', 'USIM5', 'USIM6', 'VLID3', 'VAMO3', 'VSTE3', 'VBBR3', 'VTRU3', 'VITT3', 'VIVA3', 'VIVR3', 'VULC3', 'WEGE3', 'WEST3', 'MWET3', 'MWET4', 'WHRL3', 'WHRL4', 'PORT3', 'WIZC3', 'WLMM3', 'WLMM4', 'YDUQ3', 'ZAMP3', 'PETR3' ];
const stockNames: { [key: string]: string } = { 'AERI3': 'Aeris Energy', 'AFLT3': 'Afluente Energia', 'AGXY3': 'AgroGalaxy', 'RPAD3': 'Alfa Holdings', 'RPAD5': 'Alfa Holdings', 'RPAD6': 'Alfa Holdings', 'AALR3': 'Alliar', 'ALLD3': 'Allied', 'ALOS3': 'Allos', 'ALPK3': 'Estapar', 'ALPA3': 'Alpargatas', 'ALPA4': 'Alpargatas', 'AVLL3': 'Alphaville', 'ALUP3': 'Alupar', 'ALUP4': 'Alupar', 'ALUP11': 'Alupar', 'AMBP3': 'Ambipar', 'AMER3': 'Americanas', 'CBEE3': 'CBA Energia', 'ANIM3': 'Ânima Educação', 'BVMF:AAPL34': 'Apple BDR', 'ARML3': 'Armac', 'CRFB3': 'Carrefour Brasil', 'ATMP3': 'Atma', 'AURA33': 'Aura Minerals BDR', 'AURE3': 'Auren Energia', 'AMOB3': 'Automob', 'AZEV3': 'Azevedo & Travassos', 'AZEV4': 'Azevedo & Travassos', 'AZUL4': 'Azul', 'AZZA3': 'Azza', 'ABCB4': 'Banco ABC Brasil', 'BMGB4': 'Banco BMG', 'BBDC3': 'Bradesco', 'BBDC4': 'Bradesco', 'BPAC3': 'BTG Pactual', 'BPAC5': 'BTG Pactual', 'BPAC11': 'BTG Pactual', 'BAZA3': 'Banco da Amazônia', 'BBAS3': 'Banco do Brasil', 'BGIP3': 'Banrisul Armazéns', 'BGIP4': 'Banrisul Armazéns', 'BPAR3': 'Banpará', 'BRSR3': 'Banrisul', 'BRSR5': 'Banrisul', 'BRSR6': 'Banrisul', 'BNBR3': 'Banco do Nordeste', 'BMIN3': 'Banco Mercantil', 'BMIN4': 'Banco Mercantil', 'BMEB3': 'Banco Mercantil', 'BMEB4': 'Banco Mercantil', 'BPAN4': 'Banco Pan', 'PINE3': 'Banco Pine', 'PINE4': 'Banco Pine', 'SANB3': 'Santander Brasil', 'SANB4': 'Santander Brasil', 'SANB11': 'Santander Brasil', 'BEES3': 'Banestes', 'BEES4': 'Banestes', 'BDLL3': 'BRB Banco', 'BDLL4': 'BRB Banco', 'BALM3': 'Baumer', 'BALM4': 'Baumer', 'BBSE3': 'BB Seguridade', 'BMOB3': 'Bemobi', 'BMKS3': 'Monark', 'BIOM3': 'Biomm', 'BLAU3': 'Blau Farmacêutica', 'SOJA3': 'Boa Safra', 'BOBR4': 'Bombril', 'BRBI11': 'Brasil Brokers', 'BVMF:BBDC4': 'Bradesco BDR', 'BRAP3': 'Bradespar', 'BRAP4': 'Bradespar', 'AGRO3': 'BrasilAgro', 'BRKM3': 'Braskem', 'BRKM5': 'Braskem', 'BRKM6': 'Braskem', 'BRAV3': 'Bravia', 'BSLI3': 'BRB', 'BSLI4': 'BRB', 'BRFS3': 'BRF', 'BRST3': 'Braskem', 'CEAB3': 'C&A Modas', 'CXSE3': 'Caixa Seguridade', 'BVMF:CXSE3': 'Caixa Seguridade BDR', 'CAMB3': 'Cambuci', 'CAML3': 'Camil Alimentos', 'CCRO3': 'CCR', 'MAPT3': 'Cemepe', 'MAPT4': 'Cemepe', 'ELET3': 'Eletrobras', 'ELET5': 'Eletrobras', 'ELET6': 'Eletrobras', 'CLSC3': 'Celesc', 'CLSC4': 'Celesc', 'CLSA3': 'Clearsale', 'VVEO3': 'Viveo', 'COGN3': 'Cogna Educação', 'CBAV3': 'CBA', 'PCAR3': 'Pão de Açúcar', 'CASN3': 'Cascan', 'GPAR3': 'Celgpar', 'SBSP3': 'Sabesp', 'CEDO3': 'Cedro Têxtil', 'CEDO4': 'Cedro Têxtil', 'FESA3': 'Ferbasa', 'FESA4': 'Ferbasa', 'CGAS3': 'Comgás', 'CGAS5': 'Comgás', 'CEEB3': 'Coelba', 'CEEB5': 'Coelba', 'PEAB3': 'Celpe', 'PEAB4': 'Celpe', 'CSMG3': 'Copasa', 'SAPR3': 'Sanepar', 'SAPR4': 'Sanepar', 'SAPR11': 'Sanepar', 'CTNM3': 'Coteminas', 'CTNM4': 'Coteminas', 'CEGR3': 'CEG', 'CEBR3': 'CEB', 'CEBR5': 'CEB', 'CEBR6': 'CEB', 'COCE3': 'Coelce', 'COCE5': 'Coelce', 'CEED3': 'CEEE-D', 'HBTS5': 'Habitasul', 'MSPA3': 'Sondotécnica', 'MSPA4': 'Sondotécnica', 'CPLE3': 'Copel', 'CPLE5': 'Copel', 'CPLE6': 'Copel', 'CSNA3': 'CSN', 'CTSA3': 'Santanense', 'CTSA4': 'Santanense', 'ODER4': 'Oderich', 'CALI3': 'A.L. Inc.', 'TEND3': 'Tenda', 'CSAN3': 'Cosan', 'CPFE3': 'CPFL Energia', 'CRPG5': 'Cristal', 'CRPG6': 'Cristal', 'CSED3': 'Cruzeiro do Sul', 'CMIN3': 'CSN Mineração', 'CSUD3': 'CSU', 'CURY3': 'Cury', 'CVCB3': 'CVC Brasil', 'BVMF:CVCB3': 'CVC Brasil BDR', 'CYRE3': 'Cyrela', 'DMVF3': 'd1000 Varejo Farma', 'DESK3': 'Desktop', 'DXCO3': 'Dexco', 'DEXP3': 'Dexxos', 'DEXP4': 'Dexxos', 'DASA3': 'Dasa', 'PNVL3': 'Panvel', 'DIRR3': 'Direcional', 'DOHL3': 'Döhler', 'DOHL4': 'Döhler', 'DOTZ3': 'Dotz', 'DTCY3': 'Traders Club', 'ECOR3': 'Ecorodovias', 'EALT3': 'Electro Aço Altona', 'EALT4': 'Electro Aço Altona', 'EKTR4': 'Elektro', 'LIPR3': 'Eletropar', 'ELMD3': 'Eletromidia', 'EMAE3': 'EMAE', 'EMAE4': 'EMAE', 'EPAR3': 'Embpar', 'EMBR3': 'Embraer', 'PGMN3': 'Pague Menos', 'ENMT3': 'Energisa MT', 'ENMT4': 'Energisa MT', 'ENGI3': 'Energisa', 'ENGI4': 'Energisa', 'ENGI11': 'Energisa', 'CMIG3': 'Cemig', 'CMIG4': 'Cemig', 'ENEV3': 'Eneva', 'EGIE3': 'Engie Brasil', 'ENJU3': 'Enjoei', 'EQPA3': 'Equatorial PA', 'EQPA5': 'Equatorial PA', 'EQPA6': 'Equatorial PA', 'EQTL3': 'Equatorial Energia', 'ETER3': 'Eternit', 'EUCA3': 'Eucatex', 'EUCA4': 'Eucatex', 'EVEN3': 'Even', 'BAUH4': 'Excelsior', 'EZTC3': 'EZTEC', 'FHER3': 'Fert. Heringer', 'FIEI3': 'Fidelidade', 'FLRY3': 'Fleury', 'FRAS3': 'Fras-le', 'G2DI33': 'G2D BDR', 'GFSA3': 'Gafisa', 'GSHP3': 'General Shopping', 'GGBR3': 'Gerdau', 'GGBR4': 'Gerdau', 'GOLL4': 'GOL', 'GPIV33': 'GP Investments BDR', 'GGPS3': 'GPS', 'CGRA3': 'Grazziotin', 'CGRA4': 'Grazziotin', 'GRND3': 'Grendene', 'BHIA3': 'Casas Bahia', 'GMAT3': 'Grupo Mateus', 'SBFG3': 'Grupo SBF', 'GUAR3': 'Guararapes', 'HAGA3': 'Haga', 'HAGA4': 'Haga', 'HAPV3': 'Hapvida', 'HBRE3': 'HBR Realty', 'HBOR3': 'Helbor', 'HETA4': 'Hercules', 'HBSA3': 'Hidrovias do Brasil', 'MATD3': 'Mater Dei', 'HOOT4': 'Hotéis Othon', 'HYPE3': 'Hypera', 'INDEXBVMF:IBOV': 'Ibovespa', 'IGTI3': 'Iguatemi', 'IGTI4': 'Iguatemi', 'IGTI11': 'Iguatemi', 'INEP3': 'Inepar', 'INEP4': 'Inepar', 'IFCM3': 'Infracommerce', 'INTB3': 'Intelbras', 'INBR32': 'Inter & Co BDR', 'MEAL3': 'IMC', 'FIGE3': 'Investbens', 'MYPK3': 'Iochpe-Maxion', 'RANI3': 'Irani', 'IRBR3': 'IRB Brasil RE', 'ISAE3': 'ISA CTEEP', 'ISAE4': 'ISA CTEEP', 'ITUB3': 'Itaú Unibanco', 'BVMF:ITUB4': 'Itaú Unibanco BDR', 'ITSA3': 'Itaúsa', 'ITSA4': 'Itaúsa', 'JALL3': 'Jalles Machado', 'JBSS3': 'JBS', 'JHSF3': 'JHSF', 'JFEN3': 'João Fortes', 'JOPA3': 'Josapar', 'JOPA4': 'Josapar', 'JSLG3': 'JSL', 'CTKA3': 'Karsten', 'CTKA4': 'Karsten', 'KEPL3': 'Kepler Weber', 'KLBN3': 'Klabin', 'KLBN4': 'Klabin', 'KLBN11': 'Klabin', 'KRSA3': 'Kora Saúde', 'LAVV3': 'Lavvi', 'LIGT3': 'Light', 'LVTC3': 'WDC Networks', 'RENT3': 'Localiza', 'LOGG3': 'Log-In', 'LOGN3': 'Log-In', 'LJQQ3': 'Lojas Quero-Quero', 'LREN3': 'Lojas Renner', 'LPSB3': 'Lopes', 'LUPA3': 'Lupatech', 'LWSA3': 'Locaweb', 'MDIA3': 'M. Dias Branco', 'BVMF:MGLU3': 'Magazine Luiza BDR', 'LEVE3': 'Metal Leve', 'MGEL4': 'Mangels', 'ESTR3': 'Marcopolo', 'ESTR4': 'Marcopolo', 'POMO3': 'Marcopolo', 'POMO4': 'Marcopolo', 'MRFG3': 'Marfrig', 'AMAR3': 'Marisa', 'CASH3': 'Méliuz', 'MELK3': 'Melnick', 'MERC4': 'Mercantil do Brasil', 'FRIO3': 'Metalfrio', 'GOAU3': 'Metal. Gerdau', 'GOAU4': 'Metal. Gerdau', 'RSUL4': 'Metal. Riosulense', 'MTSA3': 'MTS', 'MTSA4': 'MTS', 'BVMF:MSFT34': 'Microsoft BDR', 'MILS3': 'Mills', 'BEEF3': 'Minerva', 'MNPR3': 'Minupar', 'MTRE3': 'Mitre', 'MBLY3': 'Mobly', 'MOAR3': 'Montecarlos', 'MDNE3': 'Modalmais', 'MOVI3': 'Movida', 'ESPA3': 'Espaçolaser', 'MRSA5B': 'MRS Logística', 'MRSA6B': 'MRS Logística', 'MRSA3B': 'MRS Logística', 'MRVE3': 'MRV', 'MLAS3': 'Multilaser', 'MULT3': 'Multiplan', 'MNDL3': 'Mundial', 'NTCO3': 'Natura &Co', 'NEOE3': 'Neoenergia', 'NGRD3': 'Neogrid', 'BVMF:NFLX34': 'Netflix BDR', 'NEXP3': 'Nexpe', 'NORD3': 'Nordon', 'NUTR3': 'Nutriplant', 'OPCT3': 'Oceanpact', 'ODPV3': 'Odontoprev', 'OIBR3': 'Oi', 'OIBR4': 'Oi', 'ONCO3': 'Oncoclínicas', 'ORVR3': 'Ouro Verde', 'OSXB3': 'OSX Brasil', 'OFSA3': 'Ourofino', 'PDTC3': 'Padtec', 'PATI3': 'Panatlântica', 'PATI4': 'Panatlântica', 'PMAM3': 'Paranapanema', 'PTBL3': 'Portobello', 'PDGR3': 'PDG Realty', 'PETZ3': 'Petz', 'BVMF:PETR4': 'Petrobras BDR', 'RECV3': 'PetroRecôncavo', 'BVMF:RECV3': 'PetroRecôncavo BDR', 'PTNT3': 'Pettenati', 'PTNT4': 'Pettenati', 'PLPL3': 'Plano & Plano', 'PLAS3': 'Plascar', 'PSSA3': 'Porto Seguro', 'POSI3': 'Positivo', 'PPLA11': 'Polo', 'PRNR3': 'Priner', 'PRIO3': 'PetroRio', 'PFRM3': 'Profarma', 'QUAL3': 'Qualicorp', 'RADL3': 'RaiaDrogasil', 'RAIZ4': 'Raízen', 'RAPT3': 'Randon', 'RAPT4': 'Randon', 'RCSL3': 'Recrusul', 'RCSL4': 'Recrusul', 'RDOR3': 'Rede D\'Or', 'REDE3': 'Rede Energia', 'RPMG3': 'Ref. Manguinhos', 'BVMF:LREN3': 'Lojas Renner BDR', 'RNEW3': 'Renova Energia', 'RNEW4': 'Renova Energia', 'RNEW11': 'Renova Energia', 'GEPA3': 'Rio Paranapanema', 'GEPA4': 'Rio Paranapanema', 'RDNI3': 'RNI', 'ROMI3': 'Romi', 'RSID3': 'Rossi Residencial', 'RAIL3': 'Rumo', 'SNSY3': 'Sansuy', 'SNSY5': 'Sansuy', 'SNSY6': 'Sansuy', 'BVMF:SANB11': 'Santander BDR', 'STBP3': 'Santos Brasil', 'SCAR3': 'São Carlos', 'SMTO3': 'São Martinho', 'AHEB5': 'São Paulo Turismo', 'AHEB6': 'São Paulo Turismo', 'AHEB3': 'São Paulo Turismo', 'SHUL4': 'Schulz', 'ASAI3': 'Açaí', 'SEQL3': 'Sequoia', 'SEER3': 'Ser Educacional', 'SRNA3': 'SRNA', 'SIMH3': 'Simpar', 'SLCE3': 'SLC Agrícola', 'SMFT3': 'Smartfit', 'SOND5': 'Sondotécnica', 'SOND6': 'Sondotécnica', 'SGPS3': 'Springs Global', 'SUZB3': 'Suzano', 'SYNE3': 'SYN', 'SHOW3': 'Time For Fun', 'TASA3': 'Taurus', 'TASA4': 'Taurus', 'TRAD3': 'Traders Club', 'TECN3': 'Technos', 'TCSA3': 'Tecnisa', 'TGMA3': 'Tegma', 'TEKA3': 'Teka', 'TEKA4': 'Teka', 'TKNO3': 'Tekno', 'TKNO4': 'Tekno', 'TELB3': 'Telebras', 'TELB4': 'Telebras', 'VIVT3': 'Vivo', 'LAND3': 'Terra Santa', 'TXRX3': 'Têxtil Renaux', 'TXRX4': 'Têxtil Renaux', 'TIMS3': 'TIM', 'TOTS3': 'Totvs', 'TPIS3': 'TPI', 'TFCO4': 'Track & Field', 'TAEE3': 'Taesa', 'TAEE4': 'Taesa', 'TAEE11': 'Taesa', 'TTEN3': '3tentos', 'LUXM4': 'Trisul', 'TRIS3': 'Trisul', 'CRPG3': 'Tronox', 'TUPY3': 'Tupy', 'UGPA3': 'Ultrapar', 'UCAS3': 'Unicasa', 'FIQE3': 'Unifique', 'UNIP3': 'Unipar', 'UNIP5': 'Unipar', 'UNIP6': 'Unipar', 'USIM3': 'Usiminas', 'USIM5': 'Usiminas', 'USIM6': 'Usiminas', 'VLID3': 'Valid', 'VAMO3': 'Vamos', 'VSTE3': 'Veste', 'VBBR3': 'Vibra Energia', 'VTRU3': 'Votorantim', 'VITT3': 'Vittia', 'VIVA3': 'Vivara', 'VIVR3': 'Viver', 'VULC3': 'Vulcabras', 'WEGE3': 'WEG', 'WEST3': 'Westwing', 'MWET3': 'WLM', 'MWET4': 'WLM', 'WHRL3': 'Whirlpool', 'WHRL4': 'Whirlpool', 'PORT3': 'Wilson Sons', 'WIZC3': 'Wiz', 'WLMM3': 'WLM', 'WLMM4': 'WLM', 'YDUQ3': 'Yduqs', 'ZAMP3': 'Zamp (BK)', 'PETR3': 'Petrobras' };

const CORRECTED_PRICES: { [key: string]: number } = {
  // User provided & specific requests
  'AERI3': 4.11,
  'RPAD5': 4.76,
  'RPAD6': 4.76,

  // Existing in old list and confirmed
  'RECV3': 13.16,
  'WEGE3': 38.50,
  'RAIL3': 20.25,
  'SUZB3': 48.70,
  'ITSA4': 10.15,
  'BBDC4': 12.80,
  'BBAS3': 27.00,
  'USIM5': 7.50,
  'GGBR4': 17.80,
  'AZUL4': 4.60,
  'CVCB3': 2.05,
  
  // Newly added plausible prices for major stocks
  'AMER3': 0.42,
  'ASAI3': 11.10,
  'BRFS3': 18.55,
  'CCRO3': 12.10,
  'CMIG4': 11.20,
  'CRFB3': 9.15,
  'CSNA3': 13.05,
  'CYRE3': 19.50,
  'ELET3': 35.50,
  'ELET6': 40.20,
  'EMBR3': 37.80,
  'EQTL3': 30.15,
  'GOLL4': 1.25,
  'HAPV3': 3.85,
  'IRBR3': 31.40,
  'JBSS3': 30.60,
  'KLBN4': 4.50,
  'KLBN11': 20.30,
  'LREN3': 13.20,
  'MULT3': 23.40,
  'NTCO3': 14.50,
  'OIBR3': 0.65,
  'PCAR3': 2.85,
  'PETR3': 40.50,
  'PRIO3': 45.90,
  'QUAL3': 1.75,
  'RADL3': 26.80,
  'RDOR3': 27.20,
  'RENT3': 43.50,
  'SANB11': 28.10,
  'SBSP3': 78.50,
  'TAEE11': 35.20,
  'UGPA3': 25.40,
  'VBBR3': 21.30,
  'VIVT3': 40.80,
  'YDUQ3': 11.30,
};

const baseSymbols = new Set(MOCK_ASSETS_BASE.map(asset => asset.symbol));
const newUniqueSymbols = [...new Set(userStockSymbols)].filter(symbol => !baseSymbols.has(symbol));

const generatedAssets: Asset[] = newUniqueSymbols.map(symbol => {
  // Check for a corrected price first, otherwise generate a random one as a fallback.
  const price = CORRECTED_PRICES[symbol] || Math.random() * (150 - 0.5) + 0.5;
  
  const change = (Math.random() - 0.5) * (price / 15);
  const changePercent = (change / price) * 100;
  const baseCurrency = getBaseCurrency(symbol);

  return {
    id: symbol.toLowerCase().replace(/[:.]/g, '_'),
    name: stockNames[symbol] || symbol,
    symbol: symbol,
    price: parseFloat(price.toFixed(2)),
    baseCurrency,
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    chartData: generateChartData(price, 30),
    logo: 'https://img.icons8.com/office/48/bank-building.png',
    profile: 'Perfil da empresa não disponível no momento.',
    news: [],
  };
});

export const MOCK_ASSETS: Asset[] = [...MOCK_ASSETS_BASE, ...generatedAssets];