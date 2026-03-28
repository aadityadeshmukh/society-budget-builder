# Society Budget Builder

A comprehensive tool for society administrators to manage financial records, model budgets, and track expenses.

## Features

- **Dashboard**: High-level overview of society finances.
- **The Ledger (v3.0)**: Robust state management for year-over-year financial tracking.
- **Expense Mapper**: Categorize and manage expenses with deep granularity.
- **Resident Explorer**: View and manage resident financial data.

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Chart.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/aadityadeshmukh/society-budget-builder.git
    cd society-budget-builder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment to GitHub Pages

This project is configured for automated deployment to GitHub Pages.

### Initial Setup (Already Done)

- `vite.config.js` is configured with `base: '/society-budget-builder/'`.
- `package.json` includes `predeploy` and `deploy` scripts.

### Deploying Changes

Whenever you want to push new changes to the live site:

1.  **Commit your changes** to the `main` branch:
    ```bash
    git add .
    git commit -m "Your descriptive commit message"
    git push origin main
    ```

2.  **Run the deployment script**:
    ```bash
    npm run deploy
    ```
    This will automatically:
    - Build the project (`npm run build`).
    - Push the `dist` folder to the `gh-pages` branch.

The live site will be updated at: [https://aadityadeshmukh.github.io/society-budget-builder/](https://aadityadeshmukh.github.io/society-budget-builder/)
