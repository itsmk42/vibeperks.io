# vibeperks.io

The centralized marketplace for solo developers to discover free credits, perks, and benefits.

## Features

- **Terminal Aesthetic**: A clean, distraction-free interface inspired by developer tools.
- **Live Feed**: Simulated real-time updates of new perks.
- **Search & Filter**: Find perks by keywords, type, or tags.
- **Admin Dashboard**: Manage perks via a protected route (`/admin`).
- **API**: RESTful API endpoints for perk data.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Data**: File-based JSON storage (simulating a database)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) (or whatever port Next.js selects).

4.  **Admin Access**:
    Navigate to `/admin` to add new perks.
    -   **Password**: `admin`

## Project Structure

-   `src/app/page.tsx`: Main feed page.
-   `src/app/admin/page.tsx`: Admin dashboard.
-   `src/app/api/perks/route.ts`: API route for fetching and adding perks.
-   `src/components/`: Reusable UI components (`PerkCard`, `TerminalHeader`).
-   `src/lib/perks.json`: Data storage.

## Contributing

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---
*Built for developers, by developers.*
