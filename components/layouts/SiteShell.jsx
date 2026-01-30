"use client";
import { ensureGsap } from "@/utils/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MegaMenu from "./MegaMenu";
import { NewsletterProvider } from "./NewsletterContext";
import NewsletterModal from "./NewsletterModal";
import Showreel from "./Showreel";
import { ShowreelProvider } from "./ShowreelContext";

const SiteShell = ({ children, navlinks = [] }) => {
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  useEffect(() => {
    ensureGsap();
  }, []);

  useLenis(() => {
    ScrollTrigger.update();
  }, []);

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
      options={{
        lerp: 0.1,
        allowNestedScroll: true,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <ShowreelProvider value={showreel}>
        <NewsletterProvider value={newsletter}>
          <Header
            navlinks={navlinks}
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((prev) => !prev)}
          />
          <MegaMenu
            navlinks={navlinks}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
          <Showreel
            open={showreelOpen}
            onClose={() => setShowreelOpen(false)}
          />
          <NewsletterModal
            open={newsletterOpen}
            onClose={() => setNewsletterOpen(false)}
          />
          <main className="relative z-1">{children}</main>
          <Footer />
        </NewsletterProvider>
      </ShowreelProvider>
    </ReactLenis>
  );
};

export default SiteShell;
