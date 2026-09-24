const question = (blockId, order, sourceId, prompt, correct, distractors, explanation) => ({
  id: `${blockId}-${order}`,
  blockId,
  order,
  sourceId,
  prompt,
  options: [correct, ...distractors],
  correctIndex: 0,
  explanation
});

const coreQuestions = (blockId, sourceId, subject, correct, evidence) => [
  question(blockId, 1, sourceId, `Antes de definir a alíquota em ${subject}, qual é a primeira providência?`, correct, ['Aplicar uma alíquota média ao período.', 'Emitir guia antes de classificar a operação.', 'Usar somente o CNAE do contribuinte.', 'Ignorar o documento até o fechamento mensal.'], `A decisão começa por identificar a hipótese e conservar ${evidence}.`),
  question(blockId, 2, sourceId, `Qual evidência torna a decisão sobre ${subject} revisável por outro profissional?`, evidence, ['Somente o percentual final de carga.', 'Uma orientação verbal sem documento.', 'A tela do ERP sem versão ou parâmetros.', 'O nome da conta contábil isoladamente.'], 'A trilha de decisão deve permitir reconstruir premissas, documentos e fonte aplicados.'),
  question(blockId, 3, sourceId, `Uma regra de piloto é usada em ${subject}. Qual conduta é adequada?`, 'Identificar o material como piloto e confirmar a orientação vigente.', ['Tratá-la como regra permanente sem fonte normativa.', 'Aplicá-la a qualquer operação semelhante.', 'Dispensar a conferência do leiaute do documento.', 'Substituir a análise por uma estimativa de mercado.'], 'Material operacional de piloto exige identificação e revisão antes de aplicação em produção.'),
  question(blockId, 4, sourceId, `Qual é um risco de usar dado incompleto em ${subject}?`, 'Gerar classificação, documento ou conciliação incompatível com a operação.', ['Eliminar automaticamente toda obrigação acessória.', 'Transformar qualquer saldo em ressarcimento.', 'Dispensar a fonte oficial.', 'Garantir crédito integral por padrão.'], 'Dados e documentação incompletos impedem aplicar e auditar a regra concreta.'),
  question(blockId, 5, sourceId, `Após identificar uma exceção em ${subject}, o que a equipe deve registrar?`, 'A causa, a evidência, a fonte aplicada, a decisão e o responsável.', ['Somente o valor financeiro da operação.', 'A decisão sem informar o documento de origem.', 'A correção no ERP sem registrar a justificativa.', 'A alíquota estimada usada na primeira simulação.'], 'Exceções precisam de trilha de auditoria para revisão e atualização futura.')
];

const labQuestions = (blockId, sourceId, scenario, evidence) => [
  question(blockId, 1, sourceId, `No laboratório de ${scenario}, qual é a ordem de análise mais segura?`, 'Identificar operação, documento, regra, evidência e conciliação.', ['Escolher a alíquota antes de identificar o objeto.', 'Usar o extrato financeiro como único documento.', 'Ignorar eventos posteriores ao documento original.', 'Calcular um saldo único sem separar tributos.'], 'A sequência evita que cálculo ou documento sejam escolhidos antes da classificação concreta.'),
  question(blockId, 2, sourceId, `Qual conjunto de evidências permite revisar o caso de ${scenario}?`, evidence, ['Somente a margem final do período.', 'A opinião verbal do responsável.', 'A rubrica contábil isolada.', 'Uma estimativa de alíquota.'], 'O laboratório exige evidência documental, cadastro e vínculo com a decisão.'),
  question(blockId, 3, sourceId, `Uma divergência aparece em ${scenario}. Qual é a ação adequada?`, 'Classificar a causa, preservar os documentos e encaminhar a exceção para revisão.', ['Substituir todos os documentos por planilha manual.', 'Desconsiderar a divergência até o próximo exercício.', 'Transformar a divergência em crédito automático.', 'Usar o mesmo tratamento para operações diferentes.'], 'Exceções devem ser isoladas, justificadas e resolvidas com base no documento e na regra aplicável.'),
  question(blockId, 4, sourceId, `Por que a conciliação é necessária em ${scenario}?`, 'Para confrontar operação, cadastro, documento, tratamento e efeito apurado.', ['Para substituir o documento fiscal pela conciliação.', 'Para dispensar a conferência de fonte oficial.', 'Para unificar IBS e CBS em um único saldo.', 'Para tratar toda devolução como nova venda.'], 'Conciliação conecta a realidade operacional à evidência que sustenta a apuração.'),
  question(blockId, 5, sourceId, `Qual resultado didático esperado em ${scenario}?`, 'Uma decisão rastreável, e não uma guia definitiva de recolhimento.', ['Uma autorização automática de crédito.', 'Um parecer que dispense consulta à norma.', 'Uma alíquota fixa aplicável a qualquer cliente.', 'Um documento fiscal emitido pela própria aula.'], 'O laboratório treina decisão e evidência; os sistemas oficiais continuam responsáveis pela operação real.'),
  question(blockId, 6, sourceId, `Ao encerrar ${scenario}, o que deve ficar registrado?`, 'Cenário, decisão, documentos, fonte, exceção e responsável.', ['Somente o valor líquido recebido.', 'A tela final do questionário.', 'O título do módulo estudado.', 'A resposta correta sem sua justificativa.'], 'O encerramento produz uma trilha que outro profissional consegue revisar.')
];

