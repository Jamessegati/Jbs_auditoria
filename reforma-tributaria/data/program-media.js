import { VIDEO_LIBRARY } from './videos.js';

const videoByWeek = [
  ['INY8R4RONtg', 'nSPJ7BLdHt0'], ['5Ctxt_d0qlw'], ['j_PRxavYyuY', '6V8iD5bz73k'], ['Y-oRqBcdb7A'],
  ['NvjmAcBQCJY'], ['nDnEStz85Fo'], ['DW4aSW3FMJw'], ['ZtaosFm9CtU'], ['kP9QaEkVpWE'], ['Ap857nuAO8M'], [], [],
];

export const MEDIA_BY_WEEK = Object.fromEntries(Array.from({ length: 12 }, (_, index) => {
  const id = `week-${String(index + 1).padStart(2, '0')}`;
  const supportVideoIds = videoByWeek[index];
  return [id, { liveUrl: '', recordingUrl: '', supportVideoIds, supportVideos: VIDEO_LIBRARY.filter(video => supportVideoIds.includes(video.youtubeId)), materials: [] }];
}));
export const mediaForWeek = weekId => MEDIA_BY_WEEK[weekId] ?? null;
