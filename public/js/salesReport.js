// salesReport.js

function initializeSalesReportDropdown() {
    const dropdownButton = document.querySelector('#dateRangeDropdown button');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedDateRange = document.getElementById('selectedDateRange');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const menuItems = dropdownMenu.querySelectorAll('a');
    const litepickerInput = document.getElementById('litepicker');
  
    let picker = new Litepicker({
      element: litepickerInput,
      singleMode: false,
      tooltipText: {
        one: 'day',
        other: 'days'
      },
      tooltipNumber: (totalDays) => {
        return totalDays - 1;
      },
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
          console.log('Litepicker selected:', date1, date2); // Debug log
          updateSelectedDateRange(date1, date2);
          dropdownMenu.style.display = 'none';
        });
      }
    });
  
    // Toggle dropdown
    dropdownButton.addEventListener('click', function() {
      dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    });
  
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target) && !event.target.closest('.litepicker')) {
        dropdownMenu.style.display = 'none';
      }
    });
  
    // Handle menu item selection
    menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        menuItems.forEach(mi => mi.classList.remove('bg-gray-600', 'text-white'));
        this.classList.add('bg-gray-600', 'text-white');
        
        const today = new Date();
        let startDate, endDate;
  
        switch(this.textContent) {
          case 'Today':
            startDate = endDate = today;
            break;
          case 'Yesterday':
            startDate = endDate = new Date(today.setDate(today.getDate() - 1));
            break;
          case 'Last 7 Days':
            endDate = new Date(today);
            startDate = new Date(today.setDate(today.getDate() - 6));
            break;
          case 'Last 30 Days':
            endDate = new Date(today);
            startDate = new Date(today.setDate(today.getDate() - 29));
            break;
          case 'This Month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
          case 'Last Month':
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
          case 'Custom':
            picker.show();
            return;
        }
  
        if (startDate && endDate) {
          console.log('Menu item selected:', this.textContent, startDate, endDate); // Debug log
          updateSelectedDateRange(startDate, endDate);
          picker.setDateRange(startDate, endDate);
          dropdownMenu.style.display = 'none';
        }
      });
    });
  
    // Submit button functionality
    submitBtn.addEventListener('click', function() {
      console.log('Submitted:', selectedDateRange.textContent);
      dropdownMenu.style.display = 'none';
    });
  
    // Clear button functionality
    clearBtn.addEventListener('click', function() {
      selectedDateRange.textContent = 'Select date range';
      menuItems.forEach(mi => mi.classList.remove('bg-gray-600', 'text-white'));
      dropdownMenu.style.display = 'none';
      picker.clearSelection();
    });
  
    function updateSelectedDateRange(startDate, endDate) {
      if (isValidLitepickerDate(startDate) && isValidLitepickerDate(endDate)) {
        selectedDateRange.textContent = `${formatLitepickerDate(startDate)} - ${formatLitepickerDate(endDate)}`;
      } else {
        selectedDateRange.textContent = 'Select date range';
        console.log('Invalid date range provided:', startDate, endDate); // Debug log
      }
    }
  
    function isValidLitepickerDate(date) {
      return date && date.dateInstance && date.dateInstance instanceof Date && !isNaN(date.dateInstance);
    }
  
    function formatLitepickerDate(date) {
      if (!isValidLitepickerDate(date)) {
        console.error('Invalid date provided to formatLitepickerDate:', date);
        return 'Invalid Date';
      }
      return date.dateInstance.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  
    console.log('Sales Report Dropdown Initialized');
}

// Automatically initialize if the script is loaded directly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSalesReportDropdown);
} else {
    initializeSalesReportDropdown();
}

// Add this at the end of the file
if (!sessionStorage.getItem('salesReportRefreshed')) {
    sessionStorage.setItem('salesReportRefreshed', 'true');
    location.reload();
} else {
    sessionStorage.removeItem('salesReportRefreshed');
}
