import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/Header";

export const metadata = {
  title: "PCParts - Build it your way",
  description: "Ontdek onderdelen voor jouw ideale PC-build.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
