document.addEventListener("DOMContentLoaded", function () {
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
    document.getElementById("e").value = new Date().toISOString().substring(0, 10);

    // Initialize all dropdowns and modals
    initializeDropdowns();
    initializeProfileDropdown();
    initializeEditModal();
    initializeTopupModal();  // Wallet top-up modal initialized
    initializePasswordDrawer();  // Password drawer initialized
    handleRouteChange();

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("load", handleRouteChange);

    // Image upload functionality
    document.getElementById("upload-image").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("writerImage").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

// Initialize profile dropdown functionality
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

// Sign out function
function signOut() {
    // Perform any necessary cleanup (e.g., clearing local storage, session data)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to the index.html page
    window.location.href = '../index.html';
}

// Dropdown functionality for the page
function initializeDropdowns() {
    const menuButtons = document.querySelectorAll('[id^="menu-button-"]');
    const dropdowns = document.querySelectorAll('[id^="dropdown-"]');

    menuButtons.forEach((button, index) => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdowns[index].classList.toggle("hidden");
        });
    });

    document.addEventListener("click", function (event) {
        dropdowns.forEach((dropdown, index) => {
            if (!menuButtons[index].contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.add("hidden");
            }
        });
    });
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

// Edit modal and profile navigation
function initializeEditModal() {
    const editLinks = document.querySelectorAll('[id^="menu-item-"]');
    const modal = document.getElementById("editModal");
    const closeModalBtns = document.querySelectorAll("#closeModalBtn, #closeModalBtn2");
    const saveChangesBtn = document.getElementById("saveChangesBtn");

    let currentCard = null;

    // Edit and Profile link functionality
    editLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            if (this.textContent.trim() === "Edit") {
                currentCard = this.closest("li");
                openEditModal(currentCard);
            } else if (this.textContent.trim() === "Profile") {
                navigateToProfile(this.closest("li"));
            }
            this.closest('[id^="dropdown-"]').classList.add("hidden");
        });
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", closeEditModal);
    });

    saveChangesBtn.addEventListener("click", saveChanges);

    function openEditModal(card) {
        document.getElementById("updatingId").textContent = card.querySelector('a[href=""]').textContent.trim();
        document.getElementById("writerImage").src = card.querySelector(".mx-auto.h-36.w-36").src;
        document.getElementById("writerName").value = card.querySelector("h3.mt-6").textContent.trim();
        document.getElementById("writerBalance").value = card.querySelector("dd.text-sm.text-gray-500").textContent.trim();
        document.getElementById("phoneNumber").value = card.querySelector('a[href^="tel:"]').textContent.trim();
        document.getElementById("isOnline").checked = card.querySelector(".bg-green-50") !== null;

        modal.classList.remove("hidden");
    }

    function closeEditModal() {
        modal.classList.add("hidden");
    }

    function saveChanges() {
        if (currentCard) {
            currentCard.querySelector("h3.mt-6").textContent = document.getElementById("writerName").value;
            currentCard.querySelector("dd.text-sm.text-gray-500").textContent = document.getElementById("writerBalance").value;
            currentCard.querySelector('a[href^="tel:"]').textContent = document.getElementById("phoneNumber").value;
            currentCard.querySelector(".mx-auto.h-36.w-36").src = document.getElementById("writerImage").src;

            const statusBadge = currentCard.querySelector(".inline-flex.items-center.rounded-full");
            if (document.getElementById("isOnline").checked) {
                statusBadge.classList.remove("bg-red-50", "text-red-700", "ring-red-600/20");
                statusBadge.classList.add("bg-green-50", "text-green-700", "ring-green-600/20");
                statusBadge.textContent = "Online";
            } else {
                statusBadge.classList.remove("bg-green-50", "text-green-700", "ring-green-600/20");
                statusBadge.classList.add("bg-red-50", "text-red-700", "ring-red-600/20");
                statusBadge.textContent = "Offline";
            }
        }
        closeEditModal();
    }
}

// Profile navigation logic
function navigateToProfile(card) {
    const writerId = card.querySelector('a[href=""]').textContent.trim();
    window.location.hash = `profile/${writerId}`;
}

function showWriterProfile(writerId) {
    console.log("showWriterProfile called for writer:", writerId);

    document.querySelector(".grid").classList.add("hidden");
    document.getElementById("search-container").classList.add("hidden");

    const profileView = document.getElementById("writerProfileView");
    profileView.classList.remove("hidden");

    fetchWriterDetails(writerId).then((writer) => {
        profileView.querySelector("h1").innerHTML = `${writer.name} - <span class="text-blue-600">${writer.id}</span>`;
        profileView.querySelector(".grid div:nth-child(1) p").textContent = `GH¢${writer.totalSold}`;
        profileView.querySelector(".grid div:nth-child(2) p").textContent = `GH¢${writer.totalPayment}`;
        profileView.querySelector(".grid div:nth-child(3) p").textContent = `GH¢${writer.balance}`;
    });
}

// Mocking a function to simulate fetching writer details
function fetchWriterDetails(writerId) {
    return Promise.resolve({
        id: writerId,
        name: "John Doe",
        totalSold: "2,500.00",
        totalPayment: "1,500.00",
        balance: "1,000.00",
    });
}

// Initialize the top-up modal
function initializeTopupModal() {
    const topupLink = document.getElementById('header-topup-link');
    const topupModal = document.getElementById('header-topup-modal');
    const cancelModalBtn = document.getElementById('header-cancel-modal-btn');
    const closeModalBtn = document.getElementById('header-close-modal-btn');

    console.log("Initializing Topup Modal"); // Debugging

    if (topupLink) {
        topupLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("Topup Wallet Clicked"); // Debugging
            topupModal.classList.remove('hidden'); // Show the modal
        });
    }

    cancelModalBtn.addEventListener('click', function () {
        topupModal.classList.add('hidden'); // Hide the modal
    });

    closeModalBtn.addEventListener('click', function () {
        topupModal.classList.add('hidden'); // Hide the modal
    });
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

        const closeDrawer = function () {
            drawerPanel.classList.add('translate-x-full');
            setTimeout(() => {
                passwordChangeDrawer.classList.add('hidden');
            }, 500);
        };

        closeDrawerButton.addEventListener('click', closeDrawer);
        closeDrawerFooterButton.addEventListener('click', closeDrawer);

        window.addEventListener('click', function(event) {
            if (event.target === passwordChangeDrawer) {
                closeDrawer();
            }
        });
    }
}

function showWriterList() {
    document.querySelector(".grid").classList.remove("hidden");
    document.getElementById("writerProfileView").classList.add("hidden");
    document.getElementById("search-container").classList.remove("hidden");
}

function handleRouteChange() {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("profile/")) {
        const writerId = hash.split("/")[1];
        showWriterProfile(writerId);
    } else {
        showWriterList();
    }
}
