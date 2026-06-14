/* ==========================================
   CALCULATOR360 PRO
   APP.JS
   Global Application Controller
========================================== */

"use strict";

/* ==========================================
   APP STATE
========================================== */

const App = {

    theme:
        localStorage.getItem(
            "calc360-theme"
        ) || "dark",

    mobileMenuOpen: false

};

/* ==========================================
   INIT
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTheme();

        initNavigation();

        initFAQ();

        initScrollEffects();

        initLazyAnimations();

        console.log(
            "Calculator360 Pro Loaded"
        );

    }
);

/* ==========================================
   THEME SYSTEM
========================================== */

function initTheme() {

    if (
        App.theme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );

        updateThemeIcon(
            "☀️"
        );

    } else {

        document.body.classList.remove(
            "light-theme"
        );

        updateThemeIcon(
            "🌙"
        );
    }

    const btn =
        document.getElementById(
            "themeToggle"
        );

    if (btn) {

        btn.addEventListener(
            "click",
            toggleTheme
        );
    }
}

function toggleTheme() {

    document.body.classList.toggle(
        "light-theme"
    );

    const isLight =
        document.body.classList.contains(
            "light-theme"
        );

    App.theme =
        isLight
            ? "light"
            : "dark";

    localStorage.setItem(
        "calc360-theme",
        App.theme
    );

    updateThemeIcon(
        isLight
            ? "☀️"
            : "🌙"
    );

    showToast(
        isLight
            ? "Light Mode Enabled"
            : "Dark Mode Enabled"
    );
}

function updateThemeIcon(icon) {

    const btn =
        document.getElementById(
            "themeToggle"
        );

    if (btn) {

        btn.textContent =
            icon;
    }
}

/* ==========================================
   MOBILE MENU
========================================== */

function initNavigation() {

    const btn =
        document.querySelector(
            ".mobile-menu-btn"
        );

    if (!btn) return;

    btn.addEventListener(
        "click",
        toggleMobileMenu
    );
}

function toggleMobileMenu() {

    App.mobileMenuOpen =
        !App.mobileMenuOpen;

    let nav =
        document.querySelector(
            ".desktop-nav"
        );

    if (!nav) return;

    nav.classList.toggle(
        "mobile-open"
    );
}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.addEventListener(
    "click",
    e => {

        const link =
            e.target.closest(
                'a[href^="#"]'
            );

        if (!link) return;

        const target =
            document.querySelector(
                link.getAttribute(
                    "href"
                )
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }
);

/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    let toast =
        document.createElement(
            "div"
        );

    toast.className =
        "toast";

    toast.innerHTML =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    }, 10);

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);
}

/* ==========================================
   FAQ ACCORDION
========================================== */

function initFAQ() {

    const items =
        document.querySelectorAll(
            ".faq-item"
        );

    items.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        if (!question)
            return;

        question.addEventListener(
            "click",
            () => {

                item.classList.toggle(
                    "active"
                );

            }
        );

    });

}

/* ==========================================
   SCROLL EFFECTS
========================================== */

function initScrollEffects() {

    window.addEventListener(
        "scroll",
        () => {

            const navbar =
                document.querySelector(
                    ".navbar"
                );

            if (!navbar)
                return;

            if (
                window.scrollY > 50
            ) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );
            }

        }
    );

}

/* ==========================================
   REVEAL ANIMATIONS
========================================== */

function initLazyAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) return;

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    elements.forEach(
        el =>
            observer.observe(el)
    );

}

/* ==========================================
   COPY TO CLIPBOARD
========================================== */

function copyText(text) {

    navigator.clipboard
        .writeText(text)
        .then(() => {

            showToast(
                "Copied Successfully"
            );

        })
        .catch(() => {

            showToast(
                "Copy Failed"
            );

        });
}

/* ==========================================
   NUMBER FORMATTER
========================================== */

function formatINR(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style:
                "currency",
            currency:
                "INR",
            maximumFractionDigits: 2
        }
    ).format(value);

}

function formatNumber(value) {

    return new Intl.NumberFormat(
        "en-IN"
    ).format(value);

}

/* ==========================================
   URL HASH ROUTING
========================================== */

window.addEventListener(
    "load",
    () => {

        if (
            location.hash
        ) {

            const section =
                document.querySelector(
                    location.hash
                );

            if (section) {

                setTimeout(
                    () => {

                        section.scrollIntoView({

                            behavior:
                                "smooth"

                        });

                    },
                    500
                );
            }
        }

    }
);

/* ==========================================
   SEARCH FILTER
========================================== */

function searchCalculators() {

    const input =
        document.getElementById(
            "calculatorSearch"
        );

    if (!input)
        return;

    const value =
        input.value.toLowerCase();

    const cards =
        document.querySelectorAll(
            ".tool-card"
        );

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        if (
            text.includes(
                value
            )
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";
        }

    });

}

/* ==========================================
   SEO FAQ JSON LD
========================================== */

function injectFAQSchema(
    faqData
) {

    if (
        !Array.isArray(
            faqData
        )
    )
        return;

    const schema = {

        "@context":
            "https://schema.org",

        "@type":
            "FAQPage",

        "mainEntity":
            faqData.map(
                item => ({

                    "@type":
                        "Question",

                    "name":
                        item.question,

                    "acceptedAnswer": {

                        "@type":
                            "Answer",

                        "text":
                            item.answer
                    }

                })
            )

    };

    const script =
        document.createElement(
            "script"
        );

    script.type =
        "application/ld+json";

    script.textContent =
        JSON.stringify(
            schema
        );

    document.head.appendChild(
        script
    );

}

/* ==========================================
   GLOBAL EXPORTS
========================================== */

window.showToast =
    showToast;

window.copyText =
    copyText;

window.formatINR =
    formatINR;

window.formatNumber =
    formatNumber;

window.searchCalculators =
    searchCalculators;

window.injectFAQSchema =
    injectFAQSchema;
