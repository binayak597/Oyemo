# BACKEND API ENDPOINTS

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

**Note:**

- All responses are in JSON format.
- For image upload, the file will be stored in the `uploads` directory on the server.
- The `token` returned is a JWT for authentication in protected routes.
- `cartData` object maps food item IDs to their quantities in the user's cart.
