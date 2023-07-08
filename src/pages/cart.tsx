import Image from "next/image";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, selectItems, selectTotal, removeGroupedFromBasket } from "../slices/basketSlice";
import { groupBy } from "lodash";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import Currency from 'react-currency-formatter';
import axios from "axios";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";
import CartProduct from "@/components/CartProduct";
import { CreditCardIcon } from "@heroicons/react/24/outline";

function Cart({ categories }: any) {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);
  const groupedItems = Object.values(groupBy(items, "id"));
  const dispatch = useDispatch();
  console.log('items',items);
  const clearCart =()=>{
    dispatch(clearBasket())
  }
  return (
    <MainLayout categories={categories}>
      <div className="bg-gray-100 py-10 md:px-6 heightFix">
      {items?.length ? (
        <div className="my-6 shadow rounded-md">
          <div className="flex flex-col md:p-8  p-6  bg-white">
            <h1 className="sm:text-2xl text-xl  font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
              Shopping Cart
            </h1>
            <div className="flex justify-between items-center py-6">
              <span className="font-medium text-lg text-blue-light">
                Items
                <span className="font-semibold text-xl ml-2">
                  {items?.length}
                </span>
              </span>
              <button
                className={`button-red py-2 px-8 xs:px-10 ${disabled ? "opacity-50" : ""
                }`}
                onClick={clearCart}
                disabled={disabled}
              >
                Empty Cart
              </button>
            </div>
            {items.map((item:any, i:any) => (
              <CartProduct
                key={`cart-product-${item?._id}`}
                _id={item?._id}
                title={item?.title}
                price={item?.price}
                description={item?.description}
                category={item?.category}
                image={item?.image}
                qty={item?.qty}
                border={i !== items?.length - 1}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full  px-6 lg:py-20 sm:py-10 py-4">
          <div className="text-center md:max-w-none sm:w-auto mx-auto max-w-xs w-4/5">
            <Image
              src="/img/empty_cart.svg"
              alt=""
              width={350}
              height={350}
              objectFit="contain"
            />
            <h3 className="lg:text-2xl text-xl font-medium mt-4">
              Your Cart is Empty
            </h3>
          </div>
        </div>
      )}
      {items?.length ? (
        <div className="flex flex-col bg-white md:p-10  py-8 px-6 shadow-md rounded-md md:text-xl sm:text-lg text-base my-10">
          <h2 className="whitespace-nowrap font-semibold overflow-x-auto hideScrollBar">
            Subtotal ({items.length} items) :
            <span className="font-bold text-red-500 mx-2">{total} $</span>
          </h2>
          {session ? (
            <button
              role="link"
              className={`button mt-6 flex items-center justify-center lg:text-lg text-base  py-2 ${
                disabled ? "opacity-50" : ""
              }`}
              disabled={disabled}
            >
              <CreditCardIcon className="sm:w-6 w-5" />
              <span className="ml-2">Proceed to checkout </span>
            </button>
          ) : (
            <button
              role="link"
              className="button mt-6 lg:text-lg text-base py-2"
            >
              Sign in to checkout
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
      </div>
    </MainLayout>
  );
}

export default Cart;

export async function getServerSideProps() {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  const product = await fetch("https://fakestoreapi.com/products/2").then(
    (res) => res.json()
  );
  console.log("categories", categories);
  return {
    props: {
      categories: categories,
      product: product,
    },
  };
}
