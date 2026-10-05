import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0F",
};

export const metadata: Metadata = {
  title: "Gen Z Pulse — India's Context Engine for Gen Z",
  description:
    "AI-curated news that tells you what happened, why it matters, what comes next, and what you can actually do about it. Important doesn't always mean trending.",
  keywords: ["news", "Gen Z", "India", "AI news", "context", "curated news", "Gen Z Pulse"],
  authors: [{ name: "Gen Z Pulse" }],
  openGraph: {
    title: "Gen Z Pulse",
    description: "Important Doesn't Always Mean Trending.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gen Z Pulse",
    description: "Important Doesn't Always Mean Trending.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Epilogue:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
