import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
