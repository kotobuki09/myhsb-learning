/**
 * Fisher-Yates (Knuth) Shuffle Implementation
 * 
 * The most unbiased shuffle algorithm for arrays.
 * Time Complexity: O(n)
 * Space Complexity: O(1) for in-place, O(n) for copy
 */

// ===========================================
// Basic Implementation
// ===========================================

/**
 * Shuffle an array in-place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} The same array, shuffled
 */
function shuffleInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate random index from 0 to i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements using destructuring
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Shuffle returning a new array (non-mutating)
 * @param {Array} array - Original array
 * @returns {Array} New shuffled array
 */
function shuffleCopy(array) {
    const copy = [...array];
    return shuffleInPlace(copy);
}

// ===========================================
// Quiz-Specific Implementation
// ===========================================

/**
 * Shuffle questions for a quiz
 * Maintains question metadata while randomizing order
 * 
 * @param {Array} questions - Array of question objects
 * @param {number} count - Number of questions to return (optional)
 * @returns {Array} Shuffled questions
 */
function shuffleQuestions(questions, count = null) {
    // Create shallow copy to avoid mutating original
    const shuffled = [...questions];

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return subset if count specified
    if (count && count < shuffled.length) {
        return shuffled.slice(0, count);
    }

    return shuffled;
}

/**
 * Shuffle answer options for a question
 * Caches result to maintain consistency during session
 * 
 * @param {string} questionId - Unique question identifier
 * @param {Array} options - Array of answer options
 * @param {Object} cache - Cache object for storing shuffled options
 * @returns {Array} Shuffled options
 */
const optionsCache = {};

function shuffleOptions(questionId, options, cache = optionsCache) {
    // Return cached if exists
    if (cache[questionId]) {
        return cache[questionId];
    }

    // Shuffle and cache
    const shuffled = shuffleCopy(options);
    cache[questionId] = shuffled;

    return shuffled;
}

/**
 * Clear options cache (e.g., when starting new quiz)
 */
function clearOptionsCache() {
    Object.keys(optionsCache).forEach(key => {
        delete optionsCache[key];
    });
}

// ===========================================
// Advanced: Weighted Shuffle
// ===========================================

/**
 * Shuffle with weights (prioritize certain items)
 * Useful for showing harder questions first, or repeating missed questions
 * 
 * @param {Array} items - Array of items with 'weight' property
 * @returns {Array} Weighted shuffled array
 */
function weightedShuffle(items) {
    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);

    const result = [];
    const remaining = [...items];

    while (remaining.length > 0) {
        // Random number 0 to totalWeight
        let random = Math.random() * remaining.reduce((sum, item) => sum + (item.weight || 1), 0);

        // Find item at this weight
        for (let i = 0; i < remaining.length; i++) {
            random -= remaining[i].weight || 1;
            if (random <= 0) {
                result.push(remaining.splice(i, 1)[0]);
                break;
            }
        }
    }

    return result;
}

// ===========================================
// Filtering Before Shuffle
// ===========================================

/**
 * Filter questions by chapter, then shuffle
 * @param {Array} allQuestions - All questions
 * @param {string} chapter - Chapter filter ('all' or specific chapter)
 * @param {number} count - Number of questions
 * @returns {Array} Filtered and shuffled questions
 */
function getQuestionsByChapter(allQuestions, chapter, count) {
    let filtered = allQuestions;

    if (chapter !== 'all') {
        filtered = allQuestions.filter(q => q.chapter === chapter);
    }

    return shuffleQuestions(filtered, count);
}

/**
 * Filter questions by difficulty, then shuffle
 * @param {Array} allQuestions - All questions
 * @param {string} difficulty - Difficulty filter ('easy', 'medium', 'hard')
 * @param {number} count - Number of questions
 * @returns {Array} Filtered and shuffled questions
 */
function getQuestionsByDifficulty(allQuestions, difficulty, count) {
    const filtered = allQuestions.filter(q => q.difficulty === difficulty);
    return shuffleQuestions(filtered, count);
}

// ===========================================
// Usage Examples
// ===========================================

/*
// Example 1: Basic shuffle
const numbers = [1, 2, 3, 4, 5];
const shuffled = shuffleCopy(numbers);
console.log(shuffled); // e.g., [3, 1, 5, 2, 4]

// Example 2: Quiz questions
const questions = await fetch('questions.json').then(r => r.json());
const quizQuestions = shuffleQuestions(questions, 20);

// Example 3: Cached options
const question = quizQuestions[0];
const options = shuffleOptions(question.id, question.options);
// Calling again returns same order:
const sameOptions = shuffleOptions(question.id, question.options);

// Example 4: Filtered shuffle
const chapter1Questions = getQuestionsByChapter(questions, 'Chương 1', 10);
*/

// ===========================================
// Export
// ===========================================

export {
    shuffleInPlace,
    shuffleCopy,
    shuffleQuestions,
    shuffleOptions,
    clearOptionsCache,
    weightedShuffle,
    getQuestionsByChapter,
    getQuestionsByDifficulty
};
