export function validateProgram(program, sources) {
  const errors = [];
  const knownSources = new Set(sources.map(source => source.id));
  if (program.length !== 12) errors.push('Programa deve ter 12 semanas.');
  if (program.reduce((sum, week) => sum + week.hours, 0) !== 72) errors.push('Programa deve ter 72 horas.');
  for (const week of program) {
    if (week.hours !== 6) errors.push(`${week.id}: carga deve ser 6h.`);
    if (!week.chapters?.length || !week.flow?.steps?.length || !week.todo?.length || !week.lab || !week.sourceIds?.length || !week.mediaId) errors.push(`${week.id}: peças didáticas ausentes.`);
    if (sources.length) for (const id of week.sourceIds) if (!knownSources.has(id)) errors.push(`${week.id}: fonte ausente ${id}.`);
  }
  return errors;
}

export const LEARNING_STATE_VERSION = 1;
export function initialLearningState() {
  return { version: LEARNING_STATE_VERSION, todoByWeek: {}, assessments: {}, deliverables: { impactMatrix: {}, implementationPlan: {} } };
}

export function normalizeLearningState(raw, program) {
  if (!raw || raw.version !== LEARNING_STATE_VERSION || !raw.todoByWeek || !raw.assessments || !raw.deliverables) return initialLearningState();
  const known = new Set([...program.map(week => week.id), 'final']);
  const state = initialLearningState();
  for (const [weekId, todos] of Object.entries(raw.todoByWeek)) if (known.has(weekId) && Array.isArray(todos)) state.todoByWeek[weekId] = todos.filter(todo => typeof todo === 'string');
  for (const [weekId, result] of Object.entries(raw.assessments)) if (known.has(weekId) && Number.isFinite(result?.correct) && Number.isFinite(result?.total)) state.assessments[weekId] = recordAssessment(state, weekId, result.correct, result.total).assessments[weekId];
  for (const kind of ['impactMatrix', 'implementationPlan']) if (raw.deliverables[kind] && typeof raw.deliverables[kind] === 'object') state.deliverables[kind] = Object.fromEntries(Object.entries(raw.deliverables[kind]).filter(([, value]) => typeof value === 'string'));
  return state;
}

export function recordAssessment(state, weekId, correct, total) {
  const safeCorrect = Number.isFinite(correct) ? Math.max(0, correct) : 0;
  const safeTotal = Number.isFinite(total) ? Math.max(0, total) : 0;
  const percent = safeTotal ? Math.round((safeCorrect / safeTotal) * 100) : 0;
  return { ...state, assessments: { ...state.assessments, [weekId]: { correct: safeCorrect, total: safeTotal, percent, passed: safeTotal > 0 && safeCorrect / safeTotal >= 0.8 } } };
}

export function updateDeliverableDraft(state, kind, field, value) {
  if (!['impactMatrix', 'implementationPlan'].includes(kind) || typeof field !== 'string' || typeof value !== 'string') return state;
  return { ...state, deliverables: { ...state.deliverables, [kind]: { ...state.deliverables[kind], [field]: value } } };
}
