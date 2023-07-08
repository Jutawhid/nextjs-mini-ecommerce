import { fchmod } from 'fs'
import React from 'react'

export async function getProduct(productId:string) {
  const product=await fetch(`https://fakestoreapi.com/products/${productId}`)
  if(!product.ok)return undefined
  return product.json()
}


export async function getProducts() {
  const products=await fetch('https://fakestoreapi.com/products')
  if(!products.ok)return undefined
  return products.json()
}

export async function getProductsCategory(categoryName:string) {
  const products=await fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
  if(!products.ok)return undefined
  return products.json()
}

export async function getCategories() {
  const categories=await fetch('https://fakestoreapi.com/products/categories')
  if(!categories.ok)return undefined
  return categories.json()
}