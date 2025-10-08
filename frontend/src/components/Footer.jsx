import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import FooterLine from "./FooterLine";
import FacebookIcon from "./FacebookIcon";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/headphones", label: "HEADPHONES" },
  { to: "/speakers", label: "SPEAKERS" },
  { to: "/earphones", label: "EARPHONES" },
];

const socialLinks = [
  { to: "https://facebook.com", icon: <FacebookIcon />, label: "Facebook" },
  { to: "https://twitter.com", icon: <TwitterIcon />, label: "Twitter" },
  { to: "https://instagram.com", icon: <InstagramIcon />, label: "Instagram" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const navRef = useRef(null);
  const textRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the footer container
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Stagger nav links
      gsap.from(navRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        delay: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Animate paragraph and copyright
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });

      // Animate social icons
      gsap.from(socialsRef.current.children, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        delay: 0.8,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerRef} className="bg-[#101010] md:px-10 lg:px-[165px]">
      <FooterLine />

      {/* Section 1 */}
      <div className="flex flex-col items-center justify-center mt-12 md:mt-14 md:items-start lg:mt-[72px] lg:flex-row lg:justify-between lg:items-center">
        <Logo className="w-[143px] h-[25px]" />
        <nav
          ref={navRef}
          aria-label="Footer navigation"
          className="flex flex-col items-center justify-center gap-4 mt-12 md:mt-8 md:flex-row md:gap-[34px] lg:mt-0"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="text-white text-[13px] font-bold mx-4 hover:text-[#D87D4A] leading-[192%] tracking-[0.15em] md:mx-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Section 2 */}
      <div
        ref={textRef}
        className="px-6 mt-12 flex flex-col items-center justify-center gap-8 pb-[38px] md:pb-[46px] md:mt-8 md:px-0 lg:mt-9 lg:flex-row lg:gap-0 lg:justify-between lg:items-start lg:mx-0"
      >
        <div className="flex flex-col">
          <p className="text-center text-white/50 text-[15px] font-medium leading-[167%] md:text-start lg:w-[48.3%]">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <div className="mt-12 md:mt-20 flex items-center justify-evenly w-full md:justify-between">
            <p className="text-center text-white/50 font-bold text-[15px] leading-[167%]">
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </p>

            <div
              ref={socialsRef}
              className="hidden md:flex items-center justify-between w-[104px] lg:mt-[-63px]"
            >
              {socialLinks.map(({ to, icon, label }) => (
                <a
                  key={label}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus:outline-none focus:ring-2 focus:ring-[#D87D4A]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile socials */}
        <div
          ref={socialsRef}
          className="flex items-center justify-between w-[104px] md:hidden"
        >
          {socialLinks.map(({ to, icon, label }) => (
            <a
              key={label}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="focus:outline-none focus:ring-2 focus:ring-[#D87D4A]"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
