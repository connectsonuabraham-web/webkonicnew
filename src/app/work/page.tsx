import { Metadata } from "next";
import { Header } from "@/components/Header";
import { WorkCanvas } from "@/components/WorkCanvas";
import { WorkBgGradient } from "@/components/WorkBgGradient";

export const metadata: Metadata = {
  title: "Works | Webkonic",
  description:
    "Featured work by Webkonic — Websites, AI systems, and digital experiences we've built for modern businesses.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="h-screen overflow-hidden">
        <WorkBgGradient />
        <WorkCanvas />
      </main>
    </>
  );
}
