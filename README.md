# 🏛️ LexAI - AI-Powered Legal Document Analysis Platform

> A modern, full-stack application that leverages artificial intelligence to analyze legal documents, extract key clauses, identify potential risks, and generate comprehensive summaries.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

---

## 🎯 Overview

**LexAI** is a cloud-native legal document analysis platform designed to streamline the contract review process. By integrating OpenAI's GPT models, the platform automatically processes legal documents to:

- **Extract key clauses** and important provisions
- **Identify potential risks** and red flags
- **Generate concise summaries** for quick review
- **Store and manage** documents with metadata

This project demonstrates proficiency in **full-stack development**, **RESTful API design**, **AI integration**, **secure file handling**, and **modern web technologies**.

---

## ✨ Key Features

### 🔐 Secure Document Management
- Multi-format document upload (PDF, DOCX, TXT)
- File size validation and type checking
- Secure local storage with organized file structure

### 🤖 AI-Powered Analysis
- Integration with OpenAI GPT-3.5 Turbo
- Intelligent clause extraction
- Risk assessment and identification
- Automated document summarization

### 📊 User Dashboard
- View all uploaded documents
- Track processing status (Pending, Completed, Failed)
- Access analysis results and insights
- Clean, modern UI with responsive design

### ⚡ Asynchronous Processing
- Non-blocking document processing
- Real-time status updates
- Efficient resource utilization

### 🏗️ Production-Ready Architecture
- RESTful API design
- Separation of concerns (Controller → Service → Repository)
- Environment-based configuration
- Error handling and logging

---

## 🛠️ Tech Stack

### Backend
- **Java 17** - Modern Java features and performance
- **Spring Boot 3.2.1** - Enterprise-grade framework
- **Spring Data JPA** - Database abstraction and ORM
- **Spring Security** - Authentication and authorization
- **H2 Database** - In-memory database for development
- **PostgreSQL** - Production database (configurable)
- **Maven** - Dependency management and build tool
- **Lombok** - Boilerplate code reduction

### Frontend
- **React 19.2** - Modern UI library with latest features
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with modern features

### AI & Integration
- **OpenAI API** - GPT-3.5 Turbo for document analysis
- **REST Template** - HTTP client for external APIs

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Upload Page  │  │  Dashboard   │  │ Results Page │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ (HTTP/REST)
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Spring Boot)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              REST Controllers                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Service Layer (Business Logic)               │   │
│  │  • DocumentService                                   │   │
│  │  • DocumentProcessingService                         │   │
│  │  • OpenAiService                                     │   │
│  │  • StorageService                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Repository Layer (Data Access)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌──────────────────┐                  ┌──────────────────┐
│   H2/PostgreSQL  │                  │   OpenAI API     │
│    Database      │                  │   (GPT-3.5)      │
└──────────────────┘                  └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.6+** (or use included wrapper)
- **OpenAI API Key**

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/LexAI.git
   cd LexAI
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Set environment variable** (Windows PowerShell)
   ```powershell
   $env:OPENAI_API_KEY="your_openai_api_key_here"
   ```

   Or (Linux/Mac)
   ```bash
   export OPENAI_API_KEY="your_openai_api_key_here"
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
LexAI/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/lexai/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── LexAiApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   └── pom.xml                      # Maven configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UploadPage.tsx
│   │   │   └── ResultsPage.tsx
│   │   ├── services/                # API services
│   │   ├── App.tsx                  # Main app component
│   │   └── main.tsx                 # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── .env                             # Environment variables
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Document Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/documents/upload` | Upload a legal document |
| `GET` | `/api/documents` | Retrieve all documents |
| `GET` | `/api/documents/{id}` | Get document by ID |
| `DELETE` | `/api/documents/{id}` | Delete a document |

### Document Processing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/documents/{id}/process` | Trigger AI analysis |
| `GET` | `/api/documents/{id}/results` | Get analysis results |

### Example Request

```bash
# Upload a document
curl -X POST http://localhost:8080/api/documents/upload \
  -F "file=@contract.pdf" \
  -F "title=Employment Contract" \
  -F "description=Standard employment agreement"

# Process document
curl -X POST http://localhost:8080/api/documents/1/process
```

---

## 📸 Screenshots

### Upload Interface
Clean, intuitive document upload with drag-and-drop support

### Dashboard
View all documents with status tracking and quick actions

### Analysis Results
Comprehensive AI-generated insights with clause extraction and risk assessment

---

## 🔒 Security Considerations

- API keys stored in environment variables (never committed to Git)
- File type validation to prevent malicious uploads
- File size limits to prevent resource exhaustion
- Spring Security integration for authentication (configurable)
- CORS configuration for frontend-backend communication

---

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] AWS S3 integration for scalable file storage
- [ ] PostgreSQL database for production
- [ ] Document comparison and version tracking
- [ ] Export analysis results to PDF
- [ ] Advanced search and filtering
- [ ] Real-time collaboration features
- [ ] Docker containerization
- [ ] CI/CD pipeline with GitHub Actions

---

## 👨‍💻 Developer

**Jai Gudla**

This project showcases:
- Full-stack development capabilities
- RESTful API design and implementation
- AI/ML integration with third-party APIs
- Modern frontend development with React and TypeScript
- Backend development with Spring Boot
- Database design and ORM usage
- Secure application development practices

---

## 📄 License

This project is for portfolio and educational purposes.

---

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Spring Boot community for excellent documentation
- React team for the powerful UI library
