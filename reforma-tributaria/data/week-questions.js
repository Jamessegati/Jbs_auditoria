import { PROGRAM_WEEKS } from './program.js';

const templates = [
  ['Qual é o primeiro passo seguro na análise?', 'Identificar operação, sujeito, objeto, destino e período.'],
  ['Qual evidência torna a decisão revisável?', 'Documento, fonte, premissa e responsável vinculados.'],
  ['Como usar uma orientação de piloto?', 'Identificando-a como piloto e confirmando a orientação vigente.'],
  ['Qual risco deve ser escalado?', 'Divergência entre operação, cadastro, documento e fonte.'],
  ['O que registrar ao encontrar exceção?', 'Causa, evidência, decisão, responsável e prazo de revisão.'],
  ['Qual a função do documento fiscal?', 'Evidenciar os dados e vínculos exigidos pela operação.'],
  ['Por que conciliar?', 'Confrontar operação, cadastro, documento, regra e resultado.'],
  ['Qual conduta evita generalização indevida?', 'Confirmar a hipótese legal e os requisitos do caso concreto.'],
  ['O que o laboratório deve produzir?', 'Uma decisão rastreável, não uma guia definitiva.'],
  ['Qual é a meta da semana?', 'Aplicar o fluxo, registrar evidências e atingir 80% na avaliação.'],
];

export const WEEK_QUESTION_BANK = PROGRAM_WEEKS.flatMap(week => templates.map(([prompt, correct], index) => ({
  id: `${week.id}-${index + 1}`, weekId: week.id, sourceId: week.sourceIds[0],
  prompt: `${prompt} (${week.title})`, correctIndex: 0,
  options: [correct, 'Aplicar uma alíquota estimada antes de classificar.', 'Usar somente a conta contábil do período.', 'Dispensar a consulta à fonte oficial.'],
  explanation: 'A formação orienta uma decisão baseada em operação, documento, fonte e evidência; casos concretos exigem conferência da norma aplicável.',
})));

export const questionsForWeek = weekId => WEEK_QUESTION_BANK.filter(question => question.weekId === weekId);
export const buildFinalExam = () => PROGRAM_WEEKS.flatMap(week => questionsForWeek(week.id).slice(0, 2));

