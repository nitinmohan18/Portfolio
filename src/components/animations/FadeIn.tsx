"use client";

import { ComponentProps } from "react";
import Reveal from "./Reveal";

export default function FadeIn(props: Omit<ComponentProps<typeof Reveal>, "variant">) {
  return <Reveal variant="slide-up" {...props} />;
}