const trackQuestions = (blockId, sourceId, sector, rule) => [
  question(blockId, 1, sourceId, `Antes de aplicar tratamento em ${sector}, o que deve ser confirmado?`, rule, ['Somente a alíquota média do setor.', 'A classificação usada no sistema antigo.', 'O nome comercial do produto ou serviço.', 'A margem de lucro do mês.'], 'Tratamento setorial depende da hipótese legal, dos requisitos e da operação concreta.'),
  question(blockId, 2, sourceId, `Qual é a função do documento na trilha de ${sector}?`, 'Demonstrar os dados e vínculos necessários à classificação e apuração.', ['Substituir a verificação da hipótese legal.', 'Garantir crédito integral sem outros requisitos.', 'Eliminar a necessidade de cadastro.', 'Converter toda operação em regime geral.'], 'Documento, cadastro e regra precisam ser coerentes para que a decisão seja auditável.'),
  question(blockId, 3, sourceId, `Qual risco deve ser evitado em ${sector}?`, 'Transportar benefício ou regra de outra operação sem enquadramento.', ['Consultar fonte oficial atualizada.', 'Separar operação, documento e período.', 'Registrar a decisão para revisão.', 'Conferir se existe declaração específica.'], 'Setores especiais possuem condições próprias; analogia sem base pode causar erro de tratamento.'),
  question(blockId, 4, sourceId, `Quando surgir dúvida em ${sector}, qual registro é adequado?`, 'Hipótese analisada, fonte, documento, responsável e impacto na apuração.', ['Somente a conclusão final.', 'A alíquota estimada divulgada no mercado.', 'O total financeiro sem identificação da operação.', 'A primeira classificação cadastrada no ERP.'], 'A trilha de auditoria permite revisar a decisão quando a norma ou o caso mudar.'),
  question(blockId, 5, sourceId, `Qual é o resultado esperado da trilha de ${sector}?`, 'Decidir o tratamento aplicável e saber quando encaminhar exceção para especialista.', ['Emitir guia definitiva pelo curso.', 'Dispensar consulta à legislação.', 'Aplicar o mesmo regime a todas as empresas.', 'Substituir a apuração dos sistemas oficiais.'], 'A formação orienta a decisão e a evidência; não substitui procedimentos oficiais ou análise especializada.')
];

