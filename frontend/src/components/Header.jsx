import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black text-white relative">
      <img
        src="/home/mobile/image-header-correct.jpg"
        alt="image-header"
        className="w-full h-auto md:hidden"
      />
      <img
        src="/home/tablet/image-header-correct.jpg"
        alt="image-header"
        className="w-full h-auto hidden md:block lg:hidden"
      />
      <img
        src="/home/desktop/image-hero-correct.jpg"
        alt="image-header"
        className="w-full h-auto hidden lg:block"
      />
      <div className="absolute inset-0 bg-black/50 lg:px-[165px]">
        <div className="flex flex-col items-center justify-center h-full lg:items-start lg:w-[398px]">
          <h6 className="text-sm font-normal tracking-[0.71em] text-white/50">
            NEW PRODUCT
          </h6>
          <h1 className="font-bold text-4xl leading-[111%] tracking-[0.04em] text-white text-center mt-4 md:mt-6 md:text-[56px] md:leading-[104%]">
            XX99 MARK II HEADPHONES
          </h1>
          <p className="text-center text-white/75 text-[15px] font-medium leading-[167%] mt-6 px-6 md:w-[349px] md:px-0 lg:text-left">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          
            <button className="bg-[#D87D4A] hover:bg-[#FBAF85] cursor-pointer text-white py-[15px] px-[30px] mt-7 text-[13px] font-bold tracking-[0.08em] lg:mt-10">
              SEE PRODUCT
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
