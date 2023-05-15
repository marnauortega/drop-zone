import "./globals.css";
import localFont from "next/font/local";
import Provider from "./components/Provider";

export const helveticaNeue = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeue-Light.woff2",
      weight: "300",
    },
  ],
});

export const sohneBreit = localFont({
  src: [
    {
      path: "../public/fonts/SohneBreit-Halbfett.woff2",
      weight: "bold",
    },
  ],
});

const metadata = {
  title: "Drop zone",
  description: "Drop zone for Fundación Esplai Hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={helveticaNeue.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
