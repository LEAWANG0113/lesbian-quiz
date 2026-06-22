"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import type { QuizOption } from "@/data/questions";
import { calculateResult, encodeResult } from "@/lib/quiz-engine";

const categoryColors: Record<string, string> = {
  daily: "bg-amber-100 text-amber-800",
  ex: "bg-rose-100 text-rose-800",
  meme: "bg-purple-100 text-purple-800",
};

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, question.options[selected]];

    if (currentIndex >= questions.length - 1) {
      const result = calculateResult(newAnswers);
      const rawScores: Record<string, number> = {};
      for (const opt of newAnswers) {
        for (const [charId, score] of Object.entries(opt.scores)) {
          rawScores[charId] = (rawScores[charId] || 0) + score;
        }
      }
      const encoded = encodeResult(rawScores);
      router.push(`/result?r=${encoded}`);
      return;
    }

    setAnswers(newAnswers);
    setSelected(null);
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Progress bar */}
        <div className="w-full h-2 bg-accent-light/30 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question counter + category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-muted">
            {currentIndex + 1} / {questions.length}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[question.category]}`}
          >
            {question.categoryLabel}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`text-left px-5 py-4 rounded-xl border-2 transition-all ${
                selected === i
                  ? "border-accent bg-accent/10"
                  : "border-transparent bg-card-bg hover:border-accent-light"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-accent text-white font-semibold py-3 rounded-full disabled:opacity-30 hover:opacity-90 transition-opacity"
        >
          {currentIndex >= questions.length - 1 ? "查看结果" : "下一题 →"}
        </button>
      </div>
    </main>
  );
}
