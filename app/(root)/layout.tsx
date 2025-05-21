/* #############

Aqui es donde quiere tener o manejar el HEADER y el FOOTER

################ */


import Header from "@/components/shared/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      {/* Emmet Abbreviation .flex.h-screen.flex-col + enter */}
      <Header />
      <main className="flex-1 wrapper">
        {/* Emmet Abbreviation main.flex-1.wrapper + enter */}
        { children }
      </main>
      <Footer />
    </div>
  );
}
