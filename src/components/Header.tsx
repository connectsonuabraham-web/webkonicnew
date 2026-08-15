"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactPanel } from "./ContactPanel";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] py-6"
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 ml-0 md:-ml-12">
            <img
              src="/images/logo.png"
              alt="Webkonic"
              className="h-6 md:h-9 w-auto"
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/work">Work</NavLink>
              <button
                className="nav-link text-base font-medium opacity-80 hover:opacity-100 transition-opacity relative overflow-hidden inline-block"
                onClick={() => setContactOpen(true)}
              >
                <span className="block">Contact</span>
                <span className="block">Contact</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open navigation menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu - square transparent card */}
        <div
          className={`fixed top-14 right-4 z-[999] flex flex-col items-center justify-center gap-4 w-[150px] h-[200px] p-5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto translate-y-0 scale-100" : "opacity-0 pointer-events-none -translate-y-2 scale-95"
          }`}
        >
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium opacity-80">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium opacity-80">About</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="text-sm font-medium opacity-80">Services</Link>
          <Link href="/work" onClick={() => setMenuOpen(false)} className="text-sm font-medium opacity-80">Work</Link>
          <button
            className="text-sm font-medium opacity-80"
            onClick={() => {
              setMenuOpen(false);
              setContactOpen(true);
            }}
          >
            Contact
          </button>
        </div>
      </header>

      {/* Contact slide-in panel */}
      {contactOpen && (
        <ContactPanel isOverlay onClose={() => setContactOpen(false)} />
      )}
    </>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="nav-link text-sm lg:text-base font-medium opacity-80 hover:opacity-100 transition-opacity relative overflow-hidden inline-block"
    >
      <span className="block">{children}</span>
      <span className="block">{children}</span>
    </Link>
  );
}
