const resultsTextElement = document.querySelectorAll('[data-result');
const continueBtn = document.querySelector('button');
const percentage = document.querySelector('.percent');
const resultsElement = document.querySelector('.results');

let results = [];
let sum = 0

function displayResults() {
  results.forEach((result) => {
    const div = document.createElement('div');
    let newClass = addClassestoResults(result);
    div.innerHTML = `
        <div class="result bg-${newClass}">
        <div class="result-title ${newClass}">
        <img src=${result.icon} alt=${result.category} />
        <p>${result.category}</p>
        </div>
        <p class="grey"><span data-result> ${result.score}</span> / 100</p>
        </div>
        `;
    resultsElement.appendChild(div);
  });
}

function addClassestoResults({ category }) {
  switch (category) {
    case 'Reaction':
      return 'red';
    case 'Memory':
      return 'orange';
    case 'Verbal':
      return 'green';
    case 'Visual':
      return 'blue';
    default:
      break;
  }
}

continueBtn.addEventListener('click', function () {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      results = data;
    });

    results.forEach(result => {
      sum += result.score
    })
    
    displayResults();
    let percent = (sum / 400)*100
    percentage.textContent = Math.round(percent)
});
