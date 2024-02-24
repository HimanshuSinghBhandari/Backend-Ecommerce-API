# Backend-Ecommerce-API
A Rest API for online E-commerce System with Node.js using SQL database (PostgreSQL)

## Technology Stack

- Node js
- Express Js
- PostgreSQL

## Entity Relationship Diagram

<div align="center">
  <img src="ecomm_db.png" alt="Database Schema">
</div>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


```
PORT=
DB_USER=''
DB_PASSWORD=''
DB_HOST=''
DB_NAME=''
DB_PORT=''
```

## Routes available

base url: `http://localhost:3000`

- User

| Routes | Method | Test Data | Description |
| ---     | :---:   | ---   |---   |
| /users/register | POST |  "username": "test",    "password": "123456",    "first_name": "v",    "last_name": "a",    "email": "<test@1.com>" |For creating new user account. Adding all given information to users table. |
| /users | GET|  |Get all users |
| /users/:userId| GET |  |Get user by ID |
| /users/:userId| PUT | "username": "test1",    "password": "123456",    "first_name": "v",    "last_name": "a",    "email": "<test@1.com>" |Update user by details |
| /users/:userId| DELETE |  |Remove user from db |
___
- AUTH

| Routes | Method | Test Data | Description |
| ---     | :---:   | ---   |---   |
| /auth/login | POST |  "email": "<test@1.com>", "password": "123456" |For loging users in, comparing their email and password with exists db. If correct authenticating the user with Express Session. |
| /auth/logout | GET|  | For logging the user out |
___
- categories

| Routes | Method | Test Data | Description |
| ---     | :---:   | ---   |---   |
| /categories/ | GET |  | Get all categories from db |
| /categories/:categoryId | GET|  | Get category by ID from db |
| /categories | POST | "category_name": "test" | Add a category into db |
| /categories/:categoryId | PUT | "category_name": "test1" | Update category into db |
| /categories/:categoryId | DELETE |  | Delete a category from db |
___
- products

| Routes | Method | Test Data | Description |
| ---     | :---:   | ---   |---   |
| /products | GET |  | Get all products from db |
| /products/:productId | GET|  | Get product by ID from db |
| /products | POST |  "category_id": 3, "name": "test", "price": "999.99",    "description": "test" | Add a product into db |
| /products/:productId | PUT | "name": "test1", "price": "999.99", "description": "test" | Update product into db |
| /products/:productId | DELETE |  | Delete a product from db |

___
- Cart

| Routes | Method | Test Data | Description |
| ---     | :---:   | ---   |---   |
| /cart/create | POST |  | Create a shopping cart with user jwt |
| /cart/:cartId/addProduct | POST|  "product_id": "3",    "quantity": 1 | Add product to Cart |
| /cart/:cartId | GET |   | Get a product from db |
| /cart/:cartId/updateProduct | PUT |  "product_id": "3", "quantity": 6 | Update product in cart |
| /cart/:cartId/removeProduct | DELETE |  | Delete a product from cart |
| cart/:cartId/checkout | POST |  | Calculate the total, checkout and clear the cart |
