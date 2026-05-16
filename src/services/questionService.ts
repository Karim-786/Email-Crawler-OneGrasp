import { supabase } from "@/app/lib/supabase";

export const fetchQuestions = async () => {

  const { data, error } = await supabase
    .from("questions")
    .select("*");

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return [];
  }

  console.log("QUESTIONS:", data);

  return data;
};