# 🖥️ Frontend - JobGenie

The frontend of **JobGenie** is built using **Next.js** and serves as the primary user interface for job seekers to interact with the platform. It offers a seamless and responsive experience across devices, allowing users to explore job listings, upload their resumes, receive personalized job recommendations, and engage with an AI-powered career assistant.

---

### 🎯 Key Responsibilities

- **Job Listings Dashboard**: Displays aggregated job postings in a clean, searchable interface with filters and match scoring indicators.
- **Resume Upload & Matching**: Allows users to upload resumes (PDF) and triggers backend processing for tailored job suggestions.
- **Real-Time AI Chat**: Enables users to interact with a conversational AI assistant for resume feedback, job-fit explanations, and career advice—powered via WebSocket for real-time responses.
- **Authentication UI**: Handles user login and registration using JWT-based authentication.
- **Dynamic Routing**: Includes protected routes for dashboards, public pages for landing, and modular components for maintainability.
- **User Experience (UX)**: Styled with **Tailwind CSS**, it ensures a smooth, responsive, and accessible interface for all features.

---

### 🧩 Architecture Highlights

- Communicates with the **Primary Backend (PB)** via REST APIs for authentication, job listings, and resume uploads.
- Connects to the **Worker Service** over **WebSocket** for AI interactions and live recommendations.
- Designed with **reusability** in mind—shared components, hooks, and layout templates for faster development and consistent UI/UX.
- Integrates seamlessly with backend services using **environment-based API routing** for flexibility across staging and production.

---

### 🛠️ Tech Stack (Frontend)

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Authentication**: JWT
- **Real-Time Communication**: WebSocket

---

> **Note:** This frontend is tightly coupled with the JobGenie backend and worker services. Ensure they are running to fully utilize all platform features.
