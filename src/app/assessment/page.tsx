"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

type Question = {
  id: number;
  question_number: number;
  question_text: string;
  category: string;
  options: string[];
};

type Answer = {
  question_id: number;
  question_number: number;
  answer: string;
};

export default function AssessmentPage() {

  const router = useRouter();

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [currentQuestionIndex,
    setCurrentQuestionIndex] =
    useState(0);

  const [selectedAnswer,
    setSelectedAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState<Answer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  // FETCH QUESTIONS

  const fetchQuestions = async () => {

    try {

      const { data, error } =
        await supabase
          .from("questions")
          .select("*")
          .order(
            "question_number",
            {
              ascending: true,
            }
          );

      if (error) {

        console.error(error);

        setLoading(false);

        return;
      }

      const cleanedQuestions =
        (data || [])

          .map((question: {
            id: number;
            question_number: number;
            question_text: string;
            category: string;
            options: unknown;
          }) => {

            let parsedOptions:
              string[] = [];

            if (
              Array.isArray(
                question.options
              )
            ) {

              parsedOptions =
                question.options;
            }

            else if (
              typeof question.options
              === "string"
            ) {

              try {

                parsedOptions =
                  JSON.parse(
                    question.options
                  );

              } catch {

                parsedOptions = [];
              }
            }

            else if (
              typeof question.options
              === "object"
              &&
              question.options !== null
            ) {

              parsedOptions =
                Object.values(
                  question.options
                ) as string[];
            }

            return {
              ...question,
              options:
                parsedOptions,
            };
          })

          .filter(
            (
              question: Question
            ) => {

              return (
                question.question_text &&
                question.options &&
                question.options.length > 0
              );
            }
          );

      setQuestions(
        cleanedQuestions
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const loadQuestions =
      async () => {

        await fetchQuestions();

      };

    loadQuestions();

  }, []);

  // NEXT QUESTION / SUBMIT

  const handleNext = async () => {

    if (!selectedAnswer) {

      alert(
        "Please select an answer"
      );

      return;
    }

    const currentQuestion =
      questions[
      currentQuestionIndex
      ];

    const updatedAnswers = [

      ...answers,

      {
        question_id:
          currentQuestion.id,

        question_number:
          currentQuestion.question_number,

        answer:
          selectedAnswer,
      },
    ];

    setAnswers(updatedAnswers);

    // LAST QUESTION

    if (
      currentQuestionIndex >=
      questions.length - 1
    ) {

      setSubmitting(true);
      const assessmentId =
        crypto.randomUUID();
      const formattedAnswers =

        updatedAnswers.map(
          (item) => ({

            assessment_id:
              assessmentId,

            user_email:
              "test@onegrasp.com",

            question_id:
              item.question_id,

            question_number:
              item.question_number,

            selected_answer:
              item.answer,
          })
        );

      const { error } =

        await supabase
          .from("answers")
          .insert(
            formattedAnswers
          );

      setSubmitting(false);

      if (error) {

        console.error(error);

        alert(
          "Failed to submit assessment"
        );

        return;
      }

      router.push(
        `/report?id=${assessmentId}`
      );

      return;
    }

    setSelectedAnswer("");

    setCurrentQuestionIndex(
      currentQuestionIndex + 1
    );
  };

  // LOADING

  if (loading) {

    return (

      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">

        <div className="bg-white px-10 py-8 rounded-3xl shadow-lg border border-gray-200">

          <h1 className="text-3xl font-black text-[#dc2626] text-center">
            Loading Assessment...
          </h1>

        </div>

      </main>
    );
  }

  const currentQuestion =
    questions[currentQuestionIndex];

  if (!currentQuestion) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">

        <h1 className="text-3xl font-bold text-[#dc2626]">
          No Questions Found
        </h1>

      </main>
    );
  }

  const progress =
    ((currentQuestionIndex + 1)
      / questions.length) * 100;

  return (

    <main className="min-h-screen bg-gradient-to-br from-[#f8f8f8] to-[#f1f1f1] py-10 px-5">

      <div className="max-w-5xl mx-auto">

        {/* TOP CARD */}

        <div className="bg-white rounded-[32px] border border-gray-200 shadow-xl p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h1 className="text-5xl font-black text-[#dc2626] tracking-tight">
                OneGrasp
              </h1>

              <p className="text-gray-500 tracking-[4px] mt-3 font-medium uppercase">
                Psychometric Assessment
              </p>

            </div>

            <div className="text-right">

              <p className="text-gray-500 font-medium">
                Question Progress
              </p>

              <h2 className="text-4xl font-black text-gray-900 mt-2">
                {currentQuestionIndex + 1}
                /
                {questions.length}
              </h2>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-8 h-4 bg-gray-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-[#dc2626] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="bg-white rounded-[32px] border border-gray-200 shadow-xl p-10 mt-8">

          {/* CATEGORY */}

          <div className="inline-flex items-center px-5 py-2 rounded-full bg-red-100 text-[#dc2626] font-semibold text-sm uppercase tracking-wide">
            {currentQuestion.category}
          </div>

          {/* QUESTION */}

          <h2 className="mt-8 text-3xl font-bold text-gray-900 leading-relaxed">
            {currentQuestion.question_text}
          </h2>

          {/* OPTIONS */}

          <div className="mt-10 space-y-5">

            {currentQuestion.options.map(
              (
                option,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedAnswer(option)
                  }
                  className={`
                  w-full
                  text-left
                  p-6
                  rounded-2xl
                  border-2
                  transition-all
                  duration-300
                  text-lg
                  font-medium

                  ${selectedAnswer === option
                      ? "border-[#dc2626] bg-red-50 text-[#dc2626] shadow-md"
                      : "border-gray-200 hover:border-[#dc2626] hover:bg-gray-50"
                    }
                  `}
                >
                  {option}
                </button>
              )
            )}

          </div>

          {/* ACTION BUTTON */}

          <div className="mt-12 flex justify-end">

            <button
              onClick={handleNext}
              disabled={submitting}
              className="bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg"
            >

              {
                currentQuestionIndex >=
                  questions.length - 1

                  ? submitting
                    ? "Submitting..."
                    : "Submit Assessment"

                  : "Next Question"
              }

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}