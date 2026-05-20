# SinkedIn

SinkedIn is a MERN stack social media web application where users can share their failure stories, lessons learned, and personal growth journeys.

Unlike traditional social media platforms focused only on success, SinkedIn encourages honesty, learning, and resilience.

---

# Features

- User Authentication (Register/Login)
- JWT Authentication
- Create Failure Stories
- Like Posts
- Comment on Posts
- User Profile Page
- Responsive Dark UI
- Protected Routes
- MongoDB Database Integration

---

# Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas

## Authentication
- JWT
- bcryptjs

---

# Folder Structure

```bash
client/
server/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/sinkedin.git
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

# Environment Variables

Create `.env` file inside server folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# API Routes

## Auth Routes

```bash
POST /api/auth/register

POST /api/auth/login
```

---

## Post Routes

```bash
GET /api/posts

POST /api/posts

PUT /api/posts/like/:id
```

---

## Comment Routes

```bash
POST /api/comments/:postId

GET /api/comments/:postId
```

---

# Future Improvements

- Real-time notifications
- Image uploads
- Edit/Delete posts
- Bookmark stories
- Follow users
- Anonymous posting

---

# Author

Swapnil Fuse

---

# License

This project is open source and free to use.