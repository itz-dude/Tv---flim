import Cn from 'classnames';
import { FaStar } from 'react-icons/fa';

interface Props {
  rating: number;
  className?: string;
  size?: number;
}

const Rating = ({ rating, className, size = 14 }: Props) => {
  return (
    <div
      className={Cn(
        className,
        'px-3 flex-center-center text-yellow-500 bg-slate-800 rounded-3xl'
      )}
    >
      <p className="mr-1" style={{ fontSize: `${size + 2}px` }}>
        {rating.toFixed(1)}
      </p>

      <FaStar size={size} />
    </div>
  );
};

export default Rating;
