import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "STEM Pulse | STEM Resource Access Hub",
  description: "A centralized online platform where university students can access STEM labs, equipment, research resources, and project materials efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> 
        <Header/>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
