import { decode } from 'html-entities';
import humanizeDuration from 'humanize-duration';

export const calcAvgReadingTime = (content: string) => {
  const decodedContent = decode(content);
  const removedHTMLTags = decodedContent.replace(/<[^>]*>?/gm, '');
  const removedLineBreak = removedHTMLTags.replace(/(\r\n|\n|\r)/gm, ' ');
  const trimmedWhiteSpace = removedLineBreak.replace(/\s+/g, ' ').trim();
  const wordCount = trimmedWhiteSpace.split(' ').length;

  const averageWordReadPerMin = 238;
  const wordsReadPerSec = averageWordReadPerMin / 60;
  const readingTime = wordsReadPerSec * wordCount * 1000;

  const humanizedText = humanizeDuration(readingTime, {
    units: ['h', 'm'],
    maxDecimalPoints: 0,
    conjunction: ' and ',
    largest: 1,
    round: true,
  });

  const isPlural = humanizedText.at(-1) === 's';

  let readingTimeString = humanizedText;

  if (isPlural) {
    readingTimeString = humanizedText.slice(0, -1);
  }

  return `${readingTimeString} read`;
};
