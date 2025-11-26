# 🚀 ProcrastiNOT

**Beat Procrastination with Personalized Productivity**

ProcrastiNOT is a modern, intelligent productivity application designed to help users overcome procrastination through personalized task management, mood tracking, focus modes, and gamification. Built with React, TypeScript, and Vite, this Progressive Web App (PWA) adapts to individual work styles and provides a comprehensive suite of tools to boost productivity.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Key Components](#-key-components)
- [Context Providers](#-context-providers)
- [Customization](#-customization)
- [PWA Support](#-pwa-support)
- [Developer](#-developer)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **Personalized Onboarding**: MBTI and ADHD assessments to tailor the experience
- **Smart Dashboard**: Overview of tasks, mood, and productivity metrics
- **Task Calendar**: Visual task management with calendar integration
- **Focus Mode**: Distraction-free environment with customizable timers
- **Mood Tracking**: Daily mood check-ins with insights and patterns
- **Rewards System**: Gamified experience with achievements and rewards
- **Analytics**: Detailed productivity analytics and insights
- **Distraction Blocker**: Tools to minimize interruptions

### 🎨 User Experience
- **Dark Mode**: Eye-friendly dark theme with smooth transitions
- **Fluid Animations**: Engaging micro-interactions and animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **PWA Ready**: Install as a native app on any device
- **Intuitive Navigation**: Bottom navigation for easy access

### 🧠 Personalization
- **MBTI-Based Recommendations**: Task strategies based on personality type
- **ADHD Support**: Features designed for neurodivergent users
- **Custom Goals**: Set and track personal productivity goals
- **Adaptive UI**: Interface adapts to user preferences

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing

### UI & Styling
- **Lucide React** - Beautiful icon library
- **Canvas Confetti** - Celebration animations
- **Custom CSS** - Tailored styling with CSS variables

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin PWA** - Progressive Web App support

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shehrrbano/ProcrastiNOT.git
   cd ProcrastiNOT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
ProcrastiNOT/
├── public/                  # Static assets
│   └── vite.svg
├── src/
│   ├── assets/             # Images, icons, and media
│   ├── components/         # Reusable UI components
│   │   ├── BottomNav.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Layout.tsx
│   │   └── UserProfile.tsx
│   ├── context/            # React Context providers
│   │   ├── AppContext.tsx
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── pages/              # Application pages
│   │   ├── auth/           # Authentication pages
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── onboarding/     # Onboarding flow
│   │   │   ├── Welcome.tsx
│   │   │   ├── AssessmentMBTI.tsx
│   │   │   ├── AssessmentADHD.tsx
│   │   │   ├── Goals.tsx
│   │   │   └── FeatureTour.tsx
│   │   ├── Analytics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DistractionBlocker.tsx
│   │   ├── FocusMode.tsx
│   │   ├── MoodCheck.tsx
│   │   ├── RewardsRoom.tsx
│   │   └── TaskCalendar.tsx
│   ├── types/              # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── theme.ts
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

---

## 🧩 Key Components

### Layout Components
- **`Layout.tsx`** - Main application layout wrapper
- **`BottomNav.tsx`** - Bottom navigation bar for mobile-friendly navigation
- **`UserProfile.tsx`** - User profile display and settings

### UI Components
- **`Button.tsx`** - Reusable button component with variants
- **`Card.tsx`** - Card container for content sections

### Pages

#### Authentication
- **`SignIn.tsx`** - User login page
- **`SignUp.tsx`** - User registration page

#### Onboarding
- **`Welcome.tsx`** - Welcome screen
- **`AssessmentMBTI.tsx`** - MBTI personality assessment
- **`AssessmentADHD.tsx`** - ADHD screening questionnaire
- **`Goals.tsx`** - Goal setting interface
- **`FeatureTour.tsx`** - Interactive feature tour

#### Main Features
- **`Dashboard.tsx`** - Main dashboard with overview
- **`TaskCalendar.tsx`** - Calendar view for task management
- **`FocusMode.tsx`** - Distraction-free focus timer
- **`MoodCheck.tsx`** - Daily mood tracking
- **`RewardsRoom.tsx`** - Achievements and rewards
- **`Analytics.tsx`** - Productivity analytics and insights
- **`DistractionBlocker.tsx`** - Distraction management tools

---

## 🔄 Context Providers

### AppContext
Global application state management for tasks, settings, and app-wide data.

### AuthContext
Handles user authentication, login/logout, and session management.

### ThemeContext
Manages theme preferences (dark/light mode) and animation settings.

### UserContext
Stores user profile data, preferences, and personalization settings.

---

## 🎨 Customization

### Theme Customization
Edit `src/index.css` to customize colors, fonts, and global styles:

```css
:root {
  --primary-color: #your-color;
  --background-color: #your-background;
  /* Add more custom variables */
}
```

### Adding New Features
1. Create a new page in `src/pages/`
2. Add routing in `src/App.tsx`
3. Update navigation in `src/components/BottomNav.tsx`
4. Add necessary context if needed

---

## 📱 PWA Support

ProcrastiNOT is a Progressive Web App, which means:
- ✅ **Installable** - Add to home screen on mobile/desktop
- ✅ **Offline Support** - Works without internet connection
- ✅ **Fast Loading** - Cached assets for quick startup
- ✅ **Native Feel** - App-like experience

### Installing as PWA
1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Look for the "Install" prompt or menu option
3. Click "Install" to add to your device

---

## 👩‍💻 Developer

**Shehr Bano**

- GitHub: [@shehrrbano](https://github.com/shehrrbano)
- Project Repository: [ProcrastiNOT](https://github.com/shehrrbano/ProcrastiNOT)

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🤝 Contributing

This is a personal project. If you'd like to contribute or have suggestions, please reach out to the developer.

---

## 🐛 Known Issues & Roadmap

### Current Focus
- Backend integration for data persistence
- User authentication with OAuth
- Cloud sync across devices
- Mobile app versions (iOS/Android)

### Future Enhancements
- AI-powered task prioritization
- Team collaboration features
- Integration with calendar apps (Google Calendar, Outlook)
- Pomodoro timer variations
- Habit tracking
- Social features and accountability partners

---

## 📞 Support

For issues, questions, or feature requests, please open an issue on the [GitHub repository](https://github.com/shehrrbano/ProcrastiNOT/issues).

---

**Made with ❤️ by Shehr Bano**

*Stop procrastinating, start achieving with ProcrastiNOT!*
