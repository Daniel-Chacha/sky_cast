// 'use client'
// import Image from "next/image";
// // import Carousel from './components/carousel';
// import {useEffect, useState, useRef} from 'react'
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa"
// import "./globals.css";

// export default function Home(){
//   const [currentIndex, setCurrentIndex]=useState(0);
//   const [slideDirection, setSlideDirection] =useState<'next' | 'prev' | null>(null)       //track slide direction
//   const itemsRef = useRef<HTMLElement[]>([])            //Ref for items
//   console.log('ITEMS REF:',itemsRef)

//   const nextSlide = () => {
//     if(slideDirection) return     //prevent clicks during animation

//     setSlideDirection('next')
//     const nextIndex =(currentIndex + 1)% pictures.length
    
//     // Use a setTimeout to ensure the DOM is updated before accessing refs:
//     setTimeout(() => {
//       if (itemsRef.current[currentIndex] && itemsRef.current[nextIndex]) { // Check if elements exist
//           itemsRef.current[currentIndex].classList.add('behind');
//           itemsRef.current[nextIndex].classList.add('slideIn');
//           setCurrentIndex(nextIndex);
//       }
//   }, 0); // Zero timeout to execute after render
//   };

//   const prevSlide= () =>{
//     if(slideDirection) return

//     setSlideDirection('prev')
//     const prevIndex =(currentIndex -1 + pictures.length)% pictures.length

//     setTimeout(() => {
//       if (itemsRef.current[currentIndex] && itemsRef.current[prevIndex]) { // Check if elements exist
//           itemsRef.current[currentIndex].classList.add('behind');
//           itemsRef.current[prevIndex].classList.add('slideBack');
//           setCurrentIndex(prevIndex);
//       }
//   }, 0); // Zero timeout to execute after render
//   }   //, '/images/img6.avif', '/images/img7.avif', '/images/img9.jpeg', '/images/img10.jpeg',  '/images/img12.avif', '/images/img13.jpg', '/images/img14.jpeg','/images/img16.jpeg'


//   useEffect(() =>{
//     const items = itemsRef.current
//     const handleAnimationEnd = (event: AnimationEvent) =>{
//       if(event.target instanceof HTMLElement){
//         event.target.classList.remove('slideIn', 'slideBack', 'behind')
//       }
//       setSlideDirection(null)   //reset slide direction, enable clicks
//     };

//     items.forEach((item) =>{
//       item?.addEventListener('animationend', handleAnimationEnd)
//     });

//     return() =>{
//       items.forEach((item) =>{
//         item?.removeEventListener('animationend', handleAnimationEnd)
//       })
//     }
//   },[])

//   const pictures=['/images/img1.avif',"/images/img2.avif",'/images/img3.webp', '/images/img4.webp']
//   return(
//     <main className="carousel overflow-hidden relative  h-[100vh] w-[100vw]">

//         {/* <div className="slider h-[100vh] w-[100vw] relative"> */}
//             {pictures.map((pic, index) =>(
//                 <div key={index}
//                      className="item absolute inset-0 w-full h-full" 
//                      style={{zIndex: index === 0 ? 10: 1}}
//                      ref={(el) =>{   //Ref callback
//                       if(el){       //check if 'el' is not null before assigning
//                         itemsRef.current[index] =el;
//                       }
//                      }}>
//                     <Image src={pic} alt="weather " fill className="object cover"/>
//                 </div>
//             ))}

//             <div className="absolute top-0 left-0 w-full h-full justify-between items-center flex text-white text-3xl px-8  z-10">
//                 <button onClick={prevSlide} disabled={slideDirection !== null}>{/*Disable during animation*/}
//                   <FaArrowAltCircleLeft  />
//                 </button>
//                 <button onClick={nextSlide} disabled={slideDirection !== null}>{/*Disable during animation*/}
//                    <FaArrowAltCircleRight /> 
//                 </button>
//             </div>
//         {/* </div> */}

//     </main>
//   );
// }

'use client';
import Image from "next/image";
import { useEffect, useState, useRef } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./globals.css";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null); // Track slide direction
  const itemsRef = useRef<HTMLElement[]>([]); // Ref for items
  const intervalRef =useRef<NodeJS.Timeout |null>(null)
  // console.log('ITEMSREF:' ,itemsRef)
  console.log('itemsRef.current', itemsRef.current)

  const nextSlide = () => {
    if (slideDirection) return; // Prevent clicks during animation

    setSlideDirection('next');
    const nextIndex = (currentIndex + 1) % pictures.length;

    setTimeout(() => {
      if (itemsRef.current[currentIndex] && itemsRef.current[nextIndex]) { // Check if elements exist
        // itemsRef.current[nextIndex].classList.remove("behind"); // Ensure previous `.behind` is cleared
          itemsRef.current[nextIndex].classList.add('slideIn');
          itemsRef.current[currentIndex].classList.add('behind');
          setCurrentIndex(nextIndex);
      }
  }, 60); // Zero timeout to execute after render
  };

  const prevSlide = () => {
    if (slideDirection) return; // Prevent clicks during animation

    setSlideDirection('prev');
    const prevIndex = (currentIndex - 1 + pictures.length) % pictures.length; // Correct previous index

    setTimeout(() => {
      if (itemsRef.current[currentIndex] && itemsRef.current[prevIndex]) { // Check if elements exist
        // itemsRef.current[prevIndex].classList.remove("behind"); // Remove `.behind` before switching
          itemsRef.current[prevIndex].classList.add('slideBack');
          itemsRef.current[currentIndex].classList.add('behind');
          setCurrentIndex(prevIndex);
      }
  }, 60); // Zero timeout to execute after render
  };

  
  // Automatically call nextSlide every 7 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000); // Calls nextSlide every 7 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup on unmount
      }
    };
  }, [currentIndex]); // Restart interval whenever `currentIndex` updates

  useEffect(() => {
    const items = itemsRef.current; // Create a copy here!

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target instanceof HTMLElement) {
        event.target.classList.remove('slideIn', 'slideBack', 'behind');
        // event.target.style.zIndex = "1"; // Reset z-index after animation
      }
      setSlideDirection(null);
    };

    items.forEach((item) => { // Use the copy 'items'
      item.addEventListener('animationend', handleAnimationEnd);
    });

    return () => {
      items.forEach((item) => { // Use the copy 'items' in cleanup as well
        item.removeEventListener('animationend', handleAnimationEnd);
      });
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  const pictures = ['/images/img1.avif',"/images/img2.avif",'/images/img3.webp', '/images/img4.webp'];

  return (
    <main className="carousel overflow-hidden relative h-[100vh] w-[100vw]">
      {pictures.map((pic, index) => (
        <div
          key={index}
          className="item absolute inset-0 w-full h-full"
          ref={(el) => { // Ref callback
            if (el) { // Check if 'el' is not null before assigning
              itemsRef.current[index] = el;
            }
          }}
          style={{ zIndex: index === currentIndex ? 10 : 1}} // Z-index management
        >
          <Image src={pic} alt="weather " fill className="object cover" />
        </div>
      ))}

      <div className="absolute top-0 left-0 w-full h-full justify-between items-center flex text-white text-3xl px-8 z-10">
        <button onClick={prevSlide} disabled={slideDirection !== null}> {/* Disable during animation */}
          <FaArrowAltCircleLeft />
        </button>
        <button onClick={nextSlide} disabled={slideDirection !== null}> {/* Disable during animation */}
          <FaArrowAltCircleRight />
        </button>
      </div>

      {/* <button className="">Weather Forecast</button> */}
    </main>
  );
}