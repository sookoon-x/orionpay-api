# 🌌 OrionPay Backend

AI-Powered Multi-Chain Payment Infrastructure

OrionPay Backend is a hybrid backend platform that combines **NestJS** microservices with a **Python AI Engine** to deliver intelligent, secure, and scalable payment infrastructure for modern financial applications.

---

## ✨ Features

* Multi-chain payment processing
* Bulk payment execution
* Voice-initiated transactions
* AI-powered fraud detection
* AI price analysis and routing
* Payment modules marketplace
* Smart transaction monitoring
* Wallet and account management

---

## 🏗️ Architecture

```text
Frontend Applications
          │
          ▼
      NestJS API
          │
          ▼
     Python AI Engine
```

---

## 🛠️ Tech Stack

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| NestJS          | API and business logic           |
| Python          | AI and machine learning services |
| FastAPI         | AI service APIs                  |
| PostgreSQL      | Primary database                 |
| Redis           | Caching and queues               |
| Docker          | Containerization                 |
| Blockchain SDKs | Multi-chain integrations         |

---

## 📂 Project Structure

```text
orionpay-api/
│
├── services/                 # Microservices
│   ├── api/                  # NestJS API service
│   │   ├── src/              # API source code
│   │   │   ├── app.controller.ts
│   │   │   ├── app.service.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── test/             # API E2E tests
│   │   ├── dist/             # Compiled API output
│   │   ├── package.json      # API dependencies
│   │   ├── tsconfig.json     # TypeScript configuration
│   │   └── nest-cli.json     # NestJS CLI configuration
│   │
│   └── ai/                   # Python AI Engine service
│       ├── main.py           # FastAPI entry point
│       ├── models/           # AI/ML models
│       ├── services/         # AI services (fraud detection, routing)
│       └── requirements.txt  # Python dependencies
│
├── docker/                   # Docker configuration files
│   ├── api.Dockerfile
│   └── ai.Dockerfile
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── docker-compose.yml        # Docker compose configuration
├── .env                      # Root environment variables
├── .env.example              # Example environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* Python 3.11+
* Docker
* Docker Compose

### Installation

```bash
git clone <repository-url>

cd orionpay-backend

docker-compose up --build
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
OPENAI_API_KEY=
BLOCKCHAIN_RPC_URL=
```

---

## 🐳 Running with Docker

```bash
docker-compose up
```

Run in detached mode:

```bash
docker-compose up -d
```

---

## 🧪 Testing

```bash
npm run test

npm run test:e2e
```

---

## 📖 API Documentation

API documentation is available through Swagger:

```text
http://localhost:3000/api/docs
```

---

## 🔒 Security Features

* JWT authentication
* Rate limiting
* Fraud detection engine
* Transaction monitoring
* Role-based access control

---

## 📄 License

MIT License