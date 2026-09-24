import { PROGRAM_WEEKS } from '../data/program.js';
import { buildFinalExam, questionsForWeek } from '../data/week-questions.js';
import { initialLearningState, normalizeLearningState, recordAssessment } from './program-core.js';
import { answerFeedback } from './program-view.js';
import { PROGRAM_SOURCES } from '../data/program-sources.js';
const sources = new Map(PROGRAM_SOURCES.map(source => [source.id, source]));

const key = 'rtc-program-learning-v1';
let weekId = location.hash.slice(1) || 'week-01';
let index = 0, answers = {};
const load = () => { try { return normalizeLearningState(JSON.parse(localStorage.getItem(key) || '{}'), PROGRAM_WEEKS); } catch { return initialLearningState(); } };
const save = state => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} };
const esc = value => String(value).replace(/[&<>]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;' })[c]);

function render() {
  const root = document.querySelector('#quiz-root');
  const final = weekId === 'final';
  const week = PROGRAM_WEEKS.find(item => item.id === weekId) || PROGRAM_WEEKS[0];
  const questions = final ? buildFinalExam() : questionsForWeek(week.id);
  const question = questions[index];
  const selector = `<nav class="quiz-choice" aria-label="Avaliações semanais">${PROGRAM_WEEKS.map(item => `<button data-week="${item.id}" type="button">${item.number}</button>`).join('')}<button data-week="final" type="button">Final</button></nav>`;
  if (!question) { root.innerHTML = `<main class="quiz-shell"><h1>Avaliações</h1>${selector}<p>Nenhuma questão configurada.</p></main>`; return; }
  const score = Object.entries(answers).filter(([id, answer]) => questions.find(q => q.id === id)?.correctIndex === answer).length;
  const feedback = answerFeedback(question, answers[question.id], sources);
  root.innerHTML = `<main class="quiz-shell"><header class="quiz-head"><div><p>${final ? 'EXAME FINAL' : `SEMANA ${week.number}`} · META 80%</p><h1>${final ? 'Avaliação integradora' : esc(week.title)}</h1><p>${index + 1}/${questions.length} · ${score} acertos</p></div><a href="index.html#${final ? 'deliverables' : week.id}">Voltar ao curso</a></header>${selector}<section class="quiz-card"><h2>${esc(question.prompt)}</h2><div class="quiz-options">${question.options.map((option, optionIndex) => `<label><input type="radio" name="answer" value="${optionIndex}" ${answers[question.id] === optionIndex ? 'checked':''}><span>${esc(option)}</span></label>`).join('')}</div>${feedback}<div class="quiz-actions"><button id="previous" ${index === 0 ? 'disabled':''}>Anterior</button><button id="next" ${Number.isInteger(answers[question.id]) ? '':'disabled'}>${index === questions.length - 1 ? 'Concluir avaliação':'Próxima'}</button></div></section></main>`;
  root.querySelectorAll('[data-week]').forEach(button => button.addEventListener('click', () => { weekId = button.dataset.week; index = 0; answers = {}; location.hash = weekId; render(); }));
  root.querySelectorAll('[name="answer"]').forEach(input => input.addEventListener('change', event => { answers[question.id] = Number(event.target.value); render(); }));
  root.querySelector('#previous').addEventListener('click', () => { index--; render(); });
  root.querySelector('#next').addEventListener('click', () => { if (index < questions.length - 1) { index++; render(); return; } const state = recordAssessment(load(), final ? 'final' : week.id, score, questions.length); save(state); const passed = state.assessments[final ? 'final' : week.id].passed; root.querySelector('.quiz-card').innerHTML = `<h2>${passed ? 'Aprovado.' : 'Refaça após revisar.'}</h2><p>Resultado: ${score}/${questions.length} · ${state.assessments[final ? 'final' : week.id].percent}%. A meta é 80%.</p><button id="retry">Refazer avaliação</button> <a href="index.html#${final ? 'deliverables' : week.id}">Voltar ao curso</a>`; root.querySelector('#retry').addEventListener('click', () => { index = 0; answers = {}; render(); }); });
}
document.addEventListener('DOMContentLoaded', render);
