import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowIcon from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

const Product = ({ products = [], productCounts }) => {
  const productRef = useRef(null);

  useEffect(() => {
    const elements = productRef.current.querySelectorAll(".product-card");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // If no products, fallback to menuItems
  if (!products || products.length === 0) {
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
      <div
        ref={productRef}
        className="px-6 pt-[94px] pb-[120px] md:px-10 md:pt-14 lg:px-[165px] lg:pb-[168px] lg:pt-[141px]"
      >
        <div className="flex flex-col items-center justify-center gap-[68px] md:gap-2.5 md:flex-row md:pt-14 lg:gap-[30px]">
          {menuItems.map(({ to, label, image, width, height }) => (
            <Link
              to={to}
              key={label}
              className="product-card w-full h-[165px] text-center bg-[#f1f1f1] border-b border-b-gray-300 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <div className="flex flex-col items-center relative">
                <img
                  src={`/${image}`}
                  alt={label}
                  className="mx-auto mt-[-52px] mb-[38.5px] object-contain"
                  width={width}
                  height={height}
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
  }

  // Render fetched products
  return (
    <div
      ref={productRef}
      className="px-6 pt-[94px] pb-[120px] md:px-10 md:pt-14 lg:px-[165px] lg:pb-[168px] lg:pt-[141px]"
    >
      <div className="flex flex-col items-center justify-center gap-[68px] md:gap-2.5 md:flex-row md:pt-14 lg:gap-[30px]">
        {products.map((prod) => (
          <Link
            to={`/product/${prod._id}`}
            key={prod._id}
            className="product-card w-full h-[165px] text-center bg-[#f1f1f1] border-b border-b-gray-300 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <div className="flex flex-col items-center relative">
              <img
                src={prod.image}
                alt={prod.name}
                className="mx-auto mt-[-52px] mb-[38.5px] object-contain"
                style={{ zIndex: 2, maxHeight: 104, maxWidth: 103 }}
              />
            </div>
            <label className="font-bold text-[15px] tracking-[0.07em]">
              {prod.name}
            </label>
            <span className="flex items-center justify-center gap-[13.32px] w-full text-black/50 text-[13px] font-bold tracking-[0.08em] mt-[17px]">
              SHOP <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
      {/* Optionally show productCounts */}
      {productCounts && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          Total Products: {productCounts}
        </div>
      )}
    </div>
  );
};

export default Product;
