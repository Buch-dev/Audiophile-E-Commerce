import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import MenuIcon from "./MenuIcon";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Refs for animations
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const cartRef = useRef(null);
  const linksRef = useRef([]);
  const dropdownRef = useRef(null);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/headphones", label: "HEADPHONES" },
    { to: "/speakers", label: "SPEAKERS" },
    { to: "/earphones", label: "EARPHONES" },
  ];

  const handleMenuClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // ===== On Load Animation =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.from(navRef.current, { y: -60, opacity: 0 })
        .from(logoRef.current, { x: -30, opacity: 0 }, "-=0.4")
        .from(cartRef.current, { x: 30, opacity: 0 }, "-=0.4")
        .from(linksRef.current, {
          opacity: 0,
          y: -15,
          stagger: 0.1,
          duration: 0.4,
        }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  // ===== Dropdown Animation =====
  useEffect(() => {
    if (dropdownOpen) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(dropdownRef.current, { display: "none" });
        },
      });
    }
  }, [dropdownOpen]);

  return (
    <div>
      <div
        ref={navRef}
        className="bg-black text-white px-6 md:px-10 lg:px-[165px] pt-8 border border-b-[1px] border-t-0 border-x-0 border-white/20 md:border-none"
      >
        <div className="flex items-center justify-between mb-8 lg:mb-9">
          <div className="flex items-center justify-between gap-[76px] md:gap-[42px]">
            <button
              onClick={handleMenuClick}
              className="lg:hidden focus:outline-none"
              aria-label="Open menu"
              type="button"
            >
              <MenuIcon />
            </button>
            <div ref={logoRef}>
              <Logo className="w-[143px] h-[25px]" />
            </div>
          </div>

          <nav
            aria-label="Header Navigation"
            className="hidden lg:flex items-center justify-center gap-[34px]"
          >
            {navLinks.map(({ to, label }, i) => (
              <Link
                key={label}
                to={to}
                ref={(el) => (linksRef.current[i] = el)}
                className="text-white text-[13px] font-bold hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div ref={cartRef} className="cart">
            <CartIcon />
          </div>
        </div>

        <div className="hidden md:block h-[1px] bg-white/20 w-full" />
      </div>

      {/* Dropdown menu */}
      <div
        ref={dropdownRef}
        className="overflow-hidden opacity-0 h-0"
      >
        <Dropdown />
      </div>
    </div>
  );
};

export default Navbar;
