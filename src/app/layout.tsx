import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChemTracker — Lab Chemical Inventory",
  description:
    "A mobile-first chemical inventory tracking application built for research laboratories. Track chemicals, capture photos, and search your inventory from any device.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
