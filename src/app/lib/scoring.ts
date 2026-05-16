import {
  questionMapping,
} from "./questionMapping";

type Answer = {
  question_id: number;
  question_number: number;
  selected_answer: string;
};

const answerScoreMap:
  Record<string, number> = {

  "Strongly Agree": 5,
  Agree: 4,
  Neutral: 3,
  Disagree: 2,
  "Strongly Disagree": 1,

  Yes: 5,
  Maybe: 3,
  No: 1,

  "Completely true": 5,
  "Mostly true": 4,
  "Mostly false": 2,
  "Completely false": 1,
};
export function generateReport(
  answers: Answer[]
) {

  const result = {
    traitScores:
  {} as Record<
    string,
    number
  >,

    personalityScore: 0,

    emotionalScore: 0,

    careerInterestScore: 0,

    motivatorScore: 0,

    totalScore: 0,

    personalityType: "",

    strengths: [] as string[],

    recommendations:
      [] as string[],
  };

  answers.forEach((answer) => {

    const score =

      answerScoreMap[
        answer.selected_answer
      ] || 0;

    result.totalScore += score;

    // CATEGORY GROUPING

    const mapping =

  questionMapping[
    answer.question_number
  ];

if (mapping) {

  // CATEGORY TOTALS

  if (
    mapping.category ===
    "Career Interest"
  ) {

    result.careerInterestScore +=
      score;
  }

  else if (
    mapping.category ===
    "Personality"
  ) {

    result.personalityScore +=
      score;
  }

  else if (
    mapping.category ===
    "Emotional Quotient"
  ) {

    result.emotionalScore +=
      score;
  }

  else if (
    mapping.category ===
    "Motivators"
  ) {

    result.motivatorScore +=
      score;
  }

  // TRAIT SCORES

  result.traitScores[
    mapping.trait
  ] =

    (
      result.traitScores[
        mapping.trait
      ] || 0
    ) + score;
}
  });

  // PERSONALITY TYPE

  if (
    result.personalityScore > 140
  ) {

    result.personalityType =
      "Extrovert Leader";

  } else if (
    result.personalityScore > 110
  ) {

    result.personalityType =
      "Balanced Professional";

  } else {

    result.personalityType =
      "Analytical Thinker";
  }

  // STRENGTHS

  if (
    result.careerInterestScore > 120
  ) {

    result.strengths.push(
      "Creative Thinking"
    );
  }

  if (
    result.emotionalScore > 90
  ) {

    result.strengths.push(
      "Emotional Intelligence"
    );
  }

  if (
    result.personalityScore > 120
  ) {

    result.strengths.push(
      "Leadership Ability"
    );
  }

  // RECOMMENDATIONS

  if (
    result.careerInterestScore > 120
  ) {

    result.recommendations.push(
      "UI/UX Design"
    );

    result.recommendations.push(
      "Product Design"
    );
  }

  if (
    result.personalityScore > 130
  ) {

    result.recommendations.push(
      "Management Roles"
    );

    result.recommendations.push(
      "Entrepreneurship"
    );
  }

  if (
    result.emotionalScore > 100
  ) {

    result.recommendations.push(
      "HR & Leadership"
    );
  }

  return result;
}