import { NOTAS, PRESETS, TABLE_DATE } from '../data/notas.js';
import { computeNote, parseRate, formatMoney, formatRate } from './notas-core.js';

const root = document.getElementById('notas-root');
const state = { noteId: NOTAS[0].id, ibs: PRESETS[0].ibs, cbs: PRESETS[0].cbs, preset: PRESETS[0].id };

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([key, value]) => {
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else if (value !== false && value != null) node.setAttribute(key, value);
  });
  [].concat(children == null ? [] : children).forEach(child => {
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  });
  return node;
}

function renderNote(note) {
  const ibsRate = parseRate(state.ibs);
  const cbsRate = parseRate(state.cbs);
  const { lines, totals } = computeNote(note, ibsRate, cbsRate);

  const head = el('tr', {}, ['Item', 'Valor', 'CST', 'cClassTrib', 'Redução', 'IBS', 'CBS'].map((label, index) =>
    el('th', { class: index === 0 ? '' : 'num', scope: 'col' }, label)));

  const body = lines.map(({ item, calc }) => {
    const taxed = item.incide !== false;
    const reductionText = taxed ? (item.red ? item.red + '%' : '—') : 'sem incidência';
    const detail = el('small', {}, item.fundamento + (item.nota ? ' · ' + item.nota : ''));
    return el('tr', {}, [
      el('td', {}, [el('strong', {}, item.desc), el('br'), detail]),
      el('td', { class: 'num' }, formatMoney(item.valor)),
      el('td', { class: 'num' }, item.cst),
      el('td', { class: 'num code' }, item.cclass),
      el('td', { class: 'num' }, reductionText),
      el('td', { class: 'num' }, [formatMoney(calc.ibs), el('br'), el('small', {}, formatRate(calc.effIbs))]),
      el('td', { class: 'num' }, [formatMoney(calc.cbs), el('br'), el('small', {}, formatRate(calc.effCbs))])
    ]);
  });

  const foot = [
    ['Valor dos itens', totals.valor],
    ['IBS', totals.ibs],
    ['CBS', totals.cbs],
    ['Total da nota, com tributos por fora', totals.total]
  ].map(([label, value], index) => el('tr', { class: index === 3 ? 'grand' : '' }, [
    el('th', { colspan: '6', scope: 'row' }, label),
    el('td', { class: 'num' }, formatMoney(value))
  ]));

  return el('article', { class: 'nota', 'aria-label': 'Documento fiscal simulado' }, [
    el('header', {}, [
      el('p', { class: 'badge' }, 'SIMULAÇÃO DIDÁTICA · SEM VALIDADE FISCAL'),
      el('h2', {}, note.doc + ' · ' + note.ramo),
      el('dl', {}, [
        el('div', {}, [el('dt', {}, 'Emitente (fictício)'), el('dd', {}, note.emitente)]),
        el('div', {}, [el('dt', {}, 'Destinatário (fictício)'), el('dd', {}, note.destinatario)]),
        el('div', {}, [el('dt', {}, 'Semana do curso'), el('dd', {}, String(note.semana))])
      ])
    ]),
    el('div', { class: 'table-wrap' }, el('table', {}, [
      el('thead', {}, head), el('tbody', {}, body), el('tfoot', {}, foot)
    ])),
    el('p', { class: 'comment' }, note.comentario)
  ]);
}

function render() {
  const note = NOTAS.find(item => item.id === state.noteId);

  const tabs = el('nav', { class: 'tabs', 'aria-label': 'Modelos por ramo' }, NOTAS.map(item =>
    el('button', {
      type: 'button',
      class: item.id === state.noteId ? 'tab active' : 'tab',
      'aria-pressed': item.id === state.noteId ? 'true' : 'false',
      onclick: () => { state.noteId = item.id; render(); }
    }, item.ramo)));

  const presetSelect = el('select', {
    id: 'preset',
    onchange: event => {
      const preset = PRESETS.find(item => item.id === event.target.value);
      if (preset) { state.ibs = preset.ibs; state.cbs = preset.cbs; state.preset = preset.id; render(); }
    }
  }, PRESETS.map(preset => el('option', { value: preset.id, selected: preset.id === state.preset ? 'selected' : false }, preset.label)));

  const rateInput = (id, label, key) => el('label', { for: id }, [
    label,
    el('input', {
      id, type: 'text', inputmode: 'decimal', value: state[key], autocomplete: 'off',
      oninput: event => { state[key] = event.target.value; state.preset = ''; refreshNote(); }
    })
  ]);

  const params = el('section', { class: 'params', 'aria-label': 'Parâmetros' }, [
    el('h2', {}, 'Parâmetros'),
    el('label', { for: 'preset' }, ['Cenário', presetSelect]),
    el('div', { class: 'rates' }, [rateInput('cbs', 'Alíquota da CBS (%)', 'cbs'), rateInput('ibs', 'Alíquota do IBS (%)', 'ibs')]),
    el('p', { class: 'hint' }, 'Digite qualquer valor entre 0 e 100, com vírgula ou ponto. A CBS de 11,3% é o cálculo do TCU para 2027, ainda pendente de resolução do Senado. O IBS de 2027 não está preenchido porque depende de legislação de cada ente; informe o que quiser simular.')
  ]);

  const noteHolder = el('div', { id: 'nota-holder' }, renderNote(note));

  const footer = el('footer', { class: 'notice' }, [
    el('p', {}, 'Empresas e valores fictícios. Não é XML, não é DF-e e não tem autorização de uso: serve para estudar o enquadramento, não para emitir documento.'),
    el('p', {}, 'Códigos, reduções e dispositivos: tabela cClassTrib do Portal DF-e (SVRS), IT 2025.002, consultada em ' + TABLE_DATE + '. Confira a versão vigente antes de usar um código na prática. Tributo por fora: o total soma os tributos aos valores dos itens.')
  ]);

  root.replaceChildren(
    el('header', { class: 'page-head' }, [
      el('p', { class: 'eyebrow' }, 'Reforma Tributária do Consumo'),
      el('h1', {}, 'Documentos fiscais simulados por ramo'),
      el('p', {}, 'Cada modelo mostra como os itens recebem CST e cClassTrib e como a CBS e o IBS são calculados com a alíquota que você informar.')
    ]),
    tabs, params, noteHolder, footer
  );
}

function refreshNote() {
  const holder = document.getElementById('nota-holder');
  const note = NOTAS.find(item => item.id === state.noteId);
  if (holder) holder.replaceChildren(renderNote(note));
}

render();
