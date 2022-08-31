import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel, FreeMode } from 'swiper';

import ItemCard from './ItemCard';
import { MovieItemProps } from '@/model/movie';

interface Props {
  items: MovieItemProps[];
  vertical?: boolean;
}

// SwiperCore.use([Keyboard]);

const ItemList = ({ items, vertical = false }: Props) => {
  const styleSlide = {
    width: vertical ? '100%' : '15%',
    // height: '15%',
  };
  return (
    <Swiper
      direction={vertical ? 'vertical' : 'horizontal'}
      modules={[Scrollbar, Mousewheel, FreeMode]}
      scrollbar={{
        draggable: true,
      }}
      freeMode={{
        enabled: true,
      }}
      grabCursor={true}
      spaceBetween={10}
      slidesPerView={'auto'}
      mousewheel={{
        forceToAxis: true,
      }}
      keyboard={{ enabled: true }}
      style={{ maxHeight: '100%' }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} style={styleSlide}>
          <ItemCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ItemList;
