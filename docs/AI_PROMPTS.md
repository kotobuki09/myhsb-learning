# 🤖 AI Prompts Collection

> A curated collection of effective prompts used to develop the HSB Quiz application

---

## 📋 Table of Contents

1. [UI/UX Design Prompts](#-uiux-design-prompts)
2. [Code Generation Prompts](#-code-generation-prompts)
3. [Debugging Prompts](#-debugging-prompts)
4. [Documentation Prompts](#-documentation-prompts)
5. [Optimization Prompts](#-optimization-prompts)

---

## 🎨 UI/UX Design Prompts

### Main Interface Design

```
Design a modern quiz learning platform interface with:

VISUAL STYLE:
- Glassmorphism design with subtle blur effects
- Clean, minimalist layout
- Smooth micro-animations for interactions
- Professional color palette (blue primary, green success, red error)

FEATURES:
- Mode selection cards (Practice, Exam, AI Chat)
- Question display with progress indicator
- Timer for exam mode
- Floating AI assistant button

RESPONSIVENESS:
- Mobile-first approach
- Hamburger menu for mobile
- Grid layout for desktop

ACCESSIBILITY:
- High contrast text
- Focus indicators
- Screen reader friendly
```

### Dark Mode Implementation

```
Implement a dark/light theme system with:

REQUIREMENTS:
1. Auto-detect system preference using prefers-color-scheme
2. Allow manual toggle override
3. Persist user preference in localStorage
4. Smooth transition between themes (0.6s ease)

CSS VARIABLES TO USE:
- --bg-primary, --bg-secondary, --bg-tertiary
- --text-primary, --text-secondary, --text-muted
- --border-color
- --shadow-sm, --shadow-md, --shadow-lg

IMPLEMENTATION APPROACH:
- Use CSS custom properties
- Toggle body class for manual override
- Store preference as 'theme' in localStorage
```

### Card Component Design

```
Create a selection card component with:

APPEARANCE:
- Rounded corners (10px)
- Subtle shadow on hover
- Icon + title + description layout
- Border highlight when selected

INTERACTIONS:
- Hover: lift effect (translateY -6px)
- Click: immediate visual feedback
- Selected state: primary color border

ANIMATION:
- Radial gradient overlay on hover
- 0.3s transition for all properties
```

---

## 💻 Code Generation Prompts

### Quiz Engine

```
Create a quiz engine in JavaScript that:

CORE FEATURES:
1. Load questions from JSON file
2. Shuffle questions using Fisher-Yates algorithm
3. Track user selections
4. Calculate score with correct/incorrect counts
5. Support multiple choice (4 options)

STATE MANAGEMENT:
- currentIndex: current question number
- shuffledQuestions: array of questions
- selections: array of user answers
- isSubmitted: boolean flag

FUNCTIONS NEEDED:
- loadQuestions() - async fetch from JSON
- shuffle(array) - Fisher-Yates implementation
- selectAnswer(index, answer) - record selection
- calculateScore() - return {correct, total, percentage}
- reset() - clear all state

ERROR HANDLING:
- Fallback data if JSON fails to load
- Graceful handling of missing fields
```

### Timer System

```
Implement a countdown timer for quiz mode:

REQUIREMENTS:
1. Configurable duration (15, 30, 45 minutes)
2. Display format: MM:SS
3. Visual warnings at 5 min, 1 min remaining
4. Auto-submit when time runs out
5. Pause capability (optional)

IMPLEMENTATION:
- Use setInterval with 1 second updates
- Store timeLeft in seconds
- Clear interval on submit or pause
- Add CSS class for warning states

WARNING STATES:
- warning: time < 5 minutes (yellow glow)
- critical: time < 1 minute (red glow, pulse animation)
```

### Local Storage Manager

```
Create a state persistence system with:

FEATURES:
1. Auto-save progress every 500ms (debounced)
2. Restore progress on page load
3. Clear progress after submission
4. Expire saved state after 24 hours

DATA TO PERSIST:
{
    currentMode: string,
    currentIndex: number,
    shuffledQuestions: array,
    selections: array,
    timeLeft: number,
    timestamp: number
}

FUNCTIONS:
- saveProgress() - store current state
- loadProgress() - retrieve and validate state
- clearProgress() - remove from storage
- restoreState(state) - apply loaded state to app
```

### AI Integration

```
Integrate Google Gemini API for chat feature:

REQUIREMENTS:
1. Secure API key storage (localStorage)
2. Context-aware responses (include current question)
3. Markdown formatting support
4. Loading state animation
5. Error handling with user-friendly messages

API CONFIGURATION:
- Model: gemini-pro
- Temperature: 0.7
- Max tokens: 1024
- System prompt: "You are a helpful IT tutor..."

UI ELEMENTS:
- Floating chat button (bottom-right)
- Slide-up chat panel
- Message bubbles (user/assistant)
- Input field with send button
- Quick suggestion buttons
```

---

## 🐛 Debugging Prompts

### General Debug Template

```
I'm experiencing a bug in my JavaScript quiz application:

EXPECTED BEHAVIOR:
[What should happen]

ACTUAL BEHAVIOR:
[What actually happens]

REPRODUCTION STEPS:
1. [Step 1]
2. [Step 2]
3. [Error occurs]

ERROR MESSAGES:
```
[Console errors here]
```

RELEVANT CODE:
```javascript
[Paste relevant code]
```

ENVIRONMENT:
- Browser: Chrome 120
- Device: Desktop
- OS: Windows 11

WHAT I'VE TRIED:
- [Debugging attempt 1]
- [Debugging attempt 2]
```

### JSON Loading Issue

```
My quiz app fails to load questions.json on Netlify:

SYMPTOMS:
- Works locally with Live Server
- Fails on Netlify production
- Console shows: "NetworkError when attempting to fetch resource"

CURRENT CODE:
```javascript
const response = await fetch('./questions.json');
```

QUESTIONS:
1. Is this a CORS issue?
2. Should I use absolute paths?
3. Do I need Netlify configuration?

Please provide:
- Root cause analysis
- Multiple solution options
- Best practice recommendation
```

### State Restoration Bug

```
Quiz state restoration isn't working correctly:

BUG:
When user refreshes page, the restored question shows
different options than what was originally displayed.

INVESTIGATION:
- Options are shuffled each time
- Need to cache shuffled options
- Current shuffle happens on every render

CODE:
```javascript
function displayQuestion(index) {
    const question = shuffledQuestions[index];
    const options = shuffle([...question.options]); // Bug here
    // render options...
}
```

EXPECTED FIX:
Cache shuffled options per question ID so they
remain consistent across page refreshes.
```

---

## 📝 Documentation Prompts

### README Generation

```
Create a comprehensive README.md for a quiz application:

PROJECT DETAILS:
- Name: Quiz HSB2005
- Purpose: IT learning platform for students
- Tech: HTML, CSS, JavaScript, Gemini API
- Features: 3 modes, 400+ questions, AI assistant

SECTIONS TO INCLUDE:
1. Badge strip (language, browser support, responsive)
2. Feature list with emojis
3. Installation instructions (3 methods)
4. Usage guide with screenshots
5. AI configuration steps
6. Troubleshooting common issues
7. Author info and license

STYLE:
- Vietnamese language
- Professional but friendly tone
- Lots of emojis for visual appeal
- Code blocks for commands
```

### Code Comments

```
Add comprehensive JSDoc comments to this function:

```javascript
async function loadQuestions() {
    const jsonPaths = ['./questions.json', '/questions.json'];
    let loadSuccess = false;
    
    for (const path of jsonPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            quizData = await response.json();
            loadSuccess = true;
            break;
        } catch (error) {
            continue;
        }
    }
    
    if (!loadSuccess) {
        quizData = getFallbackData();
    }
}
```

COMMENT STYLE:
- JSDoc format
- @description for function purpose
- @returns for return value
- @throws for errors
- Inline comments for complex logic
```

---

## ⚡ Optimization Prompts

### Performance Review

```
Review this code for performance issues:

```javascript
function updateProgressBar() {
    const progress = (currentIndex / shuffledQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = 
        `${currentIndex + 1}/${shuffledQuestions.length}`;
    saveProgress(); // Called on every update
}
```

CONCERNS:
1. DOM queries on every call
2. saveProgress() too frequent
3. String concatenation vs template literals

PLEASE PROVIDE:
- Identified issues
- Optimized version
- Explanation of improvements
```

### Bundle Size Reduction

```
Suggest ways to reduce the bundle size of this quiz app:

CURRENT STATE:
- index.html: 245KB (inline styles + scripts)
- questions.json: 314KB
- app.js: 104KB

CONSTRAINTS:
- Must work offline (PWA)
- No build tools (vanilla JS only)
- Keep all 400+ questions

REQUEST:
1. Strategies to reduce HTML size
2. JSON compression options
3. Code splitting possibilities
4. Lazy loading opportunities
```

### CSS Optimization

```
Optimize this CSS for better performance:

```css
.quiz-option {
    background: var(--bg-primary);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.quiz-option:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

ISSUES TO ADDRESS:
1. "transition: all" is expensive
2. Box-shadow on hover causes repaint
3. Transform might trigger layout

PROVIDE:
- Optimized CSS
- Explanation of changes
- Performance impact
```

---

## 🎓 Tips for Effective Prompting

### Do's ✅

- Be specific about requirements
- Provide context and constraints
- Include example inputs/outputs
- Ask for explanations, not just code
- Iterate on responses

### Don'ts ❌

- Don't be vague ("make it better")
- Don't skip error handling requirements
- Don't forget edge cases
- Don't accept first response blindly
- Don't ignore security concerns

---

<div align="center">

**[← Architecture](ARCHITECTURE.md)** | **[Features →](FEATURES.md)**

</div>
