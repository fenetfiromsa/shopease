🛍️ ShopEase – Modern MERN E-Commerce Platform

ShopEase is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).
It provides a complete shopping experience — from browsing and filtering products to user authentication, cart management, checkout, and admin order control.

🚀 Live Demo
🔗 Frontend:https://shopease-chi-six.vercel.app
🔗 Backend (API): https://shopease-1-f77c.onrender.com

🧩 Features
🧑‍💻 User Features

🏠 Browse all available products with filters and search

🔍 Category filtering and live search

🛒 Add and remove products from the cart

💳 Checkout and process payments (mock or Cash on Delivery)

📦 View your own orders and history

🔐 Secure authentication (JWT-based login/signup)

🛠️ Admin Features

🔑 Admin-only dashboard access

📋 View all customer orders

🧾 Manage users and products

🔒 Protected admin routes

💡 Technical Features

React Context API for state management

Authentication with JWT and bcrypt

RESTful API built with Express.js

MongoDB for product, user, and order data

Cloudinary integration for product images


⚙️ Installation and Setup
1️⃣ Clone the repository
git clone https://github.com/fenetfiromsa/shopease.git
cd shopease

2️⃣ Backend setup
cd backend
npm install


Create a .env file inside the backend folder:

PORT=5001
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Start the backend:

npm run dev

3️⃣ Frontend setup
cd frontend
npm install


Create a .env file inside frontend:

VITE_API_URL=http://localhost:5001/api


Start the frontend:

npm run dev

🧠 Folder Structure
ShopEase/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
└── README.md


🚀 Deployment Notes

Backend deployed on Render

Frontend deployed on Vercel

Make sure VITE_API_URL in frontend .env points to your deployed API base URL
(e.g. https://shopease-1-f77c.onrender.comapi)


💬 Acknowledgments

Built with ❤️ by Fenet
Inspired by the goal of mastering the MERN stack and backend development through practical projects.
Toast notifications and modern UI with Tailwind CSS

Deployed on Render / Vercel
