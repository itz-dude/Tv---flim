import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';

import { getTVSeasons } from '@/ultis/tmdbApi';
import { embedEpisode, w500Image, imageOriginal } from '@/ultis/constants';
import { TypeTvDetail, Season, Episode } from '@/model/tv';
import { AboutDetail, Meta } from '@/components';

interface Props {
  data: TypeTvDetail;
  seasons: Season[];
  seasonNumber: number;
  episodeNumber: number;
  episode: Episode;
}

const Watch: NextPage<Props> = ({
  data,
  seasons,
  seasonNumber,
  episodeNumber,
  episode,
}) => {
  const [openSeason, setOpenSeason] = useState<number | undefined>(
    seasonNumber
  );
  return (
    <>
      <Meta
        title={`${data.name} - Episode ${episodeNumber} - Season ${seasonNumber} - TV Film`}
        description="Watch TV Episode"
        image={imageOriginal(episode.still_path)}
      />
      <div className="container mt-28 px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="relative mb-3" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedEpisode(data.id, seasonNumber, episodeNumber)}
                title=""
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <AboutDetail
              name={episode.name}
              overview={episode.overview}
              air_date={episode.air_date}
              vote_average={episode.vote_average}
            />
          </div>
          <div className="col-span-3">
            <p className="text-[22px] font-medium">Other Episodes</p>
            <div className="[&>*~*]:mt-6 max-h-[700px] overflow-y-auto">
              {seasons.map((season) => (
                <div key={season.id} className="">
                  <div
                    className="flex items-center rounded-lg bg-zinc-900"
                    onClick={() =>
                      openSeason === season.season_number
                        ? setOpenSeason(undefined)
                        : setOpenSeason(season.season_number)
                    }
                  >
                    <img
                      className="w-[20%] mr-4 rounded-lg"
                      src={w500Image(season.poster_path)}
                      alt=""
                    />
                    <p
                      className={cn('text-xl transition', {
                        'text-main': openSeason === season.season_number,
                      })}
                    >
                      {season.name}
                    </p>
                  </div>
                  {openSeason === season.season_number && (
                    <div className="[&>*]:mt-4">
                      {season.episodes.map((episode) => (
                        <Link
                          key={episode.id}
                          href={{
                            pathname: `/tv/${data.id}/episode`,
                            query: {
                              season: season.season_number,
                              episode: episode.episode_number,
                            },
                          }}
                        >
                          <a
                            className={cn(
                              'flex items-center ml-2 bg-neutral-900 rounded-xl overflow-hidden',
                              'hover-hover:hover:bg-neutral-800',
                              'transition-[color,background-color] duration-[300ms,300ms] ease-[ease,ease]',
                              {
                                'bg-neutral-800 pointer-events-none':
                                  episodeNumber === episode.episode_number &&
                                  openSeason === seasonNumber,
                              }
                            )}
                          >
                            <img
                              className="w-2/5 mr-2 rounded-xl"
                              src={w500Image(episode.still_path)}
                              alt=""
                            />
                            <p
                              className={cn('text-lg', {
                                'text-main transition':
                                  episodeNumber === episode.episode_number &&
                                  openSeason === seasonNumber,
                              })}
                            >
                              Episode {episode.episode_number}
                            </p>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  try {
    const id = Number(params!.id);
    const seasonNumber = Number(query.season);
    const episodeNumber = Number(query.episode);

    if (!seasonNumber || !episodeNumber) return { notFound: true };

    const res = (await getTVSeasons(id)) as {
      data: TypeTvDetail;
      seasons: Season[];
    };

    const episode = res.seasons
      .find((season) => season.season_number === seasonNumber)!
      .episodes.find((item) => item.episode_number === episodeNumber);

    if (!episode) return { notFound: true };

    return {
      props: {
        ...res,
        seasonNumber,
        episodeNumber,
        episode,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Watch;
