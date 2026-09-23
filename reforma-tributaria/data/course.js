const block = (id, kind, order, title, sourceIds, required = kind === 'core') => ({
  id, kind, order, title, required, sourceIds, objectives: [], cards: [], practice: null
});

const core = (objective, cards, steps) => ({
  objectives: [objective],
  cards,
  practice: { steps }
});

const CORE_DETAILS = {
  fundamentos: core('Distinguir IBS, CBS e IS antes de classificar uma operação.', [
    { status: 'norma', title: 'IVA dual', body: 'IBS e CBS compõem o novo modelo de tributação do consumo; a competência, administração e destinação não são idênticas.' },
    { status: 'norma', title: 'Imposto Seletivo', body: 'O IS é tributo federal próprio, aplicável às hipóteses definidas em lei e não deve ser confundido com ICMS-ST.' },
    { status: 'operacional', title: 'Pergunta de partida', body: 'Comece por sujeito, objeto, destino, documento e regime antes de procurar alíquota.' }
  ], ['Liste as operações reais da empresa.', 'Separe compras, vendas, importações e serviços.', 'Registre a fonte usada para cada hipótese.']),
  transicao: core('Separar cronograma constitucional, obrigação documental e recolhimento.', [
    { status: 'norma', title: 'Convivência de sistemas', body: 'A transição combina regras antigas e novas em etapas; a data depende do tributo e da obrigação analisada.' },
    { status: 'operacional', title: 'Três calendários', body: 'Destacar campos no DF-e, apurar tributo e pagar não são o mesmo evento.' },
    { status: 'piloto', title: 'Ambiente beta', body: 'Teste e produção beta devem ser identificados como ambientes operacionais, com orientação própria.' }
  ], ['Monte linha do tempo por documento fiscal.', 'Marque impacto no ERP e no fechamento.', 'Valide a versão vigente da nota técnica.']),
  'cadastro-classificacao': core('Preparar cadastros para que a regra tributária possa ser aplicada e auditada.', [
    { status: 'operacional', title: 'Dados mínimos', body: 'NCM, NBS quando aplicável, CST, cClassTrib, natureza e destino precisam refletir a operação concreta.' },
    { status: 'norma', title: 'Classificação antes da alíquota', body: 'Benefício, redução ou regime específico depende da hipótese legal e dos dados de enquadramento.' },
    { status: 'operacional', title: 'Trilha de decisão', body: 'Conserve fonte, versão de cadastro, responsável e motivo de cada classificação relevante.' }
  ], ['Selecione itens e serviços de maior risco.', 'Compare cadastro, contrato e XML.', 'Abra exceção para divergência de classificação.']),
  dfe: core('Controlar o ciclo documental de uma operação, inclusive eventos e ajustes.', [
    { status: 'operacional', title: 'Ciclo completo', body: 'Teste emissão, autorização, cancelamento, devolução e ajuste; a venda original não representa todo o ciclo.' },
    { status: 'operacional', title: 'XML como evidência', body: 'A conferência deve alcançar leiaute, campos tributários, vínculo entre documentos e eventos posteriores.' },
    { status: 'piloto', title: 'Leiautes vigentes', body: 'Campo novo ou piloto não cria, sozinho, regra permanente de cobrança.' }
  ], ['Escolha um cenário de venda e retorno.', 'Confronte XML com cadastro tributário.', 'Registre rejeições e a ação corretiva.']),
  'portal-rtc': core('Usar o Portal RTC com perfil, representação e rastreabilidade adequados.', [
    { status: 'operacional', title: 'Acesso', body: 'Autenticação por gov.br e representação empresarial devem ser verificadas antes de atribuir uma falha a cálculo.' },
    { status: 'operacional', title: 'Perfis', body: 'Diferencie quem consulta, quem opera e quem administra acessos da empresa.' },
    { status: 'operacional', title: 'Evidência', body: 'Mantenha registro da data, perfil e serviço consultado para cada decisão operacional.' }
  ], ['Mapeie responsáveis e procuradores.', 'Valide representação em ambiente permitido.', 'Documente acessos críticos e revisão periódica.']),
  'calculadora-erp': core('Usar a Calculadora oficial como apoio de conformidade, sem confundi-la com guia.', [
    { status: 'operacional', title: 'Motor oficial', body: 'A calculadora apoia simulação e validação de tratamento a partir dos dados da operação.' },
    { status: 'operacional', title: 'Integração', body: 'ERP precisa versionar regras, conservar entradas e confrontar resultado antes de autorizar documento.' },
    { status: 'piloto', title: 'Resultado controlado', body: 'Simulação não homologa crédito, extingue débito ou substitui a apuração assistida.' }
  ], ['Escolha operação representativa.', 'Confronte parâmetros do ERP e calculadora.', 'Registre versão, divergência e decisão.']),
  'apuracao-assistida': core('Conciliar dados processados de DF-e com a apuração apresentada ao contribuinte.', [
    { status: 'operacional', title: 'Origem dos dados', body: 'A apuração usa documentos fiscais e eventos; por isso, cadastro e XML corretos reduzem exceções posteriores.' },
    { status: 'operacional', title: 'Ajustes', body: 'A equipe deve identificar ajustes positivos ou negativos, justificá-los e preservar a evidência.' },
    { status: 'piloto', title: 'Conformidade cooperativa', body: 'Material de piloto descreve fluxo operacional e deve ser confrontado com a orientação vigente.' }
  ], ['Compare DF-e emitidos com painel de apuração.', 'Classifique divergência por causa.', 'Registre ajuste, documento e aprovador.']),
  'creditos-extincao': core('Diferenciar crédito potencial, crédito apropriado e forma de extinção do débito.', [
    { status: 'norma', title: 'Crédito condicionado', body: 'Compra e nota idônea não dispensam a análise dos requisitos legais e da extinção do débito da operação anterior.' },
    { status: 'operacional', title: 'Formas de extinção', body: 'Compensação, pagamento, recolhimento na liquidação e recolhimento pelo adquirente têm controles próprios.' },
    { status: 'operacional', title: 'Conciliação por tributo', body: 'IBS e CBS não devem ser misturados em saldo didático ou controle operacional.' }
  ], ['Concilie saída, entrada e evidência de extinção.', 'Separe IBS de CBS.', 'Envie casos sem evidência para revisão manual.']),
  'devolucoes-cashback': core('Diferenciar ressarcimento, transferência, restituição e cashback antes de orientar o cliente.', [
    { status: 'operacional', title: 'Ressarcimento', body: 'Depende de saldo recuperável, condições legais e pedido quando aplicável.' },
    { status: 'operacional', title: 'Transferência', body: 'Excessos decorrentes de modalidades específicas de recolhimento seguem fluxo próprio; não equivalem automaticamente a ressarcimento.' },
    { status: 'norma', title: 'Cashback', body: 'A devolução personalizada tem destinatário e requisitos legais próprios, não é desconto comercial.' }
  ], ['Classifique a origem do saldo.', 'Verifique requisito e fluxo aplicável.', 'Documente pedido, retorno ou motivo de impedimento.']),
  'implantacao-governanca': core('Implantar controles que permitam atualização, conciliação e auditoria da transição.', [
    { status: 'operacional', title: 'Matriz de impacto', body: 'Priorize operações, itens, clientes e fornecedores de maior giro, valor ou risco de classificação.' },
    { status: 'operacional', title: 'Governança', body: 'Defina dono do cadastro, aprovador de regra, responsável por exceção e rotina de atualização normativa.' },
    { status: 'operacional', title: 'Evidência auditável', body: 'Cada conclusão deve permitir localizar documento, período, cálculo e fonte normativa utilizados.' }
  ], ['Monte matriz de risco por operação.', 'Defina responsáveis e prazos de revisão.', 'Teste ponta a ponta antes de produção.'])
};

