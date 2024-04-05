document.addEventListener("DOMContentLoaded", function() {
    const sortIcon = document.querySelector(".sort i");
    const tableBody = document.querySelector("tbody");
    let isAscending = true;

    sortIcon.addEventListener("click", function() {
        const rows = Array.from(tableBody.querySelectorAll("tr"));
        const sortedRows = rows.sort((a, b) => {
            const firstRowText = a.cells[0].textContent.trim().toLowerCase();
            const secondRowText = b.cells[0].textContent.trim().toLowerCase();
            return isAscending ? firstRowText.localeCompare(secondRowText) : secondRowText.localeCompare(firstRowText);
        });

        tableBody.innerHTML = ""; 
        sortedRows.forEach(row => {
            tableBody.appendChild(row);
        });

        isAscending = !isAscending;

        sortIcon.classList.toggle("fa-arrow-up-a-z", isAscending);
        sortIcon.classList.toggle("fa-arrow-down-a-z", !isAscending);
    });
});
