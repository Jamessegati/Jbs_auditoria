import { COMMON_LESSONS } from './lessons/common.js';
import { SERVICE_LESSONS } from './lessons/services.js';
import { COMMERCE_LESSONS } from './lessons/commerce.js';
import { PRODUCTION_LESSONS } from './lessons/production.js';
import { INTEGRATION_LESSONS } from './lessons/integration.js';
import { EDITORIAL_DATE, SIMULATION_NOTICE } from './lessons/helpers.js';

const titles = ['Fundamentos, legislação e cronograma', 'Operação, cadastro, contratos e documentos fiscais', 'Apuração, créditos, extinção e conciliação', 'ERP, governança, homologação e riscos', 'Serviços médicos e Fator R', 'Construção civil', 'Serviços em geral', 'Comércio varejista', 'Comércio atacadista', 'Indústria', 'Transportes', 'Simulação integrada e plano 2026–2033'];
const sectors = [null, null, null, null, 'saude-fator-r', 'construcao-civil', 'servicos-gerais', 'varejo', 'atacado', 'industria', 'transportes', null];

export const PROGRAM_WEEKS = [...COMMON_LESSONS, ...SERVICE_LESSONS, ...COMMERCE_LESSONS, ...PRODUCTION_LESSONS, ...INTEGRATION_LESSONS].map(lesson => {
  const { number } = lesson;
  const id = `week-${String(number).padStart(2, '0')}`;
  const sourceIds = [...new Set([...lesson.chapters, ...lesson.cases].flatMap(part => part.legalRefs.map(reference => reference.sourceId)))];
  return {
    ...lesson, id, title: titles[number - 1], sector: sectors[number - 1], hours: 6, required: true,
    reviewedAt: EDITORIAL_DATE, simulationNotice: SIMULATION_NOTICE,
    outcomes: [lesson.tasks.join(' · ')], sourceIds, mediaId: id,
    chapters: lesson.chapters.map((chapter, index) => ({ ...chapter, id: `${id}-chapter-${index + 1}` })),
    todo: [...lesson.tasks.map((label, index) => ({ id: `practice-${index + 1}`, label, kind: 'practice' })),
      { id: 'study', label: 'Ler os capítulos e os dispositivos oficiais indicados', kind: 'study' },
      { id: 'live', label: 'Cumprir a aula/debate ou roteiro de estudo de 2h', kind: 'media' },
      { id: 'lab', label: 'Resolver o laboratório antes de abrir a resolução', kind: 'lab' },
      { id: 'assessment', label: 'Atingir 80% na avaliação e revisar justificativas', kind: 'assessment' }],
    deliverableFields: number === 12 ? ['impactMatrix', 'implementationPlan', 'finalExam'] : ['impactMatrix', 'implementationPlan'],
  };
});
