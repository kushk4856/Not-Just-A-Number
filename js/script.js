/*
 =========================
? => Navbar Toggle Btn
=========================
 */

const toglleBtn = document.querySelector(".toggle_icon");
const mobileMenu = document.getElementById("mobile_navbar");
const toggleImg = document.getElementById("toggle_img");

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

/* 
=============================================
? => Report Section Read more and less Btn
==============================================
 */

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

/* 
===========================================================
? => Accordion Functionality and Load more Functionaliy
===========================================================
 */

const accordionItems = document.querySelectorAll(".accordion-item");
const loadMoreBtn = document.getElementById("load_more");
const accordion = document.getElementById("faqAccordion");
const container = document.querySelector(".accordion-container");
let openItem = 0;
let isExpanded = false;

// ------------- first accordionItem will be open initially
const firstItem = accordionItems[0];
const firstContent = firstItem.querySelector(".accordion-content");
const firstAnswer = firstItem.querySelector(".accordion-answer");
const firstIcon = firstItem.querySelector(".accordion-icon");

firstContent.style.height = firstAnswer.scrollHeight + "px";
firstAnswer.classList.add("show");
firstIcon.classList.add("rotate");

// ---Handle accordion clicks
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
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = null;
    } else {
      content.style.height = answer.scrollHeight + "px";
      answer.classList.toggle("show");
      icon.classList.toggle("rotate");
      openItem = index;
    }
  });
});

// ---Handle Load More
loadMoreBtn.addEventListener("click", () => {
  if (isExpanded) return;

  // Set initial height
  container.style.height = container.offsetHeight + "px";

  // Add more FAQs
  accordionItems.forEach((item, index) => {
    if (item.classList.contains("hidden_accordion")) {
      item.classList.remove("hidden_accordion");
    }
  });

  // Force reflow
  void container.offsetHeight;

  // Animate to new height
  container.style.height = accordion.offsetHeight + "px";

  // Fade in new items
  setTimeout(() => {
    document.querySelectorAll(".new-item").forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
    // loadMoreBtn.style.visibility = "hidden";
  }, 50);

  // Cleanup;
  setTimeout(() => {
    container.style.height = "auto";
    document.querySelectorAll(".new-item").forEach((item) => {
      item.classList.remove("new-item");
    });
    loadMoreBtn.style.display = "none";
  }, 500);

  isExpanded = true;
});

/* 
==========================================================
? => Modal Functionality 
========================================================== 

 */

//open modal
function openModal(modalId) {
  // document.body.style.overflow = "hidden";
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);
  const modalWrapper = container.querySelector(".modal-wrapper");

  // Remove hiding class if present
  backdrop.classList.remove("hiding");
  container.classList.remove("hiding");

  // Show modal
  backdrop.classList.add("show");
  container.classList.add("show");

  // Add click event listener to the modal wrapper
  modalWrapper.addEventListener("click", (event) => {
    // If clicked element is the modal wrapper (the outer area)
    if (event.target === modalWrapper) {
      closeModal(modalId);
    }
  });
}

//close modal
function closeModal(modalId) {
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);

  // Add hiding class for close animation
  backdrop.classList.add("hiding");
  container.classList.add("hiding");

  // Remove show class after animation
  setTimeout(() => {
    backdrop.classList.remove("show");
    container.classList.remove("show");
    backdrop.classList.remove("hiding");
    container.classList.remove("hiding");
    document.body.style.overflow = "unset";
  }, 300);
}

/* 
================================================================
? => Testimonial Pagination Functionality 
================================================================
 */

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

/* 
========================================
? => Mobile Footer will show after scroll 
==========================================
 */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".register_mobile");
  const hero = document.getElementById("hero");

  // Add or remove the 'sticky' class based on scroll position
  if (window.scrollY > 110) {
    header.style.display = "block";
  } else {
    header.style.display = "block";
  }
});
