const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const startLessonBtn = document.querySelector('.start-lesson-btn');
const fixedLabel = document.querySelector('.fixed-slide-label');

let currentIndex = 0;

// Update slider position, fixed label, and button text
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update fixed top label
  const currentSlide = slides[currentIndex];
  if (currentSlide.dataset.label) {
    fixedLabel.querySelector('.slide-label-text').textContent =
      currentSlide.dataset.label.toUpperCase();
    fixedLabel.querySelector('.slide-label-icon').src = currentSlide.dataset.icon;
  }

  // Update button text depending on slide
  if (currentIndex === 0) {
    startLessonBtn.textContent = "Start Lesson";
  } else if (currentIndex === slides.length - 1) {
    startLessonBtn.textContent = "Finish";
  } else {
    startLessonBtn.textContent = "Next";
  }
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

// Button click → move to next slide (until last one)
startLessonBtn.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  } else {
    // Last slide → you can redirect, close, or do nothing
    console.log("Lesson finished ✅");
  }
});

// Initialize on page load
updateSlider();

// Automatically index practice slides
function indexPracticeSlides() {
  const practiceSlides = document.querySelectorAll('.slide[data-label="practice"]');
  practiceSlides.forEach((slide, idx) => {
    const numberCircle = slide.querySelector('.practice-number');
    if (numberCircle) {
      numberCircle.textContent = idx + 1;
    }
  });
}

// Handle answer clicks
function setupPracticeAnswers() {
  const practiceSlides = document.querySelectorAll('.slide[data-label="practice"]');

  practiceSlides.forEach(slide => {
    const answers = slide.querySelectorAll('.answer');
    const correctFeedback = slide.querySelector('.correct-feedback');
    const wrongFeedback = slide.querySelector('.wrong-feedback');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        // Remove previous selection
        answers.forEach(a => a.classList.remove('selected'));

        // Mark clicked answer
        answer.classList.add('selected');

        // Show correct/wrong feedback
        if (answer.dataset.correct === "true") {
          if (correctFeedback) correctFeedback.style.display = "block";
          if (wrongFeedback) wrongFeedback.style.display = "none";
        } else {
          if (correctFeedback) correctFeedback.style.display = "none";
          if (wrongFeedback) wrongFeedback.style.display = "block";
        }
      });
    });
  });
}

// Initialize practice slides
indexPracticeSlides();
setupPracticeAnswers();
