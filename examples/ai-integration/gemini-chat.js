/**
 * Basic Google Gemini AI Chat Integration
 * 
 * This example shows how to integrate Google Gemini AI
 * into a web application for chat functionality.
 */

// ===========================================
// Configuration
// ===========================================

const GEMINI_CONFIG = {
    model: 'gemini-pro',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    temperature: 0.7,
    maxTokens: 1024
};

// System prompt to set AI behavior
const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên về Công nghệ Thông tin.
- Trả lời bằng tiếng Việt
- Giải thích dễ hiểu cho sinh viên
- Sử dụng ví dụ thực tế khi có thể
- Format response với markdown khi phù hợp`;

// ===========================================
// API Key Management
// ===========================================

/**
 * Load API key from localStorage or prompt user
 * @returns {string|null} API key or null if not available
 */
function getApiKey() {
    // Try localStorage first
    let apiKey = localStorage.getItem('gemini_api_key');

    if (!apiKey) {
        // Prompt user for API key
        apiKey = prompt(
            '🔑 Nhập Gemini API Key:\n\n' +
            '• Truy cập: https://aistudio.google.com/app/apikey\n' +
            '• Tạo API key mới\n' +
            '• Paste vào đây'
        );

        if (apiKey && apiKey.trim()) {
            // Save for future use
            localStorage.setItem('gemini_api_key', apiKey.trim());
        }
    }

    return apiKey;
}

/**
 * Clear stored API key
 */
function clearApiKey() {
    localStorage.removeItem('gemini_api_key');
    console.log('🔑 API key cleared');
}

// ===========================================
// Chat Functionality
// ===========================================

/**
 * Send a message to Gemini AI and get response
 * @param {string} message - User's message
 * @param {string} context - Optional context (e.g., current question)
 * @returns {Promise<string>} AI response
 */
async function sendMessage(message, context = '') {
    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error('API key not configured');
    }

    // Build the prompt with context
    const fullPrompt = context
        ? `${SYSTEM_PROMPT}\n\nContext: ${context}\n\nUser: ${message}`
        : `${SYSTEM_PROMPT}\n\nUser: ${message}`;

    // Make API request
    const response = await fetch(
        `${GEMINI_CONFIG.apiEndpoint}/${GEMINI_CONFIG.model}:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: GEMINI_CONFIG.temperature,
                    maxOutputTokens: GEMINI_CONFIG.maxTokens
                }
            })
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();

    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('No response from AI');
    }

    return text;
}

// ===========================================
// UI Integration
// ===========================================

/**
 * Add message to chat UI
 * @param {string} content - Message content
 * @param {string} role - 'user' or 'assistant'
 */
function addMessageToUI(content, role) {
    const messagesContainer = document.getElementById('chat-messages');

    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}`;
    messageEl.innerHTML = formatMarkdown(content);

    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show loading indicator
 */
function showLoading() {
    const messagesContainer = document.getElementById('chat-messages');

    const loadingEl = document.createElement('div');
    loadingEl.className = 'message assistant loading';
    loadingEl.id = 'loading-indicator';
    loadingEl.innerHTML = `
        <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    messagesContainer.appendChild(loadingEl);
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    const loading = document.getElementById('loading-indicator');
    if (loading) {
        loading.remove();
    }
}

/**
 * Simple markdown formatter
 * @param {string} text - Text with markdown
 * @returns {string} HTML
 */
function formatMarkdown(text) {
    return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Line breaks
        .replace(/\n/g, '<br>');
}

// ===========================================
// Event Handlers
// ===========================================

/**
 * Handle send button click
 */
async function handleSend() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Clear input
    input.value = '';

    // Add user message
    addMessageToUI(message, 'user');

    // Show loading
    showLoading();

    try {
        // Get AI response
        const response = await sendMessage(message);

        // Hide loading and show response
        hideLoading();
        addMessageToUI(response, 'assistant');

    } catch (error) {
        hideLoading();
        addMessageToUI(`❌ Error: ${error.message}`, 'assistant');
        console.error('Chat error:', error);
    }
}

// ===========================================
// Initialization
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');

    sendBtn.addEventListener('click', handleSend);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    console.log('🤖 AI Chat initialized');
});

// ===========================================
// Export for module use
// ===========================================

export { sendMessage, getApiKey, clearApiKey };
