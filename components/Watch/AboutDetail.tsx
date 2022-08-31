import { Rating } from '@/components';
import { airDate } from '@/ultis/constants';

interface Props {
  title?: string;
  name: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  air_date?: string;
  vote_average: number;
}

const AboutDetail = ({
  title,
  name,
  overview,
  release_date,
  first_air_date,
  last_air_date,
  air_date,
  vote_average,
}: Props) => {
  return (
    <div className="[&>*~*]:mt-3">
      <h2 className="text-[24px] font-bold leading-6">{title || name}</h2>
      <p>{overview}</p>
      {release_date && <p>Release Date: {release_date}</p>}

      {first_air_date && last_air_date && (
        <p>Air Date: {airDate(first_air_date, last_air_date)}</p>
      )}
      {air_date && <p>Air Date: {air_date}</p>}

      <div className="w-[78px]">
        <Rating rating={vote_average} />
      </div>
    </div>
  );
};

export default AboutDetail;
