'use client';

import "./globals.css";
import Link from "next/link";
import { LandingPageCarousel } from "./components/landingCarousel";

export default function Home() {
  const pictures = ["/images/img7.avif", "/images/img8.webp", "/images/img9.jpeg",];

  return (
    <main className="carousel overflow-hidden relative h-[100vh] w-[100vw]">
      <LandingPageCarousel images={pictures} />

      {/* <button className="">Weather Forecast</button> */}
      <Link href={"/dashboard"} className="top-[70%] absolute sm:top-[73%] z-20 right-[27%] sm:right-[15%] lg:right-[35.5%]">
        <button className=" bg-slate-900 py-2 px-6 rounded-md border border-[#c77826] ">Dashboard</button>
      </Link>
    </main>
  );
}