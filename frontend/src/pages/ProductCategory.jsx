import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ProductCard from "../components/ProductCard";
import Location from "../components/Location";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearCategoryProducts,
  getProductsByCategories,
} from "../features/products/categorySlice";
import Button from "../components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductCategory = () => {
  const { category } = useParams();
  const { loading, error, products } = useSelector(
    (state) => state.categoryProducts
  );

  const dispatch = useDispatch();

  // Refs for animation targets
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const productRefs = useRef([]);

  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategories(category));
    }
  }, [dispatch, category]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching products.",
        { position: "bottom-right", autoClose: 3000 }
      );
      dispatch(clearCategoryProducts());
    }
  }, [dispatch, error]);

  // GSAP Animations
  useEffect(() => {
    if (products.length > 0) {
      // Fade in container
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Slide-up category title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Animate each product section
      productRefs.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          opacity: 0,
          y: 60,
          x: i % 2 === 0 ? -50 : 50,
          duration: 1,
          ease: "power3.out",
        });
      });
    }
  }, [products]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <span className="text-lg font-bold text-gray-600">
            Loading products...
          </span>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageTitle title={`Product Category - ${category.toUpperCase()}`} />
      <Navbar />
      <div ref={containerRef} className="flex flex-col items-center justify-center">
        <div
          ref={titleRef}
          className="bg-black py-8 flex items-center justify-center w-full"
        >
          <h1 className="text-white font-bold text-[28px] tracking-[2px] uppercase">
            {category}
          </h1>
        </div>

        {products.length === 0 ? (
          <span className="text-lg font-bold text-gray-600 mt-12">
            No products found in this category.
          </span>
        ) : (
          <div className="text-center w-full px-6 flex flex-col items-center justify-center gap-[120px] mt-16 mb-24 md:gap-[120px] md:px-10 lg:px-[165px] lg:gap-[160px] lg:text-left">
            {products.map((prod, idx) => (
              <div
                key={prod._id}
                ref={(el) => (productRefs.current[idx] = el)}
                className={`flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between lg:gap-[10%] ${
                  parseInt(idx) % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <img
                  src={prod.image_mobile}
                  alt={prod.name}
                  className="rounded-lg md:hidden"
                />
                <img
                  src={prod.image_tablet}
                  alt={prod.name}
                  className="hidden md:block rounded-lg lg:hidden"
                />
                <img
                  src={prod.image_desktop}
                  alt={prod.name}
                  className="hidden lg:block rounded-lg w-[45%]"
                />
                <div className="flex flex-col items-center justify-center gap-6 lg:items-start">
                  {idx === 0 && (
                    <p className="text-sm tracking-[10px] text-[#D87D4A]">
                      NEW PRODUCT
                    </p>
                  )}
                  <h3 className="font-bold uppercase text-[28px] tracking-[1px] md:text-[40px] md:tracking-[1.43px] md:leading-[44px]">
                    {prod.name} <br /> {category}
                  </h3>
                  <p className="text-[15px] font-medium leading-[25px] text-black/50 md:w-[572px] lg:w-[445px]">
                    {prod.description}
                  </p>
                  <Link to={`/product/${prod._id}`}>
                    <Button label="SEE PRODUCT" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {products.length > 0 && (
        <>
          {/* Fade-in footer sections */}
          <div
            className="opacity-0"
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                  },
                  opacity: 1,
                  duration: 1,
                  ease: "power2.out",
                });
              }
            }}
          >
            <ProductCard />
            <Location />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductCategory;
