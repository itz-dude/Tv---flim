import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import cn from 'classnames';

import { MediaType } from '@/model/movie';
import { mediaTypes } from '@/ultis/constants';
import { Input } from '@/components';

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [typeFillter, setTypeFillter] = useState<MediaType>('all');
  const onChange = (e: any) => setValue(e.target.value);
  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        type: typeFillter,
        q: value,
      },
    });
  };

  const type = router.query.type as MediaType;
  const q = router.query.q as string;
  useEffect(() => {
    if (type && q) {
      setValue(q);
      setTypeFillter(type);
    }
  }, [type, q]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden">
      <Input
        type="text"
        placeholder="...Search keyword"
        value={value}
        onChange={onChange}
        onKeyup={(e) => e.key === 'Enter' && handleSearch()}
      />
      <div className="absolute inset-y-0 right-0 z-10 flex">
        <div
          className="text-neutral-700 flex-center-center cursor-pointer hover:text-main px-2 transition"
          onClick={handleSearch}
        >
          <AiOutlineSearch size={25} />
        </div>
        <ul className="flex bg-neutral-900">
          {mediaTypes.map((mediaType) => (
            <li
              key={mediaType}
              className={cn(
                'flex px-2 items-center relative cursor-pointer',
                'transition hover-hover:hover:text-main',
                '[&:not(:last-child)]:after:content-[""] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:right-0',
                '[&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:inset-y-4 [&:not(:last-child)]:after:bg-white',
                mediaType === 'tv' ? 'uppercase' : 'capitalize',
                {
                  'text-main pointer-events-none': mediaType === typeFillter,
                }
              )}
              onClick={() => setTypeFillter(mediaType)}
            >
              {mediaType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
