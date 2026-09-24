import { PROGRAM_WEEKS } from '../data/program.js';
import { PROGRAM_SOURCES } from '../data/program-sources.js';
import { mediaForWeek } from '../data/program-media.js';
import { createAudioController } from './audio-controller.js';
import { initialLearningState, normalizeLearningState } from './program-core.js';
import { weekMarkup } from './program-view.js';

const key = 'rtc-program-learning-v1';
const sources = new Map(PROGRAM_SOURCES.map(source => [source.id, source]));
const audio = createAudioController({ speechSynthesis: window.speechSynthesis, Utterance: window.SpeechSynthesisUtterance });
let state;
try { state = normalizeLearningState(JSON.parse(localStorage.getItem(key) || '{}'), PROGRAM_WEEKS); } catch { state = initialLearningState(); }
const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} };

function render() {
  const approved = Object.values(state.assessments).filter(item => item.passed).length;
  document.querySelector('#course-root').innerHTML = `<a class="skip-link" href="#program">Pular para o programa</a><div class="program-shell"><aside class="program-rail"><strong>RTC · Especialização</strong><p>12 semanas · 72 horas</p><nav aria-label="Semanas">${PROGRAM_WEEKS.map(week => `<a href="#${week.id}">${String(week.number).padStart(2, '0')} · ${week.title}</a>`).join('')}</nav></aside><main id="program"><header class="program-hero"><p>FORMAÇÃO FISCAL E CONTÁBIL</p><h1>Especialização em Reforma Tributária do Consumo</h1><p>Da regra à rotina: leitura aprofundada, fluxos decisórios, laboratório, evidências e avaliação.</p><div><b>${approved}/12 semanas aprovadas</b> <a href="questionario.html">Abrir avaliações</a></div></header><section class="program-overview"><h2>Ritmo semanal</h2><p>2h de estudo orientado, 2h de aula ao vivo ou gravação e 2h de laboratório, avaliação e entregas. A aprovação exige 80% em cada semana.</p></section>${PROGRAM_WEEKS.map(week => weekMarkup(week, sources, mediaForWeek(week.id))).join('')}<section id="deliverables" class="deliverables"><h2>Entregáveis finais</h2><p>Construa sua matriz de impacto e plano de implantação 2026–2033. Os rascunhos são armazenados neste navegador.</p><label>Matriz de impacto<textarea data-draft="impactMatrix" placeholder="Operação, setor, cenário, IBS/CBS/IS, cadastro, documento, risco, fonte, responsável, prazo e evidência."></textarea></label><label>Plano de implantação<textarea data-draft="implementationPlan" placeholder="Marco, dependência de ERP, controle, responsável, capacitação, fonte, prazo e revisão normativa."></textarea></label></section></main></div>`;
  document.querySelectorAll('[data-todo]').forEach(input => input.addEventListener('change', event => { const { week, todo } = event.currentTarget.dataset; const items = new Set(state.todoByWeek[week] || []); event.currentTarget.checked ? items.add(todo) : items.delete(todo); state = { ...state, todoByWeek: { ...state.todoByWeek, [week]: [...items] } }; save(); }));
  document.querySelectorAll('[data-draft]').forEach(area => { area.value = state.deliverables[area.dataset.draft].notes || ''; area.addEventListener('input', () => { state.deliverables[area.dataset.draft].notes = area.value; save(); }); });
  document.querySelectorAll('[data-speak]').forEach(button => button.addEventListener('click', event => { const chapter = event.currentTarget.closest('.chapter'); audio.speak(chapter.dataset.audioText, chapter.querySelector('[data-rate]').value); }));
  document.querySelectorAll('[data-stop]').forEach(button => button.addEventListener('click', () => audio.stop()));
  if (!audio.supported) document.querySelectorAll('[data-audio-controls]').forEach(node => node.innerHTML = '<p class="audio-unavailable">Áudio não disponível neste navegador. O texto completo permanece disponível.</p>');
}
document.addEventListener('DOMContentLoaded', render);

