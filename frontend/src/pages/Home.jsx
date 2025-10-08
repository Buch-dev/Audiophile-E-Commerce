import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Product from "../components/Product";
import SeepProducts from "../components/SeeProducts";

const Home = () => {
  /* const products = [
    {
      _id: "68b20967db1cfb8ab4c31e8d",
      name: "1st Product",
      price: 999.99,
      description: "Updated description",
      image: "updated-image-url.jpg",
      category: "Updated Category",
      user: "68b0e55d77da979cb15703be",
      __v: 5,
      reviews: [
        {
          user: "68b22a458dac367080d4b407",
          name: "Peter Okafor",
          rating: 5,
          comment: "Cool",
          _id: "68b2326801f72723c1b660d2",
        },
      ],
      numOfReviews: 3,
      ratings: 3,
      createdAt: "2025-09-13T22:22:58.562Z",
      stock: -1,
    },
    {
      stock: 1,
      _id: "68b44e89afdf9b3b72a009f7",
      name: "Test Product",
      price: 999.99,
      description: "Test",
      image: "test_image",
      category: "Test category",
      user: "68b0e55d77da979cb15703be",
      ratings: 0,
      numOfReviews: 0,
      reviews: [],
      __v: 0,
      createdAt: "2025-10-08T09:52:33.260Z",
    },
  ]; */

  return (
    <>
      <Navbar />
      <Header />
      <Product />
      <SeepProducts />
      <Footer />
    </>
  );
};

export default Home;
