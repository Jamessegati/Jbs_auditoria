const makeWeek = (number, title, sector, sourceIds, outcome) => ({
  id: `week-${String(number).padStart(2, '0')}`,
  number,
  hours: 6,
  required: true,
  sector,
  title,
  outcomes: [outcome],
  chapters: [
    { id: `w${number}-conceito`, title: 'O que muda na rotina', body: 'Estude a regra, a operação e os controles antes de concluir o tratamento tributário.', audioText: 'Estude a regra, a operação e os controles antes de concluir o tratamento tributário.' },
    { id: `w${number}-evidencia`, title: 'Documentos e evidências', body: 'Relacione cadastro, contrato, documento fiscal, evento e fonte para que a decisão seja revisável.', audioText: 'Relacione cadastro, contrato, documento fiscal, evento e fonte para que a decisão seja revisável.' },
    { id: `w${number}-controle`, title: 'Como controlar', body: 'Defina responsável, exceção, prazo e revisão normativa para transformar estudo em rotina.', audioText: 'Defina responsável, exceção, prazo e revisão normativa para transformar estudo em rotina.' },
  ],
  flow: { title: 'Roteiro de decisão', steps: [
    { id: 'operation', label: 'Identificar a operação', detail: 'Defina sujeito, objeto, destino e período.' },
    { id: 'classification', label: 'Conferir classificação', detail: 'Confronte cadastro e hipótese aplicável.' },
    { id: 'document', label: 'Validar documento', detail: 'Relacione contrato, DF-e, evento e XML.' },
    { id: 'evidence', label: 'Registrar evidência', detail: 'Guarde fonte, decisão, responsável e exceção.' },
  ] },
  todo: [
    { id: 'study', label: 'Ler os capítulos orientados', kind: 'study' },
    { id: 'live', label: 'Assistir à aula semanal', kind: 'media' },
    { id: 'flow', label: 'Aplicar o fluxograma', kind: 'practice' },
    { id: 'lab', label: 'Executar o laboratório', kind: 'lab' },
    { id: 'assessment', label: 'Atingir 80% na avaliação', kind: 'assessment' },
  ],
  lab: {
    facts: ['Há operações de naturezas diferentes no período.', 'O cadastro precisa ser confrontado com o documento.', 'Uma exceção exige revisão antes do fechamento.'],
    documents: ['Contrato ou pedido', 'Cadastro tributário', 'Documento fiscal e evento correspondente'],
    decisions: ['Classificar a hipótese', 'Definir o documento e controle aplicável', 'Registrar a exceção e responsável'],
    evidence: ['Fonte oficial consultada', 'Documento vinculado à decisão', 'Registro de revisão e prazo'],
  },
  sourceIds,
  mediaId: `week-${String(number).padStart(2, '0')}`,
  deliverableFields: number < 12 ? ['impactMatrix', 'implementationPlan'] : ['impactMatrix', 'implementationPlan', 'finalExam'],
});

const baseWeeks = [
  makeWeek(1, 'Fundamentos, EC 132, LC 214 e cronograma', null, ['ec132', 'lc214'], 'Mapear a transição da empresa.'),
  makeWeek(2, 'Operação, cadastro, classificação, contratos e DF-e', null, ['lc214', 'orientacoes-rtc'], 'Diagnosticar dados cadastrais e documentais.'),
  makeWeek(3, 'Apuração, créditos, extinção, devoluções e conciliação', null, ['lc214', 'manual-cbs'], 'Construir um roteiro de conciliação IBS/CBS.'),
  makeWeek(4, 'ERP, Portal RTC, calculadora, governança e riscos', null, ['manual-cbs', 'orientacoes-rtc'], 'Definir controles e responsáveis.'),
  makeWeek(5, 'Serviços médicos e fator R', 'saude-fator-r', ['lc214', 'curso-rfb-cfc'], 'Mapear enquadramento e risco do setor.'),
  makeWeek(6, 'Construção civil', 'construcao-civil', ['lc214', 'construcao-rfb'], 'Controlar obra, contrato, medição e documento.'),
  makeWeek(7, 'Serviços em geral', 'servicos-gerais', ['lc214', 'orientacoes-rtc'], 'Mapear prestação, NFS-e e ajustes.'),
  makeWeek(8, 'Comércio varejista', 'varejo', ['lc214', 'curso-rfb-cfc'], 'Analisar SKU, preço, devolução e consumidor.'),
  makeWeek(9, 'Comércio atacadista', 'atacado', ['lc214', 'curso-rfb-cfc'], 'Analisar cadeia B2B, estoque e bonificação.'),
  makeWeek(10, 'Indústria', 'industria', ['lc214', 'curso-rfb-cfc'], 'Relacionar insumo, produção, produto e exportação.'),
  makeWeek(11, 'Transportes', 'transportes', ['lc214', 'orientacoes-rtc'], 'Conciliar frete, tomador, documento e rota.'),
  makeWeek(12, 'Simulação integrada, plano 2026–2033 e exame final', null, ['ec132', 'lc214', 'orientacoes-rtc'], 'Consolidar matriz de impacto e plano de implantação.'),
];

