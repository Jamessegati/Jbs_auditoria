import { COURSE_BLOCKS } from '../data/course.js';
import { SOURCE_CATALOG } from '../data/sources.js';
import { videosForBlock } from '../data/videos.js';
import { normalizeProgress } from './course-core.js';

const progressKey = 'rtc-course-progress-v2';
const themeKey = 'rtc-course-theme-v1';
const sources = new Map(SOURCE_CATALOG.map(source => [source.id, source]));
const groups = [
  ['core', 'Núcleo operacional', 'A base obrigatória para transformar regras, documentos e sistemas em uma rotina verificável.'],
  ['lab', 'Laboratórios', 'Casos para praticar decisão, evidência e conciliação sem simular uma apuração oficial.'],
  ['track', 'Trilhas setoriais', 'Aprofundamentos opcionais para operações e regimes que pedem atenção específica.'],
];

const escape = value => String(value).replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char]);
const getProgress = () => {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(progressKey) || '{}'), COURSE_BLOCKS); }
  catch { return normalizeProgress({}, COURSE_BLOCKS); }
};
const setProgress = progress => localStorage.setItem(progressKey, JSON.stringify(progress));
const isDark = () => localStorage.getItem(themeKey) === 'dark';

function sourceLinks(block) {
  return block.sourceIds.map(id => {
    const source = sources.get(id);
    return source ? `<a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)} · ${escape(source.agency)}</a>` : '';
  }).join('');
}

function videoPanel(block) {
  return videosForBlock(block.id).map(video => `<div class="video-panel">
    <div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${video.youtubeId}" title="Vídeo: ${escape(video.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="video-copy"><h3>${escape(video.title)}</h3><p>${escape(video.note)}</p><a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" rel="noopener noreferrer">Abrir no YouTube</a></div>
  </div>`).join('');
}

function blockMarkup(block, done) {
  const notes = block.cards.map(card => `<div class="learning-note"><strong>${escape(card.status)}</strong><p><b>${escape(card.title)}.</b> ${escape(card.body)}</p></div>`).join('');
  const practice = block.practice ? `<section class="practice"><h3>Roteiro de prática</h3><ol>${block.practice.steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol></section>` : '';
  const caseStudy = block.caseStudy ? `<section class="case-study"><h3>Caso guiado</h3><ul>${[...block.caseStudy.facts, ...block.caseStudy.decisionPoints, ...block.caseStudy.evidence].map(item => `<li>${escape(item)}</li>`).join('')}</ul></section>` : '';
  return `<details class="lesson-block" id="${block.id}">
    <summary><span class="lesson-index">${String(block.order).padStart(2, '0')}</span><span class="lesson-title">${escape(block.title)}</span><span class="lesson-kind">${block.required ? 'Obrigatório' : 'Opcional'}</span></summary>
    <div class="lesson-detail"><div><p class="lesson-objective">${escape(block.objectives[0] || 'Aplicar o roteiro de análise à operação concreta.')}</p><div class="learning-notes">${notes}</div>${practice}${caseStudy}</div>
    <aside class="source-panel"><h3>Fontes de consulta</h3><div class="source-links">${sourceLinks(block)}</div><button class="button complete-control" type="button" data-complete="${block.id}" aria-pressed="${done}">${done ? 'Bloco concluído' : 'Marcar como concluído'}</button></aside>${videoPanel(block)}</div>
  </details>`;
}

