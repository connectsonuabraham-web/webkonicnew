"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const services = [
  {
    title: "Website Development",
    description: "Custom websites built from scratch — fast, responsive, and designed to convert.",
    image: "/images/services/website-development.jpg",
  },
  {
    title: "AI & Automation",
    description: "Intelligent systems that save time and scale operations.",
    image: "/images/services/ai-automation.jpg",
  },
  {
    title: "SEO",
    description: "Get found on Google. Technical SEO and content strategy that drives organic traffic.",
    image: "/images/services/seo.jpg",
  },
  {
    title: "Google Ads",
    description: "Paid campaigns that deliver ROI. Search, display, and remarketing.",
    image: "/images/services/google-ads.webp",
  },
  {
    title: "Branding",
    description: "Brand identity that stands out. Logo, colors, typography, and guidelines.",
    image: "/images/services/branding.jpg",
  },
  {
    title: "Apps & Software",
    description: "Mobile apps and custom software built to solve real problems.",
    image: "/images/services/apps.jpg",
  },
  {
    title: "Ecommerce",
    description: "Online stores that sell. Seamless checkout and inventory management.",
    image: "/images/services/ecommerce.jpg",
  },
];

const rotationValues = [10, -5, 2, -2, 6, -3, 4];

export function ServicesPageContent() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const hasFlippedRef = useRef(false);

  useEffect(() => {
    // Apply initial rotations
    imagesRef.current.forEach((img, index) => {
      if (img) {
        gsap.set(img, { rotate: rotationValues[index] });
      }
    });
  }, []);

  const doFlip = (toFlipped: boolean) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const state = Flip.getState(gallery.querySelectorAll(".flip-card"));

    if (toFlipped) {
      gallery.classList.remove("order");
      imagesRef.current.forEach((img) => img?.classList.remove("reorder"));
    } else {
      gallery.classList.add("order");
      imagesRef.current.forEach((img) => img?.classList.add("reorder"));
    }

    imagesRef.current.forEach((img, index) => {
      if (img) {
        const rotation = toFlipped ? 0 : rotationValues[index];
        gsap.to(img, {
          rotate: rotation,
          duration: 2,
          ease: "power4.inOut",
          delay: 0.15,
        });
      }
    });

    Flip.from(state, {
      absolute: true,
      duration: 2,
      rotate: 0,
      stagger: 0.05,
      ease: "power4.inOut",
    });

    setIsFlipped(toFlipped);
  };

  // Auto-flip on scroll — lock scroll until flip completes
  useEffect(() => {
    let isAnimating = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // If not flipped yet and user scrolls, lock scroll and trigger flip
      if (!hasFlippedRef.current && scrollY > 10 && !isAnimating) {
        isAnimating = true;
        hasFlippedRef.current = true;

        // Lock scroll position at top during flip
        window.scrollTo({ top: 0, behavior: "instant" });
        document.body.style.overflow = "hidden";

        doFlip(true);

        // Release scroll after flip animation completes (2s + delay)
        setTimeout(() => {
          document.body.style.overflow = "";
          isAnimating = false;
        }, 2200);
      }
      // Flip back when scrolled to very top
      else if (hasFlippedRef.current && scrollY < 5 && !isAnimating) {
        isAnimating = true;
        hasFlippedRef.current = false;
        document.body.style.overflow = "hidden";
        doFlip(false);
        setTimeout(() => {
          document.body.style.overflow = "";
          isAnimating = false;
        }, 2200);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent scroll during animation
      if (isAnimating) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: "rgb(13, 7, 24)" }}>
      {/* Hero text - fixed behind cards */}
      <div
        className="fixed top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 w-full px-6 pointer-events-none"
      >
        <h1
          className="text-[24vw] md:text-[15vw] font-normal tracking-[-0.05em] text-white/20 leading-none"
          style={{
            fontFamily: 'var(--font-instrument-serif), "Instrument Serif", serif',
          }}
        >
          Services
        </h1>
        <p className="text-[3.5vw] md:text-[1.5vw] text-white/10 mt-2">
          Everything your business needs to grow in a digital world
        </p>
      </div>

      {/* Gallery */}
      <div
        ref={galleryRef}
        className="img-gallery-container order relative z-10"
      >
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={(el) => { if (el) imagesRef.current[i] = el; }}
            className="flip-card reorder"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-700 ${
                isFlipped ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="text-xs opacity-70 mt-1">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Solid cover removed - footer has its own bg now */}

      <style jsx>{`
        .img-gallery-container {
          width: 100vw;
          padding-top: 100vh;
          padding-bottom: 100vh;
        }
        .flip-card {
          position: relative;
          margin-bottom: 1em;
          width: 400px;
          height: 500px;
          overflow: hidden;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 12px;
        }
        .flip-card:nth-child(odd) {
          left: 75%;
        }
        .flip-card:nth-child(even) {
          left: 25%;
        }
        .flip-card.reorder {
          position: fixed;
          top: 45%;
          left: 50% !important;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 400px;
        }
        .flip-card.reorder:nth-child(1) {
          transform: translate(-50%, -50%) rotate(10deg);
        }
        .flip-card.reorder:nth-child(2) {
          transform: translate(-50%, -50%) rotate(-5deg);
        }
        .flip-card.reorder:nth-child(3) {
          transform: translate(-50%, -50%) rotate(2deg);
        }
        .flip-card.reorder:nth-child(4) {
          transform: translate(-50%, -50%) rotate(-2deg);
        }
        .flip-card.reorder:nth-child(5) {
          transform: translate(-50%, -50%) rotate(6deg);
        }
        .flip-card.reorder:nth-child(6) {
          transform: translate(-50%, -50%) rotate(-3deg);
        }
        .flip-card.reorder:nth-child(7) {
          transform: translate(-50%, -50%) rotate(4deg);
        }
        @media (max-width: 768px) {
          .flip-card.reorder {
            width: 130px;
            height: 175px;
          }
          .flip-card {
            width: 45vw;
            height: 58vw;
          }
          .flip-card:nth-child(odd) {
            left: 72%;
          }
          .flip-card:nth-child(even) {
            left: 28%;
          }
        }
      `}</style>
    </div>
  );
}
