import { Cast } from '@/model/movie';
import { w500Image } from '@/ultis/constants';

interface Props {
  item: Cast;
}

const CastItem = ({ item }: Props) => {
  return (
    <div className="text-center [&>*]:mb-1">
      <div
        className="pt-[120%] bg-top bg-cover bg-no-repeat rounded-3xl"
        style={{ backgroundImage: `url(${w500Image(item.profile_path)})` }}
      />
      <p>{item.name}</p>
      <p className="text-main">{item.character}</p>
    </div>
  );
};

export default CastItem;
