import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { useEffect } from "react";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./footer";

const HeadPhonesCategory = () => {
  const { loading, error, products, productCounts, productCategory } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching products.",
        { position: "bottom-right", autoClose: 3000 }
      );
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

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
    <div className="w-full">
      <header className="bg-black text-white px-[84px] py-8">
        <h1 className="font-bold text-[28px] tracking-[2px]">HEADPHONES</h1>
      </header>
      <div>
        <Product
          products={products}
          productCounts={productCounts}
          category={productCategory}
        />
      </div>
    </div>
  );
};

export default HeadPhonesCategory;
