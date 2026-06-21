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
          ABOUT COLOR TEXT ANIMATION
          ============================= */

        const aboutTexts =
          containerRef.current!.querySelectorAll<HTMLElement>(
            ".about-text-color h2"
          );

        aboutTexts.forEach((el) => {
          const split = new SplitText(el, { type: "chars" });
          splits.push(split);

          // Initial state
          gsap.set(split.chars, {
            opacity: 1,
            color: "#C1C4C8",
          });

          // Scroll animation
          gsap.to(split.chars, {
            color: "#2B2E33",
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
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

      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });

      btnHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };

  }, [containerRef]);
};

export default useSplitTextAnimation;