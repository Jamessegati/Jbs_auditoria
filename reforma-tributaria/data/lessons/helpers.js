export const ref = (locator, sourceId = 'lc214') => ({ sourceId, locator });
export const chapter = (title, paragraphs, legalRefs) => ({ title, paragraphs, legalRefs, body: paragraphs.join('\n\n'), audioText: `${title}. ${paragraphs.join('\n\n')}` });
export const worked = (title, facts, steps, conclusion, legalRefs) => ({ title, facts, steps, conclusion, legalRefs });
export const flow = (title, rows) => ({ title, steps: rows.map(([label, detail], index) => ({ id: `decision-${index + 1}`, label, detail })) });
export const lab = (facts, documents, decisions, evidence, solution) => ({ facts, documents, decisions, evidence, solution });
export const EDITORIAL_DATE = '2026-09-24';
export const SIMULATION_NOTICE = 'Os casos são didáticos. Percentuais identificados como hipotéticos não são alíquotas oficiais nem projeções. Salvo indicação expressa, simulam o regime regular fora das particularidades de 2026; IBS e CBS são apurados separadamente. Antes de aplicar, confira período, regime, legislação consolidada, regulamento e nota técnica vigente. Este treinamento não substitui a análise profissional do caso concreto.';
