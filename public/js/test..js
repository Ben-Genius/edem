document.addEventListener('DOMContentLoaded', function() {
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = document.getElementById('user-menu-dropdown');

    userMenuButton.addEventListener('click', function() {
      userMenuDropdown.classList.toggle('hidden');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!userMenuButton.contains(event.target) && !userMenuDropdown.contains(event.target)) {
        userMenuDropdown.classList.add('hidden');
      }
    });

    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');

        // Toggle between menu open and close icons
        // this.querySelector('svg:nth-child(1)').classList.toggle('hidden');
        // this.querySelector('svg:nth-child(2)').classList.toggle('hidden');
    });
    
    if (typeof initializeCharts === 'function') {
        initializeCharts();
    }

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
      
      
    
        const viewMoreButton = document.querySelector('button[type="button"][class^="inline-flex"]');
      
        if (viewMoreButton) {
          viewMoreButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = '/public/authPage/writers.html';
          });
        }
      
      
  });

