import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPromptModal from "@/components/ui/AuthPromptModal";
import LogoutOverlay from "@/components/ui/LogOutOverlay";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Saint Valor",
  description:
    "Founded with an unwavering commitment to quiet luxury and exquisite refinement, Saint Valor emerged from a passion for jewelry that speaks softly yet confidently. We believe luxury should be felt, not shouted — through impeccable materials, thoughtful proportions, and pieces created to be treasured for generations. At Saint Valor, every creation is an expression of intentional elegance — meant to celebrate personal milestones, timeless style, and discerning taste. Our collections stand at the intersection of heritage craft and modern sensibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plex.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <LogoutOverlay />
        {children}
        <ToastContainer />
        <AuthPromptModal />
      </body>
    </html>
  );
}
