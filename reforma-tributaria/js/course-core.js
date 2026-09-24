export function validateCatalog({ COURSE_BLOCKS, QUESTION_BANK, SOURCE_CATALOG }) {
  const sourceIds = new Set(SOURCE_CATALOG.map(source => source.id));
  const blockIds = new Set();
  const questionIds = new Set();
  const errors = [];
  for (const block of COURSE_BLOCKS) {
    if (blockIds.has(block.id)) errors.push(`Bloco duplicado: ${block.id}`);
    blockIds.add(block.id);
    for (const sourceId of block.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Fonte ausente: ${sourceId}`);
  }
  for (const question of QUESTION_BANK) {
    if (questionIds.has(question.id)) errors.push(`Questão duplicada: ${question.id}`);
    questionIds.add(question.id);
    if (!blockIds.has(question.blockId)) errors.push(`Questão sem bloco: ${question.id}`);
    if (!sourceIds.has(question.sourceId)) errors.push(`Questão sem fonte: ${question.id}`);
  }
  return errors;
}

export function normalizeProgress(raw, blocks) {
  const knownIds = new Set(blocks.map(block => block.id));
  if (!raw || raw.version !== 2 || !Array.isArray(raw.completedBlockIds)) {
    return { version: 2, completedBlockIds: [] };
  }
  return {
    version: 2,
    completedBlockIds: [...new Set(raw.completedBlockIds.filter(id => knownIds.has(id)))]
  };
}

export function assessmentForPart(kind, questionBank, trackId) {
  if (trackId) return questionBank.filter(question => question.blockId === trackId);
  if (kind === 'core') return questionBank.filter(question => !question.blockId.startsWith('lab-') && !question.blockId.startsWith('track-'));
  if (kind === 'lab') return questionBank.filter(question => question.blockId.startsWith('lab-'));
  if (kind === 'track') return questionBank.filter(question => question.blockId.startsWith('track-'));
  return [];
}

export function buildFinalAssessment(progress, blocks, questionBank) {
  const normalized = normalizeProgress(progress, blocks);
  const completed = new Set(normalized.completedBlockIds);
  const orderByBlock = new Map(blocks.map(block => [block.id, block.order]));
  return questionBank
    .filter(question => completed.has(question.blockId))
    .toSorted((left, right) => orderByBlock.get(left.blockId) - orderByBlock.get(right.blockId) || left.order - right.order);
}

export function validResultsEndpoint(value) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(value);
}

export function scoreAssessment(questions, answers) {
  return Object.entries(answers)
    .filter(([id, answer]) => questions.find(question => question.id === id)?.correctIndex === answer)
    .length;
}
