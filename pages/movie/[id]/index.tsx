import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ItemDetailView, Meta } from '@/components';
import { MovieItemProps, Cast, VideoTrailer } from '@/model/movie';
import { imageOriginal } from '@/ultis/constants';
import { getMovieDetails } from '@/ultis/tmdbApi';

interface Props {
  data: MovieItemProps;
  casts: Cast[];
  videos: VideoTrailer[];
  similar: MovieItemProps[];
}

const Movie: NextPage<Props> = ({ data, casts, videos, similar }) => {
  return (
    <>
      <Meta
        title={`${data.title} - Movie - TV Film`}
        description="Viewing Info"
        image={imageOriginal(data.backdrop_path)}
      />
      <ItemDetailView
        data={data}
        casts={casts}
        videos={videos}
        similar={similar}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = Number(params!.id);

  try {
    const response = await getMovieDetails(movieId);
    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Movie;
