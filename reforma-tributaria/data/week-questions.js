import { assembleQuestions } from './questions/helpers.js';
import { COMMON_QUESTIONS } from './questions/common.js';
import { SECTOR_A_QUESTIONS } from './questions/sectors-a.js';
import { SECTOR_B_QUESTIONS } from './questions/sectors-b.js';

const authored = { ...COMMON_QUESTIONS, ...SECTOR_A_QUESTIONS, ...SECTOR_B_QUESTIONS };
export const WEEK_QUESTION_BANK = Object.entries(authored).flatMap(([number, rows]) => assembleQuestions(Number(number), rows));
export const questionsForWeek = weekId => WEEK_QUESTION_BANK.filter(question => question.weekId === weekId);
// Revisit the two application cases from each week; this is formative, not a supervised certification.
export const buildFinalExam = () => Object.keys(authored).flatMap(number => questionsForWeek(`week-${String(number).padStart(2, '0')}`).slice(-2));
