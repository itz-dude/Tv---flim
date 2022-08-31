import Link from 'next/link';
import { FaGithub, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex justify-end items-center h-10 mt-8 px-6 bg-stone-800">
      <div className="flex items-center gap-3">
        <span className="text-lg">Contact Me :</span>
        <Link href="https://github.com/NhiThanhLuong/next-movie">
          <a
            target="_blank"
            title="Github"
            className="hover-hover:hover:text-inherit"
          >
            <FaGithub size={20} />
          </a>
        </Link>
        <Link href="https://www.facebook.com/luongthanh.nhi/">
          <a
            target="_blank"
            title="Facebook"
            className="hover-hover:hover:text-inherit"
          >
            <FaFacebook size={20} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
