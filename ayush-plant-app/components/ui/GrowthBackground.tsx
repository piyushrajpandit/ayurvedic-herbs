"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "../hooks/useMousePosition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GrowthBackgroundProps {
  enabled?: boolean;
}

export default function GrowthBackground({ enabled = true }: GrowthBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leaf1Ref = useRef<SVGPathElement>(null);
  const leaf2Ref = useRef<SVGPathElement>(null);
  const leaf3Ref = useRef<SVGPathElement>(null);
  const sproutRef = useRef<SVGGElement>(null);
  const sproutStemRef = useRef<SVGPathElement>(null);
  const sproutLeavesRef = useRef<SVGGElement>(null);
  const fruitRef = useRef<SVGGElement>(null);
  const parallaxGroupRef = useRef<SVGGElement>(null);

  const { normalizedX, normalizedY } = useMousePosition();

  // Mouse parallax additive translation on wrapper group
  useEffect(() => {
    if (parallaxGroupRef.current) {
      const targetX = normalizedX * 12;
      const targetY = normalizedY * 12;
      gsap.to(parallaxGroupRef.current, {
        x: targetX,
        y: targetY,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [normalizedX, normalizedY]);

  // GSAP ScrollTrigger timeline animation
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Set static grown state for accessibility
      if (leaf1Ref.current) gsap.set(leaf1Ref.current, { y: 400, opacity: 0.4 });
      if (leaf2Ref.current) gsap.set(leaf2Ref.current, { y: 410, opacity: 0.4 });
      if (leaf3Ref.current) gsap.set(leaf3Ref.current, { y: 395, opacity: 0.4 });
      if (sproutRef.current) gsap.set(sproutRef.current, { scale: 1, opacity: 1 });
      if (fruitRef.current) gsap.set(fruitRef.current, { scale: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Initial states
      gsap.set([leaf1Ref.current, leaf2Ref.current, leaf3Ref.current], {
        transformOrigin: "center center",
      });
      gsap.set(sproutRef.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: "bottom center",
      });
      gsap.set(sproutStemRef.current, {
        scaleY: 0,
        transformOrigin: "bottom center",
      });
      gsap.set(sproutLeavesRef.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: "bottom center",
      });
      gsap.set(fruitRef.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      });

      // 0% - 40% Scroll: Leaves detach and fall with gentle sway and rotation
      tl.to(
        leaf1Ref.current,
        {
          y: 420,
          x: -35,
          rotation: 180,
          opacity: 0.7,
          ease: "sine.inOut",
        },
        0
      )
        .to(
          leaf2Ref.current,
          {
            y: 430,
            x: 25,
            rotation: -140,
            opacity: 0.7,
            ease: "sine.inOut",
          },
          0.08
        )
        .to(
          leaf3Ref.current,
          {
            y: 415,
            x: -15,
            rotation: 120,
            opacity: 0.7,
            ease: "sine.inOut",
          },
          0.15
        );

      // 40% - 70% Scroll: Sprout scales up, stem extends, leaves unfurl
      tl.to(
        sproutRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.4
      )
        .to(
          sproutStemRef.current,
          {
            scaleY: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.42
        )
        .to(
          sproutLeavesRef.current,
          {
            scale: 1,
            opacity: 1,
            rotation: 15,
            duration: 0.28,
            ease: "back.out(1.7)",
          },
          0.5
        );

      // 70% - 100% Scroll: Fruit / flower blooms into view
      tl.to(
        fruitRef.current,
        {
          scale: 1.2,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
        },
        0.7
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <svg
        className="w-full h-full min-h-[900px]"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={parallaxGroupRef}>
          {/* Subtle Ambient Background Tree Canopy */}
          <g className="opacity-25">
            {/* Trunk */}
            <path
              d="M500 50 C490 120 480 200 470 280 C465 320 475 360 480 400"
              stroke="#1b6f3f"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M485 180 C440 150 400 130 360 120"
              stroke="#1b6f3f"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M495 230 C540 200 580 180 630 170"
              stroke="#1b6f3f"
              strokeWidth="6"
              strokeLinecap="round"
            />
            
            {/* Upper Leaf Clusters */}
            <circle cx="500" cy="70" r="65" fill="#0b2e1a" stroke="#34c773" strokeWidth="1" />
            <circle cx="440" cy="110" r="50" fill="#0b2e1a" stroke="#34c773" strokeWidth="1" />
            <circle cx="560" cy="110" r="50" fill="#0b2e1a" stroke="#34c773" strokeWidth="1" />
            <circle cx="360" cy="120" r="40" fill="#134c2b" stroke="#34c773" strokeWidth="1" />
            <circle cx="630" cy="170" r="45" fill="#134c2b" stroke="#34c773" strokeWidth="1" />
          </g>

          {/* Independent Detachable Falling Leaves */}
          <g id="falling-leaves">
            {/* Leaf 1 */}
            <path
              ref={leaf1Ref}
              d="M440 130 C420 110 390 120 410 150 C430 180 460 160 440 130 Z"
              fill="#34c773"
              fillOpacity="0.8"
              stroke="#5ee095"
              strokeWidth="1.5"
            />
            {/* Leaf 2 */}
            <path
              ref={leaf2Ref}
              d="M550 140 C570 120 600 130 580 160 C560 190 530 170 550 140 Z"
              fill="#269956"
              fillOpacity="0.8"
              stroke="#34c773"
              strokeWidth="1.5"
            />
            {/* Leaf 3 */}
            <path
              ref={leaf3Ref}
              d="M490 100 C470 80 450 95 470 120 C490 145 510 125 490 100 Z"
              fill="#f59e0b"
              fillOpacity="0.75"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
          </g>

          {/* Ground Line */}
          <line
            x1="100"
            y1="560"
            x2="900"
            y2="560"
            stroke="#134c2b"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="opacity-40"
          />

          {/* Ground Sprout & Bloom Assembly */}
          <g ref={sproutRef} transform="translate(500, 560)">
            {/* Stem */}
            <path
              ref={sproutStemRef}
              d="M0 0 C-5 -30 -2 -60 0 -90"
              stroke="#34c773"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sprout Unfurling Leaves */}
            <g ref={sproutLeavesRef}>
              <path
                d="M0 -45 C-25 -65 -35 -40 0 -45 Z"
                fill="#5ee095"
                stroke="#34c773"
                strokeWidth="1"
              />
              <path
                d="M0 -65 C25 -85 35 -60 0 -65 Z"
                fill="#34c773"
                stroke="#5ee095"
                strokeWidth="1"
              />
            </g>

            {/* Glowing Golden Medicinal Fruit / Flower Bloom */}
            <g ref={fruitRef} transform="translate(0, -95)">
              <circle cx="0" cy="0" r="14" fill="#f59e0b" fillOpacity="0.9" />
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              {/* Petals */}
              <circle cx="-12" cy="0" r="5" fill="#f59e0b" fillOpacity="0.7" />
              <circle cx="12" cy="0" r="5" fill="#f59e0b" fillOpacity="0.7" />
              <circle cx="0" cy="-12" r="5" fill="#f59e0b" fillOpacity="0.7" />
              <circle cx="0" cy="12" r="5" fill="#f59e0b" fillOpacity="0.7" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
