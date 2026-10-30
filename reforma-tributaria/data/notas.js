// Modelos fixos de documentos fiscais simulados, um por ramo do curso.
// Códigos, reduções e documentos permitidos: tabela cClassTrib do Portal DF-e (SVRS),
// consultada em 30/10/2026 (IT 2025.002). Empresas e valores são fictícios.
// Confira sempre a versão vigente da tabela antes de usar um código na prática.

export const TABLE_DATE = '30/10/2026';

export const PRESETS = [
  { id: '2027', label: '2027 · CBS de referência do TCU (11,3%), IBS à escolha', ibs: '0', cbs: '11,3' },
  { id: '2026', label: '2026 · alíquotas de teste (IBS 0,1% · CBS 0,9%)', ibs: '0,1', cbs: '0,9' }
];

export const NOTAS = [
  {
    id: 'clinica', ramo: 'Clínica médica', semana: 5, doc: 'NFS-e',
    emitente: 'Clínica Exemplo Ltda.', destinatario: 'Paciente (pessoa física)',
    comentario: 'Cada item recebe o seu código. A consulta do Anexo III tem redução; a sala alugada e o produto vendido não são consulta.',
    itens: [
      { desc: 'Consulta médica', valor: 1000, cst: '200', cclass: '200029', red: 60, fundamento: 'Serviços de saúde humana (Anexo III) · art. 130' },
      { desc: 'Locação de sala a outro profissional', valor: 1000, cst: '200', cclass: '200027', red: 70, fundamento: 'Locação, cessão onerosa e arrendamento de bens imóveis · art. 261' },
      { desc: 'Venda de item sem hipótese de redução', valor: 200, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' }
    ]
  },
  {
    id: 'obra', ramo: 'Construção civil', semana: 6, doc: 'NFS-e',
    emitente: 'Construtora Exemplo S.A.', destinatario: 'Empresa contratante (regime regular)',
    comentario: 'Medição de obra com o código de operações com bens imóveis; a locação de espaço a terceiro tem outro código.',
    itens: [
      { desc: 'Medição de obra (serviço de construção)', valor: 200000, cst: '200', cclass: '200046', red: 50, fundamento: 'Operações com bens imóveis · art. 261' },
      { desc: 'Locação de espaço do canteiro a terceiro', valor: 5000, cst: '200', cclass: '200027', red: 70, fundamento: 'Locação, cessão onerosa e arrendamento de bens imóveis · art. 261' }
    ]
  },
  {
    id: 'contabilidade', ramo: 'Escritório contábil', semana: 7, doc: 'NFS-e',
    emitente: 'Contabilidade Exemplo Ltda.', destinatario: 'Cliente empresarial',
    comentario: 'A redução de 30% depende dos requisitos do art. 127. O código 200052 só se usa com essa demonstração feita; o serviço fora da lista segue em 000001.',
    itens: [
      { desc: 'Honorários contábeis', valor: 10000, cst: '200', cclass: '200052', red: 30, fundamento: 'Profissões intelectuais · art. 127', nota: 'Exige os requisitos do art. 127.' },
      { desc: 'Consultoria de gestão (fora da lista)', valor: 2000, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' }
    ]
  },
  {
    id: 'holding', ramo: 'Holding', semana: 7, doc: 'NFS-e',
    emitente: 'Holding Exemplo Participações Ltda.', destinatario: 'Empresa controlada',
    comentario: 'Só os fornecimentos viram nota. Dividendos e venda de participação não têm código na tabela e não são documentados em NFS-e.',
    itens: [
      { desc: 'Locação de imóvel à controlada', valor: 12000, cst: '200', cclass: '200027', red: 70, fundamento: 'Locação, cessão onerosa e arrendamento de bens imóveis · art. 261' },
      { desc: 'Serviço de gestão prestado à controlada', valor: 8000, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' }
    ]
  },
  {
    id: 'aluguel', ramo: 'Locação de imóvel', semana: 6, doc: 'NFS-e (com fatura comercial)',
    emitente: 'Locador Exemplo Ltda.', destinatario: 'Locatário (empresa)',
    comentario: 'A fatura de aluguel é cobrança comercial; o documento fiscal é a NFS-e com o código de locação. Confirme com a regra do município como a nota e a fatura se relacionam.',
    itens: [
      { desc: 'Aluguel do mês de referência', valor: 8000, cst: '200', cclass: '200027', red: 70, fundamento: 'Locação, cessão onerosa e arrendamento de bens imóveis · art. 261' }
    ]
  },
  {
    id: 'varejo', ramo: 'Varejo', semana: 8, doc: 'NFC-e',
    emitente: 'Mercado Exemplo Ltda.', destinatario: 'Consumidor final',
    comentario: 'Um cupom com quatro itens, quatro tratamentos. O código acompanha o item, não o cliente nem o departamento.',
    itens: [
      { desc: 'Alimento do Anexo I', valor: 80, cst: '200', cclass: '200003', red: 100, fundamento: 'Alimentação humana (Anexo I) · art. 125' },
      { desc: 'Alimento do Anexo VII', valor: 50, cst: '200', cclass: '200034', red: 60, fundamento: 'Alimentos destinados ao consumo humano (Anexo VII) · art. 135' },
      { desc: 'Produto de limpeza (Anexo VIII)', valor: 30, cst: '200', cclass: '200035', red: 60, fundamento: 'Higiene pessoal e limpeza (Anexo VIII) · art. 136' },
      { desc: 'Item sem hipótese de redução', valor: 20, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' }
    ]
  },
  {
    id: 'atacado', ramo: 'Atacado', semana: 9, doc: 'NF-e',
    emitente: 'Distribuidora Exemplo Ltda.', destinatario: 'Varejista (regime regular)',
    comentario: 'Venda com bonificação no próprio documento. A bonificação que consta na nota e não depende de evento posterior tem código próprio e não gera imposto.',
    itens: [
      { desc: 'Alimento do Anexo I (caixa)', valor: 20000, cst: '200', cclass: '200003', red: 100, fundamento: 'Alimentação humana (Anexo I) · art. 125' },
      { desc: 'Alimento do Anexo VII (caixa)', valor: 15000, cst: '200', cclass: '200034', red: 60, fundamento: 'Alimentos destinados ao consumo humano (Anexo VII) · art. 135' },
      { desc: 'Item sem hipótese de redução', valor: 10000, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' },
      { desc: 'Bonificação constante no documento', valor: 500, cst: '410', cclass: '410001', red: 0, incide: false, fundamento: 'Bonificação sem evento posterior · CST 410' }
    ]
  },
  {
    id: 'industria', ramo: 'Indústria', semana: 10, doc: 'NF-e',
    emitente: 'Indústria Exemplo Ltda.', destinatario: 'Cliente no Brasil e cliente no exterior',
    comentario: 'Mesma indústria, duas saídas. A venda interna segue a regra geral; a exportação tem código próprio (CST 410). Para exportação de bens materiais a tabela também traz o 550001; decide o documento e a comprovação.',
    itens: [
      { desc: 'Venda interna de produto acabado', valor: 10000, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' },
      { desc: 'Exportação de produto acabado', valor: 5000, cst: '410', cclass: '410004', red: 0, incide: false, fundamento: 'Exportações de bens e serviços · CST 410' }
    ]
  },
  {
    id: 'frete', ramo: 'Transporte de carga', semana: 11, doc: 'CT-e',
    emitente: 'Transportadora Exemplo Ltda.', destinatario: 'Embarcador (empresa)',
    comentario: 'Frete de carga em condições normais usa o código de tributação integral, permitido em CT-e, CT-e OS, BP-e e NFS-e.',
    itens: [
      { desc: 'Frete de carga', valor: 3000, cst: '000', cclass: '000001', red: 0, fundamento: 'Tributação integral · art. 4º' }
    ]
  },
  {
    id: 'passageiros', ramo: 'Transporte de passageiros', semana: 11, doc: 'BP-e',
    emitente: 'Viação Exemplo Ltda.', destinatario: 'Passageiro (pessoa física)',
    comentario: 'Transporte coletivo rodoviário, ferroviário e hidroviário de passageiros. O transporte público urbano rodoviário e metroviário é outro código (400001, isenção).',
    itens: [
      { desc: 'Passagem de transporte coletivo', valor: 200, cst: '200', cclass: '200049', red: 40, fundamento: 'Transporte coletivo de passageiros · art. 286' }
    ]
  }
];
