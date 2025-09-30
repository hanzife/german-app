const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const startLessonBtn = document.querySelector('.start-lesson-btn');
const fixedLabel = document.querySelector('.slide-label-text');
const progressBarFill = document.querySelector('.progress-bar-fill');
const footer = document.querySelector('footer');
const feedbackMessage = document.querySelector('.feedback-message');

// Audio feedback
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/error.mp3');

let currentIndex = 0;

/* -------------------------------------------
   PROGRESS BAR
------------------------------------------- */
function updateProgress() {
  if (!progressBarFill) return;
  const totalSteps = Math.max(1, slides.length - 1);
  const pct = (currentIndex / totalSteps) * 100;

  progressBarFill.style.width = `${pct}%`;
  progressBarFill.setAttribute('role', 'progressbar');
  progressBarFill.setAttribute('aria-valuemin', '0');
  progressBarFill.setAttribute('aria-valuemax', '100');
  progressBarFill.setAttribute('aria-valuenow', String(Math.round(pct)));
  progressBarFill.setAttribute('aria-valuetext', `${Math.round(pct)}%`);
}

/* -------------------------------------------
   SLIDE UPDATES
------------------------------------------- */
function updateSlider() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentIndex);
  });

  const label = slides[currentIndex].dataset.label || 'LESSON';
  fixedLabel.textContent = label.toUpperCase();

  // Set default button text
  if (slides[currentIndex].dataset.type === 'dragdrop') {
    startLessonBtn.textContent = "Check";
    startLessonBtn.dataset.state = "check"; // custom state
  } else if (currentIndex === 0) startLessonBtn.textContent = "Start Lesson";
  else if (currentIndex === slides.length - 1) startLessonBtn.textContent = "Finish";
  else startLessonBtn.textContent = "Next";

  // Reset feedback UI
  footer.classList.remove('correct', 'wrong');
  feedbackMessage.textContent = '';
  startLessonBtn.style.background = '';
  startLessonBtn.style.color = '';

  updateProgress();
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentIndex = index;
  updateSlider();
}

/* -------------------------------------------
   MULTIPLE-CHOICE PRACTICE
------------------------------------------- */
function setupPracticeAnswers() {
  const practiceSlides = document.querySelectorAll('.slide[data-label="practice"]:not([data-type="dragdrop"])');

  practiceSlides.forEach(slide => {
    const answers = slide.querySelectorAll('.answer');
    slide.classList.remove('answered');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        if (slide.classList.contains('answered')) return;
        slide.classList.add('answered');

        answers.forEach(a => a.classList.remove('selected', 'correct', 'wrong'));
        answer.classList.add('selected');

        const isCorrect = answer.dataset.correct === "true";
        const correctAnswer = slide.querySelector('.answer[data-correct="true"]');

        if (isCorrect) {
          answer.classList.add('correct');
          footer.classList.add('correct');
          feedbackMessage.textContent = "✅ Excellent!";
          styleFooterButton("#4CAF50");
          playSound(correctSound);
        } else {
          answer.classList.add('wrong');
          footer.classList.add('wrong');
          feedbackMessage.innerHTML = `❌ Incorrect!<br>Correct Answer: <strong>${correctAnswer.textContent}</strong>`;
          styleFooterButton("#F44336");
          playSound(wrongSound);

          // Shake effect
          answer.classList.add('shake');
          answer.addEventListener('animationend', () => answer.classList.remove('shake'), { once: true });
        }
      });
    });
  });
}

/* -------------------------------------------
   DRAG/DROP PRACTICE
------------------------------------------- */
function setupDragDropPractices() {
  const dragDropSlides = document.querySelectorAll('.slide[data-type="dragdrop"]');

  dragDropSlides.forEach(slide => {
    const words = slide.querySelectorAll('.word');
    const answerZone = slide.querySelector('.answer-zone');

    // Store original parent for reset
    const originalParents = new Map();
    words.forEach(word => originalParents.set(word, word.parentElement));

    // Dragging logic
    words.forEach(word => {
      word.addEventListener('dragstart', () => word.classList.add('dragging'));
      word.addEventListener('dragend', () => word.classList.remove('dragging'));
    });

    answerZone.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = slide.querySelector('.dragging');
      if (dragging) answerZone.appendChild(dragging);
    });

    // Attach reset helper to the slide
    slide._resetWords = () => {
      words.forEach(word => {
        const originalParent = originalParents.get(word);
        if (originalParent) originalParent.appendChild(word);
      });
    };
  });
}

/* -------------------------------------------
   HELPERS
------------------------------------------- */
function styleFooterButton(color) {
  startLessonBtn.style.background = color;
  startLessonBtn.style.color = "#fff";
}

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

/* -------------------------------------------
   NEXT / CHECK BUTTON HANDLING
------------------------------------------- */
startLessonBtn.addEventListener('click', () => {
  const currentSlide = slides[currentIndex];

  // Drag/drop slide logic
  if (currentSlide.dataset.type === 'dragdrop') {
    const answerZone = currentSlide.querySelector('.answer-zone');
    const correctSentence = currentSlide.dataset.correctSentence?.trim();

    if (startLessonBtn.dataset.state === 'check') {
      // Normalize user sentence: trim, collapse spaces, lowercase
      const userSentence = Array.from(answerZone.querySelectorAll('.word'))
        .map(w => w.textContent.trim())
        .join(' ')
        .replace(/\s+/g, ' ')
        .toLowerCase();

      const normalizedCorrect = (correctSentence || "").replace(/\s+/g, ' ').toLowerCase();

      footer.classList.remove('correct', 'wrong');
      feedbackMessage.textContent = '';
      startLessonBtn.style.background = '';
      startLessonBtn.style.color = '';

      if (userSentence === normalizedCorrect) {
        footer.classList.add('correct');
        feedbackMessage.textContent = "✅ Well done!";
        styleFooterButton("#4CAF50");
        playSound(correctSound);

        // Change button to Next
        startLessonBtn.textContent = 'Next';
        startLessonBtn.dataset.state = 'next';
      } else {
        footer.classList.add('wrong');
        feedbackMessage.innerHTML = `❌ Wrong!<br>Try again!`;
        styleFooterButton("#F44336");
        playSound(wrongSound);

        answerZone.classList.add('shake');
        answerZone.addEventListener('animationend', () => answerZone.classList.remove('shake'), { once: true });

        // Reset draggable words
        if (typeof currentSlide._resetWords === 'function') currentSlide._resetWords();
      }
      return;
    }

    if (startLessonBtn.dataset.state === 'next') {
      // Move to next slide
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlider();
      } else {
        console.log("Lesson finished ✅");
      }
      return;
    }
  }

  // Multiple-choice or normal slides
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  } else {
    console.log("Lesson finished ✅");
  }
});

/* -------------------------------------------
   INIT
------------------------------------------- */
updateSlider();
setupPracticeAnswers();
setupDragDropPractices();
