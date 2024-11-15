## Overview

This project is a backend API for an e-commerce platform, providing core functionalities such as user authentication, product management, cart management, and order processing. The goal is to create a robust, scalable backend that enables seamless interaction for users managing and purchasing products.

<br>

## Features

- **User Authentication**: Sign up and sign in functionalities with secure password hashing and session token generation.
- **Product Management**: CRUD operations for adding, updating, viewing, and deleting products.
- **Cart Management**: Manage items in a shopping cart, including adding, updating, and removing products.
- **Order Management**: Place orders, view all orders, and filter orders by customer ID.

<br>

## Endpoints

### Authentication

- **POST** `/signup` - Register a new user with unique email verification.
- **POST** `/signin` - Log in an existing user and provide a session token.

<br>

### Product Management

- **POST** `/addproduct` - Add a new product with details like name, description, price, and category.
- **PUT** `/updateproduct/:productId` - Update product details by product ID.
- **DELETE** `/deleteproduct/:productId` - Remove a product by product ID.
- **GET** `/products` - Retrieve a list of all available products.

<br>

### Cart Management

- **POST** `/cart/add` - Add a product to the user’s cart with a specified quantity.
- **PUT** `/cart/update` - Update the quantity of an existing product in the cart.
- **DELETE** `/cart/delete` - Remove a product from the cart.
- **GET** `/cart` - View the contents of the user’s cart, including total price calculation.

<br>

### Order Management

- **POST** `/placeorder` - Place an order with the items in the cart.
- **GET** `/getallorders` - View all orders (Admin only).
- **GET** `/orders/customer/{customerId}` - View orders for a specific customer.

<br>

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman (for testing endpoints)
