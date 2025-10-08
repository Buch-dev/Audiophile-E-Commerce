import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SeeProducts = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const blocks = sectionRef.current.querySelectorAll(".see-block");

    gsap.fromTo(
      blocks,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 gap-6 px-6 pb-[120px] md:px-10 md:pb-[88px] lg:px-[165px] lg:pb-0 lg:gap-12"
    >
      {/* ZX9 Speaker */}
      <div className="see-block bg-[#D87D4A] flex flex-col items-center justify-center text-center px-6 py-[55px] rounded-lg md:py-0 md:pt-[52px] md:pb-16 bg-[url('/spiral.png')] bg-no-repeat bg-top bg-contain md:bg-[url('/spiral-tablet.png')] lg:flex-row lg:pb-0 lg:gap-[10%] lg:items-start lg:bg-[url('/spiral-desktop.png')] lg:bg-top-left overflow-hidden">
        <img
          src="/home/mobile/image-speaker-zx9.png"
          alt="speaker"
          className="w-[172.55px] h-[207px] md:hidden"
        />
        <img
          src="/home/tablet/image-speaker-zx9.png"
          alt="speaker"
          className="hidden md:block w-[197.21px] h-[237px] lg:hidden"
        />
        <img
          src="/home/tablet/image-speaker-zx9.png"
          alt="speaker"
          className="hidden lg:block w-[410.23px] h-[493px] mb-[-15px]"
        />
        <div className="flex flex-col items-center justify-center lg:items-start">
          <h1 className="text-white font-bold text-4xl text-center mt-8 leading-[40px] tracking-[1.29px] md:mt-16 md:text-[56px] md:leading-[58px] lg:text-left lg:mt-[37px]">
            ZX9 <br /> SPEAKER
          </h1>
          <p className="text-white/75 text-[15px] leading-[25px] mt-6 md:w-[349px] lg:text-left">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <button className="bg-black hover:bg-gray-800 cursor-pointer text-white py-[15px] px-[30px] mt-6 text-[13px] font-bold tracking-[0.08em] w-fit md:mt-10">
            SEE PRODUCT
          </button>
        </div>
      </div>

      {/* ZX7 Speaker */}
      <div className="see-block flex flex-col items-start justify-center text-center px-6 py-[101px] gap-8 rounded-lg bg-[url('/home/mobile/image-speaker-zx7.jpg')] bg-no-repeat bg-center bg-cover md:px-[62px] lg:items-start lg:text-left md:bg-[url('/home/tablet/image-speaker-zx7.jpg')] lg:bg-[url('/home/desktop/image-speaker-zx7.jpg')] lg:px-[95px]">
        <h1 className="text-black font-bold text-[28px] text-center leading-[40px] tracking-[1.29px]">
          ZX7 SPEAKER
        </h1>
        <button className="border border-black hover:bg-black hover:text-white cursor-pointer text-black py-[15px] px-[30px] text-[13px] font-bold tracking-[0.08em]">
          SEE PRODUCT
        </button>
      </div>

      {/* YX1 Earphones */}
      <div className="see-block grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-[30px]">
        <div className="rounded-lg overflow-hidden">
          <img
            src="/home/mobile/image-earphones-yx1.jpg"
            alt="earphones"
            className="md:hidden"
          />
          <img
            src="/home/tablet/image-earphones-yx1.jpg"
            alt="earphones"
            className="hidden md:block lg:hidden"
          />
          <img
            src="/home/desktop/image-earphones-yx1.jpg"
            alt="earphones"
            className="hidden lg:block"
          />
        </div>
        <div className="bg-[#F1F1F1] flex flex-col items-start justify-center text-center px-6 py-[55px] gap-8 rounded-lg lg:items-start lg:text-left lg:px-[95px]">
          <h1 className="text-black font-bold text-[28px] text-center leading-[40px] tracking-[1.29px]">
            YX1 EARPHONES
          </h1>
          <button className="border border-black hover:bg-black hover:text-white cursor-pointer text-black py-[15px] px-[30px] text-[13px] font-bold tracking-[0.08em]">
            SEE PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeProducts;
