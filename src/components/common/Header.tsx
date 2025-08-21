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
      <Logo />

      <ul className="flex justify-end block">
        {NavLinks.map((link) => (
          <LeftNavLink key={link.href} href={link.href}>
            {link.label}
          </LeftNavLink>
        ))}
      </ul>
    </nav>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="px-6 block">
      <h1 className="text-2xl font-bold">Logo</h1>
    </Link>
  );
};

const RightNav = () => {
  return (
    <ul className="flex justify-end block">
      <RightNavLink href="/sign-in">Log In</RightNavLink>
      <RightNavLink href="/sign-up">Sign Up</RightNavLink>
    </ul>
  );
};

const RightNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        className="p-4 block hover:bg-blue-400 transition-colors duration-300"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};

const LeftNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        className="p-4 block hover:bg-blue-400 transition-colors duration-300"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
