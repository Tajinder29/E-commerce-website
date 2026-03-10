import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import Relatedproducts from '../Components/Relatedproducts/Relatedproducts';

const Product = () => {
  const {all_Product} =useContext(ShopContext);
  const {productId}=useParams();
  const product=all_Product.find((e)=>e.id===Number(productId));
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <Relatedproducts/>
    </div>
  )
}

export default Product