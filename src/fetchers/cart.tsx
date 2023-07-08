import React from 'react'

export  async function getuserCart() {
  const userCart=await fetch(`https://fakestoreapi.com/carts`)
  if(!userCart.ok)return undefined
  return userCart.json()
}
