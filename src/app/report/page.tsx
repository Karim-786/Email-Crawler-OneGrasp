"use client";

import {
  useSearchParams,
} from "next/navigation";
import {
  useEffect,
  useState,
  useRef,
} from "react";

import { supabase } from "@/app/lib/supabase";

import {
  generateReport,
} from "@/app/lib/scoring";
import jsPDF from "jspdf";

import html2canvas
  from "html2canvas";

type Answer = {
  question_id: number;
  question_number: number;
  selected_answer: string;
};

export default function ReportPage() {

  type ReportData = {
    traitScores:
    Record<string, number>;
    personalityScore: number;

    emotionalScore: number;

    careerInterestScore: number;

    motivatorScore: number;

    totalScore: number;

    personalityType: string;

    strengths: string[];

    recommendations: string[];
  };

  const [report,
    setReport] =

    useState<ReportData | null>(
      null
    );

  const [loading,
    setLoading] =
    useState(true);
  const reportRef =
    useRef<HTMLDivElement>(null);
  const searchParams =
    useSearchParams();

  const assessmentId =
    searchParams.get("id");
  const downloadPDF =
    async () => {

      if (!reportRef.current)
        return;

      const canvas =

        await html2canvas(
          reportRef.current,
          {
            scale: 2,
          }
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf =
        new jsPDF(
          "p",
          "mm",
          "a4"
        );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (
          canvas.height *
          pdfWidth
        ) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        "OneGrasp-Report.pdf"
      );
    };

  useEffect(() => {


    const fetchAnswers =
      async () => {

        const { data, error } =

          await supabase
            .from("answers")
            .select("*")
            .eq(
              "assessment_id",
              assessmentId
            )
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

        const generatedReport =

          generateReport(
            data as Answer[]
          );

        setReport(
          generatedReport
        );

        setLoading(false);
      };

    fetchAnswers();

  }, [assessmentId]);

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">

        <h1 className="text-4xl font-black text-[#dc2626]">

          Generating Report...

        </h1>

      </main>
    );
  }
  if (!report) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">

        <h1 className="text-4xl font-black text-[#dc2626]">

          No Report Data Found

        </h1>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#f5f5f5] py-10 px-5">

      <div
        ref={reportRef}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-end mb-6">

          <button

            onClick={downloadPDF}

            className="
    bg-[#dc2626]
    hover:bg-[#b91c1c]
    text-white
    px-8
    py-4
    rounded-2xl
    font-semibold
    transition
    shadow-lg
    "
          >

            Download PDF Report

          </button>

        </div>
        {/* HEADER */}

        <div className="bg-white rounded-[32px] p-10 shadow-xl border border-gray-200">

          <h1 className="text-5xl font-black text-[#dc2626]">

            OneGrasp

          </h1>

          <p className="mt-3 text-gray-500 tracking-[4px] uppercase">

            Psychometric Career Report

          </p>

        </div>

        {/* OVERVIEW */}

        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200">

            <h2 className="text-3xl font-black text-gray-900">

              Personality Type

            </h2>

            <p className="mt-6 text-2xl font-semibold text-[#dc2626]">

              {report.personalityType}

            </p>

          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200">

            <h2 className="text-3xl font-black text-gray-900">

              Overall Score

            </h2>

            <p className="mt-6 text-5xl font-black text-[#dc2626]">

              {report.totalScore}

            </p>

          </div>

        </div>

        {/* SCORE ANALYTICS */}

        <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200 mt-8">

          <h2 className="text-3xl font-black text-gray-900">

            Assessment Analytics

          </h2>

          <div className="mt-10 space-y-8">

            {/* CAREER INTEREST */}

            <div>

              <div className="flex justify-between mb-3">

                <h3 className="text-lg font-semibold text-gray-800">

                  Career Interest

                </h3>

                <p className="font-bold text-[#dc2626]">

                  {report.careerInterestScore}

                </p>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-[#dc2626]"
                  style={{
                    width:
                      `${Math.min(
                        report.careerInterestScore,
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

            {/* PERSONALITY */}

            <div>

              <div className="flex justify-between mb-3">

                <h3 className="text-lg font-semibold text-gray-800">

                  Personality Score

                </h3>

                <p className="font-bold text-[#dc2626]">

                  {report.personalityScore}

                </p>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-[#dc2626]"
                  style={{
                    width:
                      `${Math.min(
                        report.personalityScore,
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

            {/* EMOTIONAL */}

            <div>

              <div className="flex justify-between mb-3">

                <h3 className="text-lg font-semibold text-gray-800">

                  Emotional Quotient

                </h3>

                <p className="font-bold text-[#dc2626]">

                  {report.emotionalScore}

                </p>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-[#dc2626]"
                  style={{
                    width:
                      `${Math.min(
                        report.emotionalScore,
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

            {/* MOTIVATORS */}

            <div>

              <div className="flex justify-between mb-3">

                <h3 className="text-lg font-semibold text-gray-800">

                  Career Motivators

                </h3>

                <p className="font-bold text-[#dc2626]">

                  {report.motivatorScore}

                </p>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-[#dc2626]"
                  style={{
                    width:
                      `${Math.min(
                        report.motivatorScore,
                        100
                      )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* STRENGTHS */}

        <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200 mt-8">

          <h2 className="text-3xl font-black text-gray-900">

            Top Strengths

          </h2>

          <div className="mt-6 flex flex-wrap gap-4">

            {report.strengths.map(
              (
                strength: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="bg-red-100 text-[#dc2626] px-5 py-3 rounded-2xl font-semibold"
                >

                  {strength}

                </div>

              )
            )}

          </div>

        </div>
        {/* TRAIT ANALYTICS */}

        <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200 mt-8">

          <h2 className="text-3xl font-black text-gray-900">

            Trait Analytics

          </h2>

          <div className="mt-8 space-y-6">

            {

              Object.entries(
                report.traitScores
              ).map(

                (
                  [trait, score],
                  index
                ) => (

                  <div key={index}>

                    <div className="flex justify-between mb-2">

                      <p className="font-semibold text-gray-800">

                        {trait}

                      </p>

                      <p className="font-bold text-[#dc2626]">

                        {score}

                      </p>

                    </div>

                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#dc2626]"
                        style={{
                          width:
                            `${Math.min(
                              score,
                              100
                            )}%`,
                        }}
                      />

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* RECOMMENDATIONS */}

        <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-200 mt-8">

          <h2 className="text-3xl font-black text-gray-900">

            Career Recommendations

          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-5">

            {report.recommendations.map(
              (
                item: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-[#dc2626] transition"
                >

                  <p className="font-semibold text-lg text-gray-800">

                    {item}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>
  );
}