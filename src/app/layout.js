import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import "./styles/main.scss";
import ClientProvider from "../store/ClientProvider"; // Import ClientProvider

export const metadata = {
  title: "Olopo Business Network",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        {/* Google Fonts */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" 
        />
      </head>
      <body>
        <main>
          <Navbar></Navbar>
        </main>
        <main className="busntwrk__body">
          <Sidebar />
          <ClientProvider>{children}</ClientProvider>
        </main>
      </body>
    </html>
  );
}
