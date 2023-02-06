import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Store/cartSlice";
import { fetchProducts, STATUSES } from "../Store/ProductSlice";

export default function Product() {
  //   const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setProducts(data);
    // };
    // fetchProducts();
    dispatch(fetchProducts());
  }, []);

  const handleAdd = (product) => {
    // product save into redux
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === STATUSES.ERROR) {
    return <div>Something is Wrong...</div>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h4>{product.price}</h4>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
