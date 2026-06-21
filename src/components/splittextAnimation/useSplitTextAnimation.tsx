import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const useSplitTextAnimation = <T extends HTMLElement>(
  containerRef: RefObject<T | null>
): void => {
  useEffect(() => {
    if (!containerRef.current) return;

    let splits: SplitText[] = [];
    let rafId: number | null = null;
    let heroRafId: number | null = null;

    const hoverHandlers: {
      el: HTMLElement;
      enter: () => void;
      leave: () => void;
    }[] = [];

    const btnHandlers: {
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }[] = [];

    const heroHandlers: {
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }[] = [];

    const ctx = gsap.context(() => {

      const initSplitText = async (): Promise<void> => {

        await document.fonts.ready;

        /* =============================
        SPLITTEXT LINE ANIMATION
        ============================== */

        const splitTextLines =
          containerRef.current!.querySelectorAll<HTMLElement>(".splittext-line");

        splitTextLines.forEach((el) => {
          const split = new SplitText(el, { type: "lines" });
          splits.push(split);

          gsap.set(el, { perspective: 400 });

          gsap.from(split.lines, {
            duration: 1,
            delay: 0.5,
            opacity: 0,
            rotationX: -80,
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 60%",
            },
          });
        });


        /* =============================
        POORT TEXT ANIMATION
        ============================== */

        const poortText =
          containerRef.current!.querySelectorAll<HTMLElement>(".poort-text");

        poortText.forEach((el) => {

          const split = new SplitText(el, {
            type: "lines,words,chars",
            linesClass: "poort-line",
          });

          splits.push(split);

          gsap.set(el, { perspective: 600 });

          if (el.classList.contains("poort-in-right")) {
            gsap.set(split.chars, { opacity: 0, x: 100 });
          }

          if (el.classList.contains("poort-in-left")) {
            gsap.set(split.chars, { opacity: 0, x: -100 });
          }

          if (el.classList.contains("poort-in-up")) {
            gsap.set(split.chars, { opacity: 0, y: 80 });
          }

          if (el.classList.contains("poort-in-down")) {
            gsap.set(split.chars, { opacity: 0, y: -80 });
          }

          gsap.to(split.chars, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          });

        });

        /* =============================
        HERO MOUSE PARALLAX
        ============================== */

        const hero = containerRef.current!.classList.contains("wpo-hero-static")
          ? containerRef.current!
          : containerRef.current!.querySelector<HTMLElement>(".wpo-hero-static");

        const canUsePointerParallax =
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (hero && canUsePointerParallax) {
          const heroTitle = hero.querySelector<HTMLElement>(".hero-content h1");
          const heroImage = hero.querySelector<HTMLElement>(".hero-image img");
          const heroLines = Array.from(
            hero.querySelectorAll<HTMLElement>(".line-s1, .line-s2, .line-s3, .line-s4")
          );

          if (heroTitle && heroImage) {
            gsap.set([heroTitle, heroImage, ...heroLines], {
              willChange: "transform",
            });

            const titleX = gsap.quickTo(heroTitle, "x", {
              duration: 0.7,
              ease: "power3.out",
            });
            const titleY = gsap.quickTo(heroTitle, "y", {
              duration: 0.7,
              ease: "power3.out",
            });
            const imageX = gsap.quickTo(heroImage, "x", {
              duration: 0.85,
              ease: "power3.out",
            });
            const imageY = gsap.quickTo(heroImage, "y", {
              duration: 0.85,
              ease: "power3.out",
            });
            const lineX = heroLines.length
              ? gsap.quickTo(heroLines, "x", {
                duration: 0.9,
                ease: "power3.out",
              })
              : null;
            const lineY = heroLines.length
              ? gsap.quickTo(heroLines, "y", {
                duration: 0.9,
                ease: "power3.out",
              })
              : null;

            const handleHeroMove = (e: MouseEvent) => {
              if (heroRafId) cancelAnimationFrame(heroRafId);

              heroRafId = requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

                titleX(relX * -28);
                titleY(relY * -18);
                imageX(relX * 14);
                imageY(relY * 10);
                lineX?.(relX * -8);
                lineY?.(relY * -6);
              });
            };

            const handleHeroLeave = () => {
              titleX(0);
              titleY(0);
              imageX(0);
              imageY(0);
              lineX?.(0);
              lineY?.(0);
            };

            hero.addEventListener("mousemove", handleHeroMove);
            hero.addEventListener("mouseleave", handleHeroLeave);

            heroHandlers.push({
              el: hero,
              move: handleHeroMove,
              leave: handleHeroLeave,
            });
          }
        }

        /* =============================
          ABOUT COLOR TEXT ANIMATION
          ============================= */

        const aboutTexts =
          containerRef.current!.querySelectorAll<HTMLElement>(
            ".about-text-color h2"
          );

        aboutTexts.forEach((el) => {
          const split = new SplitText(el, { type: "words,chars" });
          splits.push(split);

          // Initial state
          gsap.set(split.chars, {
            opacity: 1,
            color: "#C1C4C8",
          });

          // Scroll animation
          gsap.to(split.chars, {
            color: "#2B2E33",
            stagger: 0.015,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          });
        });


        /* =============================
        ROLLING TEXT (NO innerHTML)
        ============================== */

        const rollingTexts =
          containerRef.current!.querySelectorAll<HTMLElement>(".rolling-text");

        rollingTexts.forEach((el) => {

          const wrapper = el.querySelector<HTMLElement>(".text-wrapper");
          if (!wrapper) return;

          const handleEnter = () => {
            gsap.to(wrapper, { yPercent: -50, duration: 0.4 });
          };

          const handleLeave = () => {
            gsap.to(wrapper, { yPercent: 0, duration: 0.4 });
          };

          el.addEventListener("mouseenter", handleEnter);
          el.addEventListener("mouseleave", handleLeave);

          hoverHandlers.push({ el, enter: handleEnter, leave: handleLeave });

        });


        /* =============================
        BTN PARALLAX (THROTTLED)
        ============================== */

        const allBtns =
          containerRef.current!.querySelectorAll<HTMLElement>(".btn-wrapper");

        const btnCircles =
          containerRef.current!.querySelectorAll<HTMLElement>(".btn-move");

        allBtns.forEach((btn, i) => {

          const circle = btnCircles[i];
          if (!circle) return;

          const handleMove = (e: MouseEvent) => {

            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {

              const rect = btn.getBoundingClientRect();
              const relX = e.clientX - rect.left;
              const relY = e.clientY - rect.top;

              const movement = 80;

              gsap.to(circle, {
                x: ((relX - rect.width / 2) / rect.width) * movement,
                y: ((relY - rect.height / 2) / rect.height) * movement,
                duration: 0.5,
                ease: "power2.out",
              });

            });
          };

          const handleLeave = () => {
            gsap.to(circle, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          btn.addEventListener("mousemove", handleMove);
          btn.addEventListener("mouseleave", handleLeave);

          btnHandlers.push({
            el: btn,
            move: handleMove,
            leave: handleLeave
          });

        });

      };

      initSplitText();

    }, containerRef);

    return () => {
      splits.forEach((split) => split.revert());
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
      if (heroRafId) cancelAnimationFrame(heroRafId);

      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });

      btnHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });

      heroHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };

  }, [containerRef]);
};

export default useSplitTextAnimation;
