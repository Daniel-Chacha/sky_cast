'use client';

import "./globals.css";
import Link from "next/link";
import { LandingPageCarousel } from "./components/landingCarousel";
import { Button } from '@material-tailwind/react';

export default function Home() {
  const pictures = ["/images/img7.avif", "/images/img8.webp", "/images/img9.jpeg",];

  return (
    <main className="carousel overflow-hidden relative h-[100vh] w-[100vw]">
      <LandingPageCarousel images={pictures} />

      {/* <button className="">Weather Forecast</button> */}
      <Link href={"/dashboard"} className="top-[70%] absolute sm:top-[73%] z-20 right-[27%] sm:right-[15%] lg:right-[35.5%]">
        <Button color='black' className='border border-[#c77826] '>Dashboard</Button>
      </Link>
    </main>
  );
}