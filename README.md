CivicStream - https://hackoglitch-civic.netlify.app/

# CivicStream — Digital Governance Platform

A high-performance, real-time platform designed to bridge the gap between citizens and city infrastructure management. This project features a unique **Dual-View Development Layout** that allows developers to see and test Desktop (70% width) and Mobile (30% width) experiences simultaneously in a single view.

---

## 🚀 Recent Progress & Features

### 1. Dual-View Environment
- **Synced Architecture**: Implemented a `DualViewLayout` that renders the application in two parallel frames.
- **Desktop Frame**: Simulates a browser environment for the desktop portal.
- **Mobile Frame**: A polished phone-shell preview with a dynamic notch and status bar.
- **Bi-directional Sync**: Powered by **Zustand**, every state change (form input, slider navigation, counter) reflects instantly across both views.

### 2. Advanced Onboarding Experience
- **Interactive Slider**: A 3-slide onboarding experience detailing key platform values:
  1. *Report Issues in Seconds*
  2. *Track Progress Transparently*
  3. *See Before & After Proof*
- **Gesture Support**:
  - **Mobile**: Seamless touch-swipe (left/right) with 50px threshold.
  - **Desktop**: Mouse drag detection to simulate mobile-like interactions on large screens.
- **Smart Autoplay**:
  - Automatically transitions slides every 4 seconds.
  - **Intelligent Pause**: Resumes only after a 5-second silence following any manual interaction (clicks, swipes, or pagination navigation).

### 3. Premium UI & Design System
- **Typography**: Optimized hierarchy using the **Inter** font family for a clean, SaaS-like readability.
- **Color Palette**: Sophisticated blue-slate theme with vibrant success and warning accents.
- **Spacing**: Strict 8px grid scale ensuring consistent vertical rhythm and professional padding.
- **Animations**: 400ms cubic-bezier transitions for zero-flicker, hardware-accelerated movement.
- **Custom Components**:
  - Animated pagination dots with width-scaling indicators.
  - Full-width, high-contrast action buttons with subtle hover scales and shadows.
  - Visual timeline components and before/after verification cards.

### 4. Technical Stack
- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (BEM Architecture) + Tailwind CSS (for dashboard elements)
- **State Management**: Zustand
- **Icons**: Lucide-React & Google Material Symbols

---

## 🛠️ Project Structure

- `src/components/layout/`: Dual-view layout and frame wrappers.
- `src/components/screens/`: High-level application screens like `OnboardingScreen` and `SplashScreen`.
- `src/store/`: `useAppStore.js` for global, shared state across views.
- `src/pages/`: Core application modules (Dashboard, Settings).

---

## 🚦 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    View the platform at `http://localhost:5173`.
