import { NextPage } from 'next';
import { GrPrevious, GrNext } from 'react-icons/gr';

interface Props {
  total: number;
}

const Pagination: NextPage<Props> = () => {
  return (
    <div className="flex-center-center gap-2 [&>*]:h-full [&>*]:min-w-[20px]">
      <div className="bg-slate-100 text-black">
        <GrPrevious size={24} />
      </div>
      <div className="bg-slate-100 text-black text-center">1</div>
      <div className="bg-slate-100 text-black">1</div>
      <div className="bg-slate-100 text-black">
        <GrNext size={24} />
      </div>
    </div>
  );
};

export default Pagination;
