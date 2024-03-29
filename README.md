<h1 align="center">
   SkillSprint
</h1>

<p align="center">
   <a href="https://github.com/Lekesoldat/skillsprint/blob/main/LICENSE" alt="LICENSE">
</p>
   
SkillSprint is a fun mathematical gamification web application that provides a challenging and interactive experience reminiscent of CTFs, improving users' problem-solving skills and mathematical knowledge.
  
## Built with
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)
- [React.js](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostHog](https://posthog.com/)
- [NextAuth.js](https://next-auth.js.org/)

## Getting started

To get started, follow these steps.

### Prerequisites

- Node.js (Version: >= 18.x)
- PostgreSQL database
- Pnpm
- PostHog project (production only)

## Development

1. Clone this repository to your local machine.

   ```sh
   git clone https://github.com/Lekesoldat/skillsprint.git
   ```

2. Go to the project folder.

   ```sh
   cd skillsprint
   ```

3. Set up your `.env` file.

   - Create a `.env` file and copy the values from`.env.example`.

4. Fill out the environment variables with yours, such as the DATABASE_URL.

5. Add your user to to the admin list in [user-utilities](https://github.com/Lekesoldat/skillsprint/blob/03bcdc3a7be94a163c63c1657f1a134099c72ffb/src/utils/seeds/utils/user-utilities.ts#L18).

6. Run `pnpm tasks-seed` to seed the database with some tasks and your user.

7. Open a browser and go to http://localhost:3000.

## Project structure

This application follows the same folder structure as described in [T3 Docs](https://create.t3.gg/en/folder-structure).
