import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';

import { Button, Rating } from '@/components';
import { MovieItemProps } from '@/model/movie';
import { w500Image } from '@/ultis/constants';

interface Props {
  item: MovieItemProps;
}

const ItemCard = ({ item }: Props) => {
  const bg = w500Image(item.poster_path || item.backdrop_path);
  return (
    <Link href={`/${item.media_type}/${item.id}`}>
      <a>
        <div className="mb-8">
          <div
            className="group relative rounded-3xl bg-center bg-cover bg-no-repeat pt-[160%] mb-2
            before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 before:rounded-3xl
            before:transition-[opacity] before:duration-300 before:ease-[ease]
            hover-hover:hover:before:opacity-80
            "
            style={{ backgroundImage: `url(${bg})` }}
          >
            <Rating
              rating={item.vote_average}
              className="absolute top-1 left-2/4 translate-x-[-50%] group-hover:opacity-80
              transition-[opacity] duration-300 ease-[ease]
              "
            />
            <Button
              className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]
                  group-hover:opacity-100 opacity-0
                  group-hover:scale-100 scale-0
                  transition-[transform,opacity] duration-[300ms,300ms] ease-[ease,ease]
                  "
            >
              <FaPlayCircle size={40} />
            </Button>
          </div>
          <p className="flex-center-center font-bold text-[18px]">
            {item.title || item.name}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ItemCard;
