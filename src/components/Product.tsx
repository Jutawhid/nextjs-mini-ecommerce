// import Currency from 'react-currency-formatter';
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { StarIcon } from '@heroicons/react/solid';
import { toast } from "react-toastify";
import { addToBasket } from "../slices/basketSlice";
import Link from "next/link";
import {Fade, Slide} from 'react-awesome-reveal'
import router from "next/router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
const MIN_RATING = 1;
const MAX_RATING = 5;

function Product({ _id, title, price, description, category, image }: any) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  function addItemToBasket() {
    const product = {
      _id,
      title,
      price,
      description,
      category,
      image,
      qty: 1,
      toast: true,
    } as any;

    // Sending the product via an action to the redux store (= basket "slice")
    dispatch(addToBasket(product));
  }

  return (
    <Fade>
      <div className="relative flex flex-col   bg-white z-20  md:p-8 p-6 rounded-md shadow-lg">
        <p className="absolute top-2 right-3 text-xs italic text-gray-400 capitalize">
          {category}
        </p>
        <Image
          src={image}
          height={200}
          width={200}
          alt=""
          objectFit="contain"
          className="cursor-pointer"
          onClick={() => router.push(`/product-details/${_id}`)}
        />
        <h4 className="my-3 link font-medium capitalize">
          <Link href={`/product-details/${_id}`}>{title}</Link>
        </h4>
        <p className="text-xs  mb-2 line-clamp-2 text-gray-500 link">
          <Link href={`/product-details/${_id}`}>{description}</Link>
        </p>
        <div className="mb-5 mt-2 font-bold text-gray-700">
        {price} $
        </div>
        <button
          className="mt-auto button flex items-center justify-center"
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className="w-4" />
          <span className="ml-2">Add to Cart</span>
        </button>
      </div>
    </Fade>
  );
}

export default Product;
