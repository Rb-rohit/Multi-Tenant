# 🚀 Multi-Tenant SaaS Application (MERN Stack)

A full-stack **Multi-Tenant SaaS Application** built using the MERN stack (MongoDB, Express, React, Node.js).
This system allows a single owner (**Super Admin**) to manage multiple companies, while each company has its own isolated data, users, and products.

---

## 🌟 Features

### Super Admin

* Create and manage multiple companies
* View all companies and their data
* Access all products and users across companies

### Company Admin

* Invite employees via secure invite link
* Manage company-specific data
* View and manage products

###  Employees

* Register via invite link
* Access only their company data

---

## Multi-Tenant Architecture

* Single backend & database
* Data isolation using `companyId`
* Role-based access control:

  * `superadmin`
  * `admin`
  * `employee`

---

##  Tech Stack

### Frontend:

* React.js
* React Router
* Axios
* Tailwind CSS
* React Toastify

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcryptjs

---

##  Project Structure

```
/client
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── services/api.js
  │   └── App.jsx

/server
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middlewares/
  └── server.js
```

---

## Setup
### 1. Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm start
```

---

### 2. Frontend Setup

```
cd client
npm install
npm run dev
```

---

##  Authentication Flow

1. User logs in → receives JWT token
2. Token stored in localStorage
3. Token sent in headers:

```
Authorization: Bearer <token>
```

4. Backend verifies user and attaches `req.user`

---

##  API Endpoints

### Auth

* `POST /api/auth/login`

### Company

* `POST /api/company/create` (Super Admin)
* `GET /api/company` (Super Admin)

### Invite

* `POST /api/invite` (Admin)

### Register via Invite

* `POST /api/auth/register-invite`

### Products

* `POST /api/products`
* `GET /api/products`

### Users

* `GET /api/company/:companyId/users`

---

##  Security

* JWT-based authentication
* Role-based authorization
* Company-level data isolation
* Password hashing using bcrypt

---

##  Future Enhancements

*  Analytics Dashboard
*  Email Invite (Nodemailer)
*  apply in my Billing & Invoice System
*  File Upload (Cloudinary)
*  Notifications
*  Deployment (Vercel + Render)

---

## 👨‍💻 Author

**Rohit Bodalkar**

---

