import { ItemCard } from '@/components';
import { MovieItemProps } from '@/model/movie';

interface Props {
  items: MovieItemProps[];
}

const ItemGrid = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-6 gap-x-8 gap-y-16">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
