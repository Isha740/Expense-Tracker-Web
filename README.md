# 📊 SpendSense — Smart Multi Tenant Expense Tracker

**SpendSense** is a full stack, responsive financial dashboard built on the MERN stack. Designed for multi tenant isolation, it allows multiple users to securely register, monitor real time monthly spending records, calculate analytics, and enforce strict dynamic calendar budget boundaries. 

---

## 🚀 Core Features & Minute Functionalities

### 1. Robust Cryptographic Security Layer (JWT & Pre-Save Hashing)
*   **Zero Plaintext Passwords:** Leveraging a Mongoose `pre('save')` middleware lifecycle interceptor, all user passcodes are cryptographically hashed using **BcryptJS** salts before hitting the database.
*   **Bearer Token Authorization Gateways:** All database transactions (Expenses, Budgets, Analytics calculations) are secured via customized Express routing middleware (`protect`). Inbound client operations require verified signature verification keys (`JWT_SECRET`) passed via network request headers to prevent unauthorized endpoint access.

### 2. Live Dynamic Summary Row
*   **Total Transitions:** Automatically computes the all time transaction data records arrays belonging to the authenticated user profile state.
*   **Real Time Remaining Balance card:** Dynamically queries the current user's target  budget limit for the matching calendar year and month. It subtracts current expenditures on triggers a color coded alert: refreshing to an **emerald indicator** during stable periods, or snapping to a **rose alert** if the account approaches or crosses limits.
*   **Category with max expenditure:** Loops through categories locally and in query pathways to dynamically expose the active user's highest expense grouping (e.g., `Food (₹4,500)`).

### 3. Calendar Constraint Validation
*   **Dual Layer Future Blockers:** Restricts users from logging forward dated or predictive mock transactions. The client date input uses a dynamic Javascript ISO string compiler to hard cap calendar grids at today's date, keeping future dates greyed out and unclickable.
*   **Active Month Historical Isolation Window (`min` Bounds):** Prevents historical ledger tampering by dynamically calculating the midnight timestamp of the first day of the current month (`YYYY-MM-01`). Users are locked into logging entries strictly inside the active tracking month frame.

### 4. Interactive Analytical Data Visualizations
*   **Dual Chart Sync Pipeline:** Uses concurrent promise mapping (`Promise.all`) to feed analytical charting libraries like **Recharts**.
*   **Aggregated Historical Bars vs. Limits:** Renders a tracking visual comparing total historical expenditure volumes side-by-side with user defined budget boundaries for clear financial insights.

### 5. Mobile First Fluid Design Architecture
*   **Tailwind CSS Responsive Grids:** Seamlessly scales from desktop monitors down to mobile screens. Heavy structural grids automatically stack into vertical alignments, and complex textual components scale back to clean icon indicators on phone screens.
*   **Exclusive Dropdown Controls:** A secure profile dashboard portal built into the header with explicit avatar extraction rules. Clicking the name badge forces the menu open, locking it in place to ensure persistent touch usability until the user clicks the explicit **close button** or **Sign Out**.

---

## 🛠️ The Full Stack Technical Architecture

### Backend Core (`/server`)
*   **Runtime Environment:** Node.js with Express.js framework routing pipelines.
*   **Database Management System:** MongoDB Atlas / Local Cluster managed via Mongoose Object Data Modeling (ODM).
*   **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs` salt managers, and cross origin resource sharing (`cors`).

### Frontend Interface (`/client`)
*   **Core UI Library:** React (Functional Components + `useState`, `useEffect` hooks).
*   **Global Authentication Context System:** Centralized custom React Context (`AuthContext`) that manages local token persistence and synchronizes all concurrent fetch calls under unified headers.
*   **Styling Engine:** Tailwind CSS utility styling classes with absolute layout parameters.
*   **Data Visualization:** Recharts analytical component trees.

---

## 📦 System Installation & Environment Launch

### 1. Environmental Variables Configuration
Create a `.env` configuration file inside your **`server/`** directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/spendsense
JWT_SECRET=your_cryptographic_secret_key_stream_here