# FinanceDashboard

A modern personal finance dashboard web application to track income, expenses, and gain insights into your financial habits.

## Features

- **Dashboard Overview:** See total balance, total income, and total expenses at a glance.
- **Balance Trend Chart:** Visualize your balance over time.
- **Transaction List:** View, add, edit, and delete transactions (income/expense) with categories.
- **Insights Panel:** Get insights such as top spending category and savings rate.
- **Role Switch:** Switch between "Viewer" and "Admin" roles (admin can edit, viewer is read-only).
- **Responsive UI:** Clean, modern, and mobile-friendly interface.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **Radix UI** (accessible UI primitives)
- **Recharts** (charts and graphs)
- **React Hook Form** + **Zod** (forms and validation)
- **Lucide Icons** (iconography)
- **date-fns** (date utilities)

## Project Structure

```
FinanceDashboard/
  src/
    components/         # Dashboard, charts, insights, role switch, UI elements
    lib/                # Finance data types, mock data, utilities
    routes/             # App routes
    styles.css          # Global styles
    router.tsx          # App router
    ...
  package.json
  tsconfig.json
  vite.config.ts
```

## How to Run

### 1. Clone the repository

```sh
git clone https://github.com/revathichavala/FinanceDashboard.git
cd FinanceDashboard
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 4. Build for production

```sh
npm run build
```

The production build will be in the `dist` folder.

### 5. Preview the production build

```sh
npm run preview
```

---

## What’s Inside

- **Summary Cards:** Show your current balance, total income, and total expenses.
- **Balance Chart:** Line chart of your balance history.
- **Transaction List:** Add, edit, delete, and filter transactions by type/category.
- **Insights Panel:** See your top spending category and savings rate.
- **Role Switch:** Toggle between admin (edit) and viewer (read-only) modes.

## Customization

- All data is currently in-memory (see `src/lib/finance-data.ts`). You can extend this to connect to a backend or local storage.
- UI is fully customizable via Tailwind and Radix UI components.

## License

MIT
