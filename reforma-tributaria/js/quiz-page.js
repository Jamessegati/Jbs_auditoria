import { QUESTION_BANK } from '../data/questions.js';
import { COURSE_BLOCKS } from '../data/course.js';
import { assessmentForPart, buildFinalAssessment, normalizeProgress, scoreAssessment } from './course-core.js';

const progressKey = 'rtc-course-progress-v2';
let questions = [];
let index = 0;
let answers = {};
let activeKind = 'core';
let activeTrackId;

const readProgress = () => {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(progressKey) || '{}'), COURSE_BLOCKS); }
  catch { return normalizeProgress({}, COURSE_BLOCKS); }
};
const escape = value => String(value).replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char]);
const partTitles = { core: 'Núcleo operacional', lab: 'Laboratórios', track: 'Trilhas setoriais', final: 'Avaliação integradora' };

function choose(kind, trackId) {
  activeKind = kind; activeTrackId = trackId;
  questions = kind === 'final' ? buildFinalAssessment(readProgress(), COURSE_BLOCKS, QUESTION_BANK) : assessmentForPart(kind, QUESTION_BANK, trackId);
  index = 0; answers = {}; render();
}

function trackChoices() {
  if (activeKind !== 'track') return '';
  return `<div class="quiz-choice" aria-label="Selecionar trilha">${COURSE_BLOCKS.filter(block => block.kind === 'track').map(block => `<button type="button" data-track="${block.id}">${escape(block.title)}</button>`).join('')}</div>`;
}

function renderResult(root) {
  const score = scoreAssessment(questions, answers);
  const missed = questions.filter(question => answers[question.id] !== question.correctIndex);
  const review = [...new Set(missed.map(question => question.blockId))].map(id => COURSE_BLOCKS.find(block => block.id === id)?.title).filter(Boolean);
  root.querySelector('.quiz-card').innerHTML = `<div class="quiz-meta"><span>Resultado local</span><span>${score}/${questions.length}</span></div><h2>${score === questions.length ? 'Revisão concluída.' : 'Use o resultado para orientar a revisão.'}</h2><p>${review.length ? `Volte aos blocos: ${escape(review.join(', '))}.` : 'Você acertou todas as questões desta seleção.'}</p><div class="quiz-actions"><button id="restart" type="button">Refazer esta avaliação</button><a class="button" href="index.html">Voltar ao curso</a></div>`;
  root.querySelector('#restart').addEventListener('click', () => choose(activeKind, activeTrackId));
}

function render() {
  const root = document.querySelector('#quiz-root');
  const selectedTitle = activeTrackId ? COURSE_BLOCKS.find(block => block.id === activeTrackId)?.title : partTitles[activeKind];
  const selector = `<div class="quiz-choice"><button type="button" data-kind="core">Núcleo</button><button type="button" data-kind="lab">Laboratórios</button><button type="button" data-kind="track">Trilhas</button><button type="button" data-kind="final">Exame final</button></div>${trackChoices()}`;
  root.innerHTML = `<a class="skip-link" href="#assessment">Pular para as questões</a><main class="quiz-shell" id="assessment"><header class="quiz-head"><div><h1>Avaliações que continuam o estudo.</h1><p>Feedback imediato, por parte do curso, e exame final formado somente pelos blocos concluídos neste navegador.</p></div><a class="button-quiet" href="index.html">Voltar ao curso</a></header>${selector}<section class="quiz-card" aria-live="polite"></section></main>`;
  root.querySelectorAll('[data-kind]').forEach(button => button.addEventListener('click', () => choose(button.dataset.kind)));
  root.querySelectorAll('[data-track]').forEach(button => button.addEventListener('click', () => choose('track', button.dataset.track)));
  const card = root.querySelector('.quiz-card');
  const question = questions[index];
  if (!question) {
    card.innerHTML = `<div class="empty-state"><h2>Nenhuma questão disponível ainda.</h2><p>Para o exame final, conclua ao menos um bloco no curso. Para as trilhas, escolha uma trilha acima.</p><a class="button" href="index.html">Ir para o curso</a></div>`;
    return;
  }
  const score = scoreAssessment(questions, answers);
  const options = question.options.map((option, optionIndex) => `<label><input type="radio" name="answer" value="${optionIndex}" ${answers[question.id] === optionIndex ? 'checked' : ''}><span>${escape(option)}</span></label>`).join('');
  const answered = Number.isInteger(answers[question.id]);
  const feedback = answered ? `<aside class="feedback"><b>${answers[question.id] === question.correctIndex ? 'Resposta correta.' : `Gabarito: ${escape(question.options[question.correctIndex])}`}</b><p>${escape(question.explanation)}</p></aside>` : '';
  card.innerHTML = `<div class="quiz-meta"><span>${escape(selectedTitle || partTitles[activeKind])}</span><span>${index + 1}/${questions.length} · ${score} acertos</span></div><h2>${escape(question.prompt)}</h2><div class="quiz-options">${options}</div>${feedback}<div class="quiz-actions"><button id="previous" type="button" ${index === 0 ? 'disabled' : ''}>Anterior</button><button id="next" type="button" ${answered ? '' : 'disabled'}>${index === questions.length - 1 ? 'Ver resultado' : 'Próxima questão'}</button></div>`;
  root.querySelectorAll('[name="answer"]').forEach(input => input.addEventListener('change', event => { answers[question.id] = Number(event.target.value); render(); }));
  root.querySelector('#previous').addEventListener('click', () => { index -= 1; render(); });
  root.querySelector('#next').addEventListener('click', () => { if (index === questions.length - 1) renderResult(root); else { index += 1; render(); } });
}

document.addEventListener('DOMContentLoaded', () => choose('core'));

