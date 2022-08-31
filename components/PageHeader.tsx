import { NextPage } from 'next';
import { MediaType } from '@/model/movie';

interface Props {
  media_type: MediaType;
  isSearchPage?: boolean;
  keyword?: string;
}

const PageHeader: NextPage<Props> = ({
  media_type,
  isSearchPage = false,
  keyword,
}) => {
  const typePage = (media_type: MediaType) => {
    if (media_type === 'all') return 'Movies and TV shows';
    else if (media_type === 'movie') return 'Movies';
    else if (media_type === 'tv') return 'TV shows';
  };
  return (
    <div
      className="
      relative pt-headerHeight pl-8 pb-12 text-center mb-[-16px]
      after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[50px] after:bg-gradient-to-t from-body to-black/[0]
      "
      style={{ backgroundImage: 'url(/footer-bg.jpg)' }}
    >
      <p className="">
        {isSearchPage ? (
          <>
            Search {typePage(media_type)} by keyword :
            <span className="text-main"> {keyword}</span>
          </>
        ) : (
          `All ${typePage(media_type)}`
        )}
      </p>
    </div>
  );
};

export default PageHeader;
