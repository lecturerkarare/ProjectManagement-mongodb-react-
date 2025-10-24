# Project Management System (MERN Stack)

A full-stack **Project Management System** built using the **MERN (MongoDB, Express.js, React, Node.js)** stack.  
The system allows users to manage projects, tasks, and team members efficiently with authentication and secure MongoDB integration.

---

##  Features

- 🔐 **User Authentication** (Login / Register)
- 📋 **Project Management** – Create, edit, and delete projects
- 🧑‍🤝‍🧑 **Team Collaboration** – Assign members to projects
- 📊 **Dashboard Overview** – View all ongoing projects and progress
- 💾 **MongoDB Integration** – All data stored securely in MongoDB
- ⚙️ **Secure REST API** – Built with Express.js and Node.js
- 🌐 **Responsive Frontend** – Built with React + Tailwind CSS

---

##  Tech Stack

| Layer | Technology Used |
|-------|-----------------|
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (local or Atlas) |
| Version Control | Git + GitHub |

---

##  Project Structure

ProjectManagement/
│
├── backend/ # Node.js + Express API
│ ├── server.js
│ ├── package.json
│ ├── routes/
│ ├── models/
│ └── controllers/
│
├── frontend/ReactProject/ # React + TypeScript app
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── tsconfig.json
│
└── README.md



---

##  Installation & Setup

### Prerequisites
- Node.js and npm installed  
- MongoDB installed or accessible via MongoDB Atlas  
- Git installed  

---

### Clone the Repository

```bash
git clone https://github.com/lecturerkarare/ProjectManagement-mongodb-react-.git
cd ProjectManagement-mongodb-react-
⚡ Backend Setup
bash
Copy code
cd backend
npm install
npm start
The server will start at:
 http://localhost:5000

Expected output:

“Welcome to Ticket Management API”

 Frontend Setup
bash
Copy code
cd frontend/ReactProject
npm install
npm run dev
React app will run at:
 http://localhost:5173

MongoDB Connection
Open MongoDB Compass (GUI)

Connect using:

cpp
Copy code
mongodb://127.0.0.1:27017
Create a new database (e.g., project_management)

Backend connects automatically via the .env file configuration.

 Environment Variables
Create a .env file inside the backend folder and add:

ini
Copy code
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_management
JWT_SECRET=yourSecretKey
 Useful Commands
Command	Description
npm start	Run backend server
npm run dev	Run React frontend
mongo --version	Check MongoDB version
mongosh	Start MongoDB shell
git push	Push changes to GitHub
