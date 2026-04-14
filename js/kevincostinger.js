"use strict";
/*******************************************************
 * kevincostinger.js - 100p.
 *
 * This is Kevin. Kevin keeps track of your expenses
 * and costs. To add an expense, pick a date, declare
 * the amount and add a short description.
 *
 * When you submit the form, all fields are validated.
 * If Kevin is not happy with your inputs, the least
 * he will do is, bring you back to the field where
 * you made a mistake. But who knows? Maybe he can
 * even provide some excellent User experience?
 * (+5 Bonus points available)
 *
 * These are the rules for the form validation:
 * - Date is valid, if it's not empty.
 * - Amount is valid, if it's at least 0.01.
 * - Text is valid, if it's at least 3 letters long.
 *
 * If everything is okay, Kevin adds a new table row,
 * containing the expense. The table row also contains
 * a button, which deletes the expense, once you click
 * it. After adding a table row, the form is reset and
 * ready for the next input.
 *
 * At the bottom of the expense tracker, you can see
 * a small number. It represents the sum of all expenses,
 * which are currently tracked. It is always accurate!
 *
 * Have a look at the pictures provided. They demonstrate
 * how the software looks like. Notice the details, like
 * the perfectly formatted currency! Isn't that great?
 *
 * By the way...
 * Kevin is a clean guy. He is free of code duplications.
 * Kevin defines his quality by using functions and
 * events, to keep his sourcecode clean af. He understands
 * the scope of his variables and of course, makes use of
 * event delegation, to keep his event listeners tidied up!
 *
 * Carina - 2026-03-25
 *******************************************************/

let sumExpenses = 0; // Use this variable to keep the sum up to date.

/**
 * Validates form and adds expense to the list
 * @param {Event} e
 */
function submitForm(e) {
    // TODO: Prevent the default behavior of the submit button.
    e.preventDefault();

    // TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
    const dateInput = document.getElementById("date");
    const amountInput = document.getElementById("amount");
    const expenseInput = document.getElementById("expense");

    const date = dateInput.value;
    const amount = parseFloat(amountInput.value);
    const expenseText = expenseInput.value.trim();

    // --- Validation with UX Bonus (Feedback via Alert) ---
    if (isEmpty(date)) {
        alert("Hoppla! Kevin braucht ein Datum für die Buchung.");
        dateInput.focus();
        return;
    }

    if (isNaN(amount) || amount < 0.01) {
        alert("Der Betrag muss mindestens 0,01 € sein. Kevin ist kein Fan von Gratis-Arbeit!");
        amountInput.focus();
        return;
    }

    if (expenseText.length < 3) {
        alert("Die Beschreibung ist zu kurz. Kevin braucht mindestens 3 Zeichen.");
        expenseInput.focus();
        return;
    }

    // --- Logic: Add Table Row ---
    const tbody = document.querySelector("#expenses tbody");
    const row = document.createElement("tr");

    // Speichere den reinen Zahlenwert im Data-Attribut für sauberes Löschen später
    row.setAttribute("data-raw-amount", amount);

    row.innerHTML = `
        <td>${date}</td>
        <td>${formatEuro(amount)}</td>
        <td>${expenseText}</td>
        <td><button type="button" class="delete">X</button></td>
    `;

    tbody.append(row);

    // --- Update Total ---
    updateTotal(amount);

    // --- Reset Form ---
    e.target.reset();
}

/**
 * Updates the total sum and the display
 * @param {Number} value - The amount to add (positive) or subtract (negative)
 */
function updateTotal(value) {
    sumExpenses += value;
    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
}

// --- Event Delegation for Delete Button ---
document.querySelector("#expenses tbody").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        const row = e.target.closest("tr");

        // Hole den Betrag aus dem Data-Attribut (sauberer als Text-Parsing!)
        const amountToRemove = parseFloat(row.getAttribute("data-raw-amount"));

        updateTotal(-amountToRemove);
        row.remove();
    }
});

// Event Listener for Submit
document.querySelector("form").addEventListener("submit", submitForm);


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/

/*******************************************************
 * Checks if variable is empty
 * @param {any} variable - Variable which you want to check.
 * @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function (variable) {
    if (Array.isArray(variable))
        return (variable.length === 0);
    else if (typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 * Converts number into currency string.
 * @param {Number} number - Any numeric value.
 * @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}