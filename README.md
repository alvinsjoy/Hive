# [Hive](https://hivebuzz.vercel.app)

Hive is a modern web application designed to enhance community engagement and social interactions. With a focus on user-friendly interfaces and robust functionality, Hive offers a range of features to create a dynamic social experience.

## Features

- **Onboarding and Profile Creation:** Effortlessly set up and customize user profiles.
- **Communities:** Create communities, join as members, and post thread (buzz) as a community member.
- **Content Management (CRUD):** Create, read, update, and delete threads (buzzes), Communities, and Profiles.
- **Multi-level Comments:** Engage in in-depth discussions with nested comments on buzzes.
- **Search:** Discover and connect with profiles and communities using the search functionality.
- **Activity Feed:** Stay updated with real-time notifications when other users comment on your buzz.
- **Profile Tabs:** Display a list of your buzzes and replies for easy access.
- **Community Tabs:** View buzzes made in the community and members of the community.
- **Suggested Communities and Profiles:** Explore new communities and profiles.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org)
- [Next.js](https://nextjs.org)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [React Hook](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Svix](https://svix.com)
- [Clerk](https://clerk.dev)
- [UploadThing](https://uploadthing.com)
- [Vercel](https://vercel.com)

## Get Started

To get this project up and running locally, follow these step-by-step instructions.

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

- [Node.js](https://nodejs.org)
- [NPM](https://www.npmjs.com)
- [Git](https://git-scm.com)
- [MongoDB](https://www.mongodb.com)

### Install and Run Locally

**Step 1:** Clone this repository:

```bash
git clone https://github.com/alvinsjoy/Hive.git
cd Hive
```

**Step 2:**
Create an `.env.local` file with the following values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
MONGODB_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_CLERK_WEBHOOK_SECRET=
```

- Create a [Clerk](https://clerk.dev) account and set the `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.local`.

- Create a [MongoDB](https://www.mongodb.com) database and connect it to the application, change the `MONGODB_URL` in `.env.local`.

- Create an [UploadThing](https://uploadthing.com) account and set the `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` in `.env.local`.

- Create a new webhook on [Clerk Dashboard](https://dashboard.clerk.dev). Select the events, "organization", "organizationDomain", "organizationInvitation" and "organizationMembership". Get the signing secret and set it as `CLERK_WEBHOOK_SECRET` in `.env.local`.

**Step 3:**

```bash
npm install
npm run dev
```

## Contributing

To fix a bug or enhance an existing module, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b new-feature`)
3. Make the appropriate changes in the files
4. Commit your changes (`git commit -am 'new feature'`)
5. Push to the branch (`git push origin new-feature`)
6. Create a Pull Request
