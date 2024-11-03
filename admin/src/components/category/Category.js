import React from "react";
import CategoryData from "./CategoryData";
import AddCategory from "./AddCategory";
function Category() {
  return (
    <div>
      <h2 style={{ color: "#159eec" }}>Category</h2>
      <CategoryData />
      <AddCategory />
    </div>
  );
}

export default Category;
