import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace client",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null },
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[70vh] bg-white transition-colors selection:bg-emerald-600/20 dark:bg-zinc-950">
      {children}
    </div>
  );
}
