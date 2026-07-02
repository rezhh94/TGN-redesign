"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

const revealEase = "power3.out";
const quickEase = "power2.out";
const outcomeOrder = ["funnet", "forstatt", "valgt", "malt"] as const;
const outcomePinLength = 1.62;
const outcomeTransitionDuration = 0.22;
const outcomeHoldDuration = 0.24;
const outcomeEdgeHoldDuration = 0.2;

type OutcomeMotionTarget = {
  word: HTMLElement;
  annotation: HTMLElement;
  number: HTMLElement;
  description: HTMLElement;
};

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

function setupWhatImproveSignatureMotion() {
  const section = document.querySelector<HTMLElement>(".what-improve");
  const canvas = section?.querySelector<HTMLElement>(".what-improve__canvas");

  if (!section || !canvas) return;

  const targets = outcomeOrder
    .map((outcome) => {
      const word = section.querySelector<HTMLElement>(
        `.what-improve__word[data-outcome="${outcome}"]`
      );
      const annotation = section.querySelector<HTMLElement>(
        `.what-improve__annotation[data-outcome="${outcome}"]`
      );
      const number = annotation?.querySelector<HTMLElement>(
        ".what-improve__number"
      );
      const description = annotation?.querySelector<HTMLElement>(
        ".what-improve__description"
      );

      if (!word || !annotation || !number || !description) return null;

      return {
        word,
        annotation,
        number,
        description,
      };
    })
    .filter((target): target is OutcomeMotionTarget => Boolean(target));

  if (targets.length !== outcomeOrder.length) return;

  const inactiveWord = "rgba(242, 241, 235, 0.28)";
  const activeWord = "rgba(242, 241, 235, 0.96)";
  const inactiveNumber = "rgba(242, 241, 235, 0.42)";
  const activeNumber = "rgba(242, 241, 235, 0.78)";
  const inactiveDescription = "rgba(242, 241, 235, 0.56)";
  const activeDescription = "rgba(242, 241, 235, 0.86)";
  const activeGlow = "0 0 34px rgba(242, 241, 235, 0.12)";

  const words = targets.map((target) => target.word);
  const annotations = targets.map((target) => target.annotation);
  const numbers = targets.map((target) => target.number);
  const descriptions = targets.map((target) => target.description);

  const setActiveOutcome = (activeIndex: number) => {
    const inactiveTargets = targets.filter((_, index) => index !== activeIndex);
    const activeTarget = targets[activeIndex];

    gsap.set(inactiveTargets.map((target) => target.word), {
      color: inactiveWord,
      textShadow: "0 0 0 rgba(242, 241, 235, 0)",
    });
    gsap.set(inactiveTargets.map((target) => target.annotation), {
      "--annotation-line-alpha": 0.12,
      y: 0,
    });
    gsap.set(inactiveTargets.map((target) => target.number), {
      color: inactiveNumber,
    });
    gsap.set(inactiveTargets.map((target) => target.description), {
      color: inactiveDescription,
    });

    gsap.set(activeTarget.word, {
      color: activeWord,
      textShadow: activeGlow,
    });
    gsap.set(activeTarget.annotation, {
      "--annotation-line-alpha": 0.42,
      y: -4,
    });
    gsap.set(activeTarget.number, {
      color: activeNumber,
    });
    gsap.set(activeTarget.description, {
      color: activeDescription,
    });
  };

  const tweenActiveOutcome = (
    timeline: gsap.core.Timeline,
    activeIndex: number
  ) => {
    const inactiveTargets = targets.filter((_, index) => index !== activeIndex);
    const activeTarget = targets[activeIndex];

    timeline
      .to(
        inactiveTargets.map((target) => target.word),
        {
          color: inactiveWord,
          textShadow: "0 0 0 rgba(242, 241, 235, 0)",
          duration: outcomeTransitionDuration,
        }
      )
      .to(
        inactiveTargets.map((target) => target.annotation),
        {
          "--annotation-line-alpha": 0.12,
          y: 0,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        inactiveTargets.map((target) => target.number),
        {
          color: inactiveNumber,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        inactiveTargets.map((target) => target.description),
        {
          color: inactiveDescription,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        activeTarget.word,
        {
          color: activeWord,
          textShadow: activeGlow,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        activeTarget.annotation,
        {
          "--annotation-line-alpha": 0.42,
          y: -4,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        activeTarget.number,
        {
          color: activeNumber,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to(
        activeTarget.description,
        {
          color: activeDescription,
          duration: outcomeTransitionDuration,
        },
        "<"
      )
      .to({}, { duration: outcomeHoldDuration });
  };

  gsap.set(words, {
    color: inactiveWord,
    textShadow: "0 0 0 rgba(242, 241, 235, 0)",
  });
  gsap.set(annotations, {
    "--annotation-line-alpha": 0.12,
    y: 0,
  });
  gsap.set(numbers, {
    color: inactiveNumber,
  });
  gsap.set(descriptions, {
    color: inactiveDescription,
  });
  setActiveOutcome(0);

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * outcomePinLength)}`,
      scrub: 0.32,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline.to({}, { duration: outcomeEdgeHoldDuration });
  tweenActiveOutcome(timeline, 1);
  tweenActiveOutcome(timeline, 2);
  tweenActiveOutcome(timeline, 3);
  timeline.to({}, { duration: outcomeEdgeHoldDuration });
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
          canPinEffect:
            "(min-width: 1181px) and (min-height: 760px) and (hover: hover) and (pointer: fine)",
        },
        ({ conditions }) => {
          const isDesktop = Boolean(conditions?.isDesktop);
          const isMobile = Boolean(conditions?.isMobile);
          const canPinEffect = Boolean(conditions?.canPinEffect);

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

          if (canPinEffect) {
            setupWhatImproveSignatureMotion();
          }

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