export const QUESTION_BANK = [
  ...coreQuestions('fundamentos', 'lc214', 'IVA dual', 'Identificar sujeito, objeto, destino, documento e regime da operação.', 'a operação, a fonte e o documento'),
  ...coreQuestions('transicao', 'ec132', 'transição', 'Separar cronograma constitucional, obrigação documental e recolhimento.', 'o período, o documento e a norma'),
  ...coreQuestions('cadastro-classificacao', 'manual-plataforma-cbs', 'classificação tributária', 'Conferir NCM/NBS aplicável, CST, cClassTrib, natureza e destino.', 'a versão do cadastro e o fundamento'),
  ...coreQuestions('dfe', 'manual-plataforma-cbs', 'documento fiscal eletrônico', 'Validar emissão, XML, eventos e vínculo com a operação de origem.', 'o XML, o evento e a nota relacionada'),
  ...coreQuestions('portal-rtc', 'manual-servicos-rtc', 'Portal RTC', 'Verificar autenticação, representação e perfil de acesso.', 'o perfil, a data e o serviço consultado'),
  ...coreQuestions('calculadora-erp', 'calculadora-faq', 'Calculadora oficial', 'Confrontar dados da operação, versão da regra e resultado do ERP.', 'os parâmetros, a versão e o resultado'),
  ...coreQuestions('apuracao-assistida', 'aa-cbs', 'Apuração Assistida', 'Confrontar DF-e, débitos, créditos, ajustes e evidências.', 'o documento, o ajuste e o aprovador'),
  ...coreQuestions('creditos-extincao', 'lc214', 'crédito e extinção', 'Verificar requisito legal, documento e forma de extinção aplicável.', 'a aquisição, o débito e a extinção'),
  ...coreQuestions('devolucoes-cashback', 'devolucoes', 'devoluções e cashback', 'Classificar a origem do saldo antes de escolher o fluxo.', 'a origem do saldo e o procedimento'),
  ...coreQuestions('implantacao-governanca', 'manual-servicos-rtc', 'implantação', 'Priorizar risco e definir dono, aprovação e rotina de revisão.', 'a matriz de risco e o responsável'),
  ...labQuestions('lab-comercio-varejo', 'manual-plataforma-cbs', 'comércio e varejo', 'Cadastro do item, XML de compra e venda e evidência de extinção.'),
  ...labQuestions('lab-servicos-nfse', 'portal-nfse', 'serviços e NFS-e', 'Contrato, DPS/NFS-e autorizada e evento de ajuste.'),
  ...labQuestions('lab-simples', 'lc214', 'Simples Nacional', 'Dados de faturamento, compras e procedimento oficial de opção.'),
  ...labQuestions('lab-marketplace-remessas', 'modulo-comex', 'marketplace e remessas', 'Relatório da plataforma, DF-e e documento de importação ou remessa.'),
  ...labQuestions('lab-construcao-imoveis', 'modulo-imoveis', 'construção e imóveis', 'Contrato, medição e documento fiscal vinculado à obra.'),
  ...labQuestions('lab-comercio-exterior', 'modulo-comex', 'importação e exportação', 'Documento de importação, DF-e e registro da operação de exportação.'),
  ...trackQuestions('track-regimes', 'lc214', 'regimes diferenciados e específicos', 'A previsão legal, a classificação e os requisitos do regime.'),
  ...trackQuestions('track-saude-apostas', 'modulo-dere', 'saúde, apostas e DeRE', 'A base específica, os registros e a declaração exigida.'),
  ...trackQuestions('track-financeiros-dere', 'modulo-dere', 'serviços financeiros e DeRE', 'A natureza financeira, a regra setorial e os registros próprios.'),
  ...trackQuestions('track-agro-cooperativas', 'cooperativas', 'agronegócio e cooperativas', 'O enquadramento, a opção e a documentação de suporte.'),
  ...trackQuestions('track-zfm-alc', 'modulo-setorial', 'ZFM e áreas de livre comércio', 'A condição territorial, o produto e a hipótese aplicável.'),
  ...trackQuestions('track-combustiveis-energia', 'modulo-setorial', 'combustíveis e energia elétrica', 'A etapa setorial, a cadeia e o documento aplicável.'),
  ...trackQuestions('track-imoveis-avancado', 'modulo-imoveis', 'bens imóveis avançado', 'A natureza da operação, o CIB e o documento exigido.'),
  ...trackQuestions('track-is-avancado', 'modulo-setorial', 'Imposto Seletivo avançado', 'O enquadramento legal, a etapa tributável e o documento.')
];