const lab = (facts, decisionPoints, evidence) => ({ caseStudy: { facts, decisionPoints, evidence } });

const LAB_DETAILS = {
  'lab-comercio-varejo': lab(['Atacadista compra de fornecedor em outro estado.', 'Vende itens com tratamentos distintos a clientes B2B e B2C.'], ['Identificar item, destino e cliente.', 'Conferir DF-e de entrada e saída.', 'Separar crédito potencial e margem por SKU.'], ['Cadastro do item.', 'XML de compra e venda.', 'Evidência de extinção e devoluções.']),
  'lab-servicos-nfse': lab(['Prestadora atende clientes em municípios diferentes.', 'Há cancelamento e ajuste posterior de uma NFS-e.'], ['Identificar natureza e local da operação.', 'Confirmar documento e leiaute aplicável.', 'Vincular ajuste à nota e ao contrato.'], ['Contrato de serviço.', 'DPS/NFS-e autorizada.', 'Evento de cancelamento ou ajuste.']),
  'lab-simples': lab(['Empresa vende mercadorias e presta serviços.', 'Parte dos clientes empresariais avalia crédito de IBS/CBS.'], ['Segregar receitas por atividade.', 'Comparar tratamento unificado e regular.', 'Registrar premissas de preço, margem e cliente.'], ['Dados de faturamento.', 'Composição de compras.', 'Janela e procedimento oficial de opção.']),
  'lab-marketplace-remessas': lab(['Varejista vende por marketplace e recebe repasses posteriores.', 'Há devolução parcial e remessa internacional no período.'], ['Vincular venda, nota, repasse e devolução.', 'Classificar a operação digital ou de remessa.', 'Separar operação interna e comércio exterior.'], ['Relatório da plataforma.', 'DF-e e evento de devolução.', 'Documento de importação ou remessa.']),
  'lab-construcao-imoveis': lab(['Construtora executa obra e comercializa unidades.', 'Custos e documentos precisam ser vinculados ao empreendimento.'], ['Separar serviço de construção e operação imobiliária.', 'Identificar obra, CIB e unidade quando aplicável.', 'Controlar redutores e centro de custo.'], ['Contrato e medição.', 'Documento fiscal com vínculo da obra.', 'Cadastro do empreendimento ou unidade.']),
  'lab-comercio-exterior': lab(['Empresa importa bem material e exporta parte da produção.', 'Há aquisição interna, documento de importação e operação de saída.'], ['Distinguir importação, aquisição interna e exportação.', 'Examinar destino e não cumulatividade aplicável.', 'Conferir documentação de cada etapa.'], ['Documento de importação.', 'DF-e de aquisição ou saída.', 'Registro de crédito e operação de exportação.'])
};

