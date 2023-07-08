import { type } from "os"

type Children={
    children:React.ReactNode
}


type Product={
  id:number,
  title:string,
  price:string,
  description:string,
  category:string,
  image:string
  rating:{rate:number,count:number}
}
type Cart={
  id:number,
  userId:number,
  date:string,
  products:{productId:number,quantity:number}[],
  __v:number
}

type carttype={
  productId:number,
  quantity:number
}