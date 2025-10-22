import React, { useEffect, useState, useRef } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  getProduct,
  getProductDetails,
} from "../features/products/productSlice";
import Location from "../components/Location";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetails, detailsLoading, error } = useSelector(
    (state) => state.product
  );
  const { products } = useSelector((state) => state.product);

  // ✨ Animation Refs
  const productInfoRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);
  const relatedRef = useRef(null);

  // 🔹 Fetch Data
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const relatedProducts = products?.filter(
    (item) => item._id !== productDetails?._id
  );

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearProductDetails());
      }
    };
  }, [error, dispatch]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prevQty) => prevQty + 1);
    } else if (type === "decrease") {
      setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    }
  };

  // ✨ GSAP Animations
  useEffect(() => {
    if (!productDetails) return;

    // Product Info
    gsap.fromTo(
      productInfoRef.current?.children || [],
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: productInfoRef.current,
          start: "top 85%",
        },
      }
    );

    // Features + In the Box
    gsap.fromTo(
      featuresRef.current?.children || [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
      }
    );

    // Gallery
    gsap.fromTo(
      galleryRef.current?.querySelectorAll("img") || [],
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
        },
      }
    );

    // Related Products
    gsap.fromTo(
      relatedRef.current?.querySelectorAll(".related-product-card") || [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 85%",
        },
      }
    );
  }, [productDetails]);

  if (detailsLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <span className="text-lg font-bold text-gray-600">
            Loading products details...
          </span>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <PageTitle title={`Product Details - ${productDetails.name}`} />
      <Navbar />
      <div className="product-details px-6 md:px-10 lg:px-[165px]">
        <button
          onClick={() => navigate(-1)}
          className="text-[15px] text-black/50 leading-[25px] mt-4 mb-6 cursor-pointer"
        >
          Go Back
        </button>

        {/* ✨ Animated Sections */}
        <div ref={productInfoRef} className="product-info flex flex-col gap-[88px]">
          {/* Product Info */}
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-center">
            <div className="images md:w-1/2">
              <img
                src={productDetails.image_product_mobile}
                alt={productDetails.name}
                className="rounded-lg md:hidden"
              />
              <img
                src={productDetails.image_product_tablet}
                alt={productDetails.name}
                className="rounded-lg hidden md:block w-[281px] lg:hidden"
              />
              <img
                src={productDetails.image_product_desktop}
                alt={productDetails.name}
                className="rounded-lg hidden lg:block"
              />
            </div>
            <div className="flex flex-col md:w-1/2">
              <p className="text-sm tracking-[10px] text-[#D87D4A]">
                {productDetails.version}
              </p>
              <h1 className="font-bold uppercase text-[28px] tracking-[1px] mt-6 md:text-[40px] md:tracking-[1.43px] md:leading-[44px]">
                {productDetails.name} <br /> {productDetails.category}
              </h1>
              <p className="description text-[15px] font-medium leading-[25px] text-black/50 mt-6">
                {productDetails.description}
              </p>
              <p className="price tracking-[1.29px] text-lg font-bold mt-6">
                ${productDetails.price}
              </p>
              <div className="add-to-cart-btns flex items-center mt-[31px] gap-4">
                <button className="bg-[#F1F1F1] px-[15.5px] py-[15px] flex items-center justify-center gap-5">
                  <span
                    onClick={() => handleQuantityChange("decrease")}
                    className="quantity-decrease text-[13px] text-black/25 tracking-[1px] font-bold cursor-pointer"
                  >
                    -
                  </span>
                  <span className="quantity-value text-[13px] text-black tracking-[1px] font-bold">
                    {quantity}
                  </span>
                  <span
                    onClick={() => handleQuantityChange("increase")}
                    className="quantity-increase text-[13px] text-black/25 tracking-[1px] font-bold cursor-pointer"
                  >
                    +
                  </span>
                </button>
                <Button children="ADD TO CART" />
              </div>
            </div>
          </div>

          {/* Features + In The Box */}
          <div
            ref={featuresRef}
            className="flex flex-col w-full lg:flex-row lg:justify-between lg:items-start lg:gap-[165px]"
          >
            <div className="features-list flex flex-col gap-6 lg:w-[60%]">
              <h1 className="text-2xl leading-9 tracking-[0.86px] font-bold">
                FEATURES
              </h1>
              <p className="text-[15px] font-medium leading-[25px] text-black/50">
                {productDetails.features_I} <br />
                <br />
                {productDetails.features_II}
              </p>
            </div>

            <div className="in-the-box-list flex flex-col gap-6 w-[40%] md:flex-row lg:flex-col">
              <h1 className="text-2xl leading-9 tracking-[0.86px] font-bold md:w-[339px]">
                IN THE BOX
              </h1>

              <p className="text-[15px] font-medium leading-[25px] text-black/50 flex flex-col gap-2">
                {productDetails.in_the_box.map((item, index) => (
                  <span key={item._id}>
                    <span className="mr-[21px] text-[#D87D4A] font-bold leading-[25px]">
                      {item.quantity}x
                    </span>{" "}
                    {item.item}
                    {index < productDetails.in_the_box.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div ref={galleryRef} className="image-gallery">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-1">
              <div className="flex flex-col items-center justify-center gap-4 md:hidden">
                <img src={productDetails.image_gallery_mobile} alt={productDetails.name} className="rounded-lg md:hidden" />
                <img src={productDetails.image_gallery_mobile_2} alt={productDetails.name} className="rounded-lg md:hidden" />
                <img src={productDetails.image_gallery_mobile_3} alt={productDetails.name} className="rounded-lg md:hidden" />
              </div>

              <div className="hidden md:flex gap-[18px] lg:hidden">
                <div className="flex flex-col items-center justify-between gap-[18px] w-[45%]">
                  <img src={productDetails.image_gallery_tablet} alt={productDetails.name} className="rounded-lg" />
                  <img src={productDetails.image_gallery_tablet_2} alt={productDetails.name} className="rounded-lg" />
                </div>
                <img src={productDetails.image_gallery_tablet_3} alt={productDetails.name} className="rounded-lg w-[55%]" />
              </div>

              <div className="hidden lg:flex gap-[30px]">
                <div className="flex flex-col items-center justify-between gap-[32px] w-[45%]">
                  <img src={productDetails.image_gallery_desktop} alt={productDetails.name} className="rounded-lg" />
                  <img src={productDetails.image_gallery_desktop_2} alt={productDetails.name} className="rounded-lg" />
                </div>
                <img src={productDetails.image_gallery_desktop_3} alt={productDetails.name} className="rounded-lg w-[55%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div
          ref={relatedRef}
          className="you-may-also-like flex flex-col items-center justify-center gap-10 mt-[120px] mb-20"
        >
          <h2 className="text-2xl font-bold tracking-[1.71px]">
            YOU MAY ALSO LIKE
          </h2>
          <div className="flex flex-col items-center justify-center gap-14 md:flex-row md:gap-[11px]">
            {relatedProducts?.slice(0, 3).map((item) => (
              <div
                key={item._id}
                className="related-product-card flex flex-col items-center gap-8"
              >
                <img src={item.shared_image_mobile} alt={item.name} className="rounded-lg md:hidden" />
                <img src={item.shared_image_tablet} alt={item.name} className="rounded-lg hidden md:block lg:hidden" />
                <img src={item.shared_image_desktop} alt={item.name} className="rounded-lg hidden lg:block" />
                <h2 className="text-2xl font-bold uppercase tracking-[1.71px]">
                  {item.name}
                </h2>
                <Button children={"SEE PRODUCT"} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductCard />
      <Location />
      <Footer />
    </>
  );
};

export default ProductDetails;
