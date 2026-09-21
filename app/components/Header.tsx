import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/#catalogus", label: "Onderdelen" },
];

export default function Header() {
  return (
    <header className="site-header">
      <Link className="site-logo" href="/">
        PC Parts
      </Link>

      <nav aria-label="Hoofdnavigatie">
        <ul className="site-navigation">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}