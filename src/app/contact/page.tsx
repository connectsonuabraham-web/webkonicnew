import { Metadata } from "next";
import { Header } from "@/components/Header";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | Ricardo Chance",
  description:
    "Got a project in mind? Let's talk. Get in touch with Ricardo Chance for design engineering and creative development services.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactPageContent />
    </>
  );
}
