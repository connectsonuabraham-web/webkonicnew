"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative px-6 py-16 max-w-[1400px] mx-auto bg-[rgb(13,7,24)] md:bg-transparent z-20"
    >
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Left - Contact */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wider opacity-40">
            Drop a line
          </p>
          <Link
            href="mailto:hello@webkonic.com"
            className="text-sm hover:opacity-80 transition-opacity"
          >
            hello@webkonic.com
          </Link>
        </div>

        {/* Center - Pages */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider opacity-40">Pages</p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/work"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Services
              </Link>
              <button
                className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left"
                onClick={() =>
                  window.location.href = "/contact"
                }
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider opacity-40">
              Social Media
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="https://www.linkedin.com/in/changcer/"
                target="_blank"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Linkedin
              </Link>
              <Link
                href="https://www.instagram.com/by.ricardochance/"
                target="_blank"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Instagram
              </Link>
              <Link
                href="https://x.com/_changce"
                target="_blank"
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                Twitter / X
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-4">
        <p className="text-xs opacity-40">By WEBKONIC © 2026</p>
        <p className="text-xs opacity-40">Kerala, India</p>
      </div>
    </footer>
  );
}
