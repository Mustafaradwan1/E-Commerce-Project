"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux'
import store from "@/store/store";
import Navbar from "@/components/header/Navbar";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Your App",
//   description: "This is a example for use redux in next.js versión 13 >=",
// };

export default function RootLayout({ children }) {
  const pathname  = usePathname()
  return (
    <Provider store={store}>
      <html lang="en" className="bg-gray-200">
        <body className={inter.className}>
         {pathname === "/Register" || pathname === "/Login" ? "" :   <Navbar/>}
          {children}
        </body>
      </html>
    </Provider>
  );
}