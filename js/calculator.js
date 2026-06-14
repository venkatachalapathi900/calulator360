/* ==========================================
   CALCULATOR360 PRO
   CALCULATOR.JS
   Standard Calculator Engine
   Production Ready
========================================== */

let currentValue = "0";
let expression = "";
let history = JSON.parse(
    localStorage.getItem(
        "calcHistory"
    ) || "[]"
);

let justCalculated = false;

/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDisplay();
        renderHistory();

    }
);

/* ==========================================
   DISPLAY
========================================== */

function updateDisplay() {

    const expr =
        document.getElementById(
            "std-expression"
        );

    const result =
        document.getElementById(
            "std-result"
        );

    if (expr)
        expr.textContent =
            expression;

    if (result)
        result.textContent =
            currentValue;
}

/* ==========================================
   NUMBERS
========================================== */

function inputNumber(num) {

    if (justCalculated) {

        currentValue = num;
        expression = "";
        justCalculated = false;

    } else {

        if (
            currentValue === "0"
        ) {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }

    updateDisplay();
}

/* ==========================================
   DECIMAL
========================================== */

function inputDecimal() {

    if (
        !currentValue.includes(".")
    ) {

        currentValue += ".";

        updateDisplay();
    }
}

/* ==========================================
   OPERATOR
========================================== */

function inputOperator(op) {

    expression +=
        currentValue +
        " " +
        op +
        " ";

    currentValue = "0";

    justCalculated = false;

    updateDisplay();
}

/* ==========================================
   CLEAR
========================================== */

function clearCalculator() {

    currentValue = "0";
    expression = "";
    justCalculated = false;

    updateDisplay();
}

/* ==========================================
   DELETE
========================================== */

function deleteLast() {

    if (
        currentValue.length > 1
    ) {

        currentValue =
            currentValue.slice(
                0,
                -1
            );

    } else {

        currentValue = "0";
    }

    updateDisplay();
}

/* ==========================================
   NEGATIVE
========================================== */

function toggleSign() {

    if (
        currentValue.startsWith("-")
    ) {

        currentValue =
            currentValue.substring(
                1
            );

    } else {

        currentValue =
            "-" + currentValue;
    }

    updateDisplay();
}

/* ==========================================
   PERCENTAGE
========================================== */

function percentage() {

    const value =
        parseFloat(
            currentValue
        );

    currentValue =
        (
            value / 100
        ).toString();

    updateDisplay();
}

/* ==========================================
   CALCULATE
========================================== */

function calculate() {

    try {

        const finalExpression =
            expression +
            currentValue;

        const safeExpression =
            finalExpression
                .replace(
                    /×/g,
                    "*"
                )
                .replace(
                    /÷/g,
                    "/"
                );

        const result =
            Function(
                `"use strict";return (${safeExpression})`
            )();

        addHistory(
            finalExpression,
            result
        );

        currentValue =
            parseFloat(
                Number(result)
                    .toFixed(12)
            ).toString();

        expression =
            finalExpression + " =";

        justCalculated = true;

        updateDisplay();

    } catch (e) {

        currentValue =
            "Error";

        updateDisplay();
    }
}

/* ==========================================
   HISTORY
========================================== */

function addHistory(
    expr,
    result
) {

    history.unshift({
        expression: expr,
        result
    });

    if (
        history.length > 50
    ) {
        history.pop();
    }

    localStorage.setItem(
        "calcHistory",
        JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory() {

    const container =
        document.getElementById(
            "calc-history"
        );

    if (!container) return;

    if (
        history.length === 0
    ) {

        container.innerHTML =
            `
            <div class="history-empty">
                No History
            </div>
        `;

        return;
    }

    container.innerHTML =
        history
            .map(
                item => `
            <div
                class="history-item"
                onclick="loadHistory('${item.result}')"
            >
                <div class="history-expression">
                    ${item.expression}
                </div>

                <div class="history-result">
                    ${item.result}
                </div>
            </div>
        `
            )
            .join("");
}

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "calcHistory"
    );

    renderHistory();
}

function loadHistory(
    result
) {

    currentValue =
        result.toString();

    expression = "";

    updateDisplay();
}

/* ==========================================
   COPY RESULT
========================================== */

function copyResult() {

    navigator.clipboard.writeText(
        currentValue
    );

    showToast(
        "Copied"
    );
}

/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    let toast =
        document.createElement(
            "div"
        );

    toast.className =
        "calc-toast";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    }, 2000);
}

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
    "keydown",
    e => {

        const key =
            e.key;

        if (
            /^[0-9]$/.test(key)
        ) {
            inputNumber(key);
        }

        if (
            key === "."
        ) {
            inputDecimal();
        }

        if (
            key === "+"
        ) {
            inputOperator("+");
        }

        if (
            key === "-"
        ) {
            inputOperator("-");
        }

        if (
            key === "*"
        ) {
            inputOperator("*");
        }

        if (
            key === "/"
        ) {

            e.preventDefault();

            inputOperator("/");
        }

        if (
            key === "Enter" ||
            key === "="
        ) {

            e.preventDefault();

            calculate();
        }

        if (
            key === "Backspace"
        ) {

            deleteLast();
        }

        if (
            key === "Escape"
        ) {

            clearCalculator();
        }

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.inputNumber =
    inputNumber;

window.inputDecimal =
    inputDecimal;

window.inputOperator =
    inputOperator;

window.clearCalculator =
    clearCalculator;

window.deleteLast =
    deleteLast;

window.toggleSign =
    toggleSign;

window.percentage =
    percentage;

window.calculate =
    calculate;

window.copyResult =
    copyResult;

window.clearHistory =
    clearHistory;

window.loadHistory =
    loadHistory;

console.log(
    "Calculator.js Loaded Successfully"
);