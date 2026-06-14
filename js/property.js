/* ==========================================
   CALCULATOR360 PRO
   PROPERTY.JS
   Indian Land & Real Estate Calculator
========================================== */

"use strict";

/* ==========================================
   LAND UNIT CONVERSION TABLE
   Base Unit = Square Feet
========================================== */

const LAND_UNITS = {

    sqft: 1,

    sqm: 0.092903,

    sqyd: 0.111111,

    acre: 0.0000229568,

    hectare: 0.0000092903,

    guntha: 0.000918274,

    cent: 0.00229568,

    gaj: 0.111111,

    bigha: 0.000330579,

    kanal: 0.000050505,

    marla: 0.00183655

};

/* ==========================================
   UNIT LABELS
========================================== */

const LAND_LABELS = {

    sqft: "Square Feet",

    sqm: "Square Meter",

    sqyd: "Square Yard",

    acre: "Acre",

    hectare: "Hectare",

    guntha: "Guntha",

    cent: "Cent",

    gaj: "Gaj",

    bigha: "Bigha",

    kanal: "Kanal",

    marla: "Marla"

};

/* ==========================================
   FORMAT CURRENCY
========================================== */

function formatINR(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);

}

/* ==========================================
   LAND CONVERTER
========================================== */

function convertLandUnit() {

    const value =
        parseFloat(
            document.getElementById("landValue")?.value || 0
        );

    const from =
        document.getElementById("landFrom")?.value;

    const resultContainer =
        document.getElementById("landResults");

    if (!resultContainer) return;

    const sqft =
        value / LAND_UNITS[from];

    let html = "";

    Object.entries(LAND_UNITS).forEach(
        ([unit, factor]) => {

            if (unit === from) return;

            const converted =
                sqft * factor;

            html += `
                <div class="result-card">
                    <div class="label">
                        ${LAND_LABELS[unit]}
                    </div>

                    <div class="value">
                        ${converted.toFixed(4)}
                    </div>
                </div>
            `;
        }
    );

    resultContainer.innerHTML = html;

}

/* ==========================================
   PROPERTY VALUE CALCULATOR
========================================== */

function calculatePropertyValue() {

    const area =
        parseFloat(
            document.getElementById("propertyArea")?.value || 0
        );

    const rate =
        parseFloat(
            document.getElementById("propertyRate")?.value || 0
        );

    const total =
        area * rate;

    document.getElementById(
        "propertyValueResult"
    ).innerText =
        formatINR(total);

}

/* ==========================================
   STAMP DUTY CALCULATOR
========================================== */

function calculateStampDuty() {

    const propertyValue =
        parseFloat(
            document.getElementById("stampPropertyValue")?.value || 0
        );

    const dutyRate =
        parseFloat(
            document.getElementById("stampRate")?.value || 0
        );

    const registrationFee =
        parseFloat(
            document.getElementById("registrationFee")?.value || 0
        );

    const duty =
        propertyValue *
        dutyRate /
        100;

    const total =
        duty +
        registrationFee;

    document.getElementById(
        "stampDutyResult"
    ).innerText =
        formatINR(duty);

    document.getElementById(
        "stampTotalResult"
    ).innerText =
        formatINR(total);

}

/* ==========================================
   RENTAL YIELD CALCULATOR
========================================== */

function calculateRentalYield() {

    const propertyPrice =
        parseFloat(
            document.getElementById("rentalPropertyPrice")?.value || 0
        );

    const monthlyRent =
        parseFloat(
            document.getElementById("monthlyRent")?.value || 0
        );

    const annualRent =
        monthlyRent * 12;

    const yieldPercent =
        (
            annualRent /
            propertyPrice
        ) * 100;

    document.getElementById(
        "rentalYieldResult"
    ).innerText =
        yieldPercent.toFixed(2) + "%";

}

/* ==========================================
   HOME LOAN ELIGIBILITY
========================================== */

function calculateLoanEligibility() {

    const income =
        parseFloat(
            document.getElementById("monthlyIncome")?.value || 0
        );

    const obligations =
        parseFloat(
            document.getElementById("monthlyObligation")?.value || 0
        );

    const netIncome =
        income - obligations;

    const eligibleLoan =
        netIncome * 60 * 60;

    document.getElementById(
        "loanEligibilityResult"
    ).innerText =
        formatINR(eligibleLoan);

}

/* ==========================================
   CONSTRUCTION COST
========================================== */

function calculateConstructionCost() {

    const area =
        parseFloat(
            document.getElementById("constructionArea")?.value || 0
        );

    const costPerSqft =
        parseFloat(
            document.getElementById("constructionRate")?.value || 0
        );

    const total =
        area * costPerSqft;

    document.getElementById(
        "constructionCostResult"
    ).innerText =
        formatINR(total);

}

/* ==========================================
   POPULATE UNIT DROPDOWN
========================================== */

function populateLandUnits() {

    const select =
        document.getElementById("landFrom");

    if (!select) return;

    select.innerHTML = "";

    Object.entries(
        LAND_LABELS
    ).forEach(
        ([key, value]) => {

            const option =
                document.createElement("option");

            option.value = key;

            option.textContent = value;

            select.appendChild(option);

        }
    );

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        populateLandUnits();

        const input =
            document.getElementById("landValue");

        const select =
            document.getElementById("landFrom");

        if (input)
            input.addEventListener(
                "input",
                convertLandUnit
            );

        if (select)
            select.addEventListener(
                "change",
                convertLandUnit
            );

        convertLandUnit();

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.convertLandUnit =
    convertLandUnit;

window.calculatePropertyValue =
    calculatePropertyValue;

window.calculateStampDuty =
    calculateStampDuty;

window.calculateRentalYield =
    calculateRentalYield;

window.calculateLoanEligibility =
    calculateLoanEligibility;

window.calculateConstructionCost =
    calculateConstructionCost;
