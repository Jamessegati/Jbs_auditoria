// Quadros de apoio dentro dos capítulos. Um parágrafo que começa com "::tag " vira quadro.
// Tags: exemplo, atencao, dica, passos, glossario, codigos. Em passos, glossario e codigos, os itens vão separados por " | ".

export var CALLOUT_LABELS = {
  exemplo: 'Exemplo prático',
  atencao: 'Atenção: pegadinha',
  dica: 'Dica do fiscal',
  passos: 'Na prática, faça assim',
  glossario: 'Glossário',
  codigos: 'Códigos da tabela'
};

export function splitCallout(paragraph) {
  var match = /^::(\w+)\s+([\s\S]*)$/.exec(String(paragraph));
  if (!match || !CALLOUT_LABELS[match[1]]) return { tag: '', label: '', text: String(paragraph) };
  return { tag: match[1], label: CALLOUT_LABELS[match[1]], text: match[2] };
}

export function plainText(paragraph) {
  var parts = splitCallout(paragraph);
  return parts.tag ? parts.label + ': ' + parts.text.split(' | ').join('; ') : parts.text;
}