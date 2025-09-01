# BACKEND API ENDPOINTS DOCUMENTATION

## Food API Endpoints

All endpoints are prefixed with `/api/v1.0`.

---

### 1. Add Food

**Endpoint:**  
`POST /api/v1.0/food/add`  
**Description:**  
Add a new food item. Accepts `multipart/form-data` for image upload.

**Request Body (form-data):**

- `name` (string, required)
- `description` (string, required)
- `price` (number, required)
- `category` (string, required)
- `image` (file, required) — image file to upload

**Example Request:**

```
POST /api/v1.0/food/add
Content-Type: multipart/form-data

name: "Greek Salad"
description: "Fresh salad with feta cheese"
price: 12
category: "Salad"
image: <file>
```

**Success Response:(201)**

```json
{
  "success": true,
  "message": "Food added successfully",
  "data": {
    "_id": "662e1b...",
    "name": "Greek Salad",
    "description": "Fresh salad with feta cheese",
    "price": 12,
    "category": "Salad",
    "image": "1712345678901greeksalad.png",
    "__v": 0
  }
}
```

**Error Response:(500)**

```json
{
  "success": false,
  "message": "Validation error message",
  "data": null
}
```

---

### 2. List All Foods

**Endpoint:**  
`GET /api/v1.0/food/list`  
**Description:**  
Fetch all food items.

**Success Response:(200)**

```json
{
  "success": true,
  "message": "All foods are fetched successfully",
  "data": [
    {
      "_id": "662e1b...",
      "name": "Greek Salad",
      "description": "Fresh salad with feta cheese",
      "price": 12,
      "category": "Salad",
      "image": "1712345678901greeksalad.png",
      "__v": 0
    },
    ...
  ]
}
```

**Error Response:(500)**

```json
{
  "success": false,
  "message": "Error",
  "data": null
}
```

---

### 3. Remove Food

**Endpoint:**  
`POST /api/v1.0/food/remove`  
**Description:**  
Remove a food item by its ID.

**Request Body (JSON):**

```json
{
  "id": "<food_id>"
}
```

**Success Response:(200)**

```json
{
  "success": true,
  "message": "Food removed successfully",
  "data": null
}
```

**Error Response:(500)**

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## Auth API Endpoints

---

### 1. Register User

**Endpoint:**  
`POST /api/v1.0/auth/register`  
**Description:**  
Register a new user.

**Request Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourStrongPassword"
}
```

**Success Response:(201)**

```json
{
  "success": true,
  "message": "User Registered Successfully",
  "data": {
    "token": "<jwt_token>",
    "role": "USER"
  }
}
```

**Error Responses:(400)**

- User already exists:
  ```json
  {
    "success": false,
    "message": "User already exists",
    "data": null
  }
  ```
- Invalid email:
  ```json
  {
    "success": false,
    "message": "Please enter valid email",
    "data": null
  }
  ```
- Weak password:
  ```json
  {
    "success": false,
    "message": "Please enter strong password",
    "data": null
  }
  ```

---

### 2. Login User

**Endpoint:**  
`POST /api/v1.0/auth/login`  
**Description:**  
Login an existing user.

**Request Body (JSON):**

```json
{
  "email": "john@example.com",
  "password": "yourStrongPassword"
}
```

**Success Response:(200)**

```json
{
  "success": true,
  "message": "User Loggedin Successfully",
  "data": {
    "token": "<jwt_token>",
    "role": "USER"
  }
}
```

**Error Response:(401)**

```json
{
  "success": false,
  "message": "Invalid name or password",
  "data": null
}
```

---

## Cart API Endpoints

**Note:** All cart endpoints require authentication. Pass the JWT token in the `Authorization` header as `Bearer <token>`.

---

### 1. Add Item to Cart

**Endpoint:**  
`POST /api/v1.0/cart/add`  
**Description:**  
Add a food item to the authenticated user's cart.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body (JSON):**

```json
{
  "itemId": "<food_id>"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Fooditem added to cart successfully",
  "data": {
    "_id": "<user_id>",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "<hashed_password>",
    "role": "USER",
    "cartData": {
      "<food_id>": 1
    },
    "__v": 0
  }
}
```

**Error Response (401/500):**

```json
{
  "success": false,
  "message": "Unauthorized" | "Error message",
  "data": null
}
```

---

### 2. Remove Item from Cart

**Endpoint:**  
`POST /api/v1.0/cart/remove`  
**Description:**  
Remove a food item from the authenticated user's cart (decreases quantity or removes if quantity is 1).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body (JSON):**

```json
{
  "itemId": "<food_id>"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Fooditem removed from cart successfully",
  "data": {
    "_id": "<user_id>",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "<hashed_password>",
    "role": "USER",
    "cartData": {
      // updated cart data
    },
    "__v": 0
  }
}
```

**Error Response (401/500):**

```json
{
  "success": false,
  "message": "Unauthorized" | "Error message",
  "data": null
}
```

---

### 3. Get User Cart

**Endpoint:**  
`GET /api/v1.0/cart/get`  
**Description:**  
Fetch the authenticated user's cart data.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Fetched user cart data successfully",
  "data": {
    "cartData": {
      "<food_id>": 2,
      "<another_food_id>": 1
    }
  }
}
```

