export const VIDEO_LIBRARY = [
  { youtubeId: 'INY8R4RONtg', blockId: 'fundamentos', title: 'IVA dual e principais conceitos', note: 'Vídeo de 2023: use as fontes oficiais para a regra vigente.' },
  { youtubeId: 'nSPJ7BLdHt0', blockId: 'fundamentos', title: 'IVA dual, IBS, CBS e Imposto Seletivo', note: 'Resumo para revisar a arquitetura do novo modelo.' },
  { youtubeId: '5Ctxt_d0qlw', blockId: 'dfe', title: 'Regulamentação do IBS e da CBS', note: 'Confira sempre o texto consolidado e os leiautes vigentes.' },
  { youtubeId: 'j_PRxavYyuY', blockId: 'apuracao-assistida', title: 'Apuração assistida e obrigações acessórias', note: 'Apoio introdutório; valide as etapas nos canais oficiais.' },
  { youtubeId: '6V8iD5bz73k', blockId: 'devolucoes-cashback', title: 'Obrigações acessórias e cashback na reforma', note: 'Compare o vídeo com as normas e o cronograma operacional atual.' },
  { youtubeId: 'Y-oRqBcdb7A', blockId: 'transicao', title: 'Efeitos da reforma na Zona Franca de Manaus', note: 'Contexto de 2024; consulte EC 132 e LC 214 para regras vigentes.' },
  { youtubeId: 'ZtaosFm9CtU', blockId: 'lab-comercio-varejo', title: 'Reforma tributária para empreendedores', note: 'Apoio para revisar operações, preços e documentos.' },
  { youtubeId: 'DW4aSW3FMJw', blockId: 'lab-simples', title: 'Simples Nacional puro ou híbrido', note: 'A opção depende das regras, prazos e dados vigentes da empresa.' },
  { youtubeId: 'nDnEStz85Fo', blockId: 'track-imoveis-avancado', title: 'IBS e CBS na locação de imóveis', note: 'Compare os exemplos com os requisitos de cada locador e contrato.' },
  { youtubeId: 'Ap857nuAO8M', blockId: 'track-is-avancado', title: 'Entenda o Imposto Seletivo', note: 'Confira os bens e serviços alcançados na legislação posterior.' },
  { youtubeId: 'kP9QaEkVpWE', blockId: 'track-regimes', title: 'Benefícios fiscais federais em 2026', note: 'Analise benefícios federais separadamente das regras de IBS e CBS.' },
  { youtubeId: 'NvjmAcBQCJY', blockId: 'track-financeiros-dere', title: 'Quem deve apresentar a DeRE?', note: 'Confirme enquadramento e orientações oficiais do Comitê Gestor.' },
];

export function videosForBlock(blockId) {
  return VIDEO_LIBRARY.filter(video => video.blockId === blockId);
}

