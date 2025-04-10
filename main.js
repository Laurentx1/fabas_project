// Main JavaScript file for Lemon Software website

document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  initNavbar()
  initMobileMenu()
  initParticles()
  initScrollToTop()
  initAnimations()

  // Page-specific initializations
  if (document.querySelector(".filter-btn")) {
    initFilters()
  }

  if (document.getElementById("budgetForm")) {
    initBudgetForm()
  }
})

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled")
    } else {
      navbar.classList.remove("navbar-scrolled")
    }
  })

  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const closeMobileMenuButton = document.getElementById("close-mobile-menu")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeMobileMenuButton && mobileMenu) {
    closeMobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      document.body.style.overflow = ""
    })
  }
}

// Particles background effect
function initParticles() {
  const particlesContainer = document.getElementById("particles")

  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 15}s`
      particlesContainer.appendChild(particle)
    }
  }
}

// Scroll to top button
function initScrollToTop() {
  const scrollTopButton = document.getElementById("scroll-top")

  if (scrollTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopButton.classList.remove("opacity-0", "invisible")
        scrollTopButton.classList.add("opacity-100", "visible")
      } else {
        scrollTopButton.classList.remove("opacity-100", "visible")
        scrollTopButton.classList.add("opacity-0", "invisible")
      }
    })

    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Animation on scroll
function initAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]")

  if (animatedElements.length > 0) {
    // Check if AOS is loaded
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      })
    } else {
      console.warn("AOS library not loaded. Animations will not work.")
    }
  }
}

// Filter functionality for clients page
function initFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const clientCards = document.querySelectorAll(".client-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      clientCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Budget form validation and submission
function initBudgetForm() {
  const budgetForm = document.getElementById("budgetForm")
  const formSuccess = document.getElementById("formSuccess")
  const newRequestBtn = document.getElementById("newRequestBtn")

  budgetForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Reset error messages
    const errorMessages = document.querySelectorAll(".error-message")
    errorMessages.forEach((el) => {
      el.classList.add("hidden")
      el.textContent = ""
    })

    // Validate form
    let isValid = true

    // Name validation
    const nameInput = document.getElementById("name")
    if (!nameInput.value.trim()) {
      showError(nameInput, "Por favor, informe seu nome completo")
      isValid = false
    }

    // Email validation
    const emailInput = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, "Por favor, informe um e-mail válido")
      isValid = false
    }

    // Phone validation
    const phoneInput = document.getElementById("phone")
    if (!phoneInput.value.trim()) {
      showError(phoneInput, "Por favor, informe seu telefone")
      isValid = false
    }

    // Service validation
    const serviceInput = document.getElementById("service")
    if (!serviceInput.value) {
      showError(serviceInput, "Por favor, selecione um serviço")
      isValid = false
    }

    // Privacy checkbox validation
    const privacyCheckbox = document.getElementById("privacy")
    if (!privacyCheckbox.checked) {
      showError(privacyCheckbox, "Você precisa concordar com a política de privacidade")
      isValid = false
    }

    // If form is valid, submit it
    if (isValid) {
      // Here you would normally send the data to your server
      // For demonstration, we'll just show the success message
      budgetForm.style.display = "none"
      formSuccess.style.display = "block"

      // Log form data (for demonstration)
      const formData = new FormData(this)
      const formValues = {}
      for (const [key, value] of formData.entries()) {
        formValues[key] = value
      }
      console.log("Form submitted:", formValues)
    }
  })

  if (newRequestBtn) {
    newRequestBtn.addEventListener("click", () => {
      budgetForm.reset()
      budgetForm.style.display = "block"
      formSuccess.style.display = "none"
    })
  }

  // Helper function to show error messages
  function showError(inputElement, message) {
    const errorElement = inputElement.nextElementSibling
    errorElement.textContent = message
    errorElement.classList.remove("hidden")
  }
}
