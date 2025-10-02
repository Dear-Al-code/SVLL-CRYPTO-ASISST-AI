import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sovereign AI - Tu agente IA personal 24/7",
  description: "100 NFTs. Cada uno = acceso a tu propio agente IA soberano corriendo 24/7. Privacidad por diseño. Tú eres el dueño.",
  metadataBase: new URL("https://coinbase-token.xyz"),
  openGraph: {
    title: "Sovereign AI",
    description: "100 NFTs. Cada uno = acceso a tu propio agente IA soberano corriendo 24/7.",
    url: "https://coinbase-token.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign AI",
    description: "100 NFTs. Cada uno = acceso a tu propio agente IA soberano corriendo 24/7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
