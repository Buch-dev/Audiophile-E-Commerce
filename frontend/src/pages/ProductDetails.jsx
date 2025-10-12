import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const ProductDetails = () => {
  return (
    <>
      <PageTitle title={"Product Details - AudioPhile"} />
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg font-bold text-gray-600">
          Product Details Page - Coming Soon!
        </span>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
