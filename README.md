# Twitter Clone

A fully functional Twitter/X clone built with modern web technologies. This project was developed to consolidate full stack knowledge — from authentication and relational databases to image management and deployment.

🔗 **Live Demo:** [twitter-clone-theta-bay.vercel.app](https://twitter-clone-theta-bay.vercel.app)

---

## Features

- 🔐 **Authentication** — Register and login with secure session management via NextAuth v4 and password hashing with bcryptjs
- 📰 **Feed** — Dynamic timeline showing posts from all users
- ✍️ **Create Posts** — Publish tweets with text and image support
- ❤️ **Likes** — Like and unlike posts in real time
- 👤 **User Profile** — View and edit your own profile (username, avatar, bio)
- 🖼️ **Image Uploads** — Profile pictures and post images handled via Cloudinary
- 🔒 **Protected Routes** — Server-side session validation with Next.js middleware

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth v4 |
| ORM | Prisma |
| Database | MySQL |
| Image Storage | Cloudinary |
| Icons | Tabler Icons |
| Deploy | Vercel |

---

## Architecture Highlights

- **App Router + Server Actions** — Data mutations handled via Next.js server actions instead of a separate REST API, reducing client-server round trips
- **Prisma ORM** — Type-safe database queries with auto-generated client from schema
- **NextAuth with custom credentials provider** — Session managed via JWT cookies, with server-side validation on protected routes
- **Cloudinary integration** — Images uploaded directly from the server, with public URLs stored in the database
- **bcryptjs** — Passwords hashed before storage, never stored in plain text

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- Cloudinary account

### Installation

```bash
# Clone the repository
git clone https://github.com/LucasEzequielRamos/Twitter-Clone.git

# Navigate to the project
cd Twitter-Clone

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root with the following variables:

```env
DATABASE_URL="mysql://user:password@host:port/dbname"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── api/          # API route handlers
│   ├── (auth)/       # Login and register pages
│   ├── (main)/       # Feed, profile, post pages
│   └── actions/      # Server actions
├── components/       # Reusable UI components
├── lib/              # Prisma client, auth config, helpers
└── types/            # TypeScript type definitions
prisma/
└── schema.prisma     # Database schema
```

---

## What I Learned

- Implementing full authentication flows with NextAuth and custom credential providers
- Designing relational schemas with Prisma (users, posts, likes relationships)
- Using Next.js 14 server actions for mutations without a separate backend
- Handling file uploads with Cloudinary from a server environment
- Managing JWT sessions and protecting routes server-side

---

## Author

**Lucas Ramos** — Full Stack Developer  
[Portfolio](https://portfolio-official-wheat.vercel.app) · [LinkedIn](https://linkedin.com/in/lucas-ramos-5b4aa1246) · [GitHub](https://github.com/LucasEzequielRamos)
