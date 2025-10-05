import { Link } from "react-router-dom";
import ArrowIcon from "./ArrowIcon";

const Dropdown = () => {
  const menuItems = [
    {
      to: "/headphones",
      label: "HEADPHONES",
      image: "menu-headphone.png",
      width: 79,
      height: 104,
    },
    {
      to: "/speakers",
      label: "SPEAKERS",
      image: "menu-speaker.png",
      width: 84,
      height: 101,
    },
    {
      to: "/earphones",
      label: "EARPHONES",
      image: "menu-earphones.png",
      width: 103,
      height: 104,
    },
  ];
  return (
    <div className="bg-white z-50 text-black rounded-b-lg px-6 pt-[84px] md:px-10 md:pt-14">
      <div className="flex flex-col items-center justify-center gap-[68px] pb-[35px] md:gap-2.5 md:flex-row md:pt-14 md:pb-[67px] lg:hidden">
        {menuItems.map(({ to, label, image, width, height }) => (
          <Link
            to={to}
            key={label}
            className="w-full h-[165px] text-center bg-[#f1f1f1] border-b border-b-gray-300 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <div className="flex flex-col items-center relative">
              <img
                src={`/${image}`}
                alt={label}
                className={`w-${width} h-${height} mx-auto mt-[-52px] mb-[38.5px] object-contain`}
                style={{ zIndex: 2 }}
              />
              <div
                style={{
                  width: `${width * 1.1}px`,
                  height: "28px",
                  background: "rgba(0,0,0,0.10)",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "50%",
                  bottom: `calc(38.5px - 14px)`,
                  transform: "translateX(-50%)",
                  filter: "blur(5px)",
                  zIndex: 1,
                }}
              />
            </div>
            <label className="font-bold text-[15px] tracking-[0.07em]">
              {label}
            </label>
            <span className="flex items-center justify-center gap-[13.32px] w-full text-black/50 text-[13px] font-bold tracking-[0.08em] mt-[17px]">
              SHOP <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
