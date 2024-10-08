

// Sidebar toggle functionality
function initializeSidebar() {
    const openSidebarButton = document.getElementById('openSidebar');
    const closeSidebarButton = document.getElementById('closeSidebar');

    const mobileMenu = document.querySelector('.lg\\:hidden');
    // const upwardIcon = openSidebarButton.querySelector('svg:nth-child(1)');
    // const downwardIcon = openSidebarButton.querySelector('svg:nth-child(2)');

    if (openSidebarButton && closeSidebarButton && mobileMenu) {
        openSidebarButton.addEventListener('click', function () {

            mobileMenu.classList.remove('hidden');
            // upwardIcon.classList.add('hidden');
            // downwardIcon.classList.remove('hidden');
        });

        closeSidebarButton.addEventListener('click', function () {

            mobileMenu.classList.add('hidden');
            // upwardIcon.classList.remove('hidden');
            // downwardIcon.classList.add('hidden');
        });
    }
}


function initializeProfileDropdown() {
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = document.getElementById('user-menu-dropdown');

    if (userMenuButton && userMenuDropdown) {
        userMenuButton.addEventListener('click', function () {
            userMenuDropdown.classList.toggle('hidden'); // Toggle dropdown visibility
        });

        // Optionally, hide the dropdown if the user clicks outside of it
        document.addEventListener('click', function (event) {
            if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                userMenuDropdown.classList.add('hidden'); // Hide dropdown if clicked outside
            }
        });
    }
}

function signOut() {
  // Perform any necessary cleanup (e.g., clearing local storage, session data)
  localStorage.clear();
  sessionStorage.clear();
  
  // Redirect to the index.html page
  window.location.href = '../index.html';
}

function initializePasswordDrawer() {
  const changePasswordLink = document.getElementById('change-password-link');
  const headerDrawer = document.getElementById('headerdrawer');
  const drawerPanel = document.getElementById('drawerPanel');
  const closeDrawerButton = document.getElementById('closeDrawer');
  const closeDrawerFooterButton = document.getElementById('closeDrawerFooter');

  if (changePasswordLink && headerDrawer && drawerPanel) {
      // Open drawer when "Change Password" link is clicked
      changePasswordLink.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default anchor behavior
          headerDrawer.classList.remove('hidden'); // Show the drawer
          drawerPanel.classList.remove('translate-x-full'); // Slide-in animation
      });

      // Close drawer when close button or footer cancel button is clicked
      const closeDrawer = function () {
          drawerPanel.classList.add('translate-x-full'); // Slide-out animation
          setTimeout(() => {
              headerDrawer.classList.add('hidden'); // Hide the drawer after the animation
          }, 500); // Match this with the transition duration
      };

      closeDrawerButton.addEventListener('click', closeDrawer);
      closeDrawerFooterButton.addEventListener('click', closeDrawer);

      // Optionally close the drawer if the user clicks outside of the panel
      window.addEventListener('click', function(event) {
          if (event.target === headerDrawer) {
              closeDrawer();
          }
      });
  }
}

function initializeTopupModal() {
  const topupLink = document.getElementById('header-topup-link');
  const topupModal = document.getElementById('header-topup-modal');
  const closeModalBtn = document.getElementById('header-close-modal-btn');
  const cancelModalBtn = document.getElementById('header-cancel-modal-btn');

  if (topupLink && topupModal) {
      // Open modal when "Topup Request" link is clicked
      topupLink.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent default anchor behavior
          topupModal.classList.remove('hidden'); // Show the modal
      });

      // Close modal on Deactivate button click
      closeModalBtn.addEventListener('click', function () {
          topupModal.classList.add('hidden'); // Hide the modal
      });

      // Close modal on Cancel button click
      cancelModalBtn.addEventListener('click', function () {
          topupModal.classList.add('hidden'); // Hide the modal
      });

      // Optionally close the modal if the user clicks outside the modal content
      window.addEventListener('click', function(event) {
          if (event.target === topupModal) {
              topupModal.classList.add('hidden'); // Hide the modal
          }
      });
  }
}

function initializeViewMoreButton() {
  const viewMoreButton = document.querySelector('button[type="button"][class^="inline-flex"]');

  if (viewMoreButton) {
    viewMoreButton.addEventListener('click', function(event) {
      event.preventDefault(); 
      window.location.href = '/public/authPage/writers.html';
    });
  }
}


function initializeCharts() {
    // Total Stakes vs Sales (Bar Chart)
    var totalStakesCtx = document.getElementById('totalStakesChart').getContext('2d');
    var totalStakesChart = new Chart(totalStakesCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Stakes',
            data: [5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 55000, 71897],
            backgroundColor: '#FFD700',
            borderColor: '#DAA520',
            borderWidth: 1
          },
          {
            label: 'Sales',
            data: [4000, 6000, 8000, 12000, 18000, 22000, 28000, 35000, 45000, 58039],
            backgroundColor: '#1E90FF',
            borderColor: '#1E90FF',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Comparison of Stakes and Sales'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Stakes and Sales Trend (Line Chart)
    var salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
    var salesTrendChart = new Chart(salesTrendCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
        datasets: [
          {
            label: 'Total Stakes',
            data: [10000, 15000, 22000, 30000, 40000, 50000, 58000, 65000, 68000, 71897],
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Total Sales',
            data: [9000, 12000, 18000, 25000, 32000, 40000, 46000, 50000, 54000, 58039],
            borderColor: '#1E90FF',
            backgroundColor: 'rgba(30, 144, 255, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Weekly Trend of Total Stakes and Sales'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}

function initializeMobileMenu() {
  const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
  });
}


// Main initialization function
function initializeApp() {
    initializeSidebar();
    initializeProfileDropdown();
    initializeCharts();
    initializeTopupModal(); 
    initializePasswordDrawer(); 
    initializeViewMoreButton();
    initializeMobileMenu();
    // Other initialization functions...
}

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM fully loaded and parsed'); // This should show up in the console when the page is ready
    initializeApp();
});


