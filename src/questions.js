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
    for (let i = 0; i < 50; i++) {
      questions.push(`${category} Question ${i}`)
    }
    return questions
  }


}

module.exports = Questions