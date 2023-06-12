import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Urban",
  description:
    "Descubre la libertad de elegir tu medio de transporte con nuestra aplicación: ¡empodérate con información y toma decisiones informadas! Encuentra una amplia variedad de servicios de transporte, desde buses intermunicipales, taxis públicos y transportes privados, hasta una sección de cadetería. Resuelve tus problemas cotidianos de manera rápida y eficiente con soluciones reales, mientras gestionas tu tiempo y optimizas tus días. ¡Experimenta el poder de decidir y mejorar tu vida con nuestra app!",
  keywords:
    "transporte, medio de transporte, aplicacion de transporte, servicios de transporte, buses intermunicipales, taxis publicos, transportes privados, cadeteria, soluciones reales, gestionar tiempo, optimizar días.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-slate-200">
          <Providers>
            <div>{children}</div>
            <Analytics />
          </Providers>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
