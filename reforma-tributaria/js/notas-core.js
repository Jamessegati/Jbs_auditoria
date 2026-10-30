// Cálculo da nota simulada. Sem dependências e sem recursos novos da linguagem,
// para poder ser executado e testado fora do navegador.

export function parseRate(text) {
  var cleaned = String(text == null ? '' : text).replace(/\s/g, '').replace(',', '.');
  var value = parseFloat(cleaned);
  if (isNaN(value) || value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

export function round2(value) {
  return Math.round(value * 100) / 100;
}

// Uma linha da nota. `item.incide === false` marca CST sem tributação (imunidade,
// não incidência, suspensão): o valor aparece, mas o imposto é zero.
export function computeItem(item, ibsRate, cbsRate) {
  var reduction = item.red || 0;
  var taxed = item.incide !== false;
  var factor = taxed ? (100 - reduction) / 100 : 0;
  var effIbs = ibsRate * factor;
  var effCbs = cbsRate * factor;
  return {
    effIbs: effIbs,
    effCbs: effCbs,
    ibs: round2(item.valor * effIbs / 100),
    cbs: round2(item.valor * effCbs / 100)
  };
}

export function computeNote(note, ibsRate, cbsRate) {
  var lines = [];
  var totals = { valor: 0, ibs: 0, cbs: 0 };
  for (var i = 0; i < note.itens.length; i++) {
    var item = note.itens[i];
    var result = computeItem(item, ibsRate, cbsRate);
    lines.push({ item: item, calc: result });
    totals.valor += item.valor;
    totals.ibs += result.ibs;
    totals.cbs += result.cbs;
  }
  totals.valor = round2(totals.valor);
  totals.ibs = round2(totals.ibs);
  totals.cbs = round2(totals.cbs);
  totals.total = round2(totals.valor + totals.ibs + totals.cbs);
  return { lines: lines, totals: totals };
}

export function formatMoney(value) {
  var negative = value < 0;
  var fixed = Math.abs(value).toFixed(2);
  var parts = fixed.split('.');
  var integer = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (negative ? '-' : '') + 'R$ ' + integer + ',' + parts[1];
}

export function formatRate(value) {
  var text = (Math.round(value * 10000) / 10000).toString().replace('.', ',');
  return text + '%';
}
