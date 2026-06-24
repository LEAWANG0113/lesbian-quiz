"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import type { QuizOption } from "@/data/questions";
import { calculateResult, encodeResult } from "@/lib/quiz-engine";

const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  daily: { bg: "rgba(180,150,100,0.12)", text: "#8a7050", label: "日常" },
  ex: { bg: "rgba(180,80,80,0.10)", text: "#a05050", label: "前任" },
  meme: { bg: "rgba(140,100,160,0.10)", text: "#7a5a8a", label: "梗" },
};

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentIndex > 0) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentIndex]);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const cat = categoryStyles[question.category];

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, question.options[selected]];

    if (currentIndex >= questions.length - 1) {
      const rawScores: Record<string, number> = {};
      for (const opt of newAnswers) {
        for (const [charId, score] of Object.entries(opt.scores)) {
          rawScores[charId] = (rawScores[charId] || 0) + score;
        }
      }
      const encoded = encodeResult(rawScores);
      const resultUrl = `/result?r=${encoded}`;
      try {
        router.push(resultUrl);
      } catch {
        window.location.href = resultUrl;
      }
      return;
    }

    setTransitioning(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      setCurrentIndex(currentIndex + 1);
      setTransitioning(false);
    }, 200);
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs tracking-wider" style={{ color: "#9a8570" }}>
            {currentIndex + 1} / {questions.length}
          </span>
          <span
            className="text-[10px] tracking-wider px-3 py-1 rounded-full"
            style={{ backgroundColor: cat.bg, color: cat.text }}
          >
            {cat.label}
          </span>
        </div>
        <div className="w-full h-1 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: "rgba(180,150,120,0.15)" }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: "#c4956a" }}
          />
        </div>

        {/* Question */}
        <div
          className={`transition-all duration-200 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-2.5 mb-8">
            {question.options.map((option, i) => (
              <button
                key={`${currentIndex}-${i}`}
                onClick={() => handleSelect(i)}
                className="text-left px-5 py-4 rounded-xl transition-all duration-200 text-sm leading-relaxed"
                style={{
                  backgroundColor: selected === i ? "rgba(196,149,106,0.15)" : "rgba(255,248,240,0.8)",
                  border: selected === i ? "1.5px solid rgba(196,149,106,0.6)" : "1.5px solid transparent",
                  color: selected === i ? "#5a3a1a" : "#4a3a2a",
                  transform: selected === i ? "scale(1.01)" : "scale(1)",
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                    style={{
                      borderColor: selected === i ? "#c4956a" : "rgba(180,150,120,0.3)",
                      backgroundColor: selected === i ? "#c4956a" : "transparent",
                    }}
                  >
                    {selected === i && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full font-semibold py-3.5 rounded-full transition-all duration-300 text-sm"
          style={{
            backgroundColor: selected !== null ? "#c4956a" : "rgba(196,149,106,0.3)",
            color: selected !== null ? "#fff" : "rgba(255,255,255,0.5)",
            cursor: selected !== null ? "pointer" : "not-allowed",
            transform: selected !== null ? "translateY(0)" : "translateY(0)",
          }}
        >
          {currentIndex >= questions.length - 1 ? "查看我的结果" : "下一题"}
        </button>
      </div>
    </main>
  );
}
