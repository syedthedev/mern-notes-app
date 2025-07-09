# 📝 MERN Notes App

A fully functional **Note-Taking Web Application** built using the **MERN Stack**, with user authentication, add/edit/delete/search notes, and a responsive UI.

🌐 **Live Preview:**  

[Visit Live App](https://mern-notes-app-frontend-pink.vercel.app)

---

## 🚀 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios, React Hot Toast
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** HttpOnly Cookies + JWT
- **State Management:** React Context API
- **Deployment:** Vercel

---

## 🔐 Authentication

- Secure **Register / Login / Logout**
- JWT-based Auth stored in **HttpOnly Cookies**
- Protected API routes using middleware 

---

## ✨ Features

- ✅ User registration & login
- ✅ Add, edit, delete notes
- ✅ Search notes by title or content
- ✅ Pin/unpin notes
- ✅ Fully responsive (mobile & desktop)
- ✅ Auto-refresh notes on action
- ✅ Modal-based note form
- ✅ Toast notifications for feedback

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
# 1. Clont The Repo
git clone https://github.com/syedthedev/mern-notes-app.git
cd mern-notes-app

# 2. Backend
cd Server
npm install
node Server.js

# 3. Frontend
cd Client
npm run dev
