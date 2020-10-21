/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [{
      question: 'What kind of animal is a Tuna?',
      answers: [
        'Mammal',
        'Fish',
        'Bird',
        'Reptile'
      ],
      correctAnswer: 'Fish'
    },
    {
      question: 'What kind of animal is a Bear?',
      answers: [
        'Mammal',
        'Fish',
        'Bird',
        'Reptile'
      ],
      correctAnswer: 'Mammal'
    },
    {
      question: 'What kind of animal is a Lizard?',
      answers: [
        'Mammal',
        'Fish',
        'Bird',
        'Reptile'
      ],
      correctAnswer: 'Reptile'
    },
    {
      question: 'What kind of animal is a Parrot?',
      answers: [
        'Mammal',
        'Fish',
        'Bird',
        'Reptile'
      ],
      correctAnswer: 'Bird'
    },
    {
      question: 'What kind of animal is a Whale?',
      answers: [
        'Mammal',
        'Fish',
        'Bird',
        'Reptile'
      ],
      correctAnswer: 'Mammal'
    },

  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

imageArr = [
  `<img src='images/tuna.jpg' alt='a tuna swimming in the ocean'>`,
  `<img src='images/bear.jpg' alt='a tuna bear going for a walk'>`,
  `<img src='images/lizard.jpg' alt='a lizard resting on a branch'>`,
  `<img src='images/parrot.jpg' alt='a parrot posing for the camera'>`,
  `<img src='images/whale.jpg' alt='an orca whale swimming in the ocean'>`
];

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function startPage() {
  let startPage = `
  <div class="startBox">
  <h2>Welcome to the Amazing Animal Quiz</h2>
  <p>How well do you know your Animal Types</p>
  <button id="start">Start Quiz</button>
</div>`;
  return startPage
}

function questionPage() {
  let question = store.questions[store.questionNumber];
  var questionPage = `
  <div class="questionBox">
  ${imageCycler()}
  <h2>${question.question}</h2>
 <form>
    <div class="group options-list">
      <label> ${question.answers[0]}</label>
      <input type="radio" name="answer" value="${question.answers[0]}"required>
      <label> ${question.answers[1]}</label>
      <input type="radio" name="answer" value="${question.answers[1]}"required>
      <label> ${question.answers[2]}</label>
      <input type="radio" name="answer" value="${question.answers[2]}"required>
      <label> ${question.answers[3]}</label>
      <input type="radio" name="answer" value="${question.answers[3]}"required>
     </div>  
      <button class="submit" type="submit">Submit your answer</button>
  </form>
</div>
<div>
<p>Score: ${store.score} / 5</p>
</div>`;
  return questionPage;

}

function AnswerBox() {
  let correct = store.questions[store.questionNumber].correctAnswer
  let userInput = $("input[name='answer']:checked").val()
  if (userInput === correct) {
    store.score++
    feedbackBoxCorrect()
  } else {
    feedbackBoxIncorrect()
  }
}

function feedbackBoxCorrect() {
  const feedbackBox = `    
  <div class="correctBox">
  <h2>GOT IT!!!</h2>
  <img src="images/got-it.jpg">
  <p>Score: ${store.score} / 5</p>
  <button class="continue">Continue Quiz</button>
</div>`
  return $('main').html(feedbackBox)
}

function feedbackBoxIncorrect() {
  const feedbackBox = `
  <div class="incorrectBox">
  <img src="images/nope.jpg">
  <h2>NOPE!!!</h2>
  <p>Score: ${store.score} / 5</p>
  <button class="continue">Continue Quiz</button>
</div>`
  return $('main').html(feedbackBox)
}

function finalScoreBox() {
  let finalScore = `
  <div class="finalBox">
  <h2>YOU SCORED</h2>
  <p>Score: ${store.score}</p>
  <button class="restart">Restart Quiz</button>
</div>`
  return finalScore
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  if (store.quizStarted === false) {
    $('main').html(startPage());
  } else if (store.quizStarted) {
    if (store.questionNumber > 4) {
      store.score = `${(store.score / 5) *100}%`
      $('main').html(finalScoreBox())
    } else {

      $('main').html(questionPage());
    }


  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartQuiz() {
  $('main').on('click', '#start', function (e) {
    e.preventDefault()
    store.quizStarted = true;
    render();

  })

}

function imageCycler() {
  let chosenOne = imageArr[store.questionNumber]
  return chosenOne;
}


function handleAnswerSubmit() {
  $("main").on("submit", "form", function (e) {
    e.preventDefault()
    AnswerBox();

  })
}

function handleContinue() {
  $('main').on('click', '.continue', function () {
    store.questionNumber++
    render();
  })
}

function handleRestart() {
  $('main').on('click', '.restart', function () {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = false;
    render();
  })
}

// Main

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleContinue();
  handleRestart();
}


$(main);