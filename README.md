# Run in Development

1. Clone the repository
2. Install dependencies `npm install`
3. Clone `env.template` and rename it to `.env` and complete the environment variables in .env
4. Start the database `docker compose up -d`
5. Generate Prisma client `npx prisma generate`
6. Run the project `npm run start:dev`
