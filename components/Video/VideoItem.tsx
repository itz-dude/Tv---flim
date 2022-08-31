import { useRef, useEffect } from 'react';

import { VideoTrailer } from '@/model/movie';

interface Props {
  item: VideoTrailer;
}

const VideoItem = ({ item }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = (iframeRef.current!.offsetWidth * 9) / 16 + 'px';
    iframeRef.current!.setAttribute('height', height);
  }, []);
  return (
    <div>
      <p className="text-[1.5rem] font-semibold mb-4 truncate">{item.name}</p>
      <iframe
        ref={iframeRef}
        className="rounded-3xl"
        src={`https://www.youtube.com/embed/${item.key}`}
        width="100%"
        title="video"
      />
    </div>
  );
};

export default VideoItem;
