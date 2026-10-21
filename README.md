# URL Shortening Service

A RESTful URL shortening API built with **Node.js, TypeScript, Express 5, PostgreSQL, and Prisma ORM**.

The service allows clients to create short URLs, manage existing links, redirect users to their original destinations, and track link access. It includes request validation, rate limiting, centralized error handling, and automated tests.

## Features

- **URL Shortening:** Generate unique short codes for long URLs.
- **URL Redirection:** Redirect short URLs to their original destinations.
- **URL Management:** Create, retrieve, update, and delete shortened URLs.
- **Access Tracking:** Track the number of times a shortened URL is accessed.
- **Request Validation:** Validate incoming requests using Zod.
- **Rate Limiting:** Help protect the API against excessive requests.
- **Error Handling:** Handle application errors and unknown routes consistently.
- **Database Integration:** Store URL records in PostgreSQL using Prisma ORM.
- **Automated Testing:** Test API behavior using Jest and Supertest.
- **Code Coverage:** Generate test coverage reports.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| TypeScript | Static typing |
| Express 5 | API framework and routing |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| Zod | Request validation |
| Jest | Test runner |
| Supertest | HTTP endpoint testing |

## Project Structure

```text
url-shortening-service/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── redirect.controller.ts
│   │   └── shorten.controller.ts
│   ├── generated/
│   │   └── prisma/
│   ├── lib/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   ├── errorApp.middleware.ts
│   │   ├── notFound.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── validate.middleware.ts
│   ├── routes/
│   │   ├── redirect.routes.ts
│   │   └── shorten.route.ts
│   ├── schemas/
│   │   └── shorten.schema.ts
│   ├── utils/
│   │   └── generateShortCode.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── app.test.ts
│   ├── rateLimit.test.ts
│   ├── redirect.test.ts
│   ├── setup.ts
│   └── shorten.test.ts
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
├── prisma7.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedabdrabo1/url-shortening-service.git
cd url-shortening-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5060
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/url_shortening_service"
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials. Make sure the database exists before starting the application.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Apply Database Migrations

```bash
npx prisma migrate deploy
```

### 6. Start the Development Server

```bash
npm run dev
```

The API will run at:

`http://localhost:5060`

## API Endpoints

The API supports URL creation, retrieval, updating, deletion, and redirection.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health check |
| POST | `/api/shorten` | Create a shortened URL |
| GET | `/api/shorten/:shortCode` | Retrieve shortened URL details |
| PATCH | `/api/shorten/:shortCode` | Update a shortened URL |
| DELETE | `/api/shorten/:shortCode` | Delete a shortened URL |
| GET | `/:shortCode` | Redirect to the original URL |

**Note:** Confirm the exact paths and HTTP methods in `src/app.ts` and the route files before publishing. The table should match the actual route configuration.

## Example Request

### Create a Short URL

```http
POST /api/shorten
Content-Type: application/json
```

Request body:

```json
{
  "url": "https://example.com/some/long/path"
}
```

The API processes the request, validates the input, and creates a shortened URL.

The exact response format depends on the implementation of the controller.

## Running Tests

Run the test suite:

```bash
npm test
```

The project uses Jest and Supertest to test application behavior, URL operations, redirection, and rate limiting.

## Code Coverage

Generate a test coverage report using the configured Jest coverage option:

```bash
npm test -- --coverage
```

If your Jest configuration already enables coverage by default, `npm test` may generate the report without the additional flag.

Coverage output is generated in the `coverage/` directory.

## Security

- Validate incoming request data.
- Apply rate limiting to help reduce excessive requests.
- Keep database credentials in environment variables.
- Never commit `.env` or other files containing secrets.
- Avoid committing generated coverage reports unless they are intentionally required by the project.
