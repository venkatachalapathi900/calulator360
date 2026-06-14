/* ==========================================
   CALCULATOR360 PRO
   SCIENTIFIC.JS
   Advanced Scientific Calculator
========================================== */

"use strict";

/* ==========================================
   DISPLAY
========================================== */

let scientificExpression = "";

const displayElement = () =>
    document.getElementById(
        "scientificDisplay"
    );

/* ==========================================
   UPDATE DISPLAY
========================================== */

function updateScientificDisplay() {

    const display =
        displayElement();

    if (!display) return;

    display.value =
        scientificExpression || "0";

}

/* ==========================================
   APPEND VALUE
========================================== */

function sciAppend(value) {

    scientificExpression += value;

    updateScientificDisplay();

}

/* ==========================================
   CLEAR
========================================== */

function sciClear() {

    scientificExpression = "";

    updateScientificDisplay();

}

/* ==========================================
   DELETE
========================================== */

function sciDelete() {

    scientificExpression =
        scientificExpression.slice(
            0,
            -1
        );

    updateScientificDisplay();

}

/* ==========================================
   FACTORIAL
========================================== */

function factorial(n) {

    if (n < 0) return NaN;

    if (n === 0) return 1;

    let result = 1;

    for (
        let i = 1;
        i <= n;
        i++
    ) {
        result *= i;
    }

    return result;

}

/* ==========================================
   DEG TO RAD
========================================== */

function degToRad(deg) {

    return (
        deg *
        Math.PI /
        180
    );

}

/* ==========================================
   SCIENTIFIC FUNCTIONS
========================================== */

function sciFunction(fn) {

    try {

        let current =
            parseFloat(
                scientificExpression
            );

        let result;

        switch (fn) {

            case "sin":
                result =
                    Math.sin(
                        degToRad(current)
                    );
                break;

            case "cos":
                result =
                    Math.cos(
                        degToRad(current)
                    );
                break;

            case "tan":
                result =
                    Math.tan(
                        degToRad(current)
                    );
                break;

            case "asin":
                result =
                    Math.asin(current) *
                    180 /
                    Math.PI;
                break;

            case "acos":
                result =
                    Math.acos(current) *
                    180 /
                    Math.PI;
                break;

            case "atan":
                result =
                    Math.atan(current) *
                    180 /
                    Math.PI;
                break;

            case "sqrt":
                result =
                    Math.sqrt(current);
                break;

            case "cbrt":
                result =
                    Math.cbrt(current);
                break;

            case "square":
                result =
                    Math.pow(
                        current,
                        2
                    );
                break;

            case "cube":
                result =
                    Math.pow(
                        current,
                        3
                    );
                break;

            case "inverse":
                result =
                    1 / current;
                break;

            case "log":
                result =
                    Math.log10(
                        current
                    );
                break;

            case "ln":
                result =
                    Math.log(
                        current
                    );
                break;

            case "exp":
                result =
                    Math.exp(
                        current
                    );
                break;

            case "factorial":
                result =
                    factorial(
                        current
                    );
                break;

            case "abs":
                result =
                    Math.abs(
                        current
                    );
                break;

            case "pi":
                result =
                    Math.PI;
                break;

            case "e":
                result =
                    Math.E;
                break;

            default:
                return;

        }

        scientificExpression =
            result.toString();

        updateScientificDisplay();

    } catch {

        scientificExpression =
            "Error";

        updateScientificDisplay();

    }

}

/* ==========================================
   POWER
========================================== */

function sciPower(power) {

    scientificExpression +=
        `**${power}`;

    updateScientificDisplay();

}

/* ==========================================
   EVALUATE
========================================== */

function sciCalculate() {

    try {

        let expression =
            scientificExpression;

        expression =
            expression
                .replace(/÷/g, "/")
                .replace(/×/g, "*")
                .replace(/\^/g, "**");

        const result =
            Function(
                `"use strict"; return (${expression})`
            )();

        scientificExpression =
            Number(
                result.toFixed(12)
            ).toString();

        updateScientificDisplay();

    } catch {

        scientificExpression =
            "Error";

        updateScientificDisplay();

    }

}

/* ==========================================
   PERCENTAGE
========================================== */

function sciPercent() {

    const num =
        parseFloat(
            scientificExpression
        );

    scientificExpression =
        (
            num / 100
        ).toString();

    updateScientificDisplay();

}

/* ==========================================
   PLUS MINUS
========================================== */

function sciToggleSign() {

    if (
        scientificExpression.startsWith(
            "-"
        )
    ) {

        scientificExpression =
            scientificExpression.substring(
                1
            );

    } else {

        scientificExpression =
            "-" +
            scientificExpression;

    }

    updateScientificDisplay();

}

/* ==========================================
   MEMORY FUNCTIONS
========================================== */

let memoryStore = 0;

function memoryAdd() {

    memoryStore +=
        parseFloat(
            scientificExpression || 0
        );

}

function memorySubtract() {

    memoryStore -=
        parseFloat(
            scientificExpression || 0
        );

}

function memoryRecall() {

    scientificExpression =
        memoryStore.toString();

    updateScientificDisplay();

}

function memoryClear() {

    memoryStore = 0;

}

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
    "keydown",
    e => {

        const key = e.key;

        if (
            /^[0-9.]$/.test(key)
        ) {

            sciAppend(key);

        }

        if (
            ["+","-","*","/"]
                .includes(key)
        ) {

            sciAppend(key);

        }

        if (
            key === "Enter"
        ) {

            e.preventDefault();

            sciCalculate();

        }

        if (
            key === "Backspace"
        ) {

            sciDelete();

        }

        if (
            key === "Escape"
        ) {

            sciClear();

        }

    }
);

/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateScientificDisplay();

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.sciAppend =
    sciAppend;

window.sciClear =
    sciClear;

window.sciDelete =
    sciDelete;

window.sciCalculate =
    sciCalculate;

window.sciFunction =
    sciFunction;

window.sciPower =
    sciPower;

window.sciPercent =
    sciPercent;

window.sciToggleSign =
    sciToggleSign;

window.memoryAdd =
    memoryAdd;

window.memorySubtract =
    memorySubtract;

window.memoryRecall =
    memoryRecall;

window.memoryClear =
    memoryClear;
