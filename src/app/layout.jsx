import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProviders from "@/redux/lib/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Dinnindunya - Dashboard",
  description: "Modern admin dashboard with analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProviders>
          <Toaster richColors position="top-center" />
          <>{children}</>
        </ReduxProviders>
      </body>
    </html>
  );
}
