# 🏠 RentGuard – Rental Management System

RentGuard is a full-stack web application designed to simplify rental property management by connecting tenants and landlords through a centralized platform. It helps tenants report rental issues, track complaints, upload evidence, manage payments, and communicate with landlords.

## 🚀 Features

* **User Authentication:** Secure login and authentication using JWT.
* **Dashboard:** View rental information and important updates.
* **Report Problems:** Submit maintenance requests and rental complaints.
* **Complaint Management:** Track complaint status and resolution progress.
* **Evidence Upload:** Upload images or documents related to rental issues.
* **Repair Management:** Monitor repair requests and maintenance activities.
* **Payment Management:** Manage rental payment information.
* **Rental Agreement:** Access rental agreement details.
* **Communication:** Facilitate communication between tenants and landlords.
* **AI Chat Assistant:** Help users navigate rental-related queries.
* **Settings:** Manage account and application preferences.

## 🛠️ Tech Stack

**Frontend**

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

**Backend**

* Java
* Spring Boot
* Spring Web / REST APIs
* Spring Security and JWT

**Database**

* MongoDB

**Tools**

* Visual Studio Code
* IntelliJ IDEA
* Git and GitHub
* Postman

## 📂 Project Structure

```text
RentGuard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── rentguard-backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
│
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative. Adjust the folder and file names to match your actual project.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Palash1827/RentGuard.git
cd RentGuard
```

### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

### 3. Set Up the Backend

Open the `rentguard-backend` folder in your Java IDE.

Configure your MongoDB connection and other required environment variables. Then run the Spring Boot application.

Alternatively, from the backend directory, run:

```bash
mvn spring-boot:run
```

The backend commonly runs on `http://localhost:8080`, depending on your configuration.

### 4. Configure the Database

Make sure MongoDB is running and your backend connection settings are correct.

Configure database credentials and JWT secrets securely through environment variables or an appropriate local configuration file.

## 🔐 Security

* JWT-based authentication.
* Protected application routes.
* Secure configuration for credentials and secret keys.
* Input validation and appropriate access control.

*Security features depend on the actual backend implementation.*

## 🎯 Project Objectives

* Simplify communication between tenants and landlords.
* Make rental issue reporting and tracking easier.
* Centralize maintenance, payment, and agreement information.
* Improve transparency in rental property management.

## 🔮 Future Enhancements

* Real-time notifications.
* Online rent payment integration.
* Advanced analytics and reporting.
* Enhanced AI-powered rental assistance.
* Mobile-friendly experience and accessibility improvements.

## 👨‍💻 Developer

**Palash Singha**

* GitHub: [@Palash1827](https://github.com/Palash1827)
* Project: [RentGuard](https://github.com/Palash1827/RentGuard)

## 📄 License

This project is intended for educational and portfolio purposes. Add a license file if you plan to distribute it under a specific open-source license.
