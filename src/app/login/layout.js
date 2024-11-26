import "../globals.css";
import "../styles/main.scss";
import ClientProvider from "../../store/ClientProvider"; // Import ClientProvider

export const metadata = {
  title: "Login | Olopo Business Network",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="busntwrk__body">
          <ClientProvider>{children}</ClientProvider>
        </main>
      </body>
    </html>
  );
}
