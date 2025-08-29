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

**Success Response:**

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

**Error Response:**

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

**Success Response:**

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

**Error Response:**

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

**Success Response:**

```json
{
  "success": true,
  "message": "Food removed successfully",
  "data": null
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

**Note:**

- All responses are in JSON format.
- For image upload, the file will be stored in the `uploads` directory on the server.
