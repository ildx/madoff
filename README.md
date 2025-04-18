# Madoff

A modern Next.js project with TRPC, Drizzle SQLite, and TailwindCSS.

## 🚀 Features

- **Next.js 15** with App Router
- **TRPC** for type-safe API endpoints
- **Drizzle ORM** with SQLite
- **TailwindCSS** for styling
- **Vitest** for testing
- **Biome** for linting and formatting
- **React Hook Form** for form handling

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn/bun)

## 🛠️ Getting Started

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server with:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

Build and run the application in production mode:

```bash
pnpm build
pnpm start
```

## 🗄️ Database Management

This project uses Drizzle ORM with SQLite for database management.

### Database Migrations

The project automatically runs migrations on startup. However, you can also manage migrations manually:

1. **Generate migrations** based on your schema changes:
   ```bash
   pnpm db:generate
   ```

2. **Apply migrations** to your database:
   ```bash
   pnpm db:migrate
   ```

3. **Explore your database** with Drizzle Studio:
   ```bash
   pnpm db:studio
   ```

Migrations are stored in the `src/db/migrations` directory.

## 🧪 Testing

The project uses Vitest for testing.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 🧹 Code Quality

Maintain code quality with these commands:

```bash
# Lint the codebase
pnpm lint

# Lint and automatically fix issues
pnpm lint:fix

# Format code
pnpm format

# Lint and format in one command
pnpm fix
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── db/               # Database configuration and migrations
│   ├── migrations/   # Database migration files
│   └── schema/       # Database schema definitions
├── lib/              # Utility functions and shared code
└── server/           # Server-side code
    └── routers/      # TRPC route definitions
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/guide)
