document.addEventListener("DOMContentLoaded", function () {
    // 📌 Mobile Menu Toggle
    let menuBtn = document.getElementById("menu-btn");
    let navbar = document.querySelector(".navbar");

    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!menuBtn.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });

    // 📌 Login/Register Dropdown Toggle
    let userBtn = document.getElementById("user-btn");
    let dropdown = document.getElementById("dropdown");
    let loginTab = document.getElementById("login-tab");
    let registerTab = document.getElementById("register-tab");
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("register-form");

    userBtn.addEventListener("click", function () {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // 📌 Function to Show Login or Register Form
    function showLoginForm() {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        localStorage.setItem("activeTab", "login");
    }

    function showRegisterForm() {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        localStorage.setItem("activeTab", "register");
    }

    // 📌 Check Local Storage for Last Active Tab
    if (localStorage.getItem("activeTab") === "register") {
        showRegisterForm();
    } else {
        showLoginForm();
    }

    loginTab.addEventListener("click", function () {
        showLoginForm();
    });

    registerTab.addEventListener("click", function () {
        showRegisterForm();
    });

    // 📌 Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!userBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });

    // 📌 AJAX Login Request
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        fetch("PHP/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("successful")) {
                window.location.href = "PHP/dashboard.php";
            } else {
                alert("Invalid email or password!");
                showLoginForm();
            }
        })
        .catch(error => console.error("Error:", error));
    });

    // 📌 AJAX Register Request
    document.getElementById("register-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        fetch("PHP/register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("successful")) {
                window.location.href = "PHP/dashboard.php";
            } else {
                alert(data);
                showRegisterForm(); // Keep Register tab active if failed
            }
        })
        .catch(error => console.error("Error:", error));
    });

    // 📌 Logout Function
    let logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            fetch("PHP/logout.php")
            .then(() => {
                window.location.href = "index.html";
            })
            .catch(error => console.error("Error:", error));
        });
    }

    // 📌 Search and Info Buttons
    let searchBtn = document.getElementById("search-btn");
    let infoBtn = document.getElementById("info-btn");
    let contactInfo = document.querySelector(".contact-info");
    let closeContactInfo = document.getElementById("close-contact-info");

    if (infoBtn) {
        infoBtn.addEventListener("click", function () {
            contactInfo.classList.toggle("active");
        });
    }

    if (closeContactInfo) {
        closeContactInfo.addEventListener("click", function () {
            contactInfo.classList.remove("active");
        });
    }

    // 📌 SwiperJS for Home Slider
    var homeSwiper = new Swiper(".home-slider", {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 📌 SwiperJS for Reviews
    var reviewsSwiper = new Swiper(".reviews-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // 📌 SwiperJS for Blogs
    var blogsSwiper = new Swiper(".blogs-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // 📌 SwiperJS for Client Logos
    var logoSwiper = new Swiper(".logo-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
        },
    });

    // 📌 LightGallery for Project Images
    let projectGallery = document.querySelector(".projects .box-container");
    if (projectGallery) {
        lightGallery(projectGallery);
    }

    // 📌 Smooth Scrolling for Navbar Links
    document.querySelectorAll(".navbar a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth",
                });
            }
        });
    });
});
