# Voltstore
An online Ecommerce

## Backend Development (not completed)

For your e-commerce project, based on the **models** we defined (User, Product, Cart, Order), here’s a breakdown of the **routes and controllers** you’ll likely need.


## **Routes and Controllers Overview**

Each model will need **CRUD (Create, Read, Update, Delete) operations** and some custom operations where needed. Below is a breakdown of possible routes and controllers.


### 1. **User Routes and Controller**
The **User model** manages user accounts (e.g., customers and admins). You’ll need routes for authentication and user profile management.  

**Routes:**
- **POST** `/api/users/register` – Register a new user  
- **POST** `/api/users/login` – Authenticate user  
- **GET** `/api/users/profile` – Get logged-in user profile  
- **PUT** `/api/users/profile` – Update user profile  
- **DELETE** `/api/users/:id` – Delete a user (admin only)

**Controller Functions:**
- `registerUser`
- `loginUser`
- `getUserProfile`
- `updateUserProfile`
- `deleteUser`

---

### 2. **Product Routes and Controller**
The **Product model** will handle product data, like listings and categories.

**Routes:**
- **GET** `/api/products` – Get all products  
- **GET** `/api/products/:id` – Get a single product by ID  
- **POST** `/api/products` – Create a new product (admin only)  
- **PUT** `/api/products/:id` – Update a product (admin only)  
- **DELETE** `/api/products/:id` – Delete a product (admin only)

**Controller Functions:**
- `getAllProducts`
- `getProductById`
- `createProduct`
- `updateProduct`
- `deleteProduct`

---

### 3. **Cart Routes and Controller**
The **Cart model** manages the shopping cart, including adding/removing products and viewing the cart.

**Routes:**
- **GET** `/api/cart` – Get the user’s cart  
- **POST** `/api/cart` – Add an item to the cart  
- **PUT** `/api/cart` – Update item quantity in the cart  
- **DELETE** `/api/cart/:productId` – Remove an item from the cart  
- **DELETE** `/api/cart` – Clear the entire cart  

**Controller Functions:**
- `getCart`
- `addToCart`
- `updateCartItem`
- `removeFromCart`
- `clearCart`

---

### 4. **Order Routes and Controller**
The **Order model** tracks customer orders, including order status and history.

**Routes:**
- **POST** `/api/orders` – Place a new order  
- **GET** `/api/orders` – Get all orders (admin only)  
- **GET** `/api/orders/my` – Get orders for the logged-in user  
- **GET** `/api/orders/:id` – Get a specific order by ID  
- **PUT** `/api/orders/:id` – Update order status (admin only)  
- **DELETE** `/api/orders/:id` – Cancel an order  

**Controller Functions:**
- `placeOrder`
- `getAllOrders`
- `getUserOrders`
- `getOrderById`
- `updateOrderStatus`
- `cancelOrder`

---

## **Summary Table**

| **Model**  | **Routes** | **Controller Functions** |
|-------------|------------|---------------------------|
| **User**    | 5 Routes   | `registerUser`, `loginUser`, `getUserProfile`, `updateUserProfile`, `deleteUser` |
| **Product** | 5 Routes   | `getAllProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct` |
| **Cart**    | 5 Routes   | `getCart`, `addToCart`, `updateCartItem`, `removeFromCart`, `clearCart` |
| **Order**   | 6 Routes   | `placeOrder`, `getAllOrders`, `getUserOrders`, `getOrderById`, `updateOrderStatus`, `cancelOrder` |

---

## **Additional Considerations**
- **Authentication Middleware**: You’ll need middleware to protect routes (e.g., only logged-in users can access their cart, only admins can manage products).
- **Validation Middleware**: Use libraries like `Joi` or `express-validator` to validate request data.

