// 'use client'
// import Image from "next/image"
// import { useState, useEffect } from "react"
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa"

// export default function Carousel({slides}: {slides:string[]}){
//     const [currentIndex, setCurrentIndex]=useState(0);

//     // const previousSlide = () =>{
//     //     if (currentIndex === 0){
//     //         setCurrentIndex(slides.length -1)
//     //     }else{
//     //         setCurrentIndex(currentIndex-1)
//     //     }
//     // }

//     // const nextSlide =() =>{
//     //     if(currentIndex === slides.length){
//     //         setCurrentIndex(0)
//     //     }else{
//     //         setCurrentIndex(currentIndex + 1)
//     //     }
//     // }
//     useEffect(() =>{
//         const sliderDom

//     },[])

//     return(
//         <div className=" overflow-hidden inset-0  h-[100vh] w-[100vw]">

//             <div className="carousel h-[100vh] w-[100vw] relative">
//                 {slides.map((slide, index) =>(
//                     <div key={index} className="relative w-full h-full">
//                         <Image src={slide} alt="weather " fill className="object cover"/>
//                     </div>
//                 ))}

//                 <div className="absolute top-0 left-0 w-full h-full justify-between items-center flex text-black text-3xl px-8">
//                     <button> <FaArrowAltCircleLeft onClick={previousSlide} /> </button>
//                     <button> <FaArrowAltCircleRight onClick={nextSlide} /> </button>
//                 </div>
//             </div>

//         </div>
//     )
// };









// 'use client';
// import Image from "next/image";
// import { useEffect, useState, useRef } from 'react';
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// import "./globals.css";

// export default function Home() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null); // Track slide direction

//   const itemsRef = useRef<HTMLElement[]>([]); // Ref for items

//   const nextSlide = () => {
//     if (slideDirection) return; // Prevent clicks during animation

//     setSlideDirection('next');
//     const nextIndex = (currentIndex + 1) % pictures.length;

//     itemsRef.current[currentIndex]?.classList.add('behind'); // Move current to back
//     itemsRef.current[nextIndex]?.classList.add('slideIn');  // Animate next in

//     setCurrentIndex(nextIndex); // Update index AFTER animation has started
//   };

//   const prevSlide = () => {
//     if (slideDirection) return; // Prevent clicks during animation

//     setSlideDirection('prev');
//     const prevIndex = (currentIndex - 1 + pictures.length) % pictures.length; // Correct previous index

//     itemsRef.current[currentIndex]?.classList.add('behind'); // Move current to back
//     itemsRef.current[prevIndex]?.classList.add('slideBack'); // Animate prev in

//     setCurrentIndex(prevIndex); // Update index AFTER animation has started
//   };

//   useEffect(() => {
//     const handleAnimationEnd = (event: AnimationEvent) => {
//       if (event.target instanceof HTMLElement) {
//         event.target.classList.remove('slideIn', 'slideBack', 'behind');
//       }
//       setSlideDirection(null); // Reset slide direction, enable clicks
//     };

//     itemsRef.current.forEach((item) => {
//       item.addEventListener('animationend', handleAnimationEnd);
//     });

//     return () => {
//       itemsRef.current.forEach((item) => {
//         item.removeEventListener('animationend', handleAnimationEnd);
//       });
//     };
//   }, []);


//   const pictures = ['/images/img1.avif',"/images/img2.avif",'/images/img3.webp', '/images/img4.webp'];

//   return (
//     <main className="carousel overflow-hidden relative h-[100vh] w-[100vw]">
//       {pictures.map((pic, index) => (
//         <div
//           key={index}
//           className="item absolute inset-0 w-full h-full"
//           ref={(el) => { // Ref callback
//             if (el) { // Check if 'el' is not null before assigning
//               itemsRef.current[index] = el;
//             }
//           }}
//           style={{ zIndex: index === currentIndex ? 10 : 1 }} // Z-index management
//         >
//           <Image src={pic} alt="weather " fill className="object cover" />
//         </div>
//       ))}

//       <div className="absolute top-0 left-0 w-full h-full justify-between items-center flex text-white text-3xl px-8 z-10">
//         <button onClick={prevSlide} disabled={slideDirection !== null}> {/* Disable during animation */}
//           <FaArrowAltCircleLeft />
//         </button>
//         <button onClick={nextSlide} disabled={slideDirection !== null}> {/* Disable during animation */}
//           <FaArrowAltCircleRight />
//         </button>
//       </div>
//     </main>
//   );
// }