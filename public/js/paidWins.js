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
  
  // Sidebar toggle functionality
  function initializeSidebar() {
    const openSidebarButton = document.getElementById('openSidebar');
    const closeSidebarButton = document.getElementById('closeSidebar');

    const mobileMenu = document.querySelector('.lg\\:hidden');
    const upwardIcon = openSidebarButton.querySelector('svg:nth-child(1)');
    const downwardIcon = openSidebarButton.querySelector('svg:nth-child(2)');

    if (openSidebarButton && closeSidebarButton && mobileMenu) {
        openSidebarButton.addEventListener('click', function () {

            mobileMenu.classList.remove('hidden');
            upwardIcon.classList.add('hidden');
            downwardIcon.classList.remove('hidden');
        });

        closeSidebarButton.addEventListener('click', function () {

            mobileMenu.classList.add('hidden');
            upwardIcon.classList.remove('hidden');
            downwardIcon.classList.add('hidden');
        });
    }
}


// Sign out function
function signOut() {
    // Perform any necessary cleanup (e.g., clearing local storage, session data)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to the index.html page
    window.location.href = '../index.html';
} 
// Function to open topup modal
function openTopupModal() {
    const topupModal = document.getElementById('header-topup-modal');
    
    if (topupModal) {
      topupModal.classList.remove('hidden');
    }
  }
  
  // Function to close topup modal
  function closeTopupModal() {
    const topupModal = document.getElementById('header-topup-modal');
    
    if (topupModal) {
      topupModal.classList.add('hidden');
    }
  }
  
  // Main initialization function
  function initializeApp() {
    initializeProfileDropdown();
    // Initialize topup link and modal
    initializeTopupLink();
    initializePasswordDrawer(); 
    initializeSidebar();

    
  }
  
  // Initialize topup link and modal
  function initializeTopupLink() {
    const topupLink = document.getElementById('header-topup-link');
    const topupModal = document.getElementById('header-topup-modal');
    const closeModalBtn = document.getElementById('header-cancel-modal-btn');
    const overlay = topupModal.querySelector('div:nth-child(1)');
    
    if (topupLink && topupModal) {
      topupLink.addEventListener('click', openTopupModal);
      closeModalBtn.addEventListener('click', closeTopupModal);
      overlay.addEventListener('click', closeTopupModal);
    }
  }
  
  // Run initialization function when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializeApp();
  });