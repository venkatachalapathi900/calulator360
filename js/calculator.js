/* ==========================================
   CALCULATOR360 PRO
   CALCULATOR.JS
   Standard Calculator + History
========================================== */

"use strict";

/* ==========================================
   STATE
========================================== */

let currentInput = "0";
let expression = "";
let history = [];

/* ==========================================
   ELEMENTS
========================================== */

const calcDisplay = () =>
    document.getElementById(
        "calculatorDisplay"
    );

const calcExpression = () =>
    document.getElementById(
        "calculatorExpression"
    );

const historyContainer = () =>
    document.getElementById(
        "calculatorHistory"
    );

/* ==========================================
   DISPLAY UPDATE
========================================== */

function updateCalculatorDisplay() {

    const display =
        calcDisplay();

    if (display) {
        display.value =
            currentInput;
    }

    const expr =
        calcExpression();

    if (expr) {
        expr.innerText =
            expression;
    }

}

/* ==========================================
   NUMBER INPUT
========================================== */

function calcNumber(num) {

    if (
        currentInput === "0"
    ) {

        currentInput =
            num.toString();

    } else {

        currentInput +=
            num.toString();

    }

    updateCalculatorDisplay();

}

/* ==========================================
   DECIMAL
========================================== */

function calcDecimal() {

    if (
        !currentInput.includes(".")
    ) {

        currentInput += ".";

    }

    updateCalculatorDisplay();

}

/* ==========================================
   OPERATOR
========================================== */

function calcOperator(op) {

    expression +=
        currentInput +
        " " +
        op +
        " ";

    currentInput = "0";

    updateCalculatorDisplay();

}

/* ==========================================
   CLEAR
========================================== */

function calcClear() {

    currentInput = "0";
    expression = "";

    updateCalculatorDisplay();

}

/* ==========================================
   BACKSPACE
========================================== */

function calcDelete() {

    currentInput =
        currentInput.slice(
            0,
            -1
        );

    if (
        currentInput.length === 0
    ) {

        currentInput = "0";

    }

    updateCalculatorDisplay();

}

/* ==========================================
   TOGGLE SIGN
========================================== */

function calcToggleSign() {

    if (
        currentInput.startsWith("-")
    ) {

        currentInput =
            currentInput.substring(
                1
            );

    } else {

        currentInput =
            "-" +
            currentInput;

    }

    updateCalculatorDisplay();

}

/* ==========================================
   PERCENT
========================================== */

function calcPercent() {

    currentInput =
        (
            parseFloat(
                currentInput
            ) / 100
        ).toString();

    updateCalculatorDisplay();

}

/* ==========================================
   EVALUATE
========================================== */

function calcEquals() {

    try {

        const fullExpression =
            expression +
            currentInput;

        const result =
            Function(
                `"use strict";
                return (${fullExpression})`
            )();

        saveHistory(
            fullExpression,
            result
        );

        currentInput =
            Number(
                result.toFixed(12)
            ).toString();

        expression = "";

        updateCalculatorDisplay();

    } catch {

        currentInput = "Error";

        updateCalculatorDisplay();

        setTimeout(
            () => {
                calcClear();
            },
            1500
        );

    }

}

/* ==========================================
   HISTORY
========================================== */

function saveHistory(
    expression,
    result
) {

    history.unshift({
        expression,
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

/* ==========================================
   LOAD HISTORY
========================================== */

function loadHistory() {

    const stored =
        localStorage.getItem(
            "calcHistory"
        );

    if (stored) {

        history =
            JSON.parse(stored);

        renderHistory();

    }

}

/* ==========================================
   RENDER HISTORY
========================================== */

function renderHistory() {

    const container =
        historyContainer();

    if (!container)
        return;

    if (
        history.length === 0
    ) {

        container.innerHTML =
            `<p>No history yet</p>`;

        return;

    }

    container.innerHTML =
        history
            .map(
                item => `
                <div class="history-item"
                     onclick="useHistory('${item.result}')">

                    <div class="history-expression">
                        ${item.expression}
                    </div>

                    <div class="history-result">
                        = ${item.result}
                    </div>

                </div>
            `
            )
            .join("");

}

/* ==========================================
   USE HISTORY VALUE
========================================== */

function useHistory(
    value
) {

    currentInput =
        value.toString();

    updateCalculatorDisplay();

}

/* ==========================================
   CLEAR HISTORY
========================================== */

function clearHistory() {

    history = [];

    localStorage.removeItem(
        "calcHistory"
    );

    renderHistory();

}

/* ==========================================
   COPY RESULT
========================================== */

function copyResult() {

    navigator.clipboard
        .writeText(
            currentInput
        )
        .then(() => {

            console.log(
                "Copied"
            );

        });

}

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;

        if (
            /^[0-9]$/.test(key)
        ) {

            calcNumber(key);

        }

        if (
            key === "."
        ) {

            calcDecimal();

        }

        if (
            [
                "+",
                "-",
                "*",
                "/"
            ].includes(key)
        ) {

            calcOperator(key);

        }

        if (
            key === "Enter"
        ) {

            event.preventDefault();

            calcEquals();

        }

        if (
            key === "Backspace"
        ) {

            calcDelete();

        }

        if (
            key === "Escape"
        ) {

            calcClear();

        }

    }
);

/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadHistory();

        updateCalculatorDisplay();

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.calcNumber =
    calcNumber;

window.calcDecimal =
    calcDecimal;

window.calcOperator =
    calcOperator;

window.calcClear =
    calcClear;

window.calcDelete =
    calcDelete;

window.calcToggleSign =
    calcToggleSign;

window.calcPercent =
    calcPercent;

window.calcEquals =
    calcEquals;

window.clearHistory =
    clearHistory;

window.copyResult =
    copyResult;

window.useHistory =
    useHistory;
