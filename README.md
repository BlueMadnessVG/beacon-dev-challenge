# Beacon Dev Challenge — Health Product Catalog

A fullstack technical assessment for Junior/Mid Web Developer candidates.

Build a health product catalog using **Next.js 15**, **TypeScript**, **MongoDB**, and **TailwindCSS**.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+
- [MongoDB](https://www.mongodb.com/) running locally (or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Local MongoDB Setup (Atlas CLI)

The easiest way to run MongoDB locally is with the [Atlas CLI](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/).

1. **Install the Atlas CLI**

   ```bash
   # macOS (Homebrew)
   brew install mongodb-atlas-cli

   # Windows (Winget)
   winget install -e --id MongoDB.AtlasCLI
   ```

   For other platforms see the [installation docs](https://www.mongodb.com/docs/atlas/cli/current/install-atlas-cli/).

2. **Start a local Atlas deployment**

   ```bash
   atlas deployments setup beacon-local --type local --port 27017 --bindIpAll --force
   ```

   This pulls the required Docker images and starts a local MongoDB instance on port `27017`. Docker Desktop (or Podman) must be running.

3. **Verify it's running**

   ```bash
   atlas deployments list
   ```

   You should see `beacon-local` with status **IDLE**.

4. **Get the connection string**

   ```bash
   atlas deployments connect beacon-local --connectWith connectionString
   ```

   The default connection string for a local deployment is:

   ```
   mongodb://localhost:27017/?directConnection=true
   ```

5. **Manage the deployment**

   ```bash
   # Pause
   atlas deployments pause beacon-local

   # Resume
   atlas deployments start beacon-local

   # Delete when you no longer need it
   atlas deployments delete beacon-local
   ```

### Setup

```bash
# 1. Clone the repository (or your fork)
git clone <your-fork-url>
cd beacon-dev-challenge

# 2. Install dependencies
pnpm install

# 3. Create your environment file
cp .env.example .env
# If you used the Atlas CLI local deployment above, the default URI already works:
#   MONGODB_URI=mongodb://localhost:27017/beacon-dev-challenge

# 4. Seed the database with sample products
pnpm seed

# 5. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see a landing page with a link to `/products`.

### Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `pnpm dev`        | Start dev server with Turbopack      |
| `pnpm build`      | Build for production                 |
| `pnpm seed`       | Seed MongoDB with 30 sample products |
| `pnpm test`       | Run tests with Vitest                |
| `pnpm test:watch` | Run tests in watch mode              |
| `pnpm lint`       | Lint with ESLint                     |
| `pnpm format`     | Check formatting with Prettier       |

---

## What's Included

This template gives you:

- **Next.js 15** with App Router and Turbopack
- **TypeScript** in strict mode
- **TailwindCSS 4** configured and ready
- **MongoDB connection utility** (`src/lib/db.ts`) with a singleton pattern
- **Seed script** (`src/seed.ts`) that populates 30 health/wellness products
- **Vitest** configured with an example test
- **ESLint + Prettier** configured
- A root layout and landing page

## What You Need to Build

The template intentionally leaves the core application for you to implement. There are **no product pages, models, API
routes, or components** — that's your job.

---

## Requirements

### Product Data Model

The seed script creates products with this shape — your Mongoose model should match it:

```typescript
{
  name: string;              // Product name
  slug: string;              // URL-friendly identifier
  description: string;       // Product description
  price: number;             // Price in USD
  category: string;          // "medicamentos" | "suplementos" | "cuidado-personal" | "dispositivos-medicos"
  brand: string;             // Brand name
  stock: number;             // Available quantity
  image: string;             // Placeholder image URL
  requiresPrescription: boolean;  // Whether prescription is needed
  createdAt: Date;           // Timestamp (auto-generated)
}
```

### Core Requirements (must complete)

| # | Requirement                                                                                                                                                        | Skills Tested                               |
|---|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| 1 | **Product Mongoose model** (`src/models/product.ts`) with TypeScript interface                                                                                     | Mongoose, TypeScript                        |
| 2 | **Product listing page** (`/products`) — Server Component that fetches all products from MongoDB and displays them in a responsive grid (mobile, tablet, desktop) | Next.js SSR, Server Components, TailwindCSS |
| 3 | **Product detail page** (`/products/[slug]`) with `generateMetadata` for SEO, responsive layout                                                                    | Dynamic routes, metadata API                |
| 4 | **Search functionality** — filter products by name (client-side or server-side)                                                                                    | React state or URL search params            |
| 5 | **Category filter** — filter by product category                                                                                                                   | UI/UX, filtering logic                      |

### Additional Requirements (complete if time allows)

| # | Requirement                                                                                       | Skills Tested                     |
|---|---------------------------------------------------------------------------------------------------|-----------------------------------|
| 6 | **Add product form** — create new products via Server Action or API Route with validation         | Forms, validation, Server Actions |
| 7 | **TypeScript throughout** — no `any` types, proper interfaces                                     | TypeScript discipline             |
| 8 | **Clean code structure** — logical file organization, meaningful names                            | Code quality                      |

### Bonus Challenges (stretch goals)

Completing any bonus items within the time constraint is a strong positive signal. These are stretch goals — do not sacrifice core requirement quality to attempt them.

| #  | Bonus                                                             | Skills Tested                |
|----|-------------------------------------------------------------------|------------------------------|
| B1 | **Loading states** — `loading.tsx` or Suspense boundaries         | Next.js streaming, UX        |
| B2 | **Error handling** — `error.tsx` boundary, form validation errors | Error boundaries             |
| B3 | **One Vitest test** — unit test for a utility or component        | Testing fundamentals         |
| B4 | **Edit/Delete product** — full CRUD operations                    | API design, UI completeness  |
| B5 | **Pagination or infinite scroll**                                 | Performance, data fetching   |
| B6 | **Sort products** by price, name, or date                         | UI interaction, query params |
| B7 | **Image optimization** using `next/image`                         | Performance awareness        |
| B8 | **Accessible markup** — semantic HTML, ARIA labels, keyboard nav  | Accessibility                |

---

## Evaluation Criteria

| Category              | Weight | What We Look For                                                |
|-----------------------|--------|-----------------------------------------------------------------|
| **Functionality**     | 25%    | All base requirements work correctly                            |
| **Code Quality**      | 25%    | Clean structure, TypeScript usage, naming, no dead code         |
| **UI/UX**             | 15%    | Responsive, visually coherent, good TailwindCSS usage           |
| **Next.js Patterns**  | 15%    | Correct use of Server/Client Components, App Router conventions |
| **MongoDB/Backend**   | 10%    | Proper Mongoose model, validation, error handling               |
| **SEO & Performance** | 5%     | Metadata, semantic HTML, image optimization                     |
| **Bonus Features**    | 5%     | Completed bonus items                                           |

---

## Submission

1. Fork this repository
2. Complete the challenge on your fork
3. Create a Pull Request against the `main` branch of **your fork**
4. Include a brief description in the PR of:
    - Your approach and key decisions
    - Any bonus challenges you completed
    - What you would improve with more time

**Time expectation:** 1 hour. Focus on quality over quantity — a well-implemented subset is better than a rushed
complete solution. Partial completion is expected; we evaluate the quality of what you build, not the quantity.

---

## AI / LLM Disclosure

We believe in assessing **your** skills, not an AI's. Here's our policy:

### What's allowed

- Using AI tools (ChatGPT, Copilot, Claude, etc.) for **learning concepts** or **looking up syntax**
- Standard IDE autocomplete (IntelliSense, TabNine line completions, etc.)
- Referencing documentation, Stack Overflow, or tutorials

### What's not allowed

- **Wholesale code generation** — prompting an AI to produce entire components, pages, or features that you paste in
- **AI-driven architecture** — having an LLM design your file structure, data flow, or component hierarchy without you understanding *why*
- Copy-pasting AI output without being able to explain every line

### What we evaluate in the live session

After reviewing your submission, we conduct a **live coding session** where you will be asked to:

- **Explain** your architectural decisions and trade-offs
- **Modify** existing features or add small changes live, without AI assistance
- **Debug** an issue we introduce, walking us through your thought process

Candidates who relied heavily on AI-generated code typically struggle in these sessions, regardless of how polished the submission appears.

### Disclosure

If you used AI tools during this challenge, **please note which tools you used** in your Pull Request description. Honesty is valued — we understand AI tools are part of modern development. However, undisclosed heavy AI usage that becomes apparent during the live session will negatively impact your evaluation.

---

## Tips

- **Prioritize ruthlessly** — get the 5 core requirements working before attempting anything else
- Start with the Mongoose model and the listing page — get data flowing first
- Use Server Components by default; only add `"use client"` where you need interactivity
- Don't over-style — functional and clean beats pixel-perfect when time is tight
- Commit early and often — small, iterative commits show your process
- Check the four categories in the seed data for the category filter values

Good luck!
