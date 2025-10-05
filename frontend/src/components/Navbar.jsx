import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import MenuIcon from "./MenuIcon";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/headphones", label: "HEADPHONES" },
    { to: "/speakers", label: "SPEAKERS" },
    { to: "/earphones", label: "EARPHONES" },
  ];

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleMenuClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="bg-black text-white px-6 md:px-10 lg:px-[165px] pt-8 border border-b-[1px] border-t-0 border-x-0 border-white/20 md:border-none">
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
            <Logo className="w-[143px] h-[25px]" />
          </div>

          <nav
            aria-label="Header Navigation"
            className="hidden lg:flex items-center justify-center gap-[34px]"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-white text-[13px] font-bold hover:text-[#D87D4A] leading-[192%] tracking-[0.15em]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="cart">
            <CartIcon />
          </div>
        </div>

        <div className="hidden md:block h-[1px] bg-white/20 w-full" />
      </div>
      <div
        className={`transition-all duration-300 ${
          dropdownOpen ? "max-h-[750px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Dropdown />
      </div>
    </div>
  );
};

export default Navbar;
