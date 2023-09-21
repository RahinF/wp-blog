import { Clock } from '@assets/icons';
import { calcAvgReadingTime } from '@utils/calcAvgReadingTime';

interface Props {
  content: string;
}

const ReadingTime = ({ content }: Props) => {
  return (
    <>
      <Clock
        size={20}
        data-testid="icon-clock"
      />
      {calcAvgReadingTime(content)}
    </>
  );
};

export default ReadingTime;
