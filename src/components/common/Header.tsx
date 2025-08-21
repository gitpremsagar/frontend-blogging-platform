import Link from "next/link";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/new", label: "New" },
  { href: "/popular", label: "Popular" },
  { href: "/categories", label: "Categories" },
];

export default function Header() {
  return (
    <header className="bg-blue-500 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <LeftNav />
          <RightNav />
        </div>
      </div>
    </header>
  );
}

const LeftNav = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold ml-6">Logo</h1>
      </Link>

      <ul className="flex justify-end block">
        {NavLinks.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

const RightNav = () => {
  return (
    <ul className="flex justify-end block">
    <li>
      <Link
        className="p-4 block hover:bg-blue-400 transition-colors duration-500"
        href="/login"
      >
        Login
      </Link>
    </li>
    <li>
      <Link
        className="p-4 block hover:bg-blue-400 transition-colors duration-500"
        href="/register"
      >
        Register
      </Link>
    </li>
  </ul>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        className="p-4 block hover:bg-blue-400 transition-colors duration-500"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
