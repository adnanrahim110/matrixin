"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MegaMenu from "./MegaMenu";
import NewsletterModal from "./NewsletterModal";
import Showreel from "./Showreel";
import { NewsletterProvider } from "./NewsletterContext";
import { ShowreelProvider } from "./ShowreelContext";

const SiteShell = ({ children }) => {
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh();
    window.addEventListener("resize", updateVh, { passive: true });

    return () => {
      window.removeEventListener("resize", updateVh);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const shouldStop = menuOpen || showreelOpen || newsletterOpen;
    if (shouldStop) lenis.stop();
    else lenis.start();
  }, [menuOpen, showreelOpen, newsletterOpen]);

  useEffect(() => {
    const shouldLock = menuOpen || showreelOpen || newsletterOpen;
    if (!shouldLock) return;

    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [menuOpen, showreelOpen, newsletterOpen]);

  const showreel = useMemo(() => {
    return {
      show: () => setShowreelOpen(true),
      hide: () => setShowreelOpen(false),
    };
  }, []);

  const newsletter = useMemo(() => {
    return {
      show: () => {
        if (window.matchMedia("(max-width: 1099px)").matches) {
          setNewsletterOpen(true);
        }
      },
      hide: () => setNewsletterOpen(false),
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, smoothWheel: true, syncTouch: true }}
    >
      <ShowreelProvider value={showreel}>
        <NewsletterProvider value={newsletter}>
          <Header
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((prev) => !prev)}
          />
          <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
          <Showreel open={showreelOpen} onClose={() => setShowreelOpen(false)} />
          <NewsletterModal
            open={newsletterOpen}
            onClose={() => setNewsletterOpen(false)}
          />
          <main>{children}</main>
          <Footer />
        </NewsletterProvider>
      </ShowreelProvider>
    </ReactLenis>
  );
};

export default SiteShell;