const track = (objective, rule, document, risk) => ({
  objectives: [objective],
  cards: [
    { status: 'norma', title: 'Enquadramento', body: rule },
    { status: 'operacional', title: 'Fluxo documental', body: document },
    { status: 'operacional', title: 'Risco de controle', body: risk }
  ],
  practice: { steps: ['Identifique o setor e a hipótese legal.', 'Confronte cadastro, documento e fonte específica.', 'Registre a conclusão e o impacto na apuração.'] }
});

const TRACK_DETAILS = {
  'track-regimes': track('Reconhecer quando a operação exige regime diferenciado ou específico.', 'Reduções, alíquotas zero e regimes específicos dependem de previsão e requisitos próprios.', 'Verifique classificação, documentação e eventual declaração aplicável.', 'Não transportar benefício atual ou regra de outro setor sem enquadramento.'),
  'track-saude-apostas': track('Analisar serviços de saúde e concursos de prognósticos pelo regime específico.', 'A base e o tratamento podem divergir do regime geral e exigem leitura setorial.', 'Utilize registros e declaração de regime específico quando exigidos.', 'Evite usar preço bruto ou documento genérico sem testar a regra de setor.'),
  'track-financeiros-dere': track('Aplicar a lógica específica de serviços financeiros e DeRE.', 'Serviços financeiros podem ter base, crédito e apuração próprios.', 'Concilie registros contábeis, eventos e declaração do regime.', 'Não confunda receita financeira, margem regulatória e operação de consumo.'),
  'track-agro-cooperativas': track('Distinguir tratamento de agronegócio e opção de cooperativas.', 'Operações agropecuárias e cooperativas possuem regras e requisitos próprios.', 'Confirme a opção, o arquivo exigido e a classificação da operação.', 'Não presumir redução ou alíquota zero por atividade rural ou cooperativa.'),
  'track-zfm-alc': track('Aplicar incentivos de ZFM e ALC conforme condição territorial e operação.', 'A preservação de incentivos depende de hipóteses constitucionais e legais específicas.', 'Verifique origem, destino, produto, documento e período da operação.', 'Não tratar toda operação amazônica como incentivada.'),
  'track-combustiveis-energia': track('Controlar operações monofásicas de combustíveis e particularidades de energia.', 'Combustíveis e energia elétrica possuem estrutura setorial e documentação própria.', 'Confronte cadeia, etapa, DF-e e código aplicável.', 'Não reutilizar regra de mercadoria comum para operação monofásica ou regulada.'),
  'track-imoveis-avancado': track('Tratar alienação e locação imobiliária com CIB, documentos e redutores próprios.', 'Imóveis seguem regime específico; alienação, locação e construção não são a mesma hipótese.', 'Use NF-e ABI ou NFS-e quando aplicável e vincule CIB, partes e operação.', 'Não aplicar redutor ou regra de locação a alienação sem conferir hipótese.'),
  'track-is-avancado': track('Controlar IS por enquadramento, etapa tributável, documento e apuração.', 'IS é federal, incide uma vez e possui regras próprias de base e documentação.', 'Confronte item, etapa, DF-e e interface com IBS/CBS.', 'Não confundir IS com ICMS-ST nem replicar incidência em cada revenda.')
};

