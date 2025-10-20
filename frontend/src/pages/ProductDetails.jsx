import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  getProductDetails,
} from "../features/products/productSlice";
import Location from "../components/Location";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

const ProductDetails = () => {
  const { id } = useParams(); // get product id from url
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select data from Redux store
  const { productDetails, detailsLoading, error } = useSelector(
    (state) => state.product
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  // Clear error whne component unmounts
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
      <div className="product-details px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[15px] text-black/50 leading-[25px] mt-4 mb-6"
        >
          Go Back
        </button>

        <div className="product-info flex flex-col gap-[88px]">
          <div className="flex flex-col gap-10">
            <div className="images">
              <img
                src={productDetails.image_product_mobile}
                alt={productDetails.name}
                className="rounded-lg md:hidden"
              />
              <img
                src={productDetails.image_product_tablet}
                alt={productDetails.name}
                className="rounded-lg hidden md:block lg:hidden"
              />
              <img
                src={productDetails.image_product_desktop}
                alt={productDetails.name}
                className="rounded-lg hidden lg:block"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm tracking-[10px] text-[#D87D4A]">
                {productDetails.version}
              </p>
              <h1 className="font-bold uppercase text-[28px] tracking-[1px] mt-6 md:text-[40px] md:tracking-[1.43px] md:leading-[44px]">
                {productDetails.name} <br /> {productDetails.category}
              </h1>
              <p className="description text-[15px] font-medium leading-[25px] text-black/50 mt-6 md:w-[572px] lg:w-[445px]">
                {productDetails.description}
              </p>
              <p className="price tracking-[1.29px] text-lg font-bold mt-6">
                ${productDetails.price}
              </p>
              <div className="add-to-cart-btns flex items-center mt-[31px] gap-4">
                <button className="bg-[#F1F1F1] px-[15.5px] py-[15px] flex items-center justify-center gap-5">
                  <span
                    onClick={() => handleQuantityChange("decrease")}
                    className="quantity-decrease text-[13px] text-black/25 tracking-[1px] font-bold"
                  >
                    -
                  </span>
                  <span className="quantity-value text-[13px] text-black tracking-[1px] font-bold">
                    {quantity}
                  </span>
                  <span
                    onClick={() => handleQuantityChange("increase")}
                    className="quantity-increase text-[13px] text-black/25 tracking-[1px] font-bold"
                  >
                    +
                  </span>
                </button>
                <Button children="ADD TO CART" />
              </div>
            </div>
          </div>

          <div className="features-list flex flex-col gap-6">
            <h1 className="text-2xl leading-9 tracking-[0.86px] font-bold">
              FEATURES
            </h1>
            <p className="text-[15px] font-medium leading-[25px] text-black/50 md:w-[572px] lg:w-[445px]">
              {productDetails.features_I} <br />
              <br />
              {productDetails.features_II}
            </p>
          </div>

          <div className="in-the-box-list flex flex-col gap-6">
            <h1 className="text-2xl leading-9 tracking-[0.86px] font-bold">
              IN THE BOX
            </h1>

            <p className="text-[15px] font-medium leading-[25px] text-black/50 flex flex-col gap-2 md:w-[572px] lg:w-[445px]">
              {productDetails.in_the_box.map((item, index) => (
                <span key={item._id}>
                  <span className="mr-[21px] text-[#D87D4A] font-bold leading-[25px]">{item.quantity}x</span> {item.item}
                  {index < productDetails.in_the_box.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Image gallery */}
          <div className="image-gallery">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src={productDetails.image_gallery_mobile}
                alt={productDetails.name}
                className="rounded-lg md:hidden"
              />
              <img
                src={productDetails.image_gallery_mobile_2}
                alt={productDetails.name}
                className="rounded-lg md:hidden"
              />
              <img
                src={productDetails.image_gallery_mobile_3}
                alt={productDetails.name}
                className="rounded-lg md:hidden"
              />
              <img
                src={productDetails.image_gallery_tablet}
                alt={productDetails.name}
                className="rounded-lg hidden md:block lg:hidden"
              />
              <img
                src={productDetails.image_gallery_tablet_2}
                alt={productDetails.name}
                className="rounded-lg hidden md:block lg:hidden"
              />
              <img
                src={productDetails.image_gallery_tablet_3}
                alt={productDetails.name}
                className="rounded-lg hidden md:block lg:hidden"
              />
              <img
                src={productDetails.image_gallery_desktop}
                alt={productDetails.name}
                className="rounded-lg hidden lg:block"
              />
              <img
                src={productDetails.image_gallery_desktop_2}
                alt={productDetails.name}
                className="rounded-lg hidden lg:block"
              />
              <img
                src={productDetails.image_gallery_desktop_3}
                alt={productDetails.name}
                className="rounded-lg hidden lg:block"
              />
            </div>
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
