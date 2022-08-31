import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ItemDetailView, Meta } from '@/components';
import { MovieItemProps, Cast, VideoTrailer } from '@/model/movie';
import { imageOriginal } from '@/ultis/constants';
import { getTVDetails } from '@/ultis/tmdbApi';

interface Props {
  data: MovieItemProps;
  casts: Cast[];
  videos: VideoTrailer[];
  similar: MovieItemProps[];
}

const TV: NextPage<Props> = ({ data, casts, videos, similar }) => {
  return (
    <>
      <Meta
        title={`${data.name} - TV season - TV Film`}
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
  const tvId = Number(params!.id);

  try {
    const response = await getTVDetails(tvId);
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

export default TV;
