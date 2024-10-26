// ------------navbar toggle ----------
const toglleBtn = document.querySelector(".toggle_icon");
const mobileMenu = document.getElementById("mobile_navbar");
const toggleImg = document.getElementById("toggle_img");
console.log(toggleImg);

function checkActive() {
  toglleBtn.classList.toggle("toggle_icon_active");
  if (toggleImg.classList.contains("show")) {
    toggleImg.src = "./images/menu-close.svg";

    document.body.style.overflow = "hidden";
  } else {
    toggleImg.src = "./images/menu.svg";
    document.body.style.overflow = "unset";
  }
}

toglleBtn.addEventListener("click", () => {
  toggleImg.classList.toggle("show");
  mobileMenu.classList.toggle("active");

  checkActive();
});

document.querySelectorAll(".mobile_menu_btns .nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      mobileMenu.classList.remove("active");
      toggleImg.classList.remove("show");
      checkActive();
    }
  });
});

// ----report section ------

document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const cardBody = this.closest(".card-body");
    const fullDesc = this.previousElementSibling;
    const isExpanded = fullDesc.classList.contains("visible");

    // Toggle full description visibility
    if (isExpanded) {
      fullDesc.classList.remove("visible");
      fullDesc.classList.add("hidden");
      this.textContent = "Read More";
    } else {
      fullDesc.classList.remove("hidden");
      fullDesc.classList.add("visible");
      this.textContent = "Read Less";
    }

    // Animate height
    const description = this.closest(".card-description");
    if (isExpanded) {
      cardBody.style.height = `${description.offsetHeight}px`;
    } else {
      cardBody.style.height = `${description.scrollHeight}px`;
    }
  });
});

// Set initial heights
document.querySelectorAll(".card-body").forEach((body) => {
  const description = body.querySelector(".card-description");
  // body.style.height = `${description.offsetHeight}px`;
});

// -----accordian functionality----

const accordionItems = document.querySelectorAll(".accordion-item");
const loadMoreBtn = document.getElementById("load_more");
let openItem = null;

accordionItems.forEach((item, index) => {
  const AccordianBtn = item.querySelector(".accordion-button");
  const content = item.querySelector(".accordion-content");
  const answer = item.querySelector(".accordion-answer");
  const icon = item.querySelector(".accordion-icon");

  AccordianBtn.addEventListener("click", () => {
    const isOpen = openItem === index;

    if (openItem !== null && openItem !== index) {
      const prevItem = accordionItems[openItem];
      prevItem.querySelector(".accordion-content").style.height = "0";
      prevItem.querySelector(".accordion-answer").classList.remove("show");
      prevItem.querySelector(".accordion-icon").classList.remove("rotate");
    }

    if (isOpen) {
      content.style.height = "0";
      answer.classList.remove("show");
      icon.classList.remove("rotate");
      openItem = null;
    } else {
      content.style.height = answer.scrollHeight + "px";
      answer.classList.add("show");
      icon.classList.add("rotate");
      openItem = index;
    }
  });
});

// load more btn
loadMoreBtn.addEventListener("click", (e) => {
  accordionItems.forEach((item, index) => {
    if (item.classList.contains("hidden_accordion")) {
      item.classList.remove("hidden_accordion");
    }
  });

  e.target.classList.add("hidden_accordion");
  console.log(e.target);
});

// --- modal functionality----

function openModal(modalId) {
  // document.body.style.overflow = "hidden";
  document.getElementById(`${modalId}-backdrop`).classList.add("show");
  document.getElementById(`${modalId}-container`).classList.add("show");
}

function closeModal(modalId) {
  // document.body.style.overflow = "unset";
  document.getElementById(`${modalId}-backdrop`).classList.remove("show");
  document.getElementById(`${modalId}-container`).classList.remove("show");
}

// Close modal when clicking on backdrop
const backdrops = document.querySelectorAll(".modal-backdrop");
backdrops.forEach((backdrop) => {
  backdrop.addEventListener("click", function () {
    const modalId = this.id.replace("-backdrop", "");
    closeModal(modalId);
  });
});

// ------------pagination for testimonial ---

// Function to show testimonials for a specific page
function renderTestimonials(page) {
  // Hide all testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((card) => {
    card.style.display = "none";
  });

  // Show testimonial cards for the current page
  document
    .querySelectorAll(`.testimonial-card[data-page="${page}"]`)
    .forEach((card) => {
      card.style.display = "block";
    });

  // Update active pagination button
  document.querySelectorAll(".pagination-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-page") == page);
  });
}

// Initialize testimonials for the first page
let currentPage = 1;
renderTestimonials(currentPage);

// Handle pagination button clicks
document.querySelectorAll(".pagination-btn").forEach((button) => {
  button.addEventListener("click", function () {
    currentPage = parseInt(this.getAttribute("data-page"));
    renderTestimonials(currentPage);
  });
});

/*
==========================================
? => Intersection Observer for Sticky Div
==========================================
*/

const whoSection = document.getElementById("who");
const stickyDiv = document.getElementById("stickyDiv");

let lastScrollY = window.scrollY;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (entry.isIntersecting && scrollingDown) {
        stickyDiv.style.position = "absolute";
        stickyDiv.style.top = "-924px";
      } else if (!entry.isIntersecting && !scrollingDown) {
        stickyDiv.style.position = "fixed";
        stickyDiv.style.top = "95px";
      }

      lastScrollY = currentScrollY;
    });
  },
  {
    root: null,
    threshold: 0.92,
  }
);

observer.observe(whoSection);

window.addEventListener("scroll", () => {
  const header = document.querySelector(".register_mobile");
  const hero = document.getElementById("hero");

  // Add or remove the 'sticky' class based on scroll position
  if (window.scrollY > 110) {
    header.style.display = "block";
  } else {
    header.style.display = "none";
  }
});
