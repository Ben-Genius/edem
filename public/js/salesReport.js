document.addEventListener('DOMContentLoaded', function () {
    // Get elements by their IDs
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dateRangeLabel = document.getElementById('dateRangeLabel');

    // Dropdown menu buttons
    const todayBtn = document.getElementById('todayBtn');
    const yesterdayBtn = document.getElementById('yesterdayBtn');
    const last7DaysBtn = document.getElementById('last7DaysBtn');
    const last30DaysBtn = document.getElementById('last30DaysBtn');
    const thisMonthBtn = document.getElementById('thisMonthBtn');
    const lastMonthBtn = document.getElementById('lastMonthBtn');
    const customRangeBtn = document.getElementById('customRangeBtn');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Toggle dropdown visibility
    dropdownButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden');
    });

    // Date calculations for buttons
    const formatDate = (date) => date.toISOString().split('T')[0]; // Helper function for date formatting

    const setDateRange = (start, end) => {
        dateRangeLabel.textContent = `${formatDate(start)} - ${formatDate(end)}`;
        dropdownMenu.classList.add('hidden');
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);
    const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // Event listeners for the buttons
    todayBtn.addEventListener('click', function () {
        setDateRange(today, today);
    });

    yesterdayBtn.addEventListener('click', function () {
        setDateRange(yesterday, yesterday);
    });

    last7DaysBtn.addEventListener('click', function () {
        setDateRange(last7Days, today);
    });

    last30DaysBtn.addEventListener('click', function () {
        setDateRange(last30Days, today);
    });

    thisMonthBtn.addEventListener('click', function () {
        setDateRange(firstDayThisMonth, today);
    });

    lastMonthBtn.addEventListener('click', function () {
        setDateRange(firstDayLastMonth, lastDayLastMonth);
    });

    customRangeBtn.addEventListener('click', function () {
        alert('Custom range picker not implemented.'); // Placeholder for custom date picker logic
    });

    // Submit button functionality
    submitBtn.addEventListener('click', function () {
        alert(`Date range submitted: ${dateRangeLabel.textContent}`);
        dropdownMenu.classList.add('hidden');
    });

    // Clear button functionality
    clearBtn.addEventListener('click', function () {
        dateRangeLabel.textContent = 'Select Date Range';
        dropdownMenu.classList.add('hidden');
    });

    // Hide the dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});
