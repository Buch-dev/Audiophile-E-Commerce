import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Header = () => {
  const containerRef = useRef(null);
  const bgImagesRef = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade + scale in
      gsap.fromTo(
        bgImagesRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      // Staggered text animation
      gsap.from(textRefs.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.6,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white relative overflow-hidden">
      {/* Background images */}
      <img
        ref={(el) => (bgImagesRef.current[0] = el)}
        src="/home/mobile/image-header-correct.jpg"
        alt="image-header"
        className="w-full h-auto md:hidden"
      />
      <img
        ref={(el) => (bgImagesRef.current[1] = el)}
        src="/home/tablet/image-header-correct.jpg"
        alt="image-header"
        className="w-full h-auto hidden md:block lg:hidden"
      />
      <img
        ref={(el) => (bgImagesRef.current[2] = el)}
        src="/home/desktop/image-hero-correct.jpg"
        alt="image-header"
        className="w-full h-auto hidden lg:block"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 lg:px-[165px]">
        <div className="flex flex-col items-center justify-center h-full lg:items-start lg:w-[398px]">
          <h6
            ref={(el) => (textRefs.current[0] = el)}
            className="text-sm font-normal tracking-[0.71em] text-white/50"
          >
            NEW PRODUCT
          </h6>

          <h1
            ref={(el) => (textRefs.current[1] = el)}
            className="font-bold text-4xl leading-[111%] tracking-[0.04em] text-white text-center mt-4 md:mt-6 md:text-[56px] md:leading-[104%]"
          >
            XX99 MARK II HEADPHONES
          </h1>

          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="text-center text-white/75 text-[15px] font-medium leading-[167%] mt-6 px-6 md:w-[349px] md:px-0 lg:text-left"
          >
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <Link
            to="/headphones/xx99-mark-two"
            ref={(el) => (textRefs.current[3] = el)}
          >
            <button className="bg-[#D87D4A] hover:bg-[#FBAF85] cursor-pointer text-white py-[15px] px-[30px] mt-7 text-[13px] font-bold tracking-[0.08em] lg:mt-10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(216,125,74,0.6)]">
              SEE PRODUCT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