export const COURSE_BLOCKS = [
  block('fundamentos', 'core', 1, 'Visão geral do IVA dual', ['ec132', 'lc214']),
  block('transicao', 'core', 2, 'Cronograma de transição', ['ec132', 'lc214']),
  block('cadastro-classificacao', 'core', 3, 'Cadastro e classificação', ['lc214', 'manual-plataforma-cbs']),
  block('dfe', 'core', 4, 'Documentos fiscais eletrônicos', ['manual-plataforma-cbs', 'portal-nfse']),
  block('portal-rtc', 'core', 5, 'Portal RTC e acessos', ['manual-servicos-rtc', 'portal-rtc']),
  block('calculadora-erp', 'core', 6, 'Calculadora oficial e ERP', ['calculadora-faq', 'manual-plataforma-cbs']),
  block('apuracao-assistida', 'core', 7, 'Apuração Assistida', ['aa-cbs', 'manual-plataforma-cbs']),
  block('creditos-extincao', 'core', 8, 'Créditos e extinção', ['lc214', 'aa-cbs']),
  block('devolucoes-cashback', 'core', 9, 'Ressarcimento, transferência e cashback', ['devolucoes', 'lc214']),
  block('implantacao-governanca', 'core', 10, 'Implantação e governança', ['ambiente-beta', 'manual-servicos-rtc']),
  block('lab-comercio-varejo', 'lab', 11, 'Laboratório: comércio e varejo', ['lc214', 'manual-plataforma-cbs']),
  block('lab-servicos-nfse', 'lab', 12, 'Laboratório: serviços e NFS-e', ['portal-nfse', 'manual-plataforma-cbs']),
  block('lab-simples', 'lab', 13, 'Laboratório: Simples Nacional', ['lc214', 'portal-rtc']),
  block('lab-marketplace-remessas', 'lab', 14, 'Laboratório: marketplace e remessas', ['modulo-comex', 'lc214']),
  block('lab-construcao-imoveis', 'lab', 15, 'Laboratório: construção e imóveis', ['modulo-imoveis', 'lc214']),
  block('lab-comercio-exterior', 'lab', 16, 'Laboratório: importação e exportação', ['modulo-comex', 'lc214']),
  block('track-regimes', 'track', 17, 'Trilha: regimes diferenciados e específicos', ['lc214', 'modulo-dere'], false),
  block('track-saude-apostas', 'track', 18, 'Trilha: saúde, apostas e DeRE', ['modulo-dere', 'lc214'], false),
  block('track-financeiros-dere', 'track', 19, 'Trilha: serviços financeiros e DeRE', ['modulo-dere', 'lc214'], false),
  block('track-agro-cooperativas', 'track', 20, 'Trilha: agronegócio e cooperativas', ['cooperativas', 'modulo-setorial'], false),
  block('track-zfm-alc', 'track', 21, 'Trilha: ZFM e áreas de livre comércio', ['modulo-setorial', 'ec132'], false),
  block('track-combustiveis-energia', 'track', 22, 'Trilha: combustíveis e energia elétrica', ['modulo-setorial', 'lc214'], false),
  block('track-imoveis-avancado', 'track', 23, 'Trilha: bens imóveis avançado', ['modulo-imoveis', 'lc214'], false),
  block('track-is-avancado', 'track', 24, 'Trilha: Imposto Seletivo avançado', ['modulo-setorial', 'lc214'], false)
].map(blockData => ({ ...blockData, ...(CORE_DETAILS[blockData.id] ?? {}), ...(LAB_DETAILS[blockData.id] ?? {}), ...(TRACK_DETAILS[blockData.id] ?? {}) }));

