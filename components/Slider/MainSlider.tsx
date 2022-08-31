// import { useState } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activeModalId } from '@/redux/modalSlice';
import { MovieItemProps } from '@/model/movie';
import { Modal, MainSliderItem } from '@/components';

SwiperCore.use([Autoplay]);

interface Props {
  movieItems: MovieItemProps[];
}

const MainSlider = ({ movieItems }: Props) => {
  const dispatch = useAppDispatch();
  const { idVisible, trailerEndPoint } = useAppSelector((state) => state.modal);
  const closeModal = () => {
    dispatch(activeModalId(undefined));
  };

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <MainSliderItem isActive={isActive} item={item} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item) => (
        <Modal
          key={item.id}
          id={item.id}
          onClose={closeModal}
          trailerEndPoint={idVisible === item.id ? trailerEndPoint : undefined}
          isVisible={idVisible === item.id}
        />
      ))}
    </div>
  );
};

export default MainSlider;
