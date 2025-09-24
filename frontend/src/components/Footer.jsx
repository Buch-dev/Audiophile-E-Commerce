import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import FooterLine from "./FooterLine";
import FacebookIcon from "./FacebookIcon";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";

const Footer = () => {
  return (
    <div className="bg-[#101010]">
      <FooterLine />
      {/* Section 1 */}
      <div className="flex flex-col items-center justify-center pt-12 lg:flex-row">
        <Logo className="w-[143px] h-[25px]" />
        <div className="flex flex-col items-center justify-center gap-4 mt-12 md:mt-0 md:flex-row">
          <Link
            to={"/"}
            className="text-white text-[13px] font-bold mx-4 hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
          >
            HOME
          </Link>
          <Link
            to={"/"}
            className="text-white text-[13px] font-bold mx-4 hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
          >
            HEADPHONES
          </Link>
          <Link
            to={"/"}
            className="text-white text-[13px] font-bold mx-4 hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
          >
            SPEAKERS
          </Link>
          <Link
            to={"/"}
            className="text-white text-[13px] font-bold mx-4 hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
          >
            EARPHONES
          </Link>
        </div>
      </div>
      {/* Section 2 */}
      <div className="px-6 mt-12 flex flex-col items-center justify-center gap-8 pb-[38px] lg:px-0 lg:flex-row lg:gap-0 lg:justify-between lg:items-start lg:mx-40">
        <div className="flex flex-col">
          <p className="text-center text-white/50 text-[15px] font-medium leading-[167%]">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <p className="text-center text-white/50 font-bold text-[15px] mt-12 leading-[167%]">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
        <div className="flex items-center justify-between w-[104px]">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
