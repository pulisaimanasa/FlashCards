const subjectKeywords = {
"Chemistry": ["atoms", "periodic table", "chemicals", "acids", "base"],
"Biology": ["photosynthesis", "cell", "tissues", "blood cells", "plants"],
"Mathematics": ["addition", "integers", "decimals", "real numbers", "prime numbers"],
"Physics": ["sound", "magnetic fiels", "mass", "velocity", "force"],
};


function getSubject(question) {
  const lowerCq = question.toLowerCase();
  const subjects = Object.keys(subjectKeywords);
const foundSubject = subjects.find(subject => {
    const keywords = subjectKeywords[subject];
return keywords.some(keyword => lowerCq.includes(keyword));
  });
  return foundSubject || "General";
}

function saveFlashcard(flashcard) {
  const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.push(flashcard);
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function getFlashcardsByStudent(studentId) {
  const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  return flashcards.filter(f => f.student_id === studentId);
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


document.getElementById('flashcard-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const studentId = document.getElementById('studentId').value.trim();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (!studentId || !question || !answer) {
    alert('Please fill all fields.');
    return;
  }

  const subject = getSubject(question);

  const newFlashcard = {
    student_id: studentId,
    question: question,
    answer: answer,
    subject: subject
  };

  saveFlashcard(newFlashcard);

  alert(`Flashcard added successfuly, ${subject}`);
  document.getElementById('flashcard-form').reset();
});



document.getElementById('get-flashcards-btn').addEventListener('click', function() {
  const studentId = document.getElementById('studentId').value.trim();
  const limit = parseInt(document.getElementById('limit').value);

  if (!studentId) {
    alert('Please enter Student ID to retrieve flashcards.');
    return;
  }

  const allFlashcards = getFlashcardsByStudent(studentId);


shuffleArray(allFlashcards);

  

const selectedFlashcards = allFlashcards.slice(0, limit);


const container = document.getElementById('flashcards-container');
container.innerHTML = '';

  if (selectedFlashcards.length === 0) {
    container.innerHTML = '<p>No flashcards found for this student.</p>';
    return;
}

selectedFlashcards.forEach(f => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flashcard';

cardDiv.innerHTML = `
      <h3>Subject: ${f.subject}</h3>
      <p><strong>Question:</strong> ${f.question}</p>
      <p><strong>Answer:</strong> ${f.answer}</p>
    `;
container.appendChild(cardDiv);
  });
});

