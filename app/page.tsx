import CountdownTimer from "@/components/organisms/CountdownTimer";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export default function Home() {
  return (
    <div className="flex flex-col font-primary w-screen h-screen justify-center items-center text-center align-middle overflow-hidden">
      <Header />
      <CountdownTimer targetDate="2025-12-31" />
      <Footer />
    </div>
  );
}
