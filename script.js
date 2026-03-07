// ========================================
// QUANTUM CALCULATOR - JAVASCRIPT
// ========================================

const API_BASE = 'http://localhost:3000';

// DOM Elements
const numAInput = document.getElementById('numA');
const numBInput = document.getElementById('numB');
const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('historyList');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');
const clearBtn = document.getElementById('clearBtn');
const clearHistoryBtn = document.getElementById('clearHistory');

// Operation buttons
const operationButtons = document.querySelectorAll('.btn-operation');

// History array (stored in memory)
let calculationHistory = [];

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    setupEventListeners();
});

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Operation buttons
    operationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const operation = btn.dataset.op;
            handleOperation(operation);
        });
    });

    // Clear button
    clearBtn.addEventListener('click', clearAll);

    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Enter key support
    numAInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') numBInput.focus();
    });

    numBInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeBtn = document.querySelector('.btn-operation:focus-within');
            if (activeBtn) {
                activeBtn.click();
            }
        }
    });
}

// ========================================
// OPERATION HANDLER
// ========================================

async function handleOperation(operation) {
    const a = numAInput.value;
    const b = numBInput.value;

    // Special handling for random
    if (operation === 'random') {
        await performRandom();
        return;
    }

    // Validate inputs for other operations
    if (a === '' || b === '') {
        showToast('Please enter both numbers!', 'error');
        shakeInput();
        return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        showToast('Please enter valid numbers!', 'error');
        shakeInput();
        return;
    }

    // Check for division by zero
    if (operation === 'divide' && numB === 0) {
        showToast('Cannot divide by zero!', 'error');
        shakeInput();
        return;
    }

    // Show loading
    showLoading();

    try {
        const response = await fetch(`${API_BASE}/${operation}?a=${numA}&b=${numB}`);
        const data = await response.json();

        hideLoading();

        if (data.status === 'success') {
            displayResult(data.operation, numA, numB, data.result);
            addToHistory(data.operation, numA, numB, data.result);
            showToast(`${data.operation} completed!`, 'success');
        } else {
            showToast(data.message || 'An error occurred', 'error');
        }
    } catch (error) {
        hideLoading();
        showToast('Failed to connect to server!', 'error');
        console.error('Error:', error);
    }
}

// ========================================
// RANDOM NUMBER
// ========================================

async function performRandom() {
    showLoading();

    try {
        const response = await fetch(`${API_BASE}/random`);
        const data = await response.text();

        hideLoading();

        // Extract number from response
        const match = data.match(/(\d+)/);
        const randomNum = match ? parseInt(match[1]) : Math.floor(Math.random() * 100);

        displayResult('Random', '-', '-', randomNum);
        addToHistory('Random Number', '-', '-', randomNum);
        showToast('Random number generated!', 'success');
    } catch (error) {
        hideLoading();
        // Fallback to local random
        const randomNum = Math.floor(Math.random() * 100);
        displayResult('Random (Local)', '-', '-', randomNum);
        addToHistory('Random Number', '-', '-', randomNum);
        showToast('Random number generated (offline)!', 'success');
    }
}

// ========================================
// DISPLAY RESULTS
// ========================================

function displayResult(operation, a, b, result) {
    // Create expression string
    let expr = '';
    if (operation === 'Random' || operation === 'Random Number') {
        expr = 'Random Number';
    } else if (operation === 'Random (Local)') {
        expr = 'Random Number (Offline)';
    } else {
        const operator = getOperatorSymbol(operation);
        expr = `${a} ${operator} ${b}`;
    }

    // Update displays with animation
    expressionDisplay.style.opacity = '0';
    resultDisplay.style.opacity = '0';
    resultDisplay.style.transform = 'scale(0.5)';

    setTimeout(() => {
        expressionDisplay.textContent = expr;
        resultDisplay.textContent = formatResult(result);

        expressionDisplay.style.opacity = '1';
        resultDisplay.style.opacity = '1';
        resultDisplay.style.transform = 'scale(1)';
    }, 100);

    // Add animation class
    resultDisplay.classList.add('animate');
    setTimeout(() => resultDisplay.classList.remove('animate'), 500);
}

function formatResult(num) {
    // Check if result is a decimal
    if (num % 1 !== 0) {
        return parseFloat(num.toFixed(4));
    }
    return num;
}

function getOperatorSymbol(operation) {
    const operators = {
        'Addition': '+',
        'Subtraction': '−',
        'Multiplication': '×',
        'Division': '÷'
    };
    return operators[operation] || operation;
}

// ========================================
// HISTORY MANAGEMENT
// ========================================

function addToHistory(operation, a, b, result) {
    const historyItem = {
        operation,
        a,
        b,
        result,
        timestamp: new Date().toISOString()
    };

    calculationHistory.unshift(historyItem);

    // Keep only last 50 items
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }

    saveHistory();
    renderHistory();
}

function renderHistory() {
    if (calculationHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-empty">
                <i class="fas fa-calculator"></i>
                <p>No calculations yet</p>
            </div>
        `;
        return;
    }

    historyList.innerHTML = calculationHistory.map((item, index) => {
        let expr = '';
        if (item.operation === 'Random' || item.operation === 'Random Number') {
            expr = '🎲 Random';
        } else if (item.operation === 'Random (Local)') {
            expr = '🎲 Random (Offline)';
        } else {
            const operator = getOperatorSymbol(item.operation);
            expr = `${item.a} ${operator} ${item.b}`;
        }

        return `
            <div class="history-item" style="animation-delay: ${index * 0.05}s">
                <div class="history-operation">${item.operation}</div>
                <div class="history-expression">${expr}</div>
                <div class="history-result">= ${formatResult(item.result)}</div>
            </div>
        `;
    }).join('');
}

function clearHistory() {
    calculationHistory = [];
    localStorage.removeItem('calciHistory');
    renderHistory();
    showToast('History cleared!', 'success');
}

function saveHistory() {
    localStorage.setItem('calciHistory', JSON.stringify(calculationHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('calciHistory');
    if (saved) {
        try {
            calculationHistory = JSON.parse(saved);
            renderHistory();
        } catch (e) {
            calculationHistory = [];
        }
    }
}

// ========================================
// CLEAR ALL
// ========================================

function clearAll() {
    numAInput.value = '';
    numBInput.value = '';
    expressionDisplay.textContent = '';
    resultDisplay.textContent = '0';
    resultDisplay.style.opacity = '1';
    resultDisplay.style.transform = 'scale(1)';
    showToast('Calculator cleared!', 'success');
}

// ========================================
// LOADING OVERLAY
// ========================================

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// ANIMATIONS
// ========================================

function shakeInput() {
    const inputs = [numAInput, numBInput];
    inputs.forEach(input => {
        if (!input.value) {
            input.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    });
}

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to calculate
    if (e.ctrlKey && e.key === 'Enter') {
        const lastOp = operationButtons[0];
        if (lastOp) lastOp.click();
    }

    // Escape to clear
    if (e.key === 'Escape') {
        clearAll();
    }

    // Number keys for quick operations
    if (e.key === '1') numAInput.focus();
    if (e.key === '2') numBInput.focus();
});

