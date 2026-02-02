# ✨ Features Documentation

> Detailed documentation of all features in the HSB Quiz application

---

## 📋 Table of Contents

1. [Learning Modes](#-learning-modes)
2. [AI Assistant](#-ai-assistant)
3. [Quiz Engine](#-quiz-engine)
4. [Theme System](#-theme-system)
5. [Progress Tracking](#-progress-tracking)
6. [PWA Features](#-pwa-features)

---

## 📚 Learning Modes

### 🧠 Practice Mode

**Purpose**: Unlimited learning without time pressure

| Feature | Description |
|---------|-------------|
| Question Pool | All 400+ questions available |
| Chapter Filter | Select specific chapters to focus on |
| Immediate Feedback | See correct/incorrect after each answer |
| AI Assistance | Get explanations from AI |
| No Time Limit | Learn at your own pace |
| Progress Save | Resume where you left off |

**How It Works**:
1. Select "Practice" mode
2. Choose chapter or "All Chapters"
3. Questions load and shuffle automatically
4. Answer questions, get immediate feedback
5. Use AI assistant for explanations
6. Progress auto-saves every 500ms

### ⏰ Exam Mode

**Purpose**: Simulate real exam conditions

| Configuration | Questions | Time Limit |
|--------------|-----------|------------|
| Quick Test | 20 | 15 minutes |
| Standard | 40 | 30 minutes |
| Full Exam | 60 | 45 minutes |

**Features**:
- Countdown timer with visual warnings
- No answer feedback until submission
- Score calculation with percentage
- Detailed review of wrong answers
- Time taken tracking

**Warning States**:
- 🟡 Yellow glow: Less than 5 minutes
- 🔴 Red pulse: Less than 1 minute
- ⏰ Auto-submit when time runs out

### 💬 AI Chat Mode

**Purpose**: Free-form conversation with AI about IT topics

**Capabilities**:
- Ask any IT-related questions
- Get explanations for concepts
- Practice interview questions
- Explore topics in depth

**Quick Suggestions**:
- "Giải thích khái niệm RAM"
- "So sánh HDD và SSD"
- "Lập trình là gì?"
- "Mạng máy tính hoạt động như thế nào?"

---

## 🤖 AI Assistant

### Overview

The AI Assistant is powered by Google Gemini and provides:
- Contextual explanations during practice
- Answer clarifications
- Concept deep-dives
- Learning recommendations

### Integration Points

```
┌─────────────────────────────────────┐
│          AI Assistant               │
├─────────────────────────────────────┤
│  📍 Practice Mode                   │
│    → Explain current question       │
│    → Why answer is correct          │
│    → Related concepts               │
│                                     │
│  📍 AI Chat Mode                    │
│    → Free-form questions            │
│    → Topic exploration              │
│    → Study recommendations          │
└─────────────────────────────────────┘
```

### Features

| Feature | Description |
|---------|-------------|
| Context Awareness | Knows current question in practice mode |
| Markdown Support | Bold, lists, links formatted properly |
| Suggestion System | Smart quick-action buttons |
| Draggable Window | Resizable and movable chat panel |
| Persistent History | Chat history saved in session |

### API Configuration

1. Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click settings icon ⚙️ in AI panel
3. Paste API key
4. Key saved to localStorage

---

## 🎯 Quiz Engine

### Question Bank

**Statistics**:
- Total Questions: 400+
- Chapters: 11 + Hot Topics
- Difficulty Levels: Easy, Medium, Hard
- Question Type: Multiple Choice (4 options)

### Chapter Breakdown

| Chapter | Icon | Questions | Topics |
|---------|------|-----------|--------|
| Chương 1 | 📝 | 31 | Computer Basics |
| Chương 2 | 💾 | 36 | Data Representation |
| Chương 3 | 🖥️ | 31 | Input/Output Devices |
| Chương 4 | 🌐 | 27 | Software |
| Chương 5 | 🔒 | 39 | Networks & Security |
| Chương 6 | 📊 | 37 | Databases |
| Chương 7 | 🎨 | 27 | Multimedia |
| Chương 8 | 🎮 | 49 | Programming Basics |
| Chương 9 | 🤖 | 31 | AI & Machine Learning |
| Chương 10 | 🚀 | 38 | Future Technologies |
| Chương 11 | 🔢 | 31 | Number Systems |
| Hot Topics | 🔥 | 39 | Current Trends |

### Shuffle Algorithm

Uses Fisher-Yates (Knuth) shuffle for true randomness:

```javascript
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
```

### Option Caching

Options are shuffled once per question and cached:
- Ensures consistency during session
- Preserved on page refresh
- Cleared on new quiz start

---

## 🎨 Theme System

### Mode Detection

```
System Preference → Auto Apply
     ↓
Manual Toggle → Override
     ↓
LocalStorage → Persist Choice
```

### Color Schemes

#### Light Mode
| Variable | Value | Usage |
|----------|-------|-------|
| --bg-primary | #ffffff | Main background |
| --bg-secondary | #f8fafc | Card backgrounds |
| --text-primary | #0f172a | Main text |
| --text-muted | #475569 | Secondary text |

#### Dark Mode
| Variable | Value | Usage |
|----------|-------|-------|
| --bg-primary | #0f172a | Main background |
| --bg-secondary | #111c33 | Card backgrounds |
| --text-primary | #f8fafc | Main text |
| --text-muted | #cbd5f5 | Secondary text |

### Animated Background

Dark mode features animated gradient background:
```css
background: linear-gradient(-45deg, #0f172a, #192c53, #111c33, #233e7a);
background-size: 400% 400%;
animation: gradientBG 14s ease infinite;
```

---

## 💾 Progress Tracking

### Auto-Save System

**Trigger Events**:
- Answer selection
- Navigation (next/prev)
- Theme change
- Window blur (switching tabs)

**Debounce Protection**:
- Saves after 500ms of inactivity
- Prevents excessive writes
- Improves performance

### Saved Data

```json
{
    "currentMode": "practice",
    "selectedQuestionCount": null,
    "currentIndex": 15,
    "shuffledQuestions": [...],
    "selections": [0, 2, 1, null, 3, ...],
    "timeLeft": 1800,
    "isSubmitted": false,
    "quizStartTime": 1643723400000,
    "timestamp": 1643725200000
}
```

### Restoration Flow

1. Page loads
2. Check localStorage for saved state
3. Validate timestamp (< 24 hours old)
4. Restore state if valid
5. Show notification to user
6. Resume from last position

### Expiration

- States older than 24 hours are auto-deleted
- Prevents stale data issues
- User can manually clear anytime

---

## 📱 PWA Features

### Installation

The app can be installed as a Progressive Web App:

**Desktop (Chrome)**:
1. Visit the website
2. Click install icon in address bar
3. Confirm installation
4. App appears in Start menu

**Mobile**:
1. Open in browser
2. Tap "Add to Home Screen"
3. App icon appears on home screen

### Offline Support

Service Worker caches:
- HTML, CSS, JavaScript files
- Question data (JSON)
- Logo and icons
- Fonts

**Cache Strategy**: Cache-first with network fallback

### Manifest Configuration

```json
{
    "name": "Quiz HSB2005 - Hệ Thống Học Tập",
    "short_name": "Quiz HSB",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait",
    "theme_color": "#2563eb",
    "background_color": "#ffffff",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

---

## 📊 Results & Analytics

### Score Calculation

```
Score = (Correct Answers / Total Questions) × 100%
```

### Result Display

| Metric | Description |
|--------|-------------|
| Score | Percentage correct |
| Correct | Number of right answers |
| Incorrect | Number of wrong answers |
| Time | Duration taken |
| Review | Detailed wrong answer analysis |

### Review Feature

After exam submission, users can:
- See all questions with their answers
- Compare with correct answers
- Read explanations (pinpoint)
- Identify weak areas

---

<div align="center">

**[← AI Prompts](AI_PROMPTS.md)** | **[Back to README →](../README.md)**

</div>
