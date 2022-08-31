import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { MovieItemProps, Cast, VideoTrailer } from '@/model/movie';
import { Rating, Button, CastList, VideoItem, ItemList } from '@/components';
import { imageOriginal } from '@/ultis/constants';

interface Props {
  data: MovieItemProps;
  casts: Cast[];
  videos: VideoTrailer[];
  similar: MovieItemProps[];
}

const ItemDetailView: NextPage<Props> = ({ data, casts, videos, similar }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="relative h-[50vh] bg-center bg-cover bg-no-repeat
    before:content-[''] before:absolute before:inset-0 before:bg-black/[60%]
    after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t from-body to-black/[0]"
        style={{ backgroundImage: `url(${imageOriginal(data.backdrop_path)})` }}
      />
      <div className="relative container flex max-w-[1260px] px-8 mt-[-200px] mb-12">
        <div className="flex-1">
          <div
            className="bg-center bg-cover bg-no-repeat pt-[165%] rounded-3xl"
            style={{
              backgroundImage: `url(${imageOriginal(data.poster_path)})`,
            }}
          />
        </div>
        <div className="w-[70%] pl-8 [&>*]:mb-8">
          <h1 className="text-6xl font-bold">{data.title || data.name}</h1>
          <div className="w-28">
            <Rating rating={data.vote_average} size={30} />
          </div>
          <div className="text-[1.5rem]">
            <p>Release Date: {data.release_date}</p>
          </div>
          <div className="[&>*~*]:ml-2">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-6 py-2 border-2 border-solid border-white rounded-3xl font-semibold"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p>{data.overview}</p>
          <p>
            Official website :
            <Link href={data.homepage}>
              <a target="_blank" className="ml-[10px] text-main">
                {data.homepage}
              </a>
            </Link>
          </p>
          <Button onClick={() => router.push(`${router.asPath}/watch`)}>
            Watch Now
          </Button>
        </div>
      </div>
      <div className="container px-6 [&>*~*]:mt-12">
        <div className="">
          <p className="text-[1.5rem] font-semibold mb-2">CASTS</p>
          <CastList items={casts} />
        </div>

        <div className="grid grid-cols-2 gap-16">
          {videos.map((video) => (
            <VideoItem key={video.key} item={video} />
          ))}
        </div>
        <div className="">
          <p className="text-[1.5rem] font-semibold mb-2">SIMILAR</p>
          <ItemList items={similar} />
        </div>
      </div>
    </>
  );
};

export default ItemDetailView;