const DETAILS = {
  1: ['A EC 132 redesenha a tributação do consumo. IBS, CBS e IS têm competências e cronogramas próprios; comece distinguindo os tributos antes de discutir preço ou alíquota.', 'A transição não é um único evento: documento, apuração, recolhimento e obrigação acessória podem ter datas diferentes. Mapeie cada uma na empresa.', 'Transforme a norma em inventário de operações: venda, compra, importação, serviço, devolução e ajuste.'],
  2: ['A classificação depende da operação concreta. CNAE isolado não resolve NCM, NBS, CST, cClassTrib, destino ou regime.', 'Cadastro, contrato e XML precisam contar a mesma história. Divergência entre eles é exceção de controle, não detalhe cadastral.', 'Defina quem altera regra tributária, quem aprova e qual evidência fica guardada para auditoria.'],
  3: ['Crédito potencial, crédito apropriado e extinção do débito são etapas distintas. Não una IBS e CBS em um saldo didático.', 'Concilie documento, evento posterior, ajuste, origem do crédito e fonte. Uma nota idônea não elimina requisitos legais.', 'Ressarcimento, transferência, restituição e cashback têm origens e fluxos diferentes; classifique antes de orientar.'],
  4: ['ERP precisa versionar regra, entrada, resultado e exceção. A calculadora apoia validação, não substitui apuração ou guia.', 'Acesso ao Portal RTC depende de autenticação, representação e perfil. Registre data, serviço e usuário da consulta.', 'A governança começa com matriz de risco: operação, dono, controle, prazo e gatilho de revisão normativa.'],
  5: ['Em saúde, separe a natureza da receita, contrato, tomador e regra aplicável antes de transportar tratamento de outro serviço.', 'Fator R é uma regra do Simples Nacional e não deve ser confundido com a lógica de IBS/CBS. O caso precisa indicar regime, folha e receita.', 'O laboratório exige conciliar contrato, NFS-e, cadastro, composição de receita e evidências de enquadramento.'],
  6: ['Construção civil exige visão por obra: contrato, medição, centro de custo, documento e vínculo do empreendimento.', 'Não trate serviço de construção, incorporação, alienação e locação como a mesma hipótese. Cada operação exige evidência própria.', 'Mapeie dependências cadastrais e documentais da obra, incluindo controles que já existem e pontos que o ERP ainda não cobre.'],
  7: ['Serviços em geral exigem identificar o que foi prestado, onde, para quem, em qual período e qual documento registra o fato.', 'Cancelamento, substituição e ajuste posterior devem manter vínculo com o documento original e com o contrato.', 'A atividade prática confronta NFS-e, contrato, cadastro e eventos para encontrar exceções antes do fechamento.'],
  8: ['No varejo, o SKU conecta classificação, preço, devolução, estoque e documento. O fluxo precisa sobreviver a alto volume.', 'B2C não elimina a necessidade de dados consistentes. Devolução, troca e desconto precisam manter rastreabilidade.', 'Priorize itens de maior giro, margem ou risco para formar uma matriz de impacto acionável.'],
  9: ['No atacado, relações B2B exigem rastrear cadeia, condição comercial, bonificação, estoque e documento de cada etapa.', 'Não assuma que bonificação, desconto ou devolução recebe o mesmo tratamento de uma venda comum sem analisar a hipótese.', 'Concilie pedido, NF-e, cadastro do item, cliente e evidência de extinção por operação.'],
  10: ['Na indústria, a trilha parte de insumo, transformação, produto e destino. A análise não começa pelo saldo de créditos.', 'Produção, perda, devolução e exportação exigem documentos e regras que precisam permanecer ligados ao processo produtivo.', 'O caso final deve identificar quais parâmetros de produto e processo dependem de atualização no ERP.'],
  11: ['Transportes exigem identificar tomador, serviço, rota, documento, período e vínculo com a operação principal.', 'Frete próprio, contratado, redespacho e ajustes posteriores não podem ser tratados por um único atalho documental.', 'A conciliação fecha quando contrato, CT-e ou documento aplicável, rota, tomador e resultado podem ser revisados juntos.'],
  12: ['A semana final consolida os controles. Refaça os fluxos que produziram exceções e registre o responsável por cada decisão.', 'A matriz de impacto mostra o que muda na operação; o plano 2026–2033 transforma isso em marcos, dependências e prazos.', 'O exame final mede a capacidade de escolher documento, fonte, evidência e escalonamento — não de decorar uma alíquota.'],
};

export const PROGRAM_WEEKS = baseWeeks.map(week => ({ ...week, chapters: DETAILS[week.number].map((body, index) => ({ ...week.chapters[index], body, audioText: body })) }));

