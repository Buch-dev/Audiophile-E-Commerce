import React from "react";

const SeeProducts = () => {
  return (
    <div className="grid grid-cols-1 gap-6 px-6 pb-[120px] md:px-10 md:pb-[88px] lg:grid-cols-2 lg:px-[165px] lg:pb-[160px]">
      <div
        className="bg-[#D87D4A] flex flex-col items-center justify-center text-center px-6 py-[55px] rounded-lg"
        style={{
          backgroundImage: 'url("/spiral.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "contain",
        }}
      >
        <img
          src="/home/mobile/image-speaker-zx9.png"
          alt="speaker"
          className="w-[172.55px] h-[207px]"
        />
        <h1 className="text-white font-bold text-4xl text-center mt-8 leading-[40px] tracking-[1.29px]">
          ZX9 <br /> SPEAKER
        </h1>
        <p className="text-white/75 text-[15px] leading-[25px] mt-6">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <button className="bg-black hover:bg-gray-800 cursor-pointer text-white py-[15px] px-[30px] mt-6 text-[13px] font-bold tracking-[0.08em]">
          SEE PRODUCT
        </button>
      </div>
      <div className="bg-[#F1F1F1]">
        <h1 className="text-black">ZX9 SPEAKER</h1>
        <p className="text-black">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
      </div>
    </div>
  );
};

export default SeeProducts;
