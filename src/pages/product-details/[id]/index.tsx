import React from "react";
import { getCategories, getProducts } from "../../../fetchers/product";
import { Product } from "../../../../types";
import MainLayout from "@/layouts/MainLayout";
import { GetServerSideProps } from "next";
import ProductDetails from "../../../components/ProductDetails";

export default function Product({ categories, product}: any) {


  return (
    <MainLayout categories={categories}>
      <ProductDetails product={product}/>
    </MainLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  const query = context.query;
  console.log('query', query);
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  const product = await fetch(
    `https://fakestoreapi.com/products/${query.id}`
  ).then((res) => res.json());
  console.log("categories", categories);
  console.log("product", product);
  return {
    props: {
      categories: categories,
      product: product,
    },
  };
};
