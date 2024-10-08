// Get elements dynamically to ensure they exist before interacting with them
const elements = {
    dateInput: document.getElementById("e"),
    drawer: document.getElementById("drawer"),
    drawerPanel: document.getElementById("drawerPanel"),
    openDrawer: document.getElementById("openDrawer"),
    closeDrawer: document.getElementById("closeDrawer"),
    closeDrawerFooter: document.getElementById("closeDrawerFooter"),
    topupLink: document.getElementById('header-topup-link'),
    topupModal: document.getElementById('header-topup-modal'),
    closeModalBtn: document.getElementById('header-cancel-modal-btn'),
    overlay: document.querySelector('#header-topup-modal div:nth-child(1)'),
    userMenuButton: document.getElementById('user-menu-button'),
    userMenuDropdown: document.getElementById('user-menu-dropdown'),
};

// Initialize date input
function initDateInput() {
    if (elements.dateInput) {
        elements.dateInput.value = new Date().toISOString().substring(0, 10);
    }
}

// Toggle drawer
function toggleDrawer(open = true) {
    if (elements.drawer && elements.drawerPanel) {
        elements.drawer.classList.toggle("hidden", !open);
        elements.drawerPanel.classList.toggle("translate-x-full", !open);
    }
}

// Close drawer with animation
function closeDrawer() {
    toggleDrawer(false);
    setTimeout(() => {
        if (elements.drawer) {
            elements.drawer.classList.add("hidden");
        }
    }, 500); // matches the duration of the animation
}

// Function to open topup modal
function openTopupModal() {
    if (elements.topupModal) {
        elements.topupModal.classList.remove('hidden');
    }
}

// Function to close topup modal
function closeTopupModal() {
    if (elements.topupModal) {
        elements.topupModal.classList.add('hidden');
    }
}

// Initialize profile dropdown
function initializeProfileDropdown() {
    if (elements.userMenuButton && elements.userMenuDropdown) {
        elements.userMenuButton.addEventListener('click', function () {
            elements.userMenuDropdown.classList.toggle('hidden');
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (event) {
            if (!elements.userMenuButton.contains(event.target) && !elements.userMenuDropdown.contains(event.target)) {
                elements.userMenuDropdown.classList.add('hidden');
            }
        });
    }
}

// Initialize password drawer
function initializePasswordDrawer() {
    const changePasswordLink = document.getElementById('change-password-link');
    const passwordChangeDrawer = document.getElementById('passwordChangeDrawer');
    const drawerPanel = document.getElementById('passwordDrawerPanel');
    const closeDrawerButton = document.getElementById('closePasswordDrawer');
    const closeDrawerFooterButton = document.getElementById('closePasswordDrawerFooter');

    if (changePasswordLink && passwordChangeDrawer && drawerPanel) {
        changePasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            passwordChangeDrawer.classList.remove('hidden');
            drawerPanel.classList.remove('translate-x-full');
        });

        const closeDrawer = function() {
            drawerPanel.classList.add('translate-x-full');
            setTimeout(() => {
                passwordChangeDrawer.classList.add('hidden');
            }, 500);
        };

        closeDrawerButton.addEventListener('click', closeDrawer);
        closeDrawerFooterButton.addEventListener('click', closeDrawer);

        passwordChangeDrawer.addEventListener('click', function(event) {
            if (event.target === passwordChangeDrawer) {
                closeDrawer();
            }
        });
    }
}

// Sign out function
function signOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '../index.html';
}

// Initialize event listeners for top-up modal
function initializeTopupLink() {
    const topupLink = document.getElementById('header-topup-link');
    const topupModal = document.getElementById('header-topup-modal');
    const closeModalBtn = document.getElementById('header-cancel-modal-btn');
    const overlay = topupModal ? topupModal.querySelector('div:nth-child(1)') : null;

    if (topupLink && topupModal) {
        topupLink.addEventListener('click', openTopupModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeTopupModal);
        if (overlay) overlay.addEventListener('click', closeTopupModal);
    }
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
  

// Event listeners
function addEventListeners() {
    if (elements.openDrawer) {
        elements.openDrawer.addEventListener("click", () => toggleDrawer(true));
    }
    if (elements.closeDrawer) {
        elements.closeDrawer.addEventListener("click", closeDrawer);
    }
    if (elements.closeDrawerFooter) {
        elements.closeDrawerFooter.addEventListener("click", closeDrawer);
    }
    if (elements.topupLink) {
        elements.topupLink.addEventListener('click', openTopupModal);
    }
    if (elements.closeModalBtn) {
        elements.closeModalBtn.addEventListener('click', closeTopupModal);
    }
    if (elements.overlay) {
        elements.overlay.addEventListener('click', closeTopupModal);
    }
}

// Main initialization function
function initializeApp() {
    initDateInput();
    addEventListeners();
    initializeProfileDropdown();
    initializeTopupLink();
    initializePasswordDrawer();
    initializeMobileMenu();

}

// Run the initialization function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM fully loaded and parsed');
    initializeApp();
});
