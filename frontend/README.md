# JobPilot - Connect with Top Talent & Find Dream Jobs

JobPilot is a modern, dynamic web application designed to seamlessly bridge the gap between job seekers and potential employers. Built using a robust React frontend interface, it offers role-based experiences (Employer vs. Job Seeker) with streamlined job management, application tracking, profile curation, and advanced job filtering properties.

![JobPilot Theme Preview](https://via.placeholder.com/800x400.png?text=JobPilot+Dashboard)

---

## 🎯 Features

### For Job Seekers
*   **Intuitive Search Engine**: Find jobs via keyword, dynamic location tracking, and granular filter parameters (e.g., job type, contract length).
*   **One-Click Applications**: Easily submit applications natively on job detail pages.
*   **Centralized Application Tracking**: Monitor your application statuses directly from your personalized Job Seeker Dashboard.
*   **Profile Management**: Consolidate personal info and showcase resume links.

### For Employers
*   **Job Management**: Create robust job descriptions directly from an embedded dashboard, tracking all your company's active openings.
*   **Candidate Auditing**: Accept or Reject aspiring job candidates navigating to the Applications Portal table overview.

### Global Highlights
*   **Vibrant User Interface**: Custom Sky Blue themes with premium rocket deployment animations.
*   **Performance First**: Completely optimized leveraging Vite and decoupled component structures.

---

## 💻 Tech Stack
*   **Framework**: React (Bootstrapped with Vite for maximum speed)
*   **Styling**: React Bootstrap & Tailwind CSS (Utility classes) & Vanilla Custom CSS (for Keyframe animations)
*   **Routing**: React Router DOM
*   **Icons**: Lucide-React
*   **Data Emulation**: LocalStorage (Providing fully interactive mock states without backend dependencies)

---

## 🚀 Quick Setup & Installation

Get JobPilot up and running locally within seconds.

1.  **Clone the Repository** and navigate to the project root.
2.  **Navigate directly** to the web application's root directory:
    ```bash
    cd frontend
    ```
3.  **Install dependencies** via npm:
    ```bash
    npm install
    ```
4.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    Your terminal will output a localhost URL (usually `http://localhost:5173`). Open this URL in your browser to view the application!

---

## 📂 Project Architecture

The codebase has been refactored for maximum modularity and reusability, minimizing technical debt effectively.

```text
JobPilot/
└── frontend/
    ├── src/
    │   ├── components/       # Reusable UI abstractions (JobCard, JobFilter, Layouts)
    │   ├── context/          # React Contexts holding global state (AuthContext, JobContext)
    │   ├── helpers/          # Formatting utility logic functions (e.g., formatCurrency)
    │   ├── hooks/            # Modular Custom React Hooks (e.g., useForm)
    │   ├── pages/            # Application Routing Views (Dashboard, Home, Applications, etc)
    │   ├── App.jsx           # Master route declarations
    │   ├── index.css         # Baseline aesthetic overrides & animations
    │   └── main.jsx          # React initialization footprint
    ├── tailwind.config.js    # Standardized utility class overrides
    └── package.json          # Project operational dependencies
```

## 🛠 Advanced Features Included
*   **Hooks**: `src/hooks/useForm.js` captures repetitive logic surrounding internal component handling and value validation forms seamlessly.
*   **Helpers**: `formatCurrency` and relative timescale rendering functionalities found in `src/helpers/formatters.js` drastically clean up monolithic JSX blocks.
