'use strict'

class Questions {
  constructor(categories, numQuestions) {
    this.categories = categories
    this.numQuestions = numQuestions
    this.prepareQuestions()
  }

  prepareQuestions() {
    this.questions = {}

    this.categories.forEach(category => {
      this.questions[category] = this.buildQuestions(category)
    });
  }

  buildQuestions(category) {
    const questions = []
    for (let i = 0; i < this.numQuestions; i++) {
      questions.push(`${category} Question ${i}`)
    }
    return questions
  }

  askQuestion(category) {
    return this.questions[category].shift()
  }
}

module.exports = Questions