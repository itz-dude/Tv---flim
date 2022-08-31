import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { MediaType } from '@/model/movie';
import { ItemGrid, PageHeader, Meta } from '@/components';
import { searchAll, searchMovie, searchTV } from '@/ultis/tmdbApi';
import { mediaTypes } from '@/ultis/constants';

interface Props {
  type: MediaType;
  keyword: string;
  page: number;
  data?: any;
}

const SearchPage: NextPage<Props> = ({ data, page, type, keyword }) => {
  const router = useRouter();
  const handlePageChange = ({ selected }: { selected: number }) => {
    const currentPage = selected + 1;
    router.push({
      query: {
        ...router.query,
        page: currentPage,
      },
    });
  };
  return (
    <>
      <Meta
        title={`TV Film - Search ${type}`}
        description="Search Movies or TV show by keyword"
        image="/preview.png"
      />
      <PageHeader media_type={type} isSearchPage keyword={keyword} />
      <div className="container px-6">
        <ItemGrid items={data.results} />
      </div>
      <ReactPaginate
        className="flex-center-center gap-4 text-white"
        pageCount={50}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        previousLabel={<AiOutlineLeft size={24} />}
        nextLabel={<AiOutlineRight size={24} />}
        forcePage={page - 1}
        onPageChange={handlePageChange}
        activeClassName="text-main"
        pageClassName="bg-stone-700 min-w-[32px] text-center"
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const keyword = query.q as string;
    const type = query.type as MediaType;
    const page = Number(query.page) || 1;
    if (!keyword || !mediaTypes.includes(type)) return { notFound: true };

    let data;
    switch (type) {
      case 'all':
        data = await searchAll(keyword, page);
        break;
      case 'movie':
        data = await searchMovie(keyword, page);
        break;
      case 'tv':
        data = await searchTV(keyword, page);
        break;
    }

    return {
      props: {
        page,
        keyword,
        type,
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default SearchPage;
