# 🎓 MyHSB Learning - AI-Powered Quiz System Showcase

<div align="center">

![HSB Logo](https://cdn.haitrieu.com/wp-content/uploads/2022/11/Logo-Truong-Quan-tri-va-Kinh-doanh-HSB-Blue.png)

**Learn how AI was used to build a modern learning platform**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-hsb2005.netlify.app-blue?style=for-the-badge)](https://hsb2005.netlify.app)
[![Made with AI](https://img.shields.io/badge/Made_with-AI_Assistance-purple?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#-features) • [Learning Guide](#-learning-guide) • [Architecture](#-architecture) • [AI Prompts](#-ai-prompts) • [Contributing](#-contributing)

</div>

---

## 📖 About This Repository

This is **NOT** the source code of the HSB Quiz application. Instead, this is a **learning resource** that documents:

- 🤖 How AI (Google Gemini) was used to develop the application
- 📐 The architecture and design decisions
- 💡 Effective prompts for AI-assisted development
- 🎨 UI/UX design patterns and implementation

> **Live Demo**: Experience the actual application at [hsb2005.netlify.app](https://hsb2005.netlify.app)

---

## ✨ Features Showcase

The HSB Quiz application demonstrates modern web development practices:

### 🎯 Multiple Learning Modes

| Mode | Description | Time Limit |
|------|-------------|------------|
| 🧠 **Practice** | Unlimited questions, immediate feedback | None |
| ⏰ **Exam** | Timed assessment (20/40/60 questions) | 15-45 min |
| 💬 **AI Chat** | Direct conversation with AI about IT topics | None |

### 🤖 AI Assistant Integration

- **Google Gemini AI** powered responses
- Context-aware question explanations
- Smart suggestion system
- Markdown formatting support

### 🎨 Modern UI/UX

- **Dark/Light Mode** - Auto-detects system preference
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Professional feel
- **Progressive Web App** - Install as mobile app

### 📚 Content Features

- **400+ Questions** across 11 IT chapters
- **Difficulty Levels** - Easy, Medium, Hard
- **Progress Tracking** - Auto-save functionality
- **Detailed Results** - Review wrong answers

---

## 📚 Learning Guide

### Who Is This For?

- 🎓 **Students** learning web development
- 👨‍💻 **Developers** exploring AI-assisted coding
- 🏫 **Educators** building learning platforms
- 🚀 **Entrepreneurs** creating EdTech products

### What You'll Learn

1. **AI-Assisted Development**
   - How to prompt AI effectively for code generation
   - Best practices for code review with AI
   - Debugging strategies using AI

2. **Modern Web Architecture**
   - Single-page application patterns
   - Local storage for state management
   - Service Worker for offline support

3. **UI/UX Implementation**
   - CSS custom properties for theming
   - Responsive design without frameworks
   - Accessibility considerations

4. **API Integration**
   - Google Gemini API usage
   - Error handling and fallbacks
   - Rate limiting strategies

📖 **[Read the Full Learning Guide →](docs/LEARNING_GUIDE.md)**

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    HSB Quiz System                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Practice  │  │    Exam     │  │   AI Chat   │     │
│  │    Mode     │  │    Mode     │  │    Mode     │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│         └────────────────┼────────────────┘             │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Core Quiz Engine (app.js)            │  │
│  │  • Question shuffling (Fisher-Yates)             │  │
│  │  • State management                              │  │
│  │  • Timer system                                  │  │
│  │  • Progress tracking                             │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│         ┌────────────────┼────────────────┐            │
│         ▼                ▼                ▼            │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐      │
│  │  Local    │    │  Gemini   │    │  Service  │      │
│  │  Storage  │    │    API    │    │  Worker   │      │
│  └───────────┘    └───────────┘    └───────────┘      │
└─────────────────────────────────────────────────────────┘
```

📐 **[Read the Full Architecture Guide →](docs/ARCHITECTURE.md)**

---

## 🤖 AI Prompts Collection

This project was developed with extensive AI assistance. Here are some effective prompts used:

### UI Design Prompt Example

```
Create a modern quiz interface with:
- Glassmorphism design
- Dark/light mode support using CSS variables
- Smooth transitions and micro-animations
- Mobile-responsive layout
- Vietnamese language support
```

### Feature Implementation Prompt

```
Implement a quiz shuffle system that:
- Uses Fisher-Yates algorithm for true randomness
- Caches shuffled options per question
- Maintains consistency during session
- Handles edge cases gracefully
```

📝 **[See All AI Prompts →](docs/AI_PROMPTS.md)**

---

## 📁 Repository Structure

```
myhsb.netlify.app/
├── README.md              # This file
├── LICENSE                # MIT License
├── docs/
│   ├── LEARNING_GUIDE.md  # How to learn from this project
│   ├── ARCHITECTURE.md    # System design documentation
│   ├── AI_PROMPTS.md      # Collection of AI prompts used
│   └── FEATURES.md        # Detailed feature documentation
├── examples/
│   ├── ai-integration/    # AI API integration patterns
│   ├── quiz-logic/        # Quiz engine code samples
│   └── theme-system/      # Dark/light mode implementation
└── assets/
    └── screenshots/       # Application screenshots
```

---

## 🚀 Getting Started

### For Learners

1. **Explore the Live Demo**
   - Visit [hsb2005.netlify.app](https://hsb2005.netlify.app)
   - Try all three modes: Practice, Exam, AI Chat
   - Notice the UI/UX details

2. **Study the Documentation**
   - Start with [LEARNING_GUIDE.md](docs/LEARNING_GUIDE.md)
   - Review the [ARCHITECTURE.md](docs/ARCHITECTURE.md)
   - Try the prompts in [AI_PROMPTS.md](docs/AI_PROMPTS.md)

3. **Experiment with Examples**
   - Check the `examples/` folder
   - Try modifying the code snippets
   - Build your own variations

### For Educators

- Use this as a case study for AI-assisted development
- Adapt the quiz format for your subject
- Reference the architecture for your projects

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

- 📝 **Documentation** - Improve explanations, add translations
- 💡 **Examples** - Add more code samples
- 🐛 **Issues** - Report documentation errors
- ⭐ **Star** - Show your support!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Author

**NGÔ TRUNG KIÊN**
- 📧 Email: kiennt@hsb.edu.vn
- 🏫 School: Đại học Hoa Sen (HSB)
- 📱 Faculty: Information Technology

---

<div align="center">

**🌟 If you find this helpful, please give it a Star! ⭐**

**📚 Happy Learning! 🎓**

Made with ❤️ for students

</div>
