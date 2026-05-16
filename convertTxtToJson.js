import fs from "fs";

const rawText = fs.readFileSync(
  "Pasted text.txt",
  "utf-8"
);

const lines = rawText
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const questions = [];

let currentCategory =
  "Career Interest";

let currentQuestion = null;

let questionCounter = 1;

const categoryMap = [

  {
    keyword:
      "Personality assessment",
    category:
      "Personality",
  },

  {
    keyword:
      "Career Motivators assessment",
    category:
      "Career Motivators",
  },

  {
    keyword:
      "Emotional Quotient assessment",
    category:
      "Emotional Quotient",
  },

];

function saveCurrentQuestion() {

  if (
    currentQuestion &&
    currentQuestion.options.length > 0
  ) {

    questions.push(
      currentQuestion
    );
  }
}

function looksLikeQuestion(line) {

  return (

    (
      line.includes("?") ||

      line.startsWith(
        "What"
      ) ||

      line.startsWith(
        "Which"
      ) ||

      line.startsWith(
        "How"
      ) ||

      line.startsWith(
        "When"
      ) ||

      line.startsWith(
        "If ever"
      ) ||

      line.startsWith(
        "Do you"
      ) ||

      line.startsWith(
        "Can you"
      ) ||

      line.startsWith(
        "Are you"
      ) ||

      line.startsWith(
        "I "
      )
    )

    &&

    !line.startsWith("•")

    &&

    !line.startsWith("-")

    &&

    line.length > 15
  );
}

for (let i = 0; i < lines.length; i++) {

  const line = lines[i];

  // DEBUG LINE LOG

  console.log(
    `LINE ${i}:`,
    line
  );

  // CATEGORY DETECTION

  for (const item of categoryMap) {

    if (
      line.includes(item.keyword)
    ) {

      currentCategory =
        item.category;

      console.log(
        `CATEGORY CHANGED TO: ${currentCategory}`
      );
    }
  }

  // NUMBERED QUESTION

  const numberMatch =
    line.match(/^(\d+)\s*$/);

  if (numberMatch) {

    saveCurrentQuestion();

    const nextLine =
      lines[i + 1] || "";

    currentQuestion = {

      question_number:
        questionCounter,

      question_text:
        nextLine,

      category:
        currentCategory,

      options: [],
    };

    console.log(
      `QUESTION ${questionCounter}:`,
      nextLine
    );

    questionCounter++;

    i++;

    continue;
  }

  // UNNUMBERED QUESTION

  if (
    looksLikeQuestion(line)
  ) {

    saveCurrentQuestion();

    currentQuestion = {

      question_number:
        questionCounter,

      question_text:
        line,

      category:
        currentCategory,

      options: [],
    };

    console.log(
      `UNNUMBERED QUESTION ${questionCounter}:`,
      line
    );

    questionCounter++;

    continue;
  }

  // OPTIONS

  if (
    line.startsWith("•") ||
    line.startsWith("-")
  ) {

    if (currentQuestion) {

      const option = line
        .replace("•", "")
        .replace("-", "")
        .trim();

      if (option.length > 0) {

        currentQuestion.options.push(
          option
        );

        console.log(
          `OPTION ADDED:`,
          option
        );
      }
    }
  }
}

// SAVE LAST QUESTION

saveCurrentQuestion();

// SAVE JSON

fs.writeFileSync(
  "questions.json",
  JSON.stringify(
    questions,
    null,
    2
  )
);

console.log(
  `✅ Generated ${questions.length} questions`
);