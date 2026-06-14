/* ==========================================
   CALCULATOR360 PRO
   DATE.JS
   Age • Date Difference • Add/Subtract Date
========================================== */

"use strict";

/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}

/* ==========================================
   AGE CALCULATOR
========================================== */

function calculateAge() {

    const dobInput =
        document.getElementById("dob");

    const result =
        document.getElementById("ageResult");

    if (!dobInput || !dobInput.value) {
        return;
    }

    const dob =
        new Date(dobInput.value);

    const today =
        new Date();

    let years =
        today.getFullYear() -
        dob.getFullYear();

    let months =
        today.getMonth() -
        dob.getMonth();

    let days =
        today.getDate() -
        dob.getDate();

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );

        days += previousMonth.getDate();

    }

    if (months < 0) {

        years--;

        months += 12;

    }

    const ageText =
        `${years} Years, ${months} Months, ${days} Days`;

    result.innerHTML = ageText;

}

/* ==========================================
   DATE DIFFERENCE
========================================== */

function calculateDateDifference() {

    const start =
        document.getElementById("startDate");

    const end =
        document.getElementById("endDate");

    const result =
        document.getElementById("dateDifferenceResult");

    if (
        !start.value ||
        !end.value
    ) {
        return;
    }

    const startDate =
        new Date(start.value);

    const endDate =
        new Date(end.value);

    const diff =
        Math.abs(
            endDate - startDate
        );

    const days =
        Math.floor(
            diff /
            (1000 * 60 * 60 * 24)
        );

    const weeks =
        (days / 7).toFixed(1);

    const months =
        (days / 30.44).toFixed(1);

    const years =
        (days / 365.25).toFixed(2);

    result.innerHTML = `
        <div>
            <strong>${days}</strong> Days
        </div>

        <div>
            <strong>${weeks}</strong> Weeks
        </div>

        <div>
            <strong>${months}</strong> Months
        </div>

        <div>
            <strong>${years}</strong> Years
        </div>
    `;

}

/* ==========================================
   ADD DAYS
========================================== */

function addDaysToDate() {

    const startDateInput =
        document.getElementById("addDate");

    const daysInput =
        document.getElementById("addDays");

    const result =
        document.getElementById("addDateResult");

    if (
        !startDateInput.value
    ) {
        return;
    }

    const date =
        new Date(
            startDateInput.value
        );

    const days =
        parseInt(
            daysInput.value || 0
        );

    date.setDate(
        date.getDate() + days
    );

    result.innerHTML =
        formatDate(date);

}

/* ==========================================
   SUBTRACT DAYS
========================================== */

function subtractDaysFromDate() {

    const startDateInput =
        document.getElementById("subtractDate");

    const daysInput =
        document.getElementById("subtractDays");

    const result =
        document.getElementById("subtractDateResult");

    if (
        !startDateInput.value
    ) {
        return;
    }

    const date =
        new Date(
            startDateInput.value
        );

    const days =
        parseInt(
            daysInput.value || 0
        );

    date.setDate(
        date.getDate() - days
    );

    result.innerHTML =
        formatDate(date);

}

/* ==========================================
   DATE TO DAY FINDER
========================================== */

function findDayOfWeek() {

    const input =
        document.getElementById("dayFinderDate");

    const result =
        document.getElementById("dayFinderResult");

    if (!input.value) {
        return;
    }

    const date =
        new Date(input.value);

    const day =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );

    result.innerHTML =
        day;

}

/* ==========================================
   BUSINESS DAYS CALCULATOR
========================================== */

function calculateBusinessDays() {

    const start =
        new Date(
            document.getElementById("businessStartDate").value
        );

    const end =
        new Date(
            document.getElementById("businessEndDate").value
        );

    const result =
        document.getElementById("businessDaysResult");

    if (
        isNaN(start) ||
        isNaN(end)
    ) {
        return;
    }

    let count = 0;

    const current =
        new Date(start);

    while (
        current <= end
    ) {

        const day =
            current.getDay();

        if (
            day !== 0 &&
            day !== 6
        ) {
            count++;
        }

        current.setDate(
            current.getDate() + 1
        );

    }

    result.innerHTML =
        `${count} Business Days`;

}

/* ==========================================
   COUNTDOWN CALCULATOR
========================================== */

function calculateCountdown() {

    const targetDate =
        new Date(
            document.getElementById("countdownDate").value
        );

    const result =
        document.getElementById("countdownResult");

    if (
        isNaN(targetDate)
    ) {
        return;
    }

    const today =
        new Date();

    const diff =
        targetDate - today;

    const days =
        Math.ceil(
            diff /
            (1000 * 60 * 60 * 24)
        );

    if (days < 0) {

        result.innerHTML =
            "Date has already passed";

        return;

    }

    result.innerHTML =
        `${days} Days Remaining`;

}

/* ==========================================
   INIT DEFAULT DATES
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const ids = [

            "startDate",
            "endDate",

            "addDate",
            "subtractDate",

            "dayFinderDate",

            "businessStartDate",
            "businessEndDate",

            "countdownDate"

        ];

        ids.forEach(id => {

            const el =
                document.getElementById(id);

            if (
                el &&
                !el.value
            ) {
                el.value = today;
            }

        });

    }
);

/* ==========================================
   EXPORTS
========================================== */

window.calculateAge =
    calculateAge;

window.calculateDateDifference =
    calculateDateDifference;

window.addDaysToDate =
    addDaysToDate;

window.subtractDaysFromDate =
    subtractDaysFromDate;

window.findDayOfWeek =
    findDayOfWeek;

window.calculateBusinessDays =
    calculateBusinessDays;

window.calculateCountdown =
    calculateCountdown;
