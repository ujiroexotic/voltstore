// app/products/page.js
export default function ProductsPage() {
    const products = [
      { id: 1, name: 'Product 1', price: '$10' },
      { id: 2, name: 'Product 2', price: '$20' },
    ];
  
    return (
      <div>
        <h1>Product Listing</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>
                {product.name} - {product.price}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }  