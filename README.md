# Jobby App

A full-featured job search web application built with **React.js** that allows users to log in, browse jobs, apply filters, search, and view detailed job information. The project implements authentication, API integration, responsive design, and dynamic UI rendering.

---

## 🚀 Features

### 🔑 Authentication
- Secure login with username and password.
- JWT token-based authentication.
- Redirect unauthenticated users to login.
- Prevent logged-in users from revisiting the login page.

### 🏠 Home Route (`/`)
- Displays a **Find Jobs** button linking to the Jobs page.

### 💼 Jobs Route (`/jobs`)
- Fetches and displays:
  - **Profile Details** from API.
  - **Job Listings** with filtering & search.
- Filters:
  - **Employment Type** (Multiple selection)
  - **Salary Range**
- Search:
  - Real-time job search using search input & button.
- Loader & Failure Views for both profile and job lists.
- **No Jobs View** when no matching results are found.

### 📄 Job Item Details (`/jobs/:id`)
- Displays detailed job information.
- Shows:
  - Company logo
  - Role details
  - Skills required
  - Life at Company section
  - Similar Jobs section
- Visit company website link opens in a **new tab**.
- Failure View & Retry functionality.

### 🚫 Not Found Route (`/not-found`)
- Handles invalid routes with a **Not Found** page.

### 🧭 Header
- Navigation links:
  - Logo → Home
  - Home link
  - Jobs link
- Logout button clears JWT token and redirects to login.

---

## 📦 APIs Used

| API                              | Method | Description |
|----------------------------------|--------|-------------|
| `https://apis.ccbp.in/login`     | POST   | User login authentication |
| `https://apis.ccbp.in/profile`   | GET    | Fetch profile details |
| `https://apis.ccbp.in/jobs`      | GET    | Fetch job listings with filters & search |
| `https://apis.ccbp.in/jobs/:id`  | GET    | Fetch detailed job info & similar jobs |

---

## 🛠 Tech Stack
- **Frontend**: React.js, React Router, Styled Components
- **State Management**: React state & props
- **HTTP Requests**: Fetch API
- **Authentication**: JWT via Cookies
- **Icons**: react-icons
- **Loader**: react-loader-spinner
- **Font**: Roboto

---

## 📂 Project Structure

src/
├── components/
│ ├── Login
│ ├── Home
│ ├── Jobs
│ ├── JobItemDetails
│ ├── NotFound
│ ├── Header
│ └── ...
├── App.js
├── index.js
└── ...

## 🖥️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jobby-app.git
   cd jobby-app

🔑 Test Credentials
makefile
Copy
Edit
username: rahul
password: rahul@2021