**Error Response (401/500):**

```json
{
  "success": false,
  "message": "Unauthorized" | "Error message",
  "data": null
}
```

---

## Order API Endpoints


**Note:** Most order endpoints require authentication. Pass the JWT token in the `Authorization` header as `Bearer <token>`.

---

### 1. Place Order

**Endpoint:**  
`POST /api/v1.0/order/place`  
**Description:**  
Place a new order and initiate Stripe payment. Requires authentication.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body (JSON):**

```json
{
  "items": [
    {
      "name": "Greek Salad",
      "price": 12,
      "quantity": 2
    }
  ],
  "amount": 26,
  "address": {
    "street": "123 Main St",
    "city": "Athens",
    "zip": "10001"
  }
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Payment done successfully",
  "data": {
    "session_url": "<stripe_checkout_url>"
  }
}
```

**Error Response (500):**

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

### 2. Verify Order

**Endpoint:**  
`POST /api/v1.0/order/verify`  
**Description:**  
Verify the payment status of an order after Stripe checkout.

**Request Body (JSON):**

```json
{
  "orderId": "<order_id>",
  "success": "true" // or "false"
}
```

**Success Response (if payment successful):**

```json
{
  "success": true,
  "message": "Order verification done successfully",
  "data": {
    "orderDetails": {
      /* order object */
    }
  }
}
```

**Failure Response (if payment failed):**

```json
{
  "success": false,
  "message": "Order not successfully done",
  "data": null
}
```

---

### 3. Get User Orders

**Endpoint:**  
`POST /api/v1.0/order/userorders`  
**Description:**  
Get all orders for the authenticated user.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**

```json
{
  "success": true,
  "messgae": "Fetched user orders successfully",
  "data": [
    {
      "_id": "<order_id>",
      "userId": "<user_id>",
      "items": [
        /* ... */
      ],
      "amount": 26,
      "address": {
        /* ... */
      },
      "status": "Food Processing",
      "date": "2024-06-01T12:00:00.000Z",
      "payment": true
    }
  ]
}
```

**Error Response (500):**

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

### 4. List All Orders (Admin Only)

**Endpoint:**  
`GET /api/v1.0/order/list`  
**Description:**  
Get all orders (admin only).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Fetched all orders of your resturant",
  "data": {
    "orders": [
      {
        /* order object */
      }
    ]
  }
}
```

**Error Response (401/500):**

```json
{
  "success": false,
  "message": "You are not admin" | "Error message",
  "data": null
}
```

---

### 5. Update Order Status (Admin Only)

**Endpoint:**  
`POST /api/v1.0/order/status`  
**Description:**  
Update the status of an order (admin only).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body (JSON):**

```json
{
  "orderId": "<order_id>",
  "status": "Delivered"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Status Updated Successfully",
  "data": {
    "orderDetails": {
      /* updated order object */
    }
  }
}
```

**Error Response (401/500):**

```json
{
  "success": false,
  "message": "You are not an admin" | "Error message",
  "data": null
}
```

---

**Note:**

- All responses are in JSON format.
- For image upload, the file will be stored in the `uploads` directory on the server.
- The `token` returned is a JWT for authentication in protected routes.
- `cartData` object maps food item IDs to their quantities in the user's cart.
- The Stripe session URL should be opened by the frontend for payment.
- Only users with the `admin` role can access the list and status
