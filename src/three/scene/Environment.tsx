"use client";

import { Fog } from "three";
import Mountains from "../terrain/Mountains";
import Lake from "../water/Lake";
import Stars from "../sky/Stars";
import DataParticles from "../ai/DataParticles";
import Lighting from "./Lighting";

export default function Environment() {
  return (
    <>
      <fog attach="fog" args={["#030712", 10, 40]} />
      
      <Lighting />
      <Stars />
      <Mountains />
      <Lake />
      <DataParticles />
    </>
  );
}
