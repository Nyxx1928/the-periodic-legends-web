# The Periodic Legends (TPL) - Earth Science Adventure Platform

![TPL Logo](src/Assets/Group%2017.png)

## 🎓 Project Overview

**The Periodic Legends (TPL)** is an educational turn-based RPG mobile application designed to enhance Earth Science education for General Academic Strand (GAS) students at Caloocan High School. This project was developed as part of a thesis defense and combines gamification with curriculum-aligned learning content.

### Key Features

- 🎮 **Immersive Gameplay**: Turn-based RPG mechanics that make learning Earth Science engaging
- 📊 **Real-time Analytics**: Web-based dashboard for teachers to track student progress
- 📱 **Cross-Platform**: Android mobile app with synchronized web analytics
- 🎯 **Curriculum Aligned**: Content designed to support Philippine K-12 curriculum standards
- 📈 **Predictive Analytics**: Linear regression-based predictions for student performance
- 🔐 **Secure Authentication**: Role-based access for students, teachers, and administrators

## 🏗️ System Architecture

### Components

1. **Web Application** (`src/`)
   - Landing page with glassmorphism UI
   - Student dashboard with progress tracking
   - Teacher dashboard with analytics
   - Admin panel for system management

2. **Mobile Application**
   - Android APK (Version 1.2.3)
   - Turn-based combat system
   - Quest-based learning modules
   - Progress synchronization

3. **Backend Services**
   - Supabase database for user management
   - Authentication and authorization
   - Real-time data synchronization

## 🛠️ Technology Stack

### Frontend
- **HTML5** with modern semantic markup
- **Tailwind CSS** for utility-first styling
- **JavaScript (ES6+)** for interactivity
- **AOS (Animate On Scroll)** for smooth animations
- **Chart.js** for data visualization

### Backend & Database
- **Supabase** (PostgreSQL) for database and authentication
- **Express.js** for API endpoints (if needed)

### Mobile
- **Android** (API 26+, Android 8.0+)

## 📁 Project Structure

```
TPL Web - Copy/
├── src/                          # Web application source files
│   ├── index.html               # Landing page
│   ├── Student_*.html          # Student portal pages
│   ├── Teacher_*.html          # Teacher dashboard pages
│   ├── Admin_*.html            # Admin panel pages
│   ├── Home_*.html             # Public pages (About, Contact, Resources)
│   └── Assets/                 # Images, GIFs, and media files
├── api/                         # API endpoints
│   └── verify-recaptcha.js     # reCAPTCHA verification
├── config.local.js             # Environment configuration (NOT in repo)
├── package.json                # Node.js dependencies
├── ANALYTICS_FORMULAS.md       # Documentation of analytics formulas
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Modern web browser (Chrome, Firefox, Edge)
- Supabase account (for database access)
- Android device or emulator (for mobile app testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/the-periodic-legends.git
   cd the-periodic-legends
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `config.local.js` file in the root directory
   - Add your Supabase credentials:
   ```javascript
   window.env = {
       SUPABASE_URL: "your-supabase-url",
       SUPABASE_ANON_KEY: "your-supabase-anon-key"
   };
   ```
   ⚠️ **Note**: Never commit `config.local.js` to version control!

4. **Run the application**
   - For local development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   
   # Using VS Code Live Server extension
   # Right-click index.html > Open with Live Server
   ```
   - Open `http://localhost:8000/src/index.html` in your browser

## 📊 Analytics & Data Visualization

The system includes comprehensive analytics features:

- **Student Performance Tracking**: Real-time quiz scores and progress
- **Predictive Analytics**: Linear regression for future performance prediction
- **Topic Performance Analysis**: Polar area charts for subject mastery
- **Score Distribution**: Doughnut charts showing performance categories
- **Completion Metrics**: Bar charts for quiz completion by section

See `ANALYTICS_FORMULAS.md` for detailed mathematical formulas and implementations.

## 🎮 User Roles

### Student
- Access to personalized learning dashboard
- Quest-based learning modules
- Quiz attempts and performance tracking
- Progress visualization

### Teacher
- Web analytics dashboard
- Student progress monitoring
- Class-wide performance metrics
- Predictive analytics for intervention planning

### Administrator
- System management
- User account creation
- Data archival and management

## 🔒 Security Features

- Password hashing with SHA-256 and salt
- Role-based access control
- Secure authentication via Supabase
- Input validation and sanitization

## 📱 Mobile App

The Android application can be downloaded from the landing page or accessed via:
- Direct APK download link (hosted on Vercel Blob Storage)
- System requirements: Android 8.0+, 2GB RAM, 200MB storage

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-effect design elements
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: AOS library for scroll-triggered animations
- **Dark Theme**: Black background with yellow accent colors
- **Accessibility**: Semantic HTML and ARIA labels

## 📈 Key Metrics & Formulas

The system calculates various metrics:

1. **Percentage Calculation**: `(Score / Total Questions) × 100`
2. **Average Score**: `Sum of Percentages / Number of Quizzes`
3. **Linear Regression**: For predicting future performance
4. **Topic Performance**: Average scores per topic
5. **Completion Rate**: `Completed Quizzes / Total Quizzes × 100`

See `ANALYTICS_FORMULAS.md` for complete documentation.

## 🤝 Contributing

This is a thesis project, but suggestions and feedback are welcome!

## 📄 License

This project was developed as part of an academic thesis. All rights reserved.

## 👤 Author

Developed by [Your Name] as part of thesis defense at STI College Caloocan (2023-2025).

## 🙏 Acknowledgments

- Caloocan High School for collaboration
- STI College Caloocan for academic support
- Supabase for backend infrastructure
- All contributors and testers

## 📞 Contact

For inquiries about this project:
- Email: support@periodiclegends.com
- School: Caloocan High School

---

**Version**: 1.2.3  
**Last Updated**: April 2025  
**Status**: Thesis Defense Completed ✅


