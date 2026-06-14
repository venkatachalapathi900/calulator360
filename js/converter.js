/* ==========================================
   CALCULATOR360 PRO
   CONVERTER.JS
========================================== */

"use strict";

/* ==========================================
   UNIT DATABASE
========================================== */

const UNIT_CATEGORIES = {

    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,
        mile: 0.000621371
    },

    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274,
        ton: 0.001
    },

    area: {
        sqm: 1,
        sqkm: 0.000001,
        sqft: 10.7639,
        sqyd: 1.19599,
        acre: 0.000247105,
        hectare: 0.0001
    },

    volume: {
        liter: 1,
        milliliter: 1000,
        cubic_meter: 0.001,
        gallon: 0.264172,
        pint: 2.11338
    },

    speed: {
        ms: 1,
        kmh: 3.6,
        mph: 2.23694,
        knot: 1.94384
    },

    data: {
        byte: 1,
        kilobyte: 1 / 1024,
        megabyte: 1 / 1048576,
        gigabyte: 1 / 1073741824,
        terabyte: 1 / 1099511627776
    },

    energy: {
        joule: 1,
        kilojoule: 0.001,
        calorie: 0.239006,
        kilocalorie: 0.000239006,
        watt_hour: 1 / 3600,
        kilowatt_hour: 1 / 3600000
    }

};

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadConverterUnits();

        const valueInput =
            document.getElementById(
                "converterValue"
            );

        const fromSelect =
            document.getElementById(
                "converterFrom"
            );

        const toSelect =
            document.getElementById(
                "converterTo"
            );

        const categorySelect =
            document.getElementById(
                "converterCategory"
            );

        if (valueInput)
            valueInput.addEventListener(
                "input",
                convertUnits
            );

        if (fromSelect)
            fromSelect.addEventListener(
                "change",
                convertUnits
            );

        if (toSelect)
            toSelect.addEventListener(
                "change",
                convertUnits
            );

        if (categorySelect)
            categorySelect.addEventListener(
                "change",
                () => {

                    loadConverterUnits();

                    convertUnits();

                }
            );

    }
);

/* ==========================================
   LOAD UNIT LIST
========================================== */

function loadConverterUnits() {

    const category =
        document.getElementById(
            "converterCategory"
        )?.value || "length";

    const from =
        document.getElementById(
            "converterFrom"
        );

    const to =
        document.getElementById(
            "converterTo"
        );

    if (!from || !to)
        return;

    from.innerHTML = "";
    to.innerHTML = "";

    if (category === "temperature") {

        [
            "Celsius",
            "Fahrenheit",
            "Kelvin"
        ].forEach(unit => {

            from.add(
                new Option(
                    unit,
                    unit
                )
            );

            to.add(
                new Option(
                    unit,
                    unit
                )
            );

        });

        to.selectedIndex = 1;

        return;
    }

    Object.keys(
        UNIT_CATEGORIES[
            category
        ]
    ).forEach(unit => {

        from.add(
            new Option(
                unit,
                unit
            )
        );

        to.add(
            new Option(
                unit,
                unit
            )
        );

    });

    if (
        to.options.length > 1
    ) {
        to.selectedIndex = 1;
    }
}

/* ==========================================
   MAIN CONVERSION
========================================== */

function convertUnits() {

    const category =
        document.getElementById(
            "converterCategory"
        )?.value;

    const value =
        parseFloat(
            document.getElementById(
                "converterValue"
            )?.value || 0
        );

    const from =
        document.getElementById(
            "converterFrom"
        )?.value;

    const to =
        document.getElementById(
            "converterTo"
        )?.value;

    const resultEl =
        document.getElementById(
            "converterResult"
        );

    if (!resultEl)
        return;

    if (
        category ===
        "temperature"
    ) {

        resultEl.value =
            convertTemperature(
                value,
                from,
                to
            );

        return;
    }

    const units =
        UNIT_CATEGORIES[
            category
        ];

    const base =
        value /
        units[from];

    const result =
        base *
        units[to];

    resultEl.value =
        Number(
            result.toFixed(8)
        ).toString();
}

/* ==========================================
   TEMPERATURE
========================================== */

function convertTemperature(
    value,
    from,
    to
) {

    let celsius;

    switch (from) {

        case "Celsius":
            celsius = value;
            break;

        case "Fahrenheit":
            celsius =
                (value - 32) *
                5 /
                9;
            break;

        case "Kelvin":
            celsius =
                value - 273.15;
            break;
    }

    switch (to) {

        case "Celsius":
            return celsius.toFixed(
                4
            );

        case "Fahrenheit":
            return (
                celsius *
                    9 /
                    5 +
                32
            ).toFixed(4);

        case "Kelvin":
            return (
                celsius +
                273.15
            ).toFixed(4);

        default:
            return value;
    }
}

/* ==========================================
   SWAP BUTTON
========================================== */

function swapUnits() {

    const from =
        document.getElementById(
            "converterFrom"
        );

    const to =
        document.getElementById(
            "converterTo"
        );

    if (!from || !to)
        return;

    const temp =
        from.value;

    from.value =
        to.value;

    to.value =
        temp;

    convertUnits();
}

/* ==========================================
   BULK RESULT LIST
========================================== */

function generateAllConversions() {

    const category =
        document.getElementById(
            "converterCategory"
        )?.value;

    if (
        category ===
        "temperature"
    ) return;

    const value =
        parseFloat(
            document.getElementById(
                "converterValue"
            )?.value || 0
        );

    const from =
        document.getElementById(
            "converterFrom"
        )?.value;

    const container =
        document.getElementById(
            "allConversions"
        );

    if (!container)
        return;

    const units =
        UNIT_CATEGORIES[
            category
        ];

    const base =
        value /
        units[from];

    let html = "";

    Object.entries(
        units
    ).forEach(
        ([unit, factor]) => {

            if (
                unit === from
            ) return;

            const result =
                base * factor;

            html += `
            <div class="conversion-item">
                <strong>${unit}</strong>
                <span>
                ${Number(
                    result.toFixed(8)
                )}
                </span>
            </div>
        `;
        }
    );

    container.innerHTML =
        html;
}

/* ==========================================
   EXPORTS
========================================== */

window.convertUnits =
    convertUnits;

window.swapUnits =
    swapUnits;

window.generateAllConversions =
    generateAllConversions;
