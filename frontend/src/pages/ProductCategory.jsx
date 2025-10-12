import React, { useEffect } from "react";
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

const ProductCategory = () => {
  const { category } = useParams();

  const { loading, error, products } = useSelector(
    (state) => state.categoryProducts
  );
  console.log(products);

  const dispatch = useDispatch();
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
      <div className="flex items-center justify-center">
        {products.length === 0 ? (
          <span className="text-lg font-bold text-gray-600">
            No products found in this category.
          </span>
        ) : (
          <div className="text-center my-8">
            <h1 className="text-lg font-bold text-gray-600">
              {products.length} products found.
            </h1>
            <h2 className="text-md font-semibold text-gray-500">
              Showing results for "{category}"
            </h2>
            {products.map((prod) => (
              <div key={prod._id} className="mt-4">
                <h3 className="font-bold">{prod.name}</h3>
              </div>
            ))}
          </div>)}
      </div>
      {products.length > 0 && (
        <>
          <ProductCard />
          <Location />
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductCategory;
