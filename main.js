const loader = document.querySelector('.preloader');
const loaderNumber = document.querySelector('.loader-number');
const loaderLine = document.querySelector('.loader-line i');
let progress = 0;

const loadingTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 10) + 8;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingTimer);

    setTimeout(() => {
      loader.classList.add('is-hidden');
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.add('site-ready');
        startCounters();
      }, 700);
    }, 260);
  }

  if (loaderNumber) loaderNumber.textContent = String(progress).padStart(3, '0');
  if (loaderLine) loaderLine.style.width = progress + '%';
}, 70);

const orbit = document.querySelector('.orbit-wrap');
let mouseX = 0;
let mouseY = 0;
let orbitX = 0;
let orbitY = 0;

window.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbit() {
  if (orbit && window.innerWidth > 760) {
    orbitX += (mouseX - orbitX) * 0.06;
    orbitY += (mouseY - orbitY) * 0.06;
    orbit.style.translate = `${orbitX * 18}px ${orbitY * 12}px`;
    orbit.style.rotate = `${orbitX * 4}deg`;
  }
  requestAnimationFrame(animateOrbit);
}
animateOrbit();

const preview = document.querySelector('.project-preview');
const projectRows = document.querySelectorAll('.project-row');
let previewX = 0;
let previewY = 0;
let targetX = 0;
let targetY = 0;

projectRows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    preview.textContent = row.dataset.preview;
    preview.classList.add('active');
  });
  row.addEventListener('mouseleave', () => {
    preview.classList.remove('active');
  });
});

window.addEventListener('mousemove', (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

function movePreview() {
  if (preview) {
    previewX += (targetX - previewX) * 0.14;
    previewY += (targetY - previewY) * 0.14;
    preview.style.left = previewX + 'px';
    preview.style.top = previewY + 'px';
  }
  requestAnimationFrame(movePreview);
}
movePreview();

function startCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = String(current).padStart(2, '0');
    }, 35);
  });
}

const revealItems = document.querySelectorAll('.dashboard-shell, .project-row, .tools-grid article');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
