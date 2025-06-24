# Report Server

A NestJS-based API for employee management and automated PDF report generation (employment letters, salary certificates, income proofs, work schedule certificates) with PostgreSQL and Prisma ORM.

---

## Features

- **Employee Management**: CRUD operations for employees, departments, and benefits.
- **PDF Generation**: Dynamic PDF reports using [pdfmake](https://pdfmake.github.io/docs/).
- **Swagger API Docs**: Interactive API documentation at `/api`.
- **Prisma ORM**: Type-safe database access for PostgreSQL.
- **Dockerized**: Multi-stage Docker build and docker-compose for local development.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd report-server
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Setup environment variables**
   - Create a `.env` file (see `.env.example` or use the following as a template):
     ```env
     DATABASE_URL=postgresql://<user>:<password>@db:5432/<database>
     PORT=3000
     # Add other variables as needed
     ```
4. **Start the database**
   ```sh
   docker compose up -d
   ```
5. **Generate Prisma client**
   ```sh
   npx prisma generate
   ```
6. **Run database migrations (if any)**
   ```sh
   npx prisma migrate deploy
   # or
   npx prisma migrate dev
   ```
7. **Start the application**
   ```sh
   npm run start:dev
   ```

---

## Usage

- **API Base URL**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api`
- **PDF Endpoints**: `/pdf/*` (see below)
- **Employee Endpoints**: `/employee/*`

### Example Endpoints

- `GET /employee` — List all employees
- `POST /employee` — Create a new employee
- `GET /pdf/employment-letter/:id` — Download employment letter for employee
- `GET /pdf/salary-certificate/:id` — Download salary certificate for employee

---

## Project Structure

```
report-server/
├── src/
│   ├── app.module.ts         # Main NestJS module
│   ├── main.ts               # Entry point
│   ├── employee/             # Employee CRUD, DTOs, entities
│   ├── pdf/                  # PDF generation logic & endpoints
│   ├── printer/              # PDF printer service (pdfmake)
│   ├── save-file/            # File saving utilities
│   ├── lib/                  # Report templates, helpers, constants
│   ├── assets/               # Static assets (e.g., logo for PDFs)
│   └── prisma/               # Prisma service/module
├── prisma/
│   └── schema.prisma         # Database schema
├── fonts/                    # Fonts for PDF generation
├── docker-compose.yml        # Local dev DB & pgAdmin
├── Dockerfile                # Multi-stage build for app
├── package.json              # NPM scripts & dependencies
└── README.md                 # This file
```

---

## Database

- **PostgreSQL** (see `docker-compose.yml` for service config)
- **Prisma ORM** (see `prisma/schema.prisma` for models)

### Example Models

- `Employee`: id, name, position, department, salary, contract_type, etc.
- `Department`, `Benefit`, `EmployeeBenefit` (many-to-many)

---

## PDF Generation

- Uses [pdfmake](https://pdfmake.github.io/docs/) for dynamic PDF creation.
- Templates in `src/lib/reports/`.
- Customizable headers, footers, and signatures.
- Logo: `src/assets/doggies.jpg` (included in PDFs).
- Fonts: `fonts/Roboto-*.ttf` (required for pdfmake).

---

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `PORT` — API server port (default: 3000)
- (Add more as needed for your environment)

---

## Running with Docker

### Build and Run (Production)

```sh
docker build -t report-server .
docker run --env-file .env -p 3000:3000 report-server
```

### With Docker Compose (Dev + DB)

```sh
docker compose up --build
```

---

## Development

- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Test**: `npm run test`
- **E2E Test**: `npm run test:e2e`
- **Swagger**: Visit `/api` after running the app

---

## API Documentation

- **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)
- All endpoints are documented with request/response schemas.

---

## Credits

- Built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [pdfmake](https://pdfmake.github.io/docs/)
