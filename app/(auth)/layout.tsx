/* #############

Aqui es donde quiere tener o manejar el HEADER y el FOOTER

################ */


import Header from "@/components/shared/header";
import Footer from "@/components/footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center min-h-screen w-full">
      {/* Emmet Abbreviation .flex-center.min-h-screen.w-full + enter */}
        { children }
    </div>
  );
}
