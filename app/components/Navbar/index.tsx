import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
      <nav className="max-w-screen-2xl m-auto pt-8 pb-4 flex justify-center">
        <Link
          href="/"
          className="font-bold text-4xl uppercase tracking-widest"
        >
          WP Blog
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
