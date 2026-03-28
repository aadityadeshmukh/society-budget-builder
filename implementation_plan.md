# Goal Description

The objective is to build "The Ledger" - a Society Budget & Maintenance Modeler (v3.0). This transitions a complex spreadsheet into a modern web application designed for Society Admins to configure society structures (towers, flats, areas) and apply split logic (Equal, Area-Based, Tap-Based) to expenses. It also includes a Resident Viewer application for residents to explore their maintenance breakdown.

## Proposed Changes

### Core Project Setup

- Initialize a Vite React application in `d:\Code\mj-maintenance-system`.
- Configure Tailwind CSS using the provided configuration from the UX template files (colors, fonts).
- Install routing dependencies (`react-router-dom`).
- Add Google Fonts (Manrope, Inter) and Material Symbols to `index.html`.

### UI Components

We will convert the provided HTML mockups into reusable React components:
- **`AdminLayout`**: Persistent sidebar and top navigation.
- **`Dashboard`** (`/admin`): Bento grid showing Financial Vitality, Actual Expenses, Collections, and Comparative Analytics.
- **`Configurator`** (`/admin/configurator`): UI to define society structure (Wing Name, Unit Configuration, Sq Ft, Taps, Unit Count, Total Wing Area).
- **`ExpenseMapper`** (`/admin/expense-mapper`): Drag-and-drop or select interface to assign Raw Expenses (e.g., Security, Water) into Allocation Buckets (Service Charges, Utility Split) and assign the Split Logic (Equal, Area Based, Utility Consumption).
- **`Ledger`** (`/admin/ledger`): Tabular view of all recent ledger items and mapped logic.
- **`ResidentExplorer`** (`/viewer/:token`): A public link, mobile-first view for residents to "Find My Flat" and see their final maintenance breakdown without logging in.

### Logic & State Management

- **Global State**: We will use React Context (or Zustand/Redux if preferred) to maintain the overall state (Society Config, Expenses Array, Logic Mapping).
- **Calculations**: Changing any variable (like moving an expense from Equal to Area-Based) will instantly trigger a re-calculation.
- **Formulas**:
  - *Equal*: Expense / Total Flats
  - *Area-Based*: (Expense / Total Society Area) * Flat Area
  - *Utility-Based*: (Expense / Total Taps) * Flat Taps

### Utilities

- Implement a CSV parser to import raw expenses mimicking the "Income & Expenditure" spreadsheet format.

## Verification Plan

### Manual Verification
1.  Run `npm run dev` to start the local development server.
2.  Navigate to the `/admin` dashboard and verify that the layout matches the provided HTML templates.
3.  Simulate adding a new Wing in the Configurator and an Expense in the Mapper.
4.  Ensure that the calculations reflect the underlying logic accurately.
5.  Navigate to a `/viewer/:token` route and verify the mobile-view display of the calculated maintenance for a specific flat.
