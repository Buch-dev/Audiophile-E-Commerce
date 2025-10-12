import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ProductCard from "../components/ProductCard";
import Location from "../components/Location";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";
import ArrowIcon from "../components/ArrowIcon";

const ProductCategory = () => {
  const { category } = useParams();

  const { loading, error, products, productCounts } = useSelector(
    (state) => state.product
  );

  const filteredProducts = products.filter(
    (prod) => prod.category === category
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
    <>
      <PageTitle title={`Product Category - ${category.toUpperCase()}`} />
      <Navbar />
      <div className="flex items-center justify-center text-amber-800">
        {filteredProducts.map((prod) => (
          <Link to={`/product/${prod._id}`} key={prod._id}>
            {prod.name}
          </Link>
        ))}
      </div>
      <ProductCard />
      <Location />
      <Footer />
    </>
  );
};

export default ProductCategory;
