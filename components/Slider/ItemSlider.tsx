import { useRouter } from 'next/router';

import { Button } from '@/components';
import ItemList from './ItemList';
import { MovieItemProps } from '@/model/movie';

interface Props {
  title: string;
  items: MovieItemProps[];
}

const ItemSlider = ({ title, items }: Props) => {
  const router = useRouter();

  return (
    <div className="px-0.5 mb-12">
      <div className="flex align-center justify-between mb-2">
        <h2 className="flex-center-center text-[1.5rem] font-bold">{title}</h2>
        <Button small outline onClick={() => router.push(items[0].media_type)}>
          View More
        </Button>
      </div>
      <ItemList items={items} />
    </div>
  );
};

export default ItemSlider;
