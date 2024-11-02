import React from "react";
import ProductsData from "./ProductsData";
import AddProduct from "./AddProduct";
function Products() {
  return (
    <div>
      <h2 style={{ color: "#159eec" }}>Products</h2>
      <ProductsData />
      <AddProduct />
    </div>
  );
}

export default Products;
