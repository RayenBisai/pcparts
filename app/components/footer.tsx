import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/header", label: "Header" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__copyright">
        &copy; {new Date().getFullYear()} PC Parts
      </p>

      <nav aria-label="Footernavigatie">
        <ul className="site-footer__navigation">
          {footerLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}