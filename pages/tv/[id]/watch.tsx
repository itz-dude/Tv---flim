import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import cn from 'classnames';

import { AboutDetail, Meta } from '@/components';
import { getTVSeasons } from '@/ultis/tmdbApi';
import { w500Image, xEpisodes, imageOriginal } from '@/ultis/constants';
import { TypeTvDetail, Season } from '@/model/tv';

interface Props {
  data: TypeTvDetail;
  seasons: Season[];
}

const Watch: NextPage<Props> = ({ data, seasons }) => {
  const [openId, setOpenId] = useState<number | undefined>();
  return (
    <>
      <Meta
        title={`${data.name} - Seasons - TV Film`}
        description="View Seasons"
        image={imageOriginal(data.backdrop_path)}
      />
      <div className="container mt-28 px-6">
        <div className="grid grid-cols-12">
          <div className="col-start-3 col-span-8">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 h-full w-full">
                <img
                  className="rounded-xl"
                  alt=""
                  src={w500Image(data.poster_path)}
                />
              </div>
              <div className="col-span-9">
                <AboutDetail
                  title={data.title}
                  name={data.name}
                  overview={data.overview}
                  first_air_date={data.last_air_date}
                  last_air_date={data.last_air_date}
                  vote_average={data.vote_average}
                />
              </div>
            </div>
            <p className="mt-20 mb-12 text-[1.5rem] font-semibold">Seasons</p>
            {seasons.map((item) => (
              <Fragment key={item.id}>
                <div
                  className={cn(
                    'grid grid-cols-12 gap-4 mt-12 rounded-3xl bg-neutral-900 cursor-pointer',
                    'group hover-hover:hover:bg-neutral-800',
                    'transition-[background-color] duration-300 ease-[ease]'
                  )}
                  onClick={() =>
                    openId === item.id
                      ? setOpenId(undefined)
                      : setOpenId(item.id)
                  }
                >
                  <div className="col-span-3">
                    <img
                      className="w-full rounded-3xl"
                      alt=""
                      src={w500Image(item.poster_path)}
                    />
                  </div>
                  <div className="col-span-9">
                    <div className="flex h-full">
                      <div className="shrink-0 flex items-center">
                        <div>
                          <p
                            className="text-2xl font-bold hover-hover:group-hover:text-main
                        transition-[color] duration-300 ease-[ease]"
                          >
                            {item.name}
                          </p>
                          <p className="text-lg font-semibold text-neutral-500">
                            {xEpisodes(item.episodes.length)}
                          </p>
                        </div>
                      </div>
                      {item.overview && (
                        <div className="mx-8 my-2">
                          <p className="">{item.overview}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="[&>*]:mt-8">
                  {openId === item.id &&
                    item.episodes.map((episode) => (
                      <Link
                        key={episode.id}
                        href={{
                          pathname: `/tv/${data.id}/episode`,
                          query: {
                            season: item.season_number,
                            episode: episode.episode_number,
                          },
                        }}
                      >
                        <a
                          className="flex items-center ml-4 rounded-xl bg-neutral-900 group hover-hover:hover:bg-neutral-800
                      transition-[background-color] duration-300 ease-[ease] cursor-pointer"
                        >
                          <div className="w-8 flex-center-center">
                            <p className="text-[18px] font-medium">
                              {episode.episode_number}
                            </p>
                          </div>
                          <img
                            className="w-[30%] py-2 rounded-2xl"
                            alt=""
                            src={w500Image(episode.still_path)}
                          />
                          <div className="ml-4">
                            <p
                              className="text-[18px] font-medium hover-hover:group-hover:text-main
                        transition-[color] duration-300 ease-[ease]"
                            >
                              {episode.name}
                            </p>
                            <p className="text-gray-500 font-medium">
                              {episode.air_date}
                            </p>
                          </div>
                        </a>
                      </Link>
                    ))}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const tvId = Number(params!.id);
    const response = await getTVSeasons(tvId);
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

export default Watch;
