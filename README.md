# 🌐 WebLoom – Accessibility Testing Platform

> **WebLoom** is a full-stack web application that analyzes website accessibility based on WCAG standards and provides actionable
> insights with a user-friendly dashboard.

🔗 **Live Demo:** https://accessibility-scanner-website-qg5h.vercel.app/

---

## 🚀 Features

* 🔐 **User Authentication**

  * Secure login & signup (JWT-based)
  * Profile management & password update

* ⚡ **Real-time Accessibility Scanning**

  * Enter any website URL
  * Live progress tracking with loading indicators

* 📊 **Detailed Reports**

  * Accessibility score (e.g., 93%)
  * Violations count
  * Actionable insights

* 📁 **User Dashboard**

  * Total scans, passed, failed stats
  * Recent scan history
  * View full reports

* 🧠 **Smart UX**

  * Clean UI with clear workflow
  * Error handling & validation
  * Responsive design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JWT (JSON Web Token)
* bcrypt (password hashing)

### Deployment

* Frontend: Vercel
* Backend: Render / Cloud
* Database: MongoDB Atlas

---

## 📌 How It Works

1. User signs up / logs in
2. Enters a website URL
3. WebLoom scans the website for accessibility issues
4. Displays:

   * Accessibility score
   * Violations found
5. Results are saved and shown in the dashboard



## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Aman7817/Accessibility-Scanner-website.git
cd Accessibility-Scanner-website
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### 4. Run the project

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm start
```

---

## 📊 API Endpoints (Sample)

* `POST /api/v1/auth/register` → Register user
* `POST /api/v1/auth/login` → Login user
* `POST /api/v1/scan` → Scan website
* `GET /api/v1/scan/history` → Get user scan history

---

## 💡 Future Improvements

* 📄 Export report as PDF
* 🤖 AI-based accessibility suggestions
* 🌐 Chrome extension
* 📈 Advanced analytics dashboard

---

## 🧠 Project Highlights

* Built as a **scalable SaaS-style application**
* Focus on **real-world problem (web accessibility)**
* Demonstrates **full-stack development + product thinking**

---

## 👨‍💻 Author

**Aman Gurjar**
📧 [amansingh052005@gmail.com](mailto:amansingh052005@gmail.com)
🔗 GitHub: https://github.com/Aman7817

---

## ⭐ Support

If you found this project helpful, feel free to ⭐ the repository!
