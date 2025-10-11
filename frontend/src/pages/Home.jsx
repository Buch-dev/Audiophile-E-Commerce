import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Product from "../components/Product";
import SeepProducts from "../components/SeeProducts";
import Location from "../components/Location";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/products/productSlice";

const Home = () => {
  const { loading, error, products, productCounts } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <span className="text-lg font-bold text-red-600">{error}</span>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageTitle title={"Home - AudioPhile"} />
      <Navbar />
      <Header />
      <Product products={products} productCounts={productCounts} />
      <SeepProducts />
      <Location />
      <Footer />
    </>
  );
};

export default Home;
