import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import AIChatbot from "./components/helper/ai-chatbot";
import PasswordGate from "./components/helper/password-gate";
import ScrollToTop from "./components/helper/scroll-to-top";
import ThreeBackground from "./components/helper/three-background";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Kenzan Umezaki - Fullstack & AI Developer",
  description:
    "Portfolio of Kenzan Umezaki, a Fullstack & AI Developer. Experienced in React, Next.js, Node.js, Python, and AI/ML technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordGate>
          <ThreeBackground />
          <ToastContainer />
          <Navbar />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white pt-16">
            {children}
            <ScrollToTop />
          </main>
          <AIChatbot />
          <Footer />
        </PasswordGate>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
