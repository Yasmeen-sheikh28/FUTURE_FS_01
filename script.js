// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Highlight active nav link automatically
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Contact form handling
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill out all fields.";
      return;
    }
    if (!validateEmail(email)) {
      statusEl.textContent = "Please enter a valid email address.";
      return;
    }

    statusEl.textContent = "Sending...";
    try {
      // Netlify fallback submission
      const netlifyData = new URLSearchParams();
      netlifyData.append("form-name", "contact");
      netlifyData.append("name", name);
      netlifyData.append("email", email);
      netlifyData.append("message", message);

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyData.toString(),
      });

      statusEl.textContent = "Message sent. I’ll get back to you soon.";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Something went wrong. Please try again later.";
    }
  });
}