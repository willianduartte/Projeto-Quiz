// Initial Data
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// Events
document.querySelector('.scoreArea button').addEventListener('click', reset)

// Functions
const HTML = document.querySelector('html')
const Switch = document.getElementById('switch')

Switch.addEventListener('change', () => {
    HTML.classList.toggle('light-mode')
})

function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        let optionsHtml = ''
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    } else {
        finshQuiz()
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    let resposta = questions[currentQuestion].answer === clickedOption ? 'correct' : 'wrong'
    let incorreto = e.target;
    let correto = document.querySelector(`div[data-op="${questions[currentQuestion].answer}"]`)

    if(resposta === 'correct') {
        correctAnswers++
        correto.classList.add('correct')
    } else {
        incorreto.classList.add('wrong')
        correto.classList.add('correct')
    }

    setTimeout(() => {
        currentQuestion++ 
        showQuestion()
    }, 1000); 

}

function finshQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if(points <= 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!'
        document.querySelector('.scorePct').style.color = '#ff0000'
    } else if(points >= 31 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'
        document.querySelector('.scorePct').style.color = '#ffff00'
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#0d630d'
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questoes e acertou ${correctAnswers}.`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`
}

function reset() {
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}