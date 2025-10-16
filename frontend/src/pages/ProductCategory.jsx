import { useEffect } from "react";
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
      <div className="flex flex-col items-center justify-center">
        <div className="bg-black py-8 flex items-center justify-center w-full">
          <h1 className="text-white font-bold text-[28px] tracking-[2px] uppercase">
            {category}
          </h1>
        </div>
        {products.length === 0 ? (
          <span className="text-lg font-bold text-gray-600">
            No products found in this category.
          </span>
        ) : (
          <div className="text-center w-full px-6 flex flex-col items-center justify-center gap-[120px] mt-16 mb-24">
            {products.map((prod, idx) => (
              <div
                key={prod._id}
                className="flex flex-col items-center justify-center gap-8"
              >
                <img
                  src={prod.image_mobile}
                  alt={prod.name}
                  className="rounded-lg"
                />
                <div className="flex flex-col items-center justify-center gap-6">
                  {idx === 0 && (
                    <p className="text-sm tracking-[10px] text-[#D87D4A]">
                      NEW PRODUCT
                    </p>
                  )}
                  <h3 className="font-bold uppercase text-[28px] tracking-[1px]">
                    {prod.name} <br /> {category}
                  </h3>
                  <p className="text-[15px] font-medium leading-[25px] text-black/50">
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
          <ProductCard />
          <Location />
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductCategory;
