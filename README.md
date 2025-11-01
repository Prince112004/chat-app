# 💬 Chatify App

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0-green)
![Socket.io](https://img.shields.io/badge/socket.io-v4.0-yellow)

---

## 📖 About

The **Chat App** is a simple, real-time web chat application built using **Node.js**, **Express**, and **Socket.io**.  
It enables multiple users to chat instantly in real time and demonstrates the use of WebSockets for instant communication.

---

## 🚀 Features

- ⚡ Real-time messaging powered by **Socket.IO**
- 🧑‍🤝‍🧑 Supports multiple users
- 💾 Persistent message storage with **MongoDB**
- 📱 Responsive design for desktop and mobile
- 🔐 Ready for authentication & security extensions
- 🚀 Scalable architecture for easy upgrades

---

## 🧰 Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | HTML, CSS, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Real-Time | Socket.IO |
| Database | MongoDB (via Mongoose) |

---
### 🌐 Live Demo  
Check out the live version of the Chat App here:  
👉 **[https://chatify-6y8h3.sevalla.app/](https://chatify-6y8h3.sevalla.app/)**
---

## 🗂 Project Structure
```
chat-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
├── README.md
```
---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Prince112004/chat-app.git
cd chat-app
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder with the following variables:

```env
PORT=5000
DB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

Run the backend server:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Then open your browser at 👉 http://localhost:5173


