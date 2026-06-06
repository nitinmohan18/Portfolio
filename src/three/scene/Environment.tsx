"use client";

import Mountains from "../terrain/Mountains";
import Waterfall from "../terrain/Waterfall";
import Lake from "../water/Lake";
import Stars from "../sky/Stars";
import Aurora from "../sky/Aurora";
import Mist from "../sky/Mist";
import Cabin from "../effects/Cabin";
import Fireflies from "../effects/Fireflies";
import Forest from "../wildlife/Forest";
import Birds from "../wildlife/Birds";
import Lighting from "./Lighting";

export default function Environment() {
  return (
    <>
      {/* Dark blue cinematic night fog */}
      <fog attach="fog" args={["#050a18", 10, 60]} />
      
      <Lighting />
      <Stars />
      <Aurora />
      <Mountains />
      <Waterfall />
      <Lake />
      <Forest />
      <Cabin />
      <Fireflies />
      <Mist />
      <Birds />
    </>
  );
}
