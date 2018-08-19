const Questions = require("../src/questions");

describe("Questions", () => {
  const categories = ["Pop", "Science", "Sports", "Rock"]
  const numQuestions = 10
  const questions = new Questions(categories, numQuestions)

  it("prepares questions", () => {
    const questionCategories = questions.questions
    expect(Object.keys(questionCategories).length).toEqual(categories.length);

    const popQuestions = questionCategories['Pop']
    expect(popQuestions.length).toEqual(numQuestions);
  });

  it("Removes questions when asked", () => {
    questions.askQuestion('Pop')

    const popQuestions = questions.questions['Pop']
    expect(popQuestions.length).toEqual(numQuestions - 1);
  })
});
