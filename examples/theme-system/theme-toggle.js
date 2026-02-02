/**
 * Theme Toggle System
 * 
 * Implements dark/light mode with:
 * - System preference detection
 * - Manual toggle
 * - Persistent preference storage
 * - Smooth transitions
 */

// ===========================================
// Configuration
// ===========================================

const THEME_STORAGE_KEY = 'preferred-theme';

// Theme modes
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
};

// ===========================================
// Theme Detection
// ===========================================

/**
 * Detect system color scheme preference
 * @returns {string} 'dark' or 'light'
 */
function getSystemTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEMES.DARK;
    }
    return THEMES.LIGHT;
}

/**
 * Get stored theme preference
 * @returns {string|null} Stored theme or null
 */
function getStoredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY);
}

/**
 * Get effective theme (considering system + preference)
 * @returns {string} 'dark' or 'light'
 */
function getEffectiveTheme() {
    const stored = getStoredTheme();

    if (stored === THEMES.AUTO || !stored) {
        return getSystemTheme();
    }

    return stored;
}

// ===========================================
// Theme Application
// ===========================================

/**
 * Apply theme to document
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
    const body = document.body;

    // Remove existing theme classes
    body.classList.remove('dark-mode', 'light-mode');

    // Add new theme class
    if (theme === THEMES.DARK) {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.content = theme === THEMES.DARK ? '#0f172a' : '#ffffff';
    }

    // Update toggle button icon
    updateToggleIcon(theme);

    console.log(`🎨 Theme applied: ${theme}`);
}

/**
 * Update toggle button icon based on current theme
 * @param {string} theme - Current theme
 */
function updateToggleIcon(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === THEMES.DARK ? '☀️' : '🌙';
        toggle.setAttribute('aria-label',
            theme === THEMES.DARK ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
}

// ===========================================
// Theme Toggling
// ===========================================

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const current = getEffectiveTheme();
    const newTheme = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    // Store preference
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    // Apply theme
    applyTheme(newTheme);
}

/**
 * Set specific theme
 * @param {string} theme - Theme to set
 */
function setTheme(theme) {
    if (theme === THEMES.AUTO) {
        localStorage.removeItem(THEME_STORAGE_KEY);
        applyTheme(getSystemTheme());
    } else {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        applyTheme(theme);
    }
}

// ===========================================
// System Preference Listener
// ===========================================

/**
 * Listen for system theme changes
 */
function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
        // Only respond if user hasn't set manual preference
        const stored = getStoredTheme();
        if (!stored || stored === THEMES.AUTO) {
            applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    });
}

// ===========================================
// Initialization
// ===========================================

/**
 * Initialize theme system
 */
function initTheme() {
    // Apply initial theme
    applyTheme(getEffectiveTheme());

    // Watch for system changes
    watchSystemTheme();

    // Set up toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }

    console.log('🎨 Theme system initialized');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// ===========================================
// Export
// ===========================================

export {
    THEMES,
    getEffectiveTheme,
    toggleTheme,
    setTheme,
    applyTheme
};
