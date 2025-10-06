import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Medica Studio pour discuter de votre projet de solution numérique dans le secteur de la santé. Notre équipe vous répondra dans les plus brefs délais.",
  openGraph: {
    title: "Contact - Medica Studio",
    description: "Contactez-nous pour discuter de votre projet",
    url: "https://medicastudio.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
