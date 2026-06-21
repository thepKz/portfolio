import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useImageRevealAnimation = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const elements = gsap.utils.toArray<HTMLElement>(".new_img-animet");

      elements.forEach((el) => {
        const image = el.querySelector("img");
        if (!image) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        })
          .set(el, { autoAlpha: 1 })
          .from(el, {
            xPercent: -100,
            duration: 2,
            ease: "power2.out",
          })
          .from(
            image,
            {
              xPercent: 100,
              duration: 2,
              ease: "power2.out",
            },
            "<"
          );
      });

    });

    return () => ctx.revert();

  }, [location.pathname]);
};

export default useImageRevealAnimation;