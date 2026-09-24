// Authors supply an explained correct answer and three explained distractors.
// Presentation rotates the options without separating them from their rationale.
export const q = (prompt, right, wrong, locator, sourceId = 'lc214') => ({ prompt, choices: [right, ...wrong], locator, sourceId });
export function assembleQuestions(weekNumber, rows) {
  const weekId = `week-${String(weekNumber).padStart(2, '0')}`;
  return rows.map((row, index) => {
    const correctIndex = (weekNumber + index) % 4;
    const choices = [...row.choices];
    const correct = choices.shift();
    choices.splice(correctIndex, 0, correct);
    return { id: `${weekId}-${index + 1}`, weekId, prompt: row.prompt, correctIndex,
      options: choices.map(choice => choice[0]), optionExplanations: choices.map(choice => choice[1]),
      explanation: correct[1], sourceId: row.sourceId,
      legalRefs: [{ sourceId: row.sourceId, locator: row.locator }] };
  });
}
