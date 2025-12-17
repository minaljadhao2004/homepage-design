// Header Scroll Effect
const header = document.querySelector(".header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")

  // Animate hamburger to X
  const svg = mobileMenuToggle.querySelector("svg")
  svg.style.transform = mobileMenu.classList.contains("active") ? "rotate(90deg)" : "rotate(0)"
})

// Search Toggle
const searchToggle = document.querySelector(".search-toggle")
const searchBar = document.querySelector(".search-bar")

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("active")
  if (searchBar.classList.contains("active")) {
    searchBar.querySelector("input").focus()
  }
})

// Category Tabs Filter
const categoryTabs = document.querySelectorAll(".category-tab")
const productCards = document.querySelectorAll(".product-card")

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    categoryTabs.forEach((t) => t.classList.remove("active"))
    // Add active class to clicked tab
    tab.classList.add("active")

    const category = tab.dataset.category

    // Filter products with animation
    productCards.forEach((card, index) => {
      setTimeout(() => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease"
        } else {
          card.style.display = "none"
        }
      }, index * 50)
    })
  })
})

// Carousel
const carouselTrack = document.querySelector(".carousel-track")
const prevBtn = document.querySelector(".carousel-btn.prev")
const nextBtn = document.querySelector(".carousel-btn.next")
let currentPosition = 0
const cardWidth = 270 // 250px + 20px gap

nextBtn.addEventListener("click", () => {
  const maxScroll = carouselTrack.scrollWidth - carouselTrack.parentElement.clientWidth
  if (Math.abs(currentPosition) < maxScroll) {
    currentPosition -= cardWidth
    carouselTrack.style.transform = `translateX(${currentPosition}px)`
  }
})

prevBtn.addEventListener("click", () => {
  if (currentPosition < 0) {
    currentPosition += cardWidth
    carouselTrack.style.transform = `translateX(${currentPosition}px)`
  }
})

// Add to Cart Animation
const addToCartButtons = document.querySelectorAll(".add-to-cart")
const cartCount = document.querySelector(".cart-count")
let itemCount = 0

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card, .product-card-small")
    const img = card.querySelector("img")
    const imgRect = img.getBoundingClientRect()
    const cartBtn = document.querySelector(".cart-btn")
    const cartRect = cartBtn.getBoundingClientRect()

    // Create flying image
    const flyingImg = img.cloneNode()
    flyingImg.style.position = "fixed"
    flyingImg.style.top = imgRect.top + "px"
    flyingImg.style.left = imgRect.left + "px"
    flyingImg.style.width = imgRect.width + "px"
    flyingImg.style.height = imgRect.height + "px"
    flyingImg.style.zIndex = "9999"
    flyingImg.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    flyingImg.style.pointerEvents = "none"
    document.body.appendChild(flyingImg)

    // Animate to cart
    setTimeout(() => {
      flyingImg.style.top = cartRect.top + "px"
      flyingImg.style.left = cartRect.left + "px"
      flyingImg.style.width = "20px"
      flyingImg.style.height = "20px"
      flyingImg.style.opacity = "0"
    }, 10)

    // Remove flying image and update count
    setTimeout(() => {
      flyingImg.remove()
      itemCount++
      cartCount.textContent = itemCount
      cartCount.style.animation = "none"
      setTimeout(() => {
        cartCount.style.animation = "pulse 0.3s ease"
      }, 10)
    }, 800)

    // Button feedback
    button.textContent = "✓ Added!"
    button.style.background = "#4CAF50"
    setTimeout(() => {
      button.textContent = "Add to Cart"
      button.style.background = ""
    }, 2000)
  })
})

// Pulse animation for cart count
const style = document.createElement("style")
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`
document.head.appendChild(style)

// Quick View Modal (Simulated)
const quickViewButtons = document.querySelectorAll(".quick-view")

quickViewButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation()
    const card = button.closest(".product-card")
    const productName = card.querySelector(".product-name").textContent

    // Show notification
    showNotification(`Quick viewing: ${productName}`)
  })
})

// Notification System
function showNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--secondary-color);
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.5s;
    `
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Add slide animations
const slideStyle = document.createElement("style")
slideStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`
document.head.appendChild(slideStyle)

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Parallax Effect on Hero Image
const heroImage = document.querySelector(".hero-image img")

window.addEventListener("scroll", () => {
  if (heroImage) {
    const scrolled = window.pageYOffset
    const parallax = scrolled * 0.3
    heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`
  }
})

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
const sections = document.querySelectorAll("section")
sections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(section)
})

// Hover effect for collection items
const collectionItems = document.querySelectorAll(".collection-item")

collectionItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  item.addEventListener("mouseleave", function () {
    this.style.zIndex = "1"
  })
})

// Gift cards animation
const giftCards = document.querySelectorAll(".gift-card")

giftCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`
  card.addEventListener("mouseenter", function () {
    giftCards.forEach((c) => {
      if (c !== this) {
        c.style.transform = "scale(0.95)"
      }
    })
  })

  card.addEventListener("mouseleave", () => {
    giftCards.forEach((c) => {
      c.style.transform = ""
    })
  })
})

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Initialize animations on load
window.addEventListener("load", () => {
  document.body.style.opacity = "1"

  // Stagger animation for product cards
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })
})

// Console welcome message
console.log(
  "%c Welcome to LUXE! ",
  "background: #000; color: #d4af37; font-size: 20px; padding: 10px; font-weight: bold;",
)
console.log("%c Premium Clothing Store ", "background: #d4af37; color: #000; font-size: 14px; padding: 5px;")
