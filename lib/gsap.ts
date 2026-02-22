"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  CustomEase.create("icsEase", "0.22, 1, 0.36, 1");
  CustomEase.create("icsReveal", "0.16, 1, 0.3, 1");
}

export { gsap, ScrollTrigger, SplitText, useGSAP, CustomEase };
