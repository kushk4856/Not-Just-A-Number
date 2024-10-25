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
  body.style.height = `${description.offsetHeight}px`;
});

// -----accordian functionality----

const accordionItems = document.querySelectorAll(".accordion-item");
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
