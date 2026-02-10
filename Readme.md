# Distributed Online Judge (WeCode)

A full-stack online coding judge platform that allows users to solve programming problems, submit code solutions, and have them automatically evaluated.

## 🏗️ Architecture

WeCode is a microservices-based system consisting of three main components:

- **API Server**: REST API built with Express.js for user management, problem management, and submission handling
- **Evaluation Engine**: Standalone service for executing and evaluating code submissions
- **Frontend**: React application providing the user interface

## 📦 Tech Stack

### API Server

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**:
  - Helmet.js for HTTP headers
  - bcrypt for password hashing
  - CORS configuration
  - Rate limiting
- **Message Queue**: AWS SQS for job queuing

### Evaluation Engine

- **Runtime**: Node.js
- **Execution**: C++ code execution and evaluation
- **Database**: MongoDB
- **AWS SDK**: Integration with SQS for job processing

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- AWS Account (for SQS integration)

### Installation

1. **Clone the repository**

```bash
cd wecode_backend
```

2. **Install API dependencies**

```bash
cd api
npm install
cd ..
```

3. **Install Evaluation Engine dependencies**

```bash
cd evaluation
npm install
cd ..
```

4. **Install Frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

3. **Configure environment variables**

Create a `.env` file in the `api` directory:

```
MONGODB_URI=mongodb://localhost:27017/wecode
JWT_SECRET=your_jwt_secret_key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SQS_QUEUE_URL=your_sqs_queue_url
```

Create a `.env` file in the `evaluation` directory:

```
MONGODB_URI=mongodb://localhost:27017/wecode
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SQS_QUEUE_URL=your_sqs_queue_url
```

### Running the Application

**Start API Server**

```bash
cd api
npm start
# Runs on http://localhost:5000
```

**Start Evaluation Engine** (in a separate terminal)

```bash
cd evaluation
node worker.js
```

**Start Frontend** (in a separate terminal)

```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## 📁 Project Structure

```
wecode_backend/
├── api/                          # REST API Server
│   ├── src/
│   │   ├── app.js               # Express app setup
│   │   ├── index.js             # Server entry point
│   │   ├── controllers/         # Request handlers
│   │   ├── services/            # Business logic
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API endpoints
│   │   ├── middleware/          # Express middleware
│   │   ├── repository/          # Data access layer
│   │   ├── db/                  # Database connection
│   │   └── utils/               # Utility functions
│   ├── package.json
│   └── Dockerfile
│
├── evaluation/                   # Code Evaluation Engine
│   ├── worker.js                # Main worker process
│   ├── exceute.js               # Execution handler
│   ├── models/                  # Database schemas
│   ├── execution/               # Code execution logic
│   ├── db/                      # Database connection
│   ├── package.json
│   └── Dockerfile
│
└── frontend/                     # React Frontend
    ├── src/
    │   ├── App.jsx              # Main component
    │   ├── AuthContext.jsx      # Authentication context
    │   ├── pages/               # Page components
    │   ├── components/          # Reusable components
    │   └── assets/              # Static resources
    ├── package.json
    ├── vite.config.js
    └── Dockerfile
```

## 🔑 Core Features

### User Management

- User registration and authentication
- JWT-based session management
- Password hashing with bcrypt
- User profiles and statistics

### Problem Management

- View available coding problems
- Problem statements with test cases
- Problem difficulty levels and categories
- Submission history per user

### Code Submission & Evaluation

- Submit code solutions in C++
- Real-time code compilation and execution
- Automatic test case evaluation
- Result storage and display

### API Endpoints

**Authentication**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

**Problems**

- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details

**Submissions**

- `POST /api/submissions` - Submit code for evaluation
- `GET /api/submissions/:id` - Get submission results
- `GET /api/submissions/user/:userId` - Get user's submissions

**Users**

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 🔒 Security Features

- **Helmet.js** - Sets secure HTTP headers
- **CORS Configuration** - Controlled cross-origin requests
- **Rate Limiting** - Prevents abuse with `express-rate-limit`
- **Password Hashing** - bcrypt for secure password storage
- **JWT Authentication** - Stateless user authentication
- **Cookie Parser** - Secure cookie handling

## 🐳 Docker Support

All services include Dockerfiles for containerized deployment:

```bash
# Build API image
docker build -t wecode-api ./api

# Build Evaluation image
docker build -t wecode-eval ./evaluation

# Build Frontend image
docker build -t wecode-frontend ./frontend
```

## 📚 API Documentation

For detailed API documentation, see the route files in `api/src/routes/`:

- `problemRoutes.js` - Problem-related endpoints
- `userRoutes.js` - User management endpoints
- `submissionRoutes.js` - Submission endpoints

## 🚧 Development

### Running Tests

```bash
cd api
npm test

cd frontend
npm run lint
```

### Code Structure Best Practices

- **Controllers** - Handle HTTP requests/responses
- **Services** - Contain business logic
- **Models** - Define data schemas
- **Repository** - Abstract data access
- **Middleware** - Request processing (auth, validation, etc.)

## 🔧 Configuration

### Database Configuration

MongoDB connection is configured in `api/src/db/db.js` and `evaluation/db/db.js`

### Rate Limiting

Configured in `api/src/middleware/rateLimmiter.js` to prevent abuse

### CORS Settings

Configure in `api/src/middleware/corsconfig.js` for frontend integration

## 📝 Environment Variables

See `.env.example` files in each module for required configuration variables.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ the Ashish Jain**
