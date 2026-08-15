"use client";

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex flex-col justify-end px-6 md:px-20 pb-20 pt-24 md:pt-32">
      <h1
        className="js-s-print-opacity"
        data-start="top 80%"
        data-end="top 20%"
        style={{
          fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
          fontStyle: "normal",
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: "1em",
          maxWidth: "760px",
        }}
      >
        We build smarter systems, stronger digital experiences, and growth-focused solutions for modern businesses.
      </h1>
    </section>
  );
}
