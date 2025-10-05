import * as React from "react";

const MenuIcon = ({ width = 16, height = 15, fill = "#fff", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    className="cursor-pointer lg:hidden"
    viewBox="0 0 16 15"
    {...props}
  >
    <path fill={fill} d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"></path>
  </svg>
);

export default MenuIcon;
