import { optionScores } from "./scoreMapper";

export const calculateCategoryScores = (
  questions: any[],
  answers: { [key: number]: string }
) => {

  const categoryScores: {
    [key: string]: number;
  } = {};

  questions.forEach((question) => {

    const selectedAnswer =
      answers[question.id];

    const score =
      optionScores[selectedAnswer] || 0;

    if (!categoryScores[question.category]) {
      categoryScores[question.category] = 0;
    }

    categoryScores[question.category] += score;
  });

  return categoryScores;
};