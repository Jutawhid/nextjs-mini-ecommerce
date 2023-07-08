import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect } from "react";
import { Children } from "../../types";
import StorageService from "../services/StorageService";
import { store } from "../app/store";
import { hydrate } from "../slices/basketSlice";
export default function MainLayout({ children, categories }: any) {
  // console.log('children',children);
  // console.log('categories',categories);
  useEffect(() => {
    store.subscribe(() => {
        StorageService.set("basket", JSON.stringify(store.getState().basket));
    });
    let basket = StorageService.get("basket");
    basket = basket ? JSON.parse(basket) : { items: [] };
    store.dispatch(hydrate(basket));
}, []);
  return (
    <>
      <div className="bg-gray-100 ">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
          />
          <title>Mini Ecommorce</title>
          <meta
            name="description"
            content="E-commerce website build with jusim Uddin Tawhid"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="/img/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Header categories={categories} />

        <main className="max-w-screen-2xl mx-auto">{children}</main>
      </div>
    </>
  );
}
