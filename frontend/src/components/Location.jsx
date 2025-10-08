const Location = () => {
  return (
    <div className="px-6 pb-[120px] flex flex-col items-center justify-center gap-10 md:gap-[63px] md:px-10 md:pb-[96px] lg:flex-row-reverse lg:px-[165px] lg:justify-between lg:pt-[200px] lg:pb-[200px]">
      <img
        src="/home/mobile/image-best-gear.jpg"
        alt="image-best-gear"
        className="rounded-lg md:hidden"
      />
      <img
        src="/home/tablet/image-best-gear.jpg"
        alt="image-best-gear"
        className="rounded-lg hidden md:block lg:hidden"
      />
      <img
        src="/home/desktop/image-best-gear.jpg"
        alt="image-best-gear"
        className="rounded-lg hidden lg:block"
      />
      <div className="flex flex-col items-center justify-center gap-8 md:w-[573px] lg:items-start lg:w-[445px]">
        <h2 className="text-center font-bold text-[28px] tracking-[1px] md:text-[40px] leading-[44px] md:tracking-[1.43px] lg:text-left">
          BRINGING YOU THE <span className="text-[#D87D4A] ">BEST</span> AUDIO
          GEAR
        </h2>
        <p className="text-center text-[15px] text-black/50 leading-[25px] font-medium lg:text-left">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
};

export default Location;
