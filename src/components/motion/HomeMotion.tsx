"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

const revealEase = "power3.out";
const quickEase = "power2.out";

function scrollReveal(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  vars: gsap.TweenVars = {}
) {
  return gsap.from(targets, {
    autoAlpha: 0,
    y: 20,
    duration: 0.4,
    ease: revealEase,
    stagger: 0.04,
    clearProps: "opacity,visibility,transform",
    scrollTrigger: {
      trigger,
      start: "top 78%",
      once: true,
    },
    ...vars,
  });
}

export function HomeMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) {
      return undefined;
    }

    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add(
        {
          isDesktop: "(min-width: 900px)",
          isMobile: "(max-width: 899px)",
        },
        ({ conditions }) => {
          const isDesktop = Boolean(conditions?.isDesktop);
          const isMobile = Boolean(conditions?.isMobile);

          const heroTimeline = gsap.timeline({ delay: 0.08 });
          heroTimeline
            .from(".hero__title span", {
              autoAlpha: 0,
              yPercent: 18,
              duration: 0.44,
              ease: revealEase,
              stagger: 0.045,
              clearProps: "opacity,visibility,transform",
            })
            .from(
              ".hero__visual",
              {
                autoAlpha: 0,
                scale: 0.985,
                x: isDesktop ? 14 : 0,
                y: isDesktop ? "-49%" : 12,
                duration: 0.42,
                ease: revealEase,
                clearProps: "opacity,visibility,transform",
              },
              "-=0.32"
            )
            .from(
              [".hero__support", ".hero__services a", ".hero__actions"],
              {
                autoAlpha: 0,
                y: 12,
                duration: 0.34,
                ease: quickEase,
                stagger: 0.035,
                clearProps: "opacity,visibility,transform",
              },
              "-=0.18"
            );

          scrollReveal(
            [
              ".approach-bridge__label",
              ".approach-bridge__statement-display",
              ".approach-bridge__statement-sans",
              ".approach-bridge__support",
            ],
            ".approach-bridge",
            {
              y: isMobile ? 14 : 22,
              stagger: isMobile ? 0.03 : 0.045,
            }
          );

          scrollReveal(
            [".what-build__label", ".what-build__title", ".what-build__intro-stack"],
            ".what-build",
            {
              y: isMobile ? 14 : 20,
              duration: 0.38,
              stagger: 0.04,
            }
          );

          scrollReveal(".what-build__row", ".what-build__accordion", {
            y: isMobile ? 14 : 22,
            duration: 0.38,
            stagger: isMobile ? 0.035 : 0.045,
          });

          scrollReveal(
            [
              ".work-showcase__label",
              ".work-showcase__title",
              ".work-showcase__lead",
              ".work-showcase__meta",
            ],
            ".work-showcase",
            {
              y: isMobile ? 14 : 22,
              duration: 0.38,
              stagger: 0.04,
            }
          );

          gsap.from("[data-work-visual]", {
            autoAlpha: 0,
            clipPath: isDesktop
              ? "inset(0 0 0 18%)"
              : "inset(6% 0 0 0)",
            duration: 0.42,
            ease: revealEase,
            stagger: 0.045,
            clearProps: "opacity,visibility,clipPath",
            scrollTrigger: {
              trigger: ".work-showcase__visuals",
              start: "top 78%",
              once: true,
            },
          });

          scrollReveal(
            [
              ".process-layers__label",
              ".process-layers__title",
              ".process-layers__lead",
            ],
            ".process-layers",
            {
              y: isMobile ? 14 : 22,
              duration: 0.38,
              stagger: 0.04,
            }
          );

          scrollReveal("[data-process-layer]", ".process-layers__stack", {
            y: isMobile ? 14 : 24,
            duration: 0.4,
            stagger: isMobile ? 0.035 : 0.045,
          });

          scrollReveal(
            [
              ".contact-footer__label",
              ".contact-footer__title span",
              ".contact-footer__lead",
              ".contact-footer__email",
              ".contact-footer__phone",
              ".contact-footer__actions",
            ],
            ".contact-footer",
            {
              y: isMobile ? 14 : 22,
              duration: 0.38,
              stagger: 0.035,
            }
          );

          scrollReveal(".contact-footer__row", ".contact-footer__index", {
            y: isMobile ? 10 : 12,
            duration: 0.3,
            stagger: 0.02,
          });

          scrollReveal(".contact-footer__wordmark", ".contact-footer__wordmark", {
            y: isMobile ? 10 : 16,
            duration: 0.36,
            stagger: 0,
          });

          return undefined;
        }
      );
    });

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return null;
}
