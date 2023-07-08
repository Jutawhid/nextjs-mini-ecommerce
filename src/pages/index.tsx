import Head from "next/head";
// import Banner from '../components/Banner';
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
// import { getSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";

export default function Home({ products, categories }: any) {
  const [filteredProducts, setProducts] = useState([]);

  useEffect(() => {
    setProducts(products);
  }, []);

  return (
    <>
      <MainLayout categories={categories}>
        {filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} categories={categories}/>
        ) : (
          <div className="text-center text-2xl py-4">
            🙁 No matching products…
          </div>
        )}
      </MainLayout>
    </>
  );
}

// Tells nextJS that's no longer a static page
// eg "Please calculate something on the server first and send it to the user next"
// Here, it's executed by Node.js
export async function getServerSideProps() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  console.log("products", products);
  console.log("categories", categories);
  return {
    props: {
      products: products,
      categories: categories,
    },
  };
}
