import Link from 'next/link';

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

const NavbarLink = () => {
  return (
    <div className="flex items-center h-full w-full">
      <ul className="flex justify-between w-full">
        {headerNav.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className="text-xl font-semibold">{item.display}</a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavbarLink;
