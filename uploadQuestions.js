import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://uzrbwwwbjmrtmkzrcsmk.supabase.co";

const supabaseKey =
  "sb_publishable_YFwK8QByHiBhpGveWAQFuA_fqZW2XcP";

const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );

async function uploadQuestions() {

  const rawData =
    fs.readFileSync(
      "questions.json",
      "utf-8"
    );

  const questions =
    JSON.parse(rawData);

  const { error } =
    await supabase
      .from("questions")
      .insert(questions);

  if (error) {

    console.error(
      "Upload failed:",
      error
    );

    return;
  }

  console.log(
    `✅ Uploaded ${questions.length} questions`
  );
}

uploadQuestions();