function render() {
  const root = document.querySelector('#course-root');
  const progress = getProgress();
  const done = new Set(progress.completedBlockIds);
  document.documentElement.dataset.theme = isDark() ? 'dark' : 'light';
  const summaries = groups.map(([kind, label]) => {
    const blocks = COURSE_BLOCKS.filter(block => block.kind === kind);
    return `<span><b>${blocks.filter(block => done.has(block.id)).length}/${blocks.length}</b> ${label}</span>`;
  }).join('');
  const sections = groups.map(([kind, label, description]) => `<section class="course-section" id="${kind}"><div class="section-lead"><h2>${label}</h2><p>${description}</p></div><div class="lesson-list">${COURSE_BLOCKS.filter(block => block.kind === kind).map(block => blockMarkup(block, done.has(block.id))).join('')}</div></section>`).join('');
  root.innerHTML = `<a class="skip-link" href="#course">Pular para o conteúdo</a><div class="site-shell"><aside class="side-rail" id="side-rail"><a class="brand" href="#course"><span class="brand-mark">RTC</span><span>Reforma Tributária do Consumo</span></a><p class="rail-label">Percurso de estudo</p><nav class="rail-nav" aria-label="Navegação do curso"><a href="#core">Núcleo operacional</a><a href="#lab">Laboratórios</a><a href="#track">Trilhas setoriais</a><a href="questionario.html">Avaliações</a></nav><div class="rail-foot"><strong>Material de estudo</strong>Consulte a norma e a documentação técnica aplicáveis antes de orientar uma operação concreta.</div></aside><div class="main-shell"><header class="topbar"><span class="crumb">Curso operacional · RTC</span><div class="top-actions"><button class="button-quiet" id="theme-toggle" type="button">${isDark() ? 'Tema claro' : 'Tema escuro'}</button><a class="button" href="questionario.html">Abrir avaliações</a><button class="button-quiet mobile-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="side-rail">Menu</button></div></header><main class="course-main" id="course"><section class="hero-stage"><div><h1>Da regra à <em>rotina</em> fiscal.</h1><p>Uma formação para equipes fiscais e contábeis organizarem decisões, evidências e testes da Reforma Tributária do Consumo com fontes oficiais sempre ao alcance.</p><div class="hero-actions"><a class="button" href="#core">Começar pelo núcleo</a><a class="button-quiet" href="#track">Ver trilhas</a></div></div><div class="decision-sheet" aria-label="Exemplo de uma trilha de decisão fiscal"><div class="sheet-head"><span>Etapa</span><span>Verificação</span><span>Status</span></div><div class="sheet-row"><span>01</span><strong>Operação e destino</strong><span>mapear</span></div><div class="sheet-row"><span>02</span><strong>Cadastro e documento</strong><span>validar</span></div><div class="sheet-row"><span>03</span><strong>Fonte e evidência</strong><span>registrar</span></div><div class="sheet-row"><span>04</span><strong>Apuração e exceção</strong><span>conciliar</span></div><p class="sheet-foot"><b>O resultado do curso não é uma guia.</b> É uma decisão que outro profissional consegue revisar.</p></div></section><section class="progress-panel" aria-label="Andamento do curso"><p>O andamento fica neste navegador. Marque os blocos concluídos para compor o exame final com as áreas que você efetivamente percorreu.</p><div class="progress-summary">${summaries}</div></section>${sections}<section class="course-close"><div><h2>Feche o ciclo com uma revisão aplicável.</h2><p>Os questionários do núcleo, dos laboratórios e de cada trilha reforçam o aprendizado antes da avaliação integradora adaptativa.</p></div><a class="button" href="questionario.html">Ir para avaliações</a></section><footer class="site-footer">Atualizado em 22/09/2026 · Conteúdo didático; verifique a legislação e os canais oficiais vigentes.</footer></main></div></div>`;
  root.querySelectorAll('[data-complete]').forEach(button => button.addEventListener('click', () => {
    const next = getProgress(); const ids = new Set(next.completedBlockIds); ids.add(button.dataset.complete);
    setProgress({ version: 2, completedBlockIds: [...ids] }); render();
  }));
  root.querySelector('#theme-toggle').addEventListener('click', () => { localStorage.setItem(themeKey, isDark() ? 'light' : 'dark'); render(); });
  root.querySelector('#menu-toggle').addEventListener('click', event => { const rail = root.querySelector('#side-rail'); rail.classList.toggle('is-open'); event.currentTarget.setAttribute('aria-expanded', String(rail.classList.contains('is-open'))); });
}

document.addEventListener('DOMContentLoaded', render);